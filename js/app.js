//////////////////////////////////////////////////////////////////////////////////////////////
// Sistema de reserva de choperas con cupos por calendario y stock (de choperas y cervezas)
//////////////////////////////////////////////////////////////////////////////////////////////

let formularioIniciarSesion = document.getElementById('iniciarSesion');
let formularioRegistrarse = document.getElementById('registrarse');
let formularioReserva = document.getElementById('formReserva');
let menuDeReservas = document.getElementById('reservas');
let mensajeBienvenida = document.getElementById('bienvenida');
let msjError = document.getElementById('error');
let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
let usuarioLoged = JSON.parse(localStorage.getItem('usuario'));
let botones = document.querySelectorAll('.btn-sistema');

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
  mensajeError = `<span>Error:</span> El usuario "${nombre}" no esta registrado o la contraseña es incorrecta`; 
  mostrarMsjError(mensajeError)
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
    mensajeError = `<span>Error:</span> El nombre ${nombre} ya está registrado.`; 
    mostrarMsjError(mensajeError);
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
}

function mostrarMsjReservas(mensajeReservas) {
  let msjReservas = document.getElementById('msjReservas');
  msjReservas.innerText = mensajeReservas; 
  msjReservas.className = '';

}

function mostrarMsjError(mensajeError) {
  let msjError = document.getElementById('error');
  msjError.innerHTML = mensajeError; 
  msjError.className = 'error';
  setTimeout('ocultarMsjError()', 4000)
}

function ocultarMsjError() {
  msjError.className = 'hidden';
}

function validarReserva(finSemanaAReservar, cantidadAReservar){
  let nombre = JSON.parse(localStorage.getItem('usuario')).nombre
  let clave = JSON.parse(localStorage.getItem('usuario')).clave
  let choperasReservadas = JSON.parse(localStorage.getItem('usuario')).choperasReservadas
  const usuarioLoged = new Usuario(nombre, clave, choperasReservadas);
  const guardarUsuarioLS = function() {
    usuarioLoged.agregarReserva(cantidadAReservar, finSemanaAReservar);
    localStorage.setItem('usuario', JSON.stringify(usuarioLoged));
  }
  if((finSemanaAReservar == '1' && cantidadAReservar > finesDeSemana.finSemana1) || (finSemanaAReservar == '2' && cantidadAReservar > finesDeSemana.finSemana2) || (finSemanaAReservar == '3' && cantidadAReservar > finesDeSemana.finSemana3) || (finSemanaAReservar == '4' && cantidadAReservar > finesDeSemana.finSemana4)){
      mensajeError = `<span>Error:</span> No hay suficientes choperas disponibles el fin de semana ${finSemanaAReservar}`; 
      mostrarMsjError(mensajeError)
      return false;
  } else if (finSemanaAReservar == '1'){
      finesDeSemana.finSemana1 -= cantidadAReservar;
      guardarUsuarioLS();
      return true;
  } else if (finSemanaAReservar == '2'){
      finesDeSemana.finSemana2 -= cantidadAReservar;
      guardarUsuarioLS();
      return true;
  } else if (finSemanaAReservar == '3'){
      finesDeSemana.finSemana3 -= cantidadAReservar;
      guardarUsuarioLS();
      return true;
  } else if (finSemanaAReservar == '4'){
      finesDeSemana.finSemana4 -= cantidadAReservar;
      guardarUsuarioLS();
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
    mensajeError = `<span>Error:</span> Todos los datos deben ser completados`; 
    mostrarMsjError(mensajeError);
  }
});

formularioRegistrarse.addEventListener('submit', (e) => {
  e.preventDefault();
  let usuario = document.getElementById('usuarioRegistrado').value;
  let clave = document.getElementById('claveRegistrada').value;
    if(usuario != '' && clave != '') {
    registrarse(usuario, clave);
  } else {
    mensajeError = `<span>Error:</span> Todos los datos deben ser completados`; 
    mostrarMsjError(mensajeError);
  }
});

formularioReserva.addEventListener('submit', (e) => {
  e.preventDefault();
  let cantidadAReservar = parseInt(document.getElementById('cantidadAReservar').value);
  let finSemanaAReservar = document.getElementById('finSemanaAReservar').value;
  Swal.fire({
    title: 'Estás seguro?',
    text: `Reservarás ${cantidadAReservar} chopera/s para el fin de semana ${finSemanaAReservar}`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Confirmar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Confirmado!',
        `Has reservado ${cantidadAReservar} chopera/s para el fin de semana ${finSemanaAReservar}`,
        'success'
      )
      validarReserva(finSemanaAReservar, cantidadAReservar)
      let indexUsuarioLoged = usuarios.findIndex(el => el.nombre == usuarioLoged.nombre);
      usuarios[indexUsuarioLoged].choperasReservadas = JSON.parse(localStorage.getItem('usuario')).choperasReservadas;
      usuarios[indexUsuarioLoged].reservas = JSON.parse(localStorage.getItem('usuario')).reservas;
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
      usuarioLoged = JSON.parse(localStorage.getItem('usuario'));
      consultarReserva()
   
    }
  })

});