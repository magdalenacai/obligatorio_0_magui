const Orden_Ascendente = "P.Acendente";
const Orden_Descendente = "P.Decendente";
const Orden_Relevancia = "Relevancia";
var currentProductArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;
var categoriesArray = [];

//Función para ordenar los Producto
function OrdenarProductos(criteria, array){
    let result = [];
    if (criteria === Orden_Ascendente)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === Orden_Descendente){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === Orden_Relevancia){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

//Función para mostrar los Producto
function MostrarProductos(array){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentProductArray.length; i++){
        let category = currentProductArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(category.cost) >= minCount)) &&
        ((maxCount == undefined) || (maxCount != undefined && parseInt(category.cost) <= maxCount))){

        htmlContentToAppend += `
        <div class="col-md-4">
            <a href="product-info.html" class="list-group-item list-group-item-action">
                <img src="` + category.imgSrc + `" alt="` + category.description + `" class="img-thumbnail">
                <div class="d-flex w-100 justify-content-between">
                    <h4 class="mb-1"> <br> `+ category.name +`</h4>
                    <small class="text-muted">` + category.soldCount + ` Vendidos</small>
                </div>
                <p class="mb-1">Precio: `+ category.currency +` `+ category.cost+ ` </p>
                <p class="mb-1">` + category.description + `</p>
            </a>
        </div>
        `
    }
        document.getElementById("products").innerHTML = htmlContentToAppend;

    }
    
}

//Función para mostrar ordenadas los Productos
function OrdenoYMuestro(sortCriteria, productArray){
    currentSortCriteria = sortCriteria;

    if(productArray != undefined){
        currentProductArray = productArray;
    }

    currentProductArray = OrdenarProductos(currentSortCriteria, currentProductArray);

    MostrarProductos();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            OrdenoYMuestro(Orden_Ascendente, resultObj.data);
        }
    });

    document.getElementById("OrdenAscendente").addEventListener("click", function(){
        OrdenoYMuestro(Orden_Ascendente);
    });

    document.getElementById("OrdenDescendente").addEventListener("click", function(){
        OrdenoYMuestro(Orden_Descendente);
    });

    document.getElementById("OrdenRelevancia").addEventListener("click", function(){
        OrdenoYMuestro(Orden_Relevancia);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        MostrarProductos();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        MostrarProductos();
    });
});