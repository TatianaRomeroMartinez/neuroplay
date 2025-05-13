// Función para ocultar todas las pantallas y mostrar solo una
function mostrarPantalla(id) {
    const pantallas = document.querySelectorAll('.screen');
    pantallas.forEach(p => p.style.display = 'none');
    document.getElementById(id).style.display = 'block';
}

// Navegación entre pantallas
function goToDatos() {
    mostrarPantalla('datos');
}

function goToJuego() {
    mostrarPantalla('seleccion-juegos');
}


function goToNiveles() {
    mostrarPantalla('niveles');
}
//funcion juego de memoria 
function iniciarJuegoMemoria(nivel, imagenes) {
    mostrarPantalla(`memoria-${nivel}`);

    const tablero = document.getElementById(`tablero-${nivel}`);
    tablero.innerHTML = "";

    let cartas = [...imagenes, ...imagenes]; // Duplicar imágenes
    let cartasVolteadas = [];
    let bloquear = false;

    cartas.sort(() => Math.random() - 0.5); // Mezclar cartas

    cartas.forEach(nombre => {
        const carta = document.createElement("div");
        carta.classList.add("carta");
        carta.dataset.valor = nombre;
        carta.innerHTML = `<img src="img/dorso.png" alt="tapa">`;

        carta.addEventListener("click", () => {
            if (bloquear || carta.classList.contains("encontrada") || cartasVolteadas.includes(carta)) return;

            carta.querySelector("img").src = `img/${carta.dataset.valor}`;
            cartasVolteadas.push(carta);

            if (cartasVolteadas.length === 2) {
                bloquear = true;
                const [c1, c2] = cartasVolteadas;

                if (c1.dataset.valor === c2.dataset.valor) {
                    c1.classList.add("encontrada");
                    c2.classList.add("encontrada");
                    cartasVolteadas = [];
                    bloquear = false;

                    const encontradas = document.querySelectorAll(`#tablero-${nivel} .carta.encontrada`);
                    if (encontradas.length === cartas.length) {
                        setTimeout(() => {
                            mostrarPantalla('pantalla-victoria');
                        }, 300);
                    }

                } else {
                    setTimeout(() => {
                        c1.querySelector("img").src = "img/dorso.png";
                        c2.querySelector("img").src = "img/dorso.png";
                        cartasVolteadas = [];
                        bloquear = false;
                    }, 1000);
                }
            }
        });

        tablero.appendChild(carta);
    });
}

//funcion juego facil 
function iniciarJuegoFacil() {
    const imagenesFacil = ['banano.jpg', 'manzana.jpg', 'sandia.png'];
    iniciarJuegoMemoria('facil', imagenesFacil);
}
//funcion juego intermedio 
function iniciarJuegoIntermedio() {
    const imagenesIntermedio = ['banano.jpg', 'manzana.jpg', 'sandia.png', 'naranja.jpg', 'pera.jpg', 'uva.png'];
    iniciarJuegoMemoria('intermedio', imagenesIntermedio);
}
//funcion juego intermedio 
function iniciarJuegoAvanzado() {
    const imagenesAvanzado = ['banano.jpg', 'manzana.jpg', 'sandia.png', 'naranja.jpg', 'pera.jpg', 'uva.png', 'kiwi.png', 'mango.png', 'piña.png', 'papaya.png'];
    iniciarJuegoMemoria('avanzado', imagenesAvanzado);
}

//reconocimiento por voz 
function iniciarReconocimiento(callback) {
    const reconocimiento = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    reconocimiento.lang = 'es-ES';
    reconocimiento.interimResults = false;
    reconocimiento.maxAlternatives = 1;

    reconocimiento.onresult = function(event) {
        const resultado = event.results[0][0].transcript;
        callback(resultado);
    };

    reconocimiento.onerror = function(event) {
        alert("Error al reconocer la voz: " + event.error);
    };

    reconocimiento.start();
}

function dictarNombre() {
    iniciarReconocimiento((texto) => {
        document.getElementById("nombre").value = texto;
    });
}

function dictarEdad() {
    iniciarReconocimiento((texto) => {
        const numero = texto.match(/\d+/);
        if (numero) {
            document.getElementById("edad").value = numero[0];
        } else {
            alert("No entendí la edad, intenta otra vez.");
        }
    });
}
function goToSeleccionJuegos() {
    mostrarPantalla('seleccion-juegos');
}

function goToJuegoMemoria() {
    mostrarPantalla('juego');
}
function goToFlashcards() {
    mostrarPantalla('flashcards');
}

function goToNivelesFlashcards() {
    mostrarPantalla('niveles-flashcards');
}
// Flashcards - Nivel Fácil
const tarjetasFacil = [
    { palabra: "Ballena", imagen: "ballena.PNG" },
    { palabra: "Gato", imagen: "cat.jpg" },
    { palabra: "Perro", imagen: "dog.jpg" },
    { palabra: "León", imagen: "leon.PNG" },
    { palabra: "Serpiente", imagen: "serpiente.PNG" },
    { palabra: "Mono", imagen: "mono.PNG" }
];

let indiceFacil = 0;

function iniciarFlashcardsFacil() {
    indiceFacil = 0;
    mostrarFlashcardFacil();
}

function mostrarFlashcardFacil() {
    const card = tarjetasFacil[indiceFacil];
    document.getElementById("imagen-facil").src = `img/${card.imagen}`;
    document.getElementById("texto-facil").textContent = card.palabra;
    mostrarPantalla("flashcards-facil");
}

function siguienteFacil() {
    indiceFacil = (indiceFacil + 1) % tarjetasFacil.length;
    mostrarFlashcardFacil();
}

function escucharPalabraFacil() {
    const palabra = tarjetasFacil[indiceFacil].palabra;
    const sintesis = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(palabra);
    utterance.lang = 'es-ES';
    sintesis.speak(utterance);
}
function decirPalabraFacil() {
    const reconocimiento = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    reconocimiento.lang = 'es-ES';
    reconocimiento.interimResults = false;
    reconocimiento.maxAlternatives = 1;

    reconocimiento.onresult = function(event) {
        const dicho = event.results[0][0].transcript.trim().toLowerCase();
        const correcto = tarjetasFacil[indiceFacil].palabra.trim().toLowerCase();

        if (dicho === correcto) {
            document.getElementById("resultado-facil").textContent = "✅ ¡Muy bien!";
        } else {
            document.getElementById("resultado-facil").textContent = `❌ Dijiste "${dicho}", intenta otra vez.`;
        }
    };

    reconocimiento.onerror = function(event) {
        document.getElementById("resultado-facil").textContent = "❌ Error: " + event.error;
    };

    document.getElementById("resultado-facil").textContent = "🎤 Escuchando...";
    reconocimiento.start();
}
