//////////////////////////////////////////////////////////////////////////////////////////////
// Sistema de reserva de choperas con cupos por calendario y stock (de choperas y cervezas)
//////////////////////////////////////////////////////////////////////////////////////////////

let formularioIniciarSesion = document.getElementById('iniciarSesion');
let formularioRegistrarse = document.getElementById('registrarse');
let formularioReserva = document.getElementById('formReserva');
let menuDeReservas = document.getElementById('reservas');
let mensajeBienvenida = document.getElementById('bienvenida');
let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
let usuarioLoged = JSON.parse(localStorage.getItem('usuario'));
  
const finesDeSemana = {
  finSemana1: 0, finSemana2: 2, finSemana3: 2, finSemana4: 1
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

  usuarioLogIn = usuarioLoged = usuarios.find((usuario) => usuario.nombre === nombre && usuario.clave === clave );
  if(usuarioLogIn) {
    localStorage.setItem('usuario', JSON.stringify(usuarioLogIn));
    let nombreUsuario = document.getElementById('nombreUsuario');
    mensajeBienvenida.className = '';
    
    nombreUsuario.innerText = nombre;

    formularioIniciarSesion.className = 'hidden';
    formularioRegistrarse.className = 'hidden';
    menuDeReservas.className = 'reservas';
    let mensajeReservas = `Hola ${usuarioLogIn.nombre}, bienvenido al sistema de reserva de choperas de Bisbier!`;
  
    mostrarMsjReservas(mensajeReservas)
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
  usuarioLoged = JSON.parse(localStorage.getItem('usuario'));
  mensajeReservas = `Usted actualmente tiene ${usuarioLoged.choperasReservadas} chopera/s reservadas para el/los fine/s de semana/s ${usuarioLoged.reservas}`; 
  mostrarMsjReservas(mensajeReservas)
  formularioReserva.className = 'hidden';
  }

function consultarDisponibilidad() {
  mensajeReservas = `Actualmente contamos con la siguiente disponibilidad:\n\nFin de semana 1: ${finesDeSemana.finSemana1} Choperas disponibles\nFin de semana 2: ${finesDeSemana.finSemana2} Choperas disponibles\nFin de semana 3: ${finesDeSemana.finSemana3} Choperas disponibles\nFin de semana 4: ${finesDeSemana.finSemana4} Choperas disponibles`; 
  mostrarMsjReservas(mensajeReservas)
  formularioReserva.className = 'hidden';
  // alert(`Actualmente contamos con la siguiente disponibilidad:\n\nFin de semana 1: ${finesDeSemana.finSemana1} Choperas disponibles\nFin de semana 2: ${finesDeSemana.finSemana2} Choperas disponibles\nFin de semana 3: ${finesDeSemana.finSemana3} Choperas disponibles\nFin de semana 4: ${finesDeSemana.finSemana4} Choperas disponibles`)
}
function mostrarMsjReservas(mensajeReservas) {
  let msjReservas = document.getElementById('msjReservas');
  msjReservas.innerText = mensajeReservas; 
  msjReservas.className = '';

}
function validarReserva(finSemanaAReservar, cantidadAReservar){
  let nombre = JSON.parse(localStorage.getItem('usuario')).nombre
  let clave = JSON.parse(localStorage.getItem('usuario')).clave
  let choperasReservadas = JSON.parse(localStorage.getItem('usuario')).choperasReservadas
  

  const usuarioLoged = new Usuario(nombre, clave, choperasReservadas);

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
  consultarDisponibilidad();
  formularioReserva.className = 'contact_form formReserva';
  }

function cerrarSecion () {
  localStorage.removeItem('usuario');
  formularioIniciarSesion.className = 'contact_form';
  formularioRegistrarse.className = 'contact_form';
  menuDeReservas.className = 'hidden';
  mensajeBienvenida.className = 'hidden';

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
          cerrarSecion()
          break;
      default:
          alert('No existe la opcion ingresada, intente de nuevo.')
          break;
  }
}

if(usuarioLoged) {
  let mensajeReservas = `Hola ${usuarioLoged.nombre}, bienvenido al sistema de reserva de choperas de Bisbier!`;
  
  let nombreUsuario = document.getElementById('nombreUsuario');
  mensajeBienvenida.className = '';
  nombreUsuario.innerText = usuarioLoged.nombre;
  menuDeReservas.className = 'reservas';
  formularioIniciarSesion.className = 'hidden';
  formularioRegistrarse.className = 'hidden';
  mostrarMsjReservas(mensajeReservas)
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

formularioReserva.addEventListener('submit', (e) => {
  e.preventDefault();
  let cantidadAReservar = parseInt(document.getElementById('cantidadAReservar').value);
  let finSemanaAReservar = document.getElementById('finSemanaAReservar').value;
  
  validarReserva(finSemanaAReservar, cantidadAReservar)
  let indexUsuarioLoged = usuarios.findIndex(el => el.nombre == usuarioLoged.nombre);
                  usuarios[indexUsuarioLoged].choperasReservadas = JSON.parse(localStorage.getItem('usuario')).choperasReservadas;
                  usuarios[indexUsuarioLoged].reservas = JSON.parse(localStorage.getItem('usuario')).reservas;
                  localStorage.setItem('usuarios', JSON.stringify(usuarios));
                  usuarioLoged = JSON.parse(localStorage.getItem('usuario'));
                  consultarReserva()
});