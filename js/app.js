//////////////////////////////////////////////////////////////////////////////////////////////
// Sistema de reserva de choperas con cupos por calendario y stock (de choperas y cervezas)
//////////////////////////////////////////////////////////////////////////////////////////////

const finesDeSemana = {
  finSemana1: 3, finSemana2: 5, finSemana3: 7, finSemana4: 8
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
    alert(`El usuario "${nombre}" no esta registrado o la contraseña es incorrecta`);
  }
}

//Registro
function registrarse(nombre, clave) {
  let usuario = document.getElementById('usuarioRegistrado').value;
  let indexUsuarioRegistrado = usuarios.findIndex(el => el.nombre == usuario);
  if (indexUsuarioRegistrado == -1) {
 const choperasReservadas = 0;
  const newUser = new Usuario(nombre, clave, choperasReservadas);
  usuarios.push(newUser);
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
  iniciarSesion(nombre, clave);
  } else {
    alert(`El nombre ${nombre} ya está registrado.`);
  }
 
}

//Funciones del sistema de reserva
function consultarReserva() {
  let nombre = JSON.parse(localStorage.getItem('usuario')).nombre
  let clave = JSON.parse(localStorage.getItem('usuario')).clave
  let choperasReservadas = JSON.parse(localStorage.getItem('usuario')).choperasReservadas
  

  const usuarioLoged = new Usuario(nombre, clave, choperasReservadas);

  if ((usuarioLoged.choperasReservadas > 1) && (usuarioLoged.reservas.length > 1)){
    alert(`Usted actualmente tiene ${usuarioLoged.choperasReservadas} choperas reservadas para los fines de semana ${usuarioLoged.reservas}`);
} else if (usuarioLoged.choperasReservadas > 1) {
    alert(`Usted actualmente tiene ${usuarioLoged.choperasReservadas} choperas reservadas para el fin de semana ${usuarioLoged.reservas}`);
} else if (usuarioLoged.choperasReservadas > 0) {
  alert(`Usted actualmente tiene ${usuarioLoged.choperasReservadas} chopera reservada para el fin de semana ${usuarioLoged.reservas}`);
} else {
  alert(`Usted no tiene choperas reservadas.`);
}
  }
  

function consultarDisponibilidad() {
  alert(`Actualmente contamos con la siguiente disponibilidad:\n\nFin de semana 1: ${finesDeSemana.finSemana1} Choperas disponibles\nFin de semana 2: ${finesDeSemana.finSemana2} Choperas disponibles\nFin de semana 3: ${finesDeSemana.finSemana3} Choperas disponibles\nFin de semana 4: ${finesDeSemana.finSemana4} Choperas disponibles`)
}

function validarReserva(finSemanaAReservar, cantidadAReservar){
  let nombre = JSON.parse(localStorage.getItem('usuario')).nombre
  let clave = JSON.parse(localStorage.getItem('usuario')).clave
  let choperasReservadas = JSON.parse(localStorage.getItem('usuario')).choperasReservadas
  

  const usuarioLoged = new Usuario(nombre, clave, choperasReservadas);

  console.log(usuarioLoged)
  if((finSemanaAReservar == '1' && cantidadAReservar > finesDeSemana.finSemana1) || (finSemanaAReservar == '2' && cantidadAReservar > finesDeSemana.finSemana2) || (finSemanaAReservar == '3' && cantidadAReservar > finesDeSemana.finSemana3) || (finSemanaAReservar == '4' && cantidadAReservar > finesDeSemana.finSemana4)){
      alert(`No hay suficientes choperas disponibles el fin de semana ${finSemanaAReservar}`);
      return false;
  } else if (finSemanaAReservar == '1'){
      finesDeSemana.finSemana1 -= cantidadAReservar;
      usuarioLoged.agregarReserva(cantidadAReservar, finSemanaAReservar);
      localStorage.setItem('usuario', JSON.stringify(usuarioLoged));
      return true;
  } else if (finSemanaAReservar == '2'){
      finesDeSemana.finSemana2 -= cantidadAReservar;
      usuarioLoged.agregarReserva(cantidadAReservar, finSemanaAReservar);
      localStorage.setItem('usuario', JSON.stringify(usuarioLoged));
      
      return true;
  } else if (finSemanaAReservar == '3'){
      finesDeSemana.finSemana3 -= cantidadAReservar;
      usuarioLoged.agregarReserva(cantidadAReservar, finSemanaAReservar);
      localStorage.setItem('usuario', JSON.stringify(usuarioLoged));
      return true;
  } else if (finSemanaAReservar == '4'){
      finesDeSemana.finSemana4 -= cantidadAReservar;
      usuarioLoged.agregarReserva(cantidadAReservar, finSemanaAReservar);
      localStorage.setItem('usuario', JSON.stringify(usuarioLoged));
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
                  alert(`La reserva fue exitosa, haz reservado ${cantidadAReservar} chopera/s para el fin de semana ${finSemanaAReservar}`);
                  let indexUsuarioLoged = usuarios.findIndex(el => el.nombre == usuarioLogIn.nombre);
                  usuarios[indexUsuarioLoged].choperasReservadas = JSON.parse(localStorage.getItem('usuario')).choperasReservadas;
                  localStorage.setItem('usuarios', JSON.stringify(usuarios));
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
let usuarioLoged = JSON.parse(localStorage.getItem('usuario'));

if(usuarioLoged) {
  let mensajeBienvenida = document.getElementById('bienvenida');
  let nombreUsuario = document.getElementById('nombreUsuario');

  mensajeBienvenida.className = '';
  nombreUsuario.innerText = usuarioLoged.nombre;
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