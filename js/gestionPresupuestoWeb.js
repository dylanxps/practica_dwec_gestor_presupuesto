import * as gestionPresupuesto from "./gestionPresupuesto.js";
function mostrarDatoEnId(valor, id) {
   const element = document.getElementById(id);
   element.textContent = valor;
}
function mostrarGastoWeb(idElemento, gasto) {
    let contenedorGasto = document.getElementById(idElemento);

        let divGasto = document.createElement("div");
        divGasto.className = "gasto";
        let divGastoDesc = document.createElement("div");
        divGastoDesc.className = "gasto-descripcion";
        divGastoDesc.textContent = gasto.descripcion;
        let divGastoFech = document.createElement("div");
        divGastoFech.className = "gasto-fecha";
        divGastoFech.textContent = gasto.fecha;
        let divGastoValor = document.createElement("div");
        divGastoValor.className = "gasto-valor";
        divGastoValor.textContent = gasto.valor;
        let divGastoEtiq = document.createElement("div");
        divGastoEtiq.className = "gasto-etiquetas";
        
        if (gasto.etiquetas && gasto.etiquetas.length > 0) {
            for (let etiqueta of gasto.etiquetas) {
                let spanGastoEtiqs = document.createElement("span");
                spanGastoEtiqs.className = "gasto-etiquetas-etiqueta";
                spanGastoEtiqs.textContent = etiqueta;
                let borrarEtiquetaManager = new BorrarEtiquetasHandle(gasto, etiqueta)
                spanGastoEtiqs.addEventListener("click", borrarEtiquetaManager)
                divGastoEtiq.appendChild(spanGastoEtiqs);
            }
        

        let botonEditar = document.createElement('button');
        botonEditar.type = 'button';
        botonEditar.className = "gasto-editar";
        botonEditar.textContent = "Editar";

        let editManager = new EditarHandle(gasto);

        botonEditar.addEventListener("click", editManager.handleEvent.bind(editManager));

        let botonBorrar = document.createElement('button');
        botonBorrar.type = 'button';
        botonBorrar.className = "gasto-borrar";
        botonBorrar.textContent = "Borrar";

        let borrarManager = new BorrarHandle(gasto);

        botonBorrar.addEventListener("click", borrarManager.handleEvent.bind(borrarManager));
       
        let borrarEtiquetaManager = new BorrarEtiquetasHandle(gasto)

        divGasto.appendChild(divGastoDesc);
        divGasto.appendChild(divGastoFech);
        divGasto.appendChild(divGastoValor);
        divGasto.appendChild(divGastoEtiq);
        divGasto.appendChild(botonEditar);
        divGasto.appendChild(botonBorrar);

        contenedorGasto.appendChild(divGasto);
        
    }
    
}
function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    let contenedorGastosAgrupados = document.getElementById(idElemento);
    let divAgrupacion = document.createElement("div");
    let tituloH1 = document.createElement("h1");
    divAgrupacion.className = "agrupacion";
    tituloH1.textContent = "Gastos agrupados por " + periodo;
    divAgrupacion.appendChild(tituloH1);

        

        for (let [key, valor] of Object.entries(agrup)) {
            
                let divAgrupacionDato = document.createElement("div");
                divAgrupacionDato.className = "agrupacion-dato";

                let spanDatoClave = document.createElement("span");
                spanDatoClave.className = "agrupacion-dato-clave";
                spanDatoClave.textContent = key;

                let spanDatoValor = document.createElement("span");
                spanDatoValor.className = "agrupacion-dato-valor";
                spanDatoValor.textContent = valor;
                
                divAgrupacionDato.appendChild(spanDatoClave);
                divAgrupacionDato.appendChild(spanDatoValor);

                divAgrupacion.appendChild(divAgrupacionDato)

                contenedorGastosAgrupados.appendChild(divAgrupacion );
            }
            
            
        }
function repintar() {

    let presupuesto = gestionPresupuesto.mostrarPresupuesto();
    mostrarDatoEnId(presupuesto, 'presupuesto');

    let gastosTotales = gestionPresupuesto.calcularTotalGastos();
    mostrarDatoEnId(gastosTotales, 'gastos-totales');

    let balance = gestionPresupuesto.calcularBalance();
    mostrarDatoEnId(balance, 'balance-total');

    let listadogastoscompleto = document.getElementById('listado-gastos-completo');
    listadogastoscompleto.innerHTML = '';

    let listagastos = gestionPresupuesto.listarGastos();
    console.log(listagastos);
    listagastos.forEach(gasto => { 
        mostrarGastoWeb('listado-gastos-completo', gasto);
        
    });


}

function actualizarPresupuestoWeb() {
  let presupuestoNuevo = prompt("Introduce el presupuesto nuevo:");
  
  presupuestoNuevo = parseFloat(presupuestoNuevo);
  gestionPresupuesto.actualizarPresupuesto(presupuestoNuevo);
  repintar();


}

function nuevoGastoWeb() {
    let descripcion = prompt("Descripcion del gasto:");
    let valor = prompt("Valor del gasto en Euros:");
    let fecha = prompt("Fecha del gasto ( yyyy-mm-dd ):");
    let etiquetas = prompt("Etiquetas de gasto:");

    valor = parseFloat(valor);
    let arrEtiquetas = etiquetas.split(',');

    let gastoNuevo = new gestionPresupuesto.CrearGasto(descripcion, valor, fecha, ...arrEtiquetas);
    gestionPresupuesto.anyadirGasto(gastoNuevo);
    
    repintar();

}

function EditarHandle(gasto) {

    
    this.gasto = gasto;

}

EditarHandle.prototype.handleEvent = function() {
    let descripcion = prompt("nuevo Descripcion del gasto:", this.gasto.descripcion);
    let valor = prompt("nuevo Valor del gasto en Euros:", this.gasto.valor);
    let fecha = prompt("nuevo Fecha del gasto ( yyyy-mm-dd ):", this.gasto.fecha);
    let etiquetas = prompt("nuevo Etiquetas de gasto:", this.gasto.etiquetas);

    valor = parseFloat(valor);
    let arrEtiquetas = etiquetas.split(',');

    this.gasto.actualizarValor(valor);
    this.gasto.actualizarDescripcion(descripcion);
    this.gasto.actualizarFecha(fecha);
    this.gasto.anyadirEtiquetas(arrEtiquetas)

        repintar();
    
    
}

function BorrarHandle(gasto) {
    this.gasto = gasto;
}
BorrarHandle.prototype.handleEvent = function() {
    gestionPresupuesto.borrarGasto(this.gasto.id);

    repintar();
}

function BorrarEtiquetasHandle(gasto, etiqueta) {
    this.gasto = gasto;
    this.etiqueta = etiqueta;
}
BorrarEtiquetasHandle.prototype.handleEvent = function() {
    this.gasto.borrarEtiquetas(this.etiqueta);

    repintar();

}

let botonActualizarPresupuesto = document.getElementById('actualizarpresupuesto');
botonActualizarPresupuesto.addEventListener("click", actualizarPresupuestoWeb);

let botonAnyadirGasto = document.getElementById('anyadirgasto');
botonAnyadirGasto.addEventListener("click", nuevoGastoWeb);


export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb
}