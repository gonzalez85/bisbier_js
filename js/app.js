//////////////////////////////////////////////////////////////////////////////////////////////
// Sistema de reserva de choperas con cupos por calendario y stock (de choperas y cervezas)
//////////////////////////////////////////////////////////////////////////////////////////////

let finSemana1 = 0;
let finSemana2 = 1;
let finSemana3 = 2;
let finSemana4 = 1;
let opcionMenu = 0;

//Funciones del sistema de reserva
function consultarDisponibilidad() {
    alert(`Actualmente contamos con la siguiente disponibilidad:\n\nFin de semana 1: ${finSemana1} Choperas disponibles\nFin de semana 2: ${finSemana2} Choperas disponibles\nFin de semana 3: ${finSemana3} Choperas disponibles\nFin de semana 4: ${finSemana4} Choperas disponibles`)
}

function validarReserva(finSemanaAReservar, cantidadAReservar){
    if((finSemanaAReservar == '1' && cantidadAReservar > finSemana1) || (finSemanaAReservar == '2' && cantidadAReservar > finSemana2) || (finSemanaAReservar == '3' && cantidadAReservar > finSemana3) || (finSemanaAReservar == '4' && cantidadAReservar > finSemana4)){
        alert(`No hay suficientes choperas disponibles el fin de semana ${finSemanaAReservar}`);
        return false;
    } else if (finSemanaAReservar == '1'){
        finSemana1 -= cantidadAReservar;
        return true;
    } else if (finSemanaAReservar == '2'){
        finSemana2 -= cantidadAReservar;
        return true;
    } else if (finSemanaAReservar == '3'){
        finSemana3 -= cantidadAReservar;
        return true;
    } else if (finSemanaAReservar == '4'){
        finSemana4 -= cantidadAReservar;
        return true;
    }

}

const reservarChopera = function() {
    let finSemanaAReservar = parseInt(prompt(`Para cual fin de semana necesitas la chopera? (Ingresa del 1 al 4)\n\n Te recuerdo nuestra agenda: \n\nFin de semana 1: ${finSemana1} Choperas disponibles\nFin de semana 2: ${finSemana2} Choperas disponibles\nFin de semana 3: ${finSemana3} Choperas disponibles\nFin de semana 4: ${finSemana4} Choperas disponibles\n`));
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
            reservarChopera();
            break;
        case '3':
             alert('Adios.')
            break;
        default:
            alert('No existe la opcion ingresada, intente de nuevo.')
            break;
    }
}
do {
    opcionMenu= prompt("Bienvenido a nuestro servicio de reserva de choperas. \n 1. Consultar disponibilidad. \n 2. Reservar chopera. \n 3. Salir")
    seleccionarOpcionMenu(opcionMenu);
} while(opcionMenu !=='3');