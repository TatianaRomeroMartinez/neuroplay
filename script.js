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
    mostrarPantalla('juego');
}

function goToNiveles() {
    mostrarPantalla('niveles');
}

// Función para iniciar el nivel fácil del juego de memoria
function iniciarJuegoFacil() {
    mostrarPantalla('memoria-facil');

    const tablero = document.getElementById("tablero-facil");
    tablero.innerHTML = "";

    const imagenes = ['banano.jpg', 'manzana.jpg', 'sandia.png'];
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

                    const encontradas = document.querySelectorAll(".carta.encontrada");
                    if (encontradas.length === cartas.length) {
                        setTimeout(() => {
                            mostrarPantalla('pantalla-victoria'); // Cambiar a la pantalla de victoria
                        }, 300); // 300 ms de espera para que se vean los cambios
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

