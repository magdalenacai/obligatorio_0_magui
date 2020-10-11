valorPorcentaje = 0.15;

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok")
            articulo = resultObj.data
            mostrarArticulos();
            actualizar();
    });



    function mostrarArticulos() {

        for (i = 0; i < articulo.articles.length; i++) {

            articulo.articles[i].id = "id" + i;

            idSubtotal = "subtotalPrimero" + [i];
            articleHTML = document.getElementById("carrito");

            articleHTML.innerHTML +=
                `<div class"container">
            <div class"row">
            <tr>
            <th scope="row"><img src="`+ articulo.articles[i].src +`" alt="..." class="img-thumbnail" style="max-width: 150px;"></th>
        <td>`+ articulo.articles[i].name + `</td>
        <td>`+ articulo.articles[i].currency + " " + articulo.articles[i].unitCost + `</td>   
        <td><input id="`+ articulo.articles[i].id + `"type="number" min="1" style="width:60px" value="` + articulo.articles[i].count + `" onchange="actualizar()"></input></td>
        <td id="`+ idSubtotal + `"></td>
            </tr>
            </div>
            </div>`
        }
    }
})


function actualizar() {

    for (i = 0; i < articulo.articles.length; i++) {

        articulo.articles[i].id = "id" + i;

        idSubtotal = "subtotalPrimero" + [i];

        if (articulo.articles[i].currency == 'UYU') {
            unitCost = parseInt(articulo.articles[i].unitCost / 40)
        } else {
            unitCost = parseInt(articulo.articles[i].unitCost)
        }

        cantidad = document.getElementById(articulo.articles[i].id).value;

        sub = cantidad * unitCost;

        document.getElementById(idSubtotal).innerHTML = `<b>` + "USD" + ` ` + sub + `<b>`;

        document.getElementById("subtotalSegundo").innerHTML = `<span class="text-muted"><b>` + "USD" + ` ` + sub + `<b></span>`

        calcEnvio = sub * valorPorcentaje;
        document.getElementById("costoEnvio").innerHTML = `<span class="text-muted"><b>` + "USD" + ` ` + parseInt(calcEnvio) + `<b></span>`;

        total = sub + calcEnvio;
        document.getElementById("total").innerHTML = `<span class="text-muted"><b>` + "USD" + ` ` + total + `<b></span>`;

    }
}

document.getElementById("envioPremium").addEventListener("change", function () {
    valorPorcentaje = 0.15;
    actualizar();

});

document.getElementById("envioExpress").addEventListener("change", function () {
    valorPorcentaje = 0.07;
    actualizar();
});

document.getElementById("envioStandard").addEventListener("change", function () {
    valorPorcentaje = 0.05;
    actualizar();
});


document.getElementById("total").addEventListener("change", function () {
  actualizar();
})





