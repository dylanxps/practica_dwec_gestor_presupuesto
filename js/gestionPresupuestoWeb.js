function mostrarDatoEnId(valor, id) {
    document.getElementById(id).innerHTML = valor;
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
        divGastoEtiq.className = "gasto-etiquetas-etiqueta";
        
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

        document.getElementById(idElemento).appendChild(divGasto);



        contenedorGasto.appendChild(divGasto);
        divGasto.appendChild(divGastoDesc, divGastoFech, divGastoValor, divGastoEtiq, spanGastoEtiqs);
        if (gasto.etiquetas.length > 0) {
            for (let i = 0; 0 < gasto.etiquetas.length; i++)
            {
                divGasto.appendChild(spanGastoEtiqs(gasto.etiquetas[i]));
            }
        }

    }
    
}
function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    
}




export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}