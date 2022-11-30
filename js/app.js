//////////////////////////////////////////////////////////////////////////////////////////////
// Sistema de reserva de choperas con cupos por calendario y stock (de choperas y cervezas)
//////////////////////////////////////////////////////////////////////////////////////////////

const finesDeSemana = {
  finSemana1: 0, finSemana2: 1, finSemana3: 2, finSemana4: 1
}

//Usuario y LogIn
class Usuario {
  constructor(nombre, clave, choperasReservadas) {
    this.nombre = nombre;
    this.clave = clave;
    this.choperasReservadas = parseInt(choperasReservadas);
    this.reservas = []
  }
  agregarReserva(choperas, reserva) {
      this.choperasReservadas += choperas;
      this.reservas.push(reserva);
  }
}

function iniciarSesion(nombre, clave){

  usuarioLogIn = usuarios.find((usuario) => usuario.nombre === nombre && usuario.clave === clave );

  if(usuarioLogIn) {
    localStorage.setItem('usuario', JSON.stringify(usuarioLogIn));
    let mensajeBienvenida = document.getElementById('bienvenida');
    let nombreUsuario = document.getElementById('nombreUsuario');
    mensajeBienvenida.className = '';
    nombreUsuario.innerText = nombre;

    formularioIniciarSesion.className = 'hidden';
    formularioRegistrarse.className = 'hidden';
    menuDeReservas.className = 'reservas';
} else {
    alert(`El nombre ${nombre} no esta registrado.`);
  }
}

function registrarse(nombre, clave) {
const choperasReservadas = 0;
const newUser = new Usuario(nombre, clave, choperasReservadas);
usuarios.push(newUser);
localStorage.setItem('usuarios', JSON.stringify(usuarios));
iniciarSesion(nombre, clave);
}

//Funciones del sistema de reserva
function consultarReserva() {
  if ((usuarioLogIn.choperasReservadas > 1) && (usuarioLogIn.reservas.length > 1)){
    alert(`Usted actualmente tiene ${usuarioLogIn.choperasReservadas} choperas reservadas para los fines de semana ${usuarioLogIn.reservas}`);
} else if (usuarioLogIn.choperasReservadas > 1) {
    alert(`Usted actualmente tiene ${usuarioLogIn.choperasReservadas} choperas reservadas para el fin de semana ${usuarioLogIn.reservas}`);
} else if (usuarioLogIn.choperasReservadas > 0) {
  alert(`Usted actualmente tiene ${usuarioLogIn.choperasReservadas} chopera reservada para el fin de semana ${usuarioLogIn.reservas}`);
} else {
  alert(`Usted no tiene choperas reservadas.`);
}
  }
  

function consultarDisponibilidad() {
  alert(`Actualmente contamos con la siguiente disponibilidad:\n\nFin de semana 1: ${finesDeSemana.finSemana1} Choperas disponibles\nFin de semana 2: ${finesDeSemana.finSemana2} Choperas disponibles\nFin de semana 3: ${finesDeSemana.finSemana3} Choperas disponibles\nFin de semana 4: ${finesDeSemana.finSemana4} Choperas disponibles`)
}

function validarReserva(finSemanaAReservar, cantidadAReservar){
  if((finSemanaAReservar == '1' && cantidadAReservar > finesDeSemana.finSemana1) || (finSemanaAReservar == '2' && cantidadAReservar > finesDeSemana.finSemana2) || (finSemanaAReservar == '3' && cantidadAReservar > finesDeSemana.finSemana3) || (finSemanaAReservar == '4' && cantidadAReservar > finesDeSemana.finSemana4)){
      alert(`No hay suficientes choperas disponibles el fin de semana ${finSemanaAReservar}`);
      return false;
  } else if (finSemanaAReservar == '1'){
      finesDeSemana.finSemana1 -= cantidadAReservar;
      usuarioLogIn.agregarReserva(cantidadAReservar, finSemanaAReservar);
      return true;
  } else if (finSemanaAReservar == '2'){
      finesDeSemana.finSemana2 -= cantidadAReservar;
      usuarioLogIn.agregarReserva(cantidadAReservar, finSemanaAReservar);
      return true;
  } else if (finSemanaAReservar == '3'){
      finesDeSemana.finSemana3 -= cantidadAReservar;
      usuarioLogIn.agregarReserva(cantidadAReservar, finSemanaAReservar);
      return true;
  } else if (finSemanaAReservar == '4'){
      finesDeSemana.finSemana4 -= cantidadAReservar;
      usuarioLogIn.agregarReserva(cantidadAReservar, finSemanaAReservar);
              return true;
  }

}

