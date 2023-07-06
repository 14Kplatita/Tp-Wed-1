
function accion(){ //para el menu responsive
				var ancla = document.getElementsByClassName('nav-enlace')
				for(var i = 0; i < ancla.length; i++){
					ancla[i].classList.toggle('desaparece')
				}
}


let captcha = new Array();

let activeCaptcha = []

function createCaptcha() {
  const activeCaptcha = document.getElementById("captcha");
  for (q = 0; q < 6; q++) {
    if (q % 2 == 0) {
      captcha[q] = String.fromCharCode(Math.floor(Math.random() * 26 + 65));
    } else {
      captcha[q] = Math.floor(Math.random() * 10 + 0);
    }
  }
  theCaptcha = captcha.join("");
  activeCaptcha.innerHTML = `${theCaptcha}`;
}

function validateCaptcha() {
  const errCaptcha = document.getElementById("errCaptcha");
  const reCaptcha = document.getElementById("reCaptcha");
  recaptcha = reCaptcha.value;
  let validateCaptcha = 0;
  for (var z = 0; z < 6; z++) {
    if (recaptcha.charAt(z) != captcha[z]) {
      validateCaptcha++;
      console.log(validateCaptcha)
    }
  }
  if (recaptcha == "") {
    errCaptcha.innerHTML = "El Captcha debe ser llenado";
  } else if (validateCaptcha > 0 || recaptcha.length > 6) {
    errCaptcha.innerHTML = "captcha no valido";
  } else {
    errCaptcha.innerHTML = "capcha Valido";
  }
}





async function obtenerDatos() {
    const url = 'https://636da50391576e19e32c746b.mockapi.io/usuarios';
    const tbody = document.querySelector("#tabla");
    tbody.innerHTML = "";
    try {
        let res = await fetch(url); // GET url
        let json = await res.json(); // texto json a objeto
        console.log(json);
        for (const usuario of json) {
			      let fila = tbody.insertRow();
            let nombre = usuario.nombre;
			      let apellido = usuario.apellido;
			      let email= usuario.email;
			      let password = usuario.password;
            let filaid = usuario.id;
            fila.innerHTML += `<tr id="${filaid}"><td>${filaid}</td><td>${nombre}</td><td>${apellido}</td><td>${email}</td><td>${password}</td></tr>`;
        }
    } catch (error) {
        console.log(error);
    }
   
}

obtenerDatos();


function delay(time){
  return new Promise(resolve => setTimeout(resolve, time));
  
}


async function esperar(){
  await delay(1000);
  obtenerDatos()
}


let contenedor = document.querySelector("#result");

function borrardatos(){
    let id = document.querySelector("#eliminar").value;
    if(id.length === 0) { 
    alert("Por favor ingrese el id del usuario a eliminar");
    return;
  }
  
  fetch("https://636da50391576e19e32c746b.mockapi.io/usuarios" + "/" + id, {
    "method": "DELETE",
    "mode": 'cors',
    "headers": { "Content-Type": "application/json" },
    "body": JSON.stringify()
  }).then(function(r){
    if(!r.ok){
      console.log("Error")
    }
    return r.json()
  })
  .then(function(json) {
    console.log(json);
  })
  .catch(function(e){
    console.log(e)
    
  })
  esperar()
}

document.getElementById("delete").addEventListener('click', borrardatos)




let baseURL = 'https://636da50391576e19e32c746b.mockapi.io/usuarios';


let contenedor1 = document.querySelector("#result");

function cambiar(){
  let id = document.querySelector("#ID").value;
  let name = document.querySelector("#NAME").value;
  let apellido = document.querySelector("#APELLIDO").value;
  let email = document.querySelector("#EMAIL").value;
  let password = document.querySelector("#PASSWORD").value;
  if( id.length === 0) { 
    alert("por favor indoque el ID del usuario");
    return;
  }
  let data = {
      "nombre": name,
      "apellido": apellido,
      "email": email,
      "password": password
  };
  fetch(baseURL + "/" + id, {
    "method": "PUT",
    "mode": 'cors',
    "headers": { "Content-Type": "application/json" },
    "body": JSON.stringify(data)
  }).then(function(r){
    if(!r.ok){
      console.log("Error")
    }
    return r.json()
  })
  .then(function(json) {
    console.log(json);
  })
  .catch(function(e){
    console.log(e)
  })
  esperar()
}

document.getElementById("cambiar").addEventListener('click', cambiar)




async function sendData(){
  let name = document.querySelector("#name").value;
  let apellido = document.querySelector("#apellido").value;
  let email = document.querySelector("#email").value;
  let password = document.querySelector("#password").value;
  let recaptcha = document.querySelector('#reCaptcha').value;
  let captcha = document.querySelector('#captcha').value;
  console.log(captcha)
  if( name.length === 0, apellido.length === 0, email.length === 0, password.length === 0, recaptcha.length === 0  ) { 
    alert("Por favor complete todos los campos");
    return;
  }else if (validateCaptcha > 0 || recaptcha.length > 6) {
    errCaptcha.innerHTML = "captcha no valido";
  }
  let usuario = {
      "nombre": name,
      "apellido": apellido,
      "email" : email,
      "password": password
  };

    try {
        let res = await fetch('https://636da50391576e19e32c746b.mockapi.io/usuarios', {
            "method": "POST",
            "headers": { "Content-type": "application/json" },
            "body": JSON.stringify(usuario)
        });
        let json = await res.json();

        console.log(usuario);
    } catch (error) {
        console.log(error);
    }
    
    esperar()
}

document.getElementById("registar").addEventListener('click', sendData)