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

function iniciarSesion(){
    const nombre = prompt('Ingresa tu nombre');
    const clave = prompt('Ingresa tu clave');
  
    usuarioLogIn = usuarios.find((usuario) => usuario.nombre === nombre && usuario.clave === clave );
  
    if(usuarioLogIn) {
      menuDeOpciones();
    } else {
      alert('El nombre no esta registrado.');
    }
  }

function registrarse() {
  const nombre = prompt('Ingresa tu nombre');
  const clave = prompt('Ingresa la clave deseada');
  const choperasReservadas = 0;

  usuarios.push(new Usuario(nombre, clave, choperasReservadas));
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


let opcionMenu = 0;
let opcionInicio = 0;
let usuarios = [];
let usuarioLogIn;

do {
    opcionInicio = prompt("Bienvenido a nuestro servicio de reserva de choperas.\n1.Iniciar sesion.\n2.Registrarse.\n3.Salir");
    switch(opcionInicio) {
      case '1':
        iniciarSesion();
        break;
      case '2':
        registrarse();
        break;
      case '3':
        alert('Adios, esperamos volver a verte por aqui.');
        break;
      default:
        alert('No existe la opcion ingresada, intente de nuevo.');
        break;
    }
  } while(opcionInicio != 3);