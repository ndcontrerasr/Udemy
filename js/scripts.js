// querySelector
const heading = document.querySelector('.header__texto h2'); // 0 o 1 elementos
heading.textContent = "Blog de cafe con sabor a miel";
//console.log(heading);

//querySelectorAll
const enlaces = document.querySelectorAll('.navegacion a');
//console.log(enlaces);
enlaces[1].textContent = 'Conocenos';
enlaces[1].classList.add('nueva-clase');
//enlaces[1].classList.remove('navegacion__enlace');

//getElementById

const heading2 = 
document.getElementById('heading');
//console.log(heading2);

//generar un nuevo enlace
const nuevoEnlace = document.createElement('A');
// Agrerar el href
nuevoEnlace.href = 'https://google.com';

// Agregar el Text
nuevoEnlace.textContent = 'Google';

// Agregar la class
nuevoEnlace.classList.add('navegacion__enlace');

//Agregarlo al documento
const navegacion = document.querySelector(".navegacion");
navegacion.appendChild(nuevoEnlace);

//console.log(nuevoEnlace);

// Ecentos-----------------------------------------------------

// console.log(1);

// window.addEventListener('load', function() { //load espera a que el JS y los archivos que dependen del HTML esten listos
// 	console.log(2);

// })

// window.onload = function() {
// 	console.log(3);
// }

// document.addEventListener('DOMContentLoaded', function(){ //solo espera por el HTML, pero no espera CDD o imagenes
// 	console.log(4);
// });

// console.log(5)

// window.onscroll = function() {
// 	console.log('scrolling...');
// }




// Eventos de los Inputs y Textareas
const datos = {
	Nombre: '',
	email: '',
	mensaje: ''
}

const nombre = document.querySelector('#Nombre');
const email = document.querySelector('#email');
const mensaje = document.querySelector('#mensaje');
const formulario = document.querySelector('.formulario');
// const btnEnviar = document.querySelector('.boton--uno');

nombre.addEventListener('input', leerTexto);
email.addEventListener('input', leerTexto);
mensaje.addEventListener('input', leerTexto);

// Seleccionar elementos y asociarles un evento

// btnEnviar.addEventListener('click', function(evento) {
// 	//console.log(evento);
// 	evento.preventDefault();

// 	//validar un formulario
	
// 	//console.log('enviar formulario');
// 	console.log(datos);
// });

//evento de submit

formulario.addEventListener('submit', function(evento){
	evento.preventDefault();

	//validar el formulario
	const { Nombre, email, mensaje} = datos;
	if (Nombre == '' && email == '' && mensaje == '') {
		window.alert('Todos los campos son obligatorios');
		return;
	}
	else if(Nombre == ''){
		window.alert('Campo del Nombre esta vacio');
		return;
	}
	else if(email == ''){
		window.alert('Campo de Correo vacio');
		return;
	}
	else if(mensaje == ''){
		window.alert('Campo de Mensaje esta vacio');
		return;
	}
	else{
		window.alert('Mensaje Enviado');
		limpiar();
	}
	//console.log(`Nombre: ${Nombre}\n Email: ${email}\n Mensaje: ${mensaje}`);

	//enviar el formulario

	console.log(true);

});

function limpiar() {
    document.getElementById("Nombre").value = "";
    document.getElementById("email").value = "";
    document.getElementById("mensaje").value = "";
}

function leerTexto(evento) {
	datos[evento.target.id] = evento.target.value;
}

