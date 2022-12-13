//////////////////////////////////////////////////////////////////////////////////////////////
// Sistema de reserva de choperas con cupos por calendario y stock (de choperas y cervezas)
//////////////////////////////////////////////////////////////////////////////////////////////
let formularioIniciarSesion = document.getElementById('iniciarSesion');
let formularioRegistrarse = document.getElementById('registrarse');
let formularioReserva = document.getElementById('formReserva');
let menuDeReservas = document.getElementById('reservas');
let mensajeBienvenida = document.getElementById('bienvenida');
let msjError = document.getElementById('error');
let msjExito = document.getElementById('exito');
let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
let usuarioLoged = JSON.parse(localStorage.getItem('usuario'));
let botones = document.querySelectorAll('.btn-sistema');

let choperasDisponibles = fetch('./js/disponibilidad.json')
    .then(res => res.json())
    .then(data => {
      choperasDisponibles=data
    })
//Usuario y LogIn
class Usuario {
  constructor(nombre, clave, choperasReservadas) {
    this.nombre = nombre;
    this.clave = clave;
    this.choperasReservadas = parseInt(choperasReservadas);
    this.reservas = []
  }
  agregarReserva(choperasAReservar, reservasARegistrar) {
    this.choperasReservadas += choperasAReservar;
    this.reservas = reservasARegistrar;    
  }
}
async function peticionServidorIniciarSesion() {
  const users = await fetch('./js/users.json');
  const usuariosDB = await users.json();
  return usuariosDB;
  fetch('./js/users.json')
    .then(users => users.json())
    .then(usuariosDB => usuarios = [...usuariosDB]);
  return usuarios;
}
async function iniciarSesion(nombre, clave){
  usuarioLogIn = usuarioLoged = usuarios.find((usuario) => usuario.nombre === nombre && usuario.clave === clave );
  if(usuarioLogIn) {
    guardarUsuarioLS(usuarioLogIn);
    let nombreUsuario = document.getElementById('nombreUsuario');
    mensajeBienvenida.className = '';
    nombreUsuario.innerText = nombre;
    formularioIniciarSesion.className = 'hidden';
    formularioRegistrarse.className = 'hidden';
    menuDeReservas.className = 'reservas';
    let mensajeReservas = `Hola ${usuarioLogIn.nombre}, bienvenido al sistema de reserva de choperas de Bisbier!`;
    mostrarMsjReservas(mensajeReservas)
} else {
    usuarios = await peticionServidorIniciarSesion();
    usuarioLogIn = usuarioLoged = usuarios.find((usuario) => usuario.nombre === nombre && usuario.clave === clave );
    if(usuarioLogIn) {
      guardarUsuarioLS(usuarioLogIn);
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
  
}
//Registro
async function registrarse(informacionFormulario){
  if (usuarios.length==0)
  {usuarios = await peticionServidorIniciarSesion();}
  return new Promise( (resolve, rejected) => {
    const { nombre: userName} = informacionFormulario;
    let existeUsuario = usuarios.some( (user) => 
      user.nombre === userName
    );
    if(existeUsuario) {
      rejected(`<span>Error:</span> El usuario "${userName}" ya está registrado.`);
    } else {
      usuarios.push({
        ...informacionFormulario,
      });
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
      resolve(`<span>Exito:</span> El usuario "${userName}" ha sido registrado correctamente.`)
    }
  });
}
//Funciones del sistema de reserva
function consultarReserva() {
  usuarioLoged = JSON.parse(localStorage.getItem('usuario'));
  let mensajeReservas = document.getElementById('msjReservas');
 mensajeReservas.innerHTML = ""
  usuarioLoged.reservas.forEach(estilo => {
    mensajeReservas.innerHTML += `<div>
    <h4>${estilo.estilo}</h4>
    <p>Fin de Semana 1: ${estilo.finSemana1}</p>
    <p>Fin de Semana 2: ${estilo.finSemana2}</p>
    <p>Fin de Semana 3: ${estilo.finSemana3}</p>
    <p>Fin de Semana 4: ${estilo.finSemana4}</p>
  </div>`;
  })
  formularioReserva.className = 'hidden';
  }

function consultarDisponibilidad() {
  formularioReserva.className = 'hidden';
  
      let msjDisponibilidad = document.getElementById('msjReservas');
      msjDisponibilidad.innerHTML =""
      choperasDisponibles.forEach(estilo => {
        msjDisponibilidad.innerHTML +=`<div>
            <h4>${estilo.estilo}</h4>
            <p>Fin de Semana 1: ${estilo.finSemana1}</p>
            <p>Fin de Semana 2: ${estilo.finSemana2}</p>
            <p>Fin de Semana 3: ${estilo.finSemana3}</p>
            <p>Fin de Semana 4: ${estilo.finSemana4}</p>
          </div>
          `;
      })
    
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
function mostrarMsjExito(mensajeExito) {
  let msjExito = document.getElementById('exito');
  msjExito.innerHTML = mensajeExito; 
  msjExito.className = 'exito';
  setTimeout('ocultarMsjExito()', 4000)
}
function ocultarMsjError() {
  msjError.className = 'hidden';
}
function ocultarMsjExito() {
  msjExito.className = 'hidden';
}
function guardarUsuarioLS(usuarioLogIn) {
  localStorage.setItem('usuario', JSON.stringify(usuarioLogIn));
}
function validarReserva(estiloAReservar, finSemanaAReservar, cantidadAReservar){
  let nombre = JSON.parse(localStorage.getItem('usuario')).nombre;
  let clave = JSON.parse(localStorage.getItem('usuario')).clave;
  let choperasReservadas = JSON.parse(localStorage.getItem('usuario')).choperasReservadas;
  let reservas = JSON.parse(localStorage.getItem('usuario')).reservas;
  let indexReservas = reservas.findIndex(el => el.estilo == estiloAReservar);
  let finSemana = "finSemana"+finSemanaAReservar;
  const usuarioLoged = new Usuario(nombre, clave, choperasReservadas, reservas);
  if((cantidadAReservar > choperasDisponibles[indexReservas][finSemana]) ){
      mensajeError = `<span>Error:</span> No hay suficientes choperas disponibles el fin de semana ${finSemanaAReservar}`; 
      mostrarMsjError(mensajeError);
      return false;
  } else {
    Swal.fire({
      title: 'Estás seguro?',
      text: `Reservarás ${cantidadAReservar} chopera/s de ${estiloAReservar} para el fin de semana ${finSemanaAReservar}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#333',
      background: '#222',
      color: '#ddd',
      cancelButtonColor: '#833',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          confirmButtonColor: '#333',
          background: '#222',
          color: '#ddd',
          cancelButtonColor: '#833',
          title: 'Confirmado!',
          text: `Has reservado ${cantidadAReservar} chopera/s de ${estiloAReservar} para el fin de semana ${finSemanaAReservar}`,
          icon: 'success'}
        )
      }
    })
      reservas[indexReservas][finSemana]+= cantidadAReservar;
      choperasDisponibles[indexReservas][finSemana] -= cantidadAReservar;
      usuarioLoged.agregarReserva(cantidadAReservar, reservas);
      guardarUsuarioLS(usuarioLoged);
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
formularioRegistrarse.onsubmit = (e) => {
  e.preventDefault();

  let target = e.target[0];
  let datos = target.children;

  if(datos[2].value !== '' && datos[3].value !== '') {
    registrarse({
      nombre: datos[2].value,
      clave: datos[3].value,
      choperasReservadas: 0,
      reservas: [{
        "estilo": "Blonde",
        "finSemana1": 0,
        "finSemana2": 0,
        "finSemana3": 0,
        "finSemana4": 0
      },
      {
        "estilo": "Apa",
        "finSemana1": 0,
        "finSemana2": 0,
        "finSemana3": 0,
        "finSemana4": 0
      },
      {
        "estilo": "Ipa",
        "finSemana1": 0,
        "finSemana2": 0,
        "finSemana3": 0,
        "finSemana4": 0
      },
      {
        "estilo": "Irish",
        "finSemana1": 0,
        "finSemana2": 0,
        "finSemana3": 0,
        "finSemana4": 0
      }]
    })
    .then((respuesta) => {
      mostrarMsjExito(respuesta);
    })
    .catch((error) => {
      mostrarMsjError(error);
    })
  }
}
formularioReserva.addEventListener('submit', (e) => {
  e.preventDefault();
  let cantidadAReservar = parseInt(document.getElementById('cantidadAReservar').value);
  let finSemanaAReservar = document.getElementById('finSemanaAReservar').value;
  let estiloAReservar = document.getElementById('estiloAReservar').value;
  validarReserva(estiloAReservar, finSemanaAReservar, cantidadAReservar)
  let indexUsuarioLoged = usuarios.findIndex(el => el.nombre == usuarioLoged.nombre);
  usuarios[indexUsuarioLoged].choperasReservadas = JSON.parse(localStorage.getItem('usuario')).choperasReservadas;
  usuarios[indexUsuarioLoged].reservas = JSON.parse(localStorage.getItem('usuario')).reservas;
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
  usuarioLoged = JSON.parse(localStorage.getItem('usuario'));
  consultarReserva()
});
