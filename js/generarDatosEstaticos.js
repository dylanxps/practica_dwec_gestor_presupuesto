import * as gestionPresupuesto from "./gestionPresupuesto.js";
import * as gestionPresupuestoWeb from './gestionPresupuestoWeb.js';

gestionPresupuesto.actualizarPresupuesto(1500);
let mensajePresupuesto = gestionPresupuesto.mostrarPresupuesto();
gestionPresupuestoWeb.mostrarDatoEnId(mensajePresupuesto, 'presupuesto');

let gastos = [
    new gestionPresupuesto.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida"),
    new gestionPresupuesto.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida"),
    new gestionPresupuesto.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte"),
    new gestionPresupuesto.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina"),
    new gestionPresupuesto.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros"),
    new gestionPresupuesto.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros")
]

gastos.forEach(gasto => gestionPresupuesto.anyadirGasto(gasto));

let mensajeTotalGastos = gestionPresupuesto.calcularTotalGastos();
gestionPresupuestoWeb.mostrarDatoEnId(mensajeTotalGastos, 'gastos-totales');

let mensajeBalance = gestionPresupuesto.calcularBalance();
gestionPresupuestoWeb.mostrarDatoEnId(mensajeBalance, 'balance-total');

let listaGastos = gestionPresupuesto.listarGastos();
listaGastos.forEach(gasto => {gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-completo', gasto);

});
const filtrosSep21 = {
    fechaDesde: '2021-09-01',
    fechaHasta: '2021-09-30'
}
let listaGastosSep21 = gestionPresupuesto.filtrarGastos(filtrosSep21);
listaGastosSep21.forEach(gasto => { gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-1', gasto);

})

const filtroMas50Eur = {
    valorMinimo: "50"
}
const listaGastosMas50Eur = gestionPresupuesto.filtrarGastos(filtroMas50Eur);
listaGastosMas50Eur.forEach(gasto => { gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-2', gasto);

});

const filtroMas200EurSeguros = {
    valorMinimo: "200",
    etiquetas: 'seguros'
}
const listaGastosMas200EurSeguros = gestionPresupuesto.filtrarGastos(filtroMas200EurSeguros)
listaGastosMas200EurSeguros.forEach(gasto => { gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-3', gasto);

});

let filtroMenos50ComidaOTransporte = {
    valorMaximo: "50",
    etiquetas: ['comida', 'transporte']

}
let listaMenos50ComidaOTransporte = gestionPresupuesto.filtrarGastos(filtroMenos50ComidaOTransporte)
listaMenos50ComidaOTransporte.forEach(gasto => {gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-4', gasto);

});

let gastoDia = gestionPresupuesto.agruparGastos('dia');
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb('agrupacion-dia', gastoDia, 'día');

let gastoMes = gestionPresupuesto.agruparGastos('mes');
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb('agrupacion-mes', gastoMes, 'mes');

let gastoAnyo = gestionPresupuesto.agruparGastos('anyo');
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb('agrupacion-anyo', gastoAnyo, 'año');