const reservarChopera = function() {
  let finSemanaAReservar = parseInt(prompt(`Para cual fin de semana necesitas la chopera? (Ingresa del 1 al 4)\n\n Te recuerdo nuestra agenda: \n\nFin de semana 1: ${finesDeSemana.finSemana1} Choperas disponibles\nFin de semana 2: ${finesDeSemana.finSemana2} Choperas disponibles\nFin de semana 3: ${finesDeSemana.finSemana3} Choperas disponibles\nFin de semana 4: ${finesDeSemana.finSemana4} Choperas disponibles\n`));
  if (finSemanaAReservar >= 1 && finSemanaAReservar <= 4) {
          let cantidadAReservar = parseInt(prompt("Ingresa cuantas choperas necesitas:"));
          if (cantidadAReservar >= 1 && cantidadAReservar <= 2){
              let resultado = validarReserva (finSemanaAReservar, cantidadAReservar);
              if (resultado) {
                  alert(`La reserva fue exitosa, haz reservado ${cantidadAReservar} chopera/s para el fin de semana ${finSemanaAReservar}`)
              }
          } else {
              alert('Ingrese un valor entre 1 y 2')
          }
           
      } else {
              alert('Ingrese un valor entre 1 y 4')
          }
}

function seleccionarOpcionMenu(opcion){
  switch (opcion) {
      case '1':
          consultarDisponibilidad();
          break;
      case '2':
          consultarReserva();
          break;
      case '3':
          reservarChopera();
          break;
      case '4':
           alert('Adios, esperamos volver a verte por aqui.')
           localStorage.removeItem('usuario');
           formularioIniciarSesion.className = 'contact_form';
           formularioRegistrarse.className = 'contact_form';
           menuDeReservas.className = 'hidden';
           let mensajeBienvenida = document.getElementById('bienvenida');
           mensajeBienvenida.className = 'hidden';
          break;
      default:
          alert('No existe la opcion ingresada, intente de nuevo.')
          break;
  }
}

function menuDeOpciones() {
do {
  opcionMenu= prompt("Bienvenido a nuestro servicio de reserva de choperas. \n 1. Consultar disponibilidad. \n 2. Consultar reservas. \n 3. Reservar chopera. \n 4. Salir")
  seleccionarOpcionMenu(opcionMenu);
} while(opcionMenu !=='4');
}

let formularioIniciarSesion = document.getElementById('iniciarSesion');
let formularioRegistrarse = document.getElementById('registrarse');
let menuDeReservas = document.getElementById('reservas');

let opcionMenu = 0;
let opcionInicio = 0;
let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
let usuarioLogIn = JSON.parse(localStorage.getItem('usuario'));

if(usuarioLogIn) {
  let mensajeBienvenida = document.getElementById('bienvenida');
  let nombreUsuario = document.getElementById('nombreUsuario');

  mensajeBienvenida.className = '';
  nombreUsuario.innerText = usuarioLogIn.nombre;
  menuDeReservas.className = 'reservas';
  formularioIniciarSesion.className = 'hidden';
  formularioRegistrarse.className = 'hidden';
} else {
  formularioIniciarSesion.className = 'contact_form';
  formularioRegistrarse.className = 'contact_form';
}
let botones = document.querySelectorAll('.btn-sistema');
for (const boton of botones) {
boton.addEventListener('click', (e) => {
  let dataId = e.target.getAttribute('data-id');
  seleccionarOpcionMenu(dataId);
});
}


formularioIniciarSesion.addEventListener('submit', (e) => {
  e.preventDefault();
  let usuario = document.getElementById('nombre').value;
  let clave = document.getElementById('clave').value;

  if(usuario != '' && clave != '') {
    iniciarSesion(usuario, clave);
  } else {
    alert('Todos los datos son obligatorios');
  }
});

formularioRegistrarse.addEventListener('submit', (e) => {
  e.preventDefault();
  let usuario = document.getElementById('usuarioRegistrado').value;
  let clave = document.getElementById('claveRegistrada').value;
  
  if(usuario != '' && clave != '') {
    registrarse(usuario, clave);
  } else {
    alert('Todos los datos son obligatorios');
  }
});