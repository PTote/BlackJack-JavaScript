/**
 * 2C = Two of clubs (tréboles)
 * 2D = Two of Diamods
 * 2H = Two of hearts
 * 2S = Two of spades
 */

(() => {
  "use strict";

  let deck = [];
  const tipos = ["C", "D", "H", "S"];
  const especiales = ["A", "J", "Q", "K"];

  let puntosJugador = 0,
    puntosComputadora = 0;

  //Referencias del HTML
  const btnNuevo = document.querySelector("#btnNuevo");
  const btnPedir = document.querySelector("#btnPedir");
  const btnDetener = document.querySelector("#btnDetener");
  const marcador = document.querySelectorAll("small");
  const divCartasJugador = document.querySelector("#jugador-cartas");
  const divCartasComputadora = document.querySelector("#computadora-cartas");

  //Esta función crear una nueva baraja o deck de cartas
  const crearDeck = () => {
    for (let i = 2; i <= 10; i++) {
      for (let tipo of tipos) {
        deck.push(i + tipo);
      }
    }

    for (let tipo of tipos) {
      for (let esp of especiales) {
        deck.push(esp + tipo);
      }
    }

    // console.log(deck);
    deck = _.shuffle(deck);
    // console.log(deck);
    // return deck;
  };

  //Esta funcioón me permite tomar una nueva carta
  const tomarCarta = () => {
    if (deck.length === 0) {
      throw "No hay cartas en el deck";
    }
    const tomar = deck.pop();
    // console.log('Carta tomada: ' + tomar);
    // console.log(deck);
    return tomar;
  };

  //conocer valor de carta
  const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    // let puntos = 0;

    return isNaN(valor) /// validación ternaria
      ? valor === "A"
        ? 11
        : 10
      : valor * 1;

    // if ( isNaN(valor)){ // isNan nos sirve para ver si es un número o no
    //     console.log('No es un número'); //si no es un número devuelve true
    // }else{
    //     console.log('Es un número');
    //     puntos = valor * 1; // al multiplicar por el número 1, convertimos el valor de string a número
    // }
  };

  //Turno de computadora
  const turnoComputadora = (puntosMinimos) => {
    do {
      const carta = tomarCarta();

      puntosComputadora = puntosComputadora + valorCarta(carta);
      marcador[1].innerHTML = puntosComputadora;

      //crear la imagen de la carta
      const imgCarta = document.createElement("img"); //creamos la imagen
      imgCarta.src = `assets/cartas/cartas/${carta}.png`; // buscamos la carta
      imgCarta.classList.add("carta"); // le añadimos la clase
      divCartasComputadora.append(imgCarta); // insertamos carta

      if (puntosMinimos > 21) {
        break;
      }
    } while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);

    setTimeout(() => {
      if (puntosComputadora === puntosMinimos) {
        alert("Nadie gana :( !");
      } else if (puntosMinimos > 21) {
        alert("Computadora gana");
      } else if (puntosComputadora > 21) {
        alert("Jugador gana");
      } else {
        alert("Computadora gana");
      }
    }, 10);
  };

  //Eventos

  btnPedir.addEventListener("click", () => {
    const carta = tomarCarta();

    puntosJugador = puntosJugador + valorCarta(carta);
    marcador[0].innerHTML = puntosJugador;

    //crear la imagen de la carta
    const imgCarta = document.createElement("img"); //creamos la imagen
    imgCarta.src = `assets/cartas/cartas/${carta}.png`; // buscamos la carta
    imgCarta.classList.add("carta"); // le añadimos la clase
    divCartasJugador.append(imgCarta); // insertamos carta

    if (puntosJugador > 21) {
      console.warn("Lo siento, perdiste");
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      turnoComputadora(puntosJugador);
    } else if (puntosJugador === 21) {
      console.warn("21, genial");
      btnPedir.disable = true;
      btnDetener.disable = true;
      turnoComputadora(puntosJugador);
    }
  });

  btnDetener.addEventListener("click", () => {
    btnNuevo.disabled = true;
    btnPedir.disabled = true;
    turnoComputadora(puntosJugador);
  });

  btnNuevo.addEventListener("click", () => {
    console.clear();
    deck = [];
    deck = crearDeck();
    puntosComputadora = 0;
    puntosJugador = 0;
    marcador[0].innerHTML = "";
    marcador[1].innerHTML = "";
    divCartasComputadora.innerHTML = "";
    divCartasJugador.innerHTML = "";
    btnPedir.disabled = false;
    btnDetener.disabled = false;
  });

  crearDeck();

  
})();
