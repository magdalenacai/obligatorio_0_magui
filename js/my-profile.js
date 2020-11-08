const userName = document.getElementById("userName");
const userSurname = document.getElementById("userSurname");
const userAge = document.getElementById("userAge");
const userEmail = document.getElementById("userEmail");
const userPhone = document.getElementById("userPhone");




function guardarDatos() {
  
    let userDataObj = {
        name: userName.value,
        surname: userSurname.value,
        age: userAge.value,
        email: userEmail.value,
        phone: userPhone.value,
    };
    
    let userDataJSON = JSON.stringify(userDataObj);

    
    localStorage.setItem("userData", userDataJSON);

}


function mostrarLocalDatos() {
    
    let userDataParse = JSON.parse(localStorage.getItem("userData"));

    
    document.getElementById("htmlUserName").innerHTML += userDataParse.name
    document.getElementById("htmlUserSurname").innerHTML += userDataParse.surname
    document.getElementById("htmlUserAge").innerHTML += userDataParse.age
    document.getElementById("htmlUserEmail").innerHTML += userDataParse.email
    document.getElementById("htmlUserPhone").innerHTML += userDataParse.phone


}

function mostrarDatos() {
    guardarDatos();
    mostrarLocalDatos();
    window.location.reload();
}

document.addEventListener("DOMContentLoaded", function(e) {
    mostrarLocalDatos();
});