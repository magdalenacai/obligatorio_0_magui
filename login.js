//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

});

function login (){
    var usuario = document.getElementById("usuario").value;
    var contraseña = document.getElementById("contraseña").value;

    if (usuario.trim() === "" ){
        alert(
            "Usuario incorrecto"
        );
    }
    else{

        if(contraseña.trim()===""){

            alert(
                " Contraseña incorrecta"
            );

        }

        else{
            window.location.href="index.html"
        }
      
    }
   
  
}