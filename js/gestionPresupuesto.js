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

function CrearGasto(descripcion, valor, fecha, etiquetas = []) {
    if (valor <= 0){
        valor = 0
    }

    if (Date.parse(fecha)){
        fecha = Date.parse(fecha);
    }
    else{
        fecha = Date.now();
    }
    let gasto = {
        descripcion: descripcion,
        valor: valor,
        fecha: fecha,
        etiquetas: etiquetas,

        mostrarGasto: function() {
            return "Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + " €";
            
        },
        actualizarDescripcion: function(nuevaDescripcion){
            this.descripcion = nuevaDescripcion;
        
        },
        actualizarValor: function(nuevoValor){
            if (nuevoValor >= 0){
                this.valor = nuevoValor;
            }
            else{
                console.error("El valor introducido no es valido.");
                return -1;
            }
        },
        anyadirEtiquetas: function() {

        }
    }

}

function anyadirGasto(gasto){
    gastos.id = idGasto;

    idGasto++;

    gastos.push(gasto);
}
function listarGastos(){
    return gastos;
}

function borrarGasto(gasto){
    gastos.pop(gasto.id)
}
function calcularBalance(){

}
function calcularTotalGastos(){

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
    calcularBalance
}
