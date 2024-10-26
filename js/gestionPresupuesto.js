// TODO: Crear las funciones, objetos y variables indicadas en el enunciado
let presupuesto = 0;
let gastos = new Array();
let idGasto = 0;

// TODO: Variable global

// FUNCIONES GLOBALES
function actualizarPresupuesto(nuevoPresupuesto) {
    
    if (typeof nuevoPresupuesto == 'number' && nuevoPresupuesto >= 0 ) {
        presupuesto = nuevoPresupuesto;
        return presupuesto;

    }
    else{
        console.error("El valor introducido no es valido");
        return -1;
    }
}

function mostrarPresupuesto() {
    return "Tu presupuesto actual es de " + presupuesto + " €";
    
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    this.descripcion = descripcion;
    if (typeof valor !== 'number' || valor < 0){
        valor = 0;
    } 
    this.valor = valor;
    
    if (Date.parse(fecha)) {
        fecha = Date.parse(fecha);
    }
    else {
        fecha = Date.now();
    }
    this.fecha = fecha;
    if (etiquetas.length === 0) {
        this.etiquetas = [];
    } else {
        this.etiquetas = etiquetas;
    }
    
    this.mostrarGasto = function() {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    }

    this.actualizarDescripcion = function(nuevaDescripcion){
        this.descripcion = nuevaDescripcion;
        
    }

    this.actualizarValor = function(nuevoValor){
        if (nuevoValor > 0) {
            this.valor = nuevoValor;
            }
        else {
            console.error("El valor introducido no es valido.");
            return -1;
            }
        }

        this.mostrarGastoCompleto = function() {
            let etiquetasFormat = "";
            for (let i = 0; i < this.etiquetas.length; i++) {
                etiquetasFormat += `- ${this.etiquetas[i]}\n`; 
            }
        
            return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${new Date(this.fecha).toLocaleString()}\nEtiquetas:\n${etiquetasFormat}`;
            
        }

        this.actualizarFecha = function(fechaNuevo) {
            if (Date.parse(fechaNuevo)) {
                this.fecha = Date.parse(fechaNuevo);
            } 
            
        }

        this.anyadirEtiquetas = function(...etiquetasNuevas) {
            for (let i = 0; i < etiquetasNuevas.length; i++ ) {
                if (!this.etiquetas.includes(etiquetasNuevas[i])){
                    this.etiquetas.push(etiquetasNuevas[i]);
                        
                     
                }
            }
        }

        this.borrarEtiquetas = function(...etiquetasBorrado) {
            for (let i = 0; i < etiquetasBorrado.length; i++ ) {
                const index = this.etiquetas.indexOf(etiquetasBorrado[i]);
                if (index !== -1) {
                    this.etiquetas.splice(index, 1);
                        
                     
                }
            }
        }
        this.obtenerPeriodoAgrupacion = function(periodo) {
            if (periodo === "mes") {
                return this.fecha.slice(0, 7)
            }

            if (periodo === "dia") {
                return this.fecha;
            }

            if (periodo === "año") {
                return this.fecha.slice(0, 4)
            }
        }
    
    
    
    }

function anyadirGasto(gasto){
    gasto.id = idGasto;

    idGasto++;

    gastos.push(gasto);
}
function listarGastos(){
    return gastos;
}

function borrarGasto(id){
    const index = gastos.findIndex(gasto => gasto.id === id);

    if (index !== -1) {
        gastos.splice(index, 1);
    }
}
function calcularTotalGastos(){
    let TotalGastos= 0;
    for (let i = 0; i < gastos.length; i++ ) {
        TotalGastos += gastos[i].valor;
    }
    return TotalGastos;
}

function calcularBalance() {
    return presupuesto - calcularTotalGastos();
    
}

function filtrarGastos(filtros) {
    return gastos.filter(function (gasto) {
        let encontrados = true

        if (filtros.fechaDesde) {

            const fechaDesde = Date.parse(filtros.fechaDesde);
            const fechaGasto = Date.parse(gasto.fecha);
            if (fechaDesde > fechaGasto) {
                encontrados = false;
            }
        }


        
        return encontrados;
    })
}   
            
        
    

function agruparGastos() {

}




// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance,
    filtrarGastos,
    agruparGastos
}
