import * as gestionPresupuesto from "./gestionPresupuesto.js";
function mostrarDatoEnId(valor, id) {
   const element = document.getElementById(id);
   element.textContent = valor;
}
function mostrarGastoWeb(idElemento, gasto) {
    let contenedorGasto = document.getElementById(idElemento);
    if (gasto) { 
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
                divGastoEtiq.appendChild(spanGastoEtiqs);
            }
        }
        divGasto.appendChild(divGastoDesc);
        divGasto.appendChild(divGastoFech);
        divGasto.appendChild(divGastoValor);
        divGasto.appendChild(divGastoEtiq);

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
    listagastos.forEach(gasto => { 

        mostrarDatoEnId(gasto, listadogastoscompleto);
    });


}

function actualizarPresupuestoWeb() {
  let presupuestoNuevo = prompt("Introduce el presupuesto nuevo:");

  presupuestoNuevo = parseFloat(presupuestoNuevo);
  gestionPresupuesto.actualizarPresupuesto(presupuestoNuevo);
  repintar();

}




export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb
}