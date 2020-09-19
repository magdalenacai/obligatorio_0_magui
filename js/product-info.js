var product = {};

//funcion para las imagenes en Carusel
function mostrarCarusel(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        if(i==0){
            htmlContentToAppend +=` 
            <div class="carousel-item active">
            <img src="` + imageSrc + `"class="d-block w-100" alt="...">
            </div>`
        }

        else{
            htmlContentToAppend +=` 
            <div class="carousel-item">
            <img src="` + imageSrc + `"class="d-block w-100" alt="...">
            </div>`
        }
        
        document.getElementById("carusel").innerHTML = htmlContentToAppend;
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;

            let productNameHTML  = document.getElementById("nombre");
            let productDescriptionHTML = document.getElementById("descripcion");
            let productCountHTML = document.getElementById("vendidos");
            let productCurrencyHTML = document.getElementById("currency")
            let productCostHTML = document.getElementById("precio")
            let productCategoryHTML = document.getElementById("categoria")
        
            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productCountHTML.innerHTML = product.soldCount;
            productCurrencyHTML.innerHTML = product.currency;
            productCostHTML.innerHTML = product.cost;
            productCategoryHTML.innerHTML = product.category;
            
           

            //Muestro las imagenes en forma de Carusel
            mostrarCarusel(product.images);

            //Productos Relacionados
            getJSONData(PRODUCTS_URL).then(function(resultObj){
                if (resultObj.status === "ok"){ 
                    let products = resultObj.data;
        
                    let html = "";
                        product.relatedProducts.forEach(function(productIndex) {
                        let product = products[productIndex];
                        html += `
                        <div class="card" style= "width: 200px; , height: 30px;">
                            <img src="${product.imgSrc}" class="card-img-top">
                            <div class= "card-body">
                                <h5 class="card-title">${product.name}</h5>
                                <p class="card-text">${product.description}</p>
                                <a href="category-info.html" class="btn btn-link">Ver</a>
                            </div>
                        </div>
                        `
                        document.getElementById("productosRelacionados").innerHTML = html;
                        });
                    }
                });
            }
        });

    });

    //Muestro los Comentraios
    function mostrarComentarios(array) {
        let htmlContentToAppend = "";
        for (let i = 0; i < array.length; i++) {
            let comentrarios = array[i];
            let estrellas = "";
            for (let i = 1; i <= comentrarios.score; i++) {
                estrellas += "<span class='fa fa-star checked'></span>"
            }
            for (let i = comentrarios.score + 1; i <= 5; i++) {
                estrellas += "<span class='fa fa-star'></span>"
            }
            htmlContentToAppend += `<div class="mt-2"><strong>Calificación:</strong> ${estrellas}</div>
            <p class="mt-1 mb-2">${comentrarios.description}</p>
            <div><h6 class="font-weight-bold">${comentrarios.user}</h6>
            <p>Publicado: ${comentrarios.dateTime}</p></div>`
            document.getElementById("comentrarios").innerHTML = htmlContentToAppend;
        }
    }
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            comentrarios = resultObj.data;
            mostrarComentarios(comentrarios);
        }
    })
    //Finaliza el muestreo de los Comentraios
  