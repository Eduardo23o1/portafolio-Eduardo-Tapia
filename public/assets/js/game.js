// Obtener referencias al canvas y elementos del DOM
const playBtn = document.getElementById("playBtn");
const scoreEl = document.getElementById("score");
const gameOverEl = document.getElementById("gameOver");
const controls = document.getElementById("controls");
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Calcular dimensiones responsivas para el canvas (máximo 600px de ancho)
let maxCanvasWidth = Math.min(window.innerWidth * 0.95, 450);
let box = Math.floor(maxCanvasWidth / 20); // Tamaño de cada "cuadro" (celda)
const cols = 20; // Número de columnas del tablero
const rows = 20; // Número de filas del tablero
canvas.width = cols * box; // Ancho del canvas
canvas.height = rows * box; // Alto del canvas

// Variables globales del juego
let snake, food, direction, score, gameInterval;

// Inicializa el juego
function initGame() {
    // Posicionar la serpiente en el centro del tablero
    snake = [{ x: Math.floor(cols / 2) * box, y: Math.floor(rows / 2) * box }];
    direction = "right"; // Dirección inicial
    score = 0; // Puntaje inicial
    placeFood(); // Coloca la comida en una posición aleatoria
    gameOverEl.style.display = "none"; // Oculta el mensaje de "Game Over"
    scoreEl.textContent = `Puntaje: ${score}`; // Muestra el puntaje inicial
    clearInterval(gameInterval); // Detiene cualquier bucle anterior
    gameInterval = setInterval(gameLoop, 150); // Inicia el bucle del juego (cada 150ms)
}

// Genera la comida en una posición aleatoria dentro del tablero
function placeFood() {
    food = {
        x: Math.floor(Math.random() * cols) * box,
        y: Math.floor(Math.random() * rows) * box
    };
}

// Dibuja la serpiente en el canvas
function drawSnake() {
    ctx.fillStyle = "#29b6f6"; // Color de la serpiente
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, box, box); // Dibuja cada segmento como un cuadrado
    });
}

// Dibuja la comida (como un círculo dorado)
function drawFood() {
    ctx.fillStyle = "gold";
    ctx.beginPath();
    ctx.arc(food.x + box / 2, food.y + box / 2, box / 2, 0, 2 * Math.PI); // Dibuja un círculo
    ctx.fill();
}

// Bucle principal del juego (se ejecuta cada 150ms)
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpia el canvas
    drawSnake(); // Dibuja la serpiente
    drawFood(); // Dibuja la comida

    // Crear nueva cabeza según la dirección actual
    let head = { ...snake[0] };
    if (direction === "right") head.x += box;
    if (direction === "left") head.x -= box;
    if (direction === "up") head.y -= box;
    if (direction === "down") head.y += box;

    // Verificar colisión con bordes o consigo misma
    if (
        head.x < 0 || head.x >= canvas.width || // Sale del tablero horizontalmente
        head.y < 0 || head.y >= canvas.height || // Sale del tablero verticalmente
        snake.some(seg => seg.x === head.x && seg.y === head.y) // Se choca con su propio cuerpo
    ) {
        clearInterval(gameInterval); // Detiene el juego
        gameOverEl.style.display = "block"; // Muestra "Game Over"

        // Muestra botón de reinicio si está en móvil
        if (/Mobi|Android/i.test(navigator.userAgent)) {
            document.getElementById("restartBtn").style.display = "inline-block";
        }

        return; // Sale del bucle
    }

    // Verifica si la serpiente comió la comida
    if (head.x === food.x && head.y === food.y) {
        score++; // Aumenta el puntaje
        scoreEl.textContent = `Puntaje: ${score}`; // Actualiza el puntaje en pantalla
        placeFood(); // Coloca nueva comida
    } else {
        snake.pop(); // Si no comió, se elimina el último segmento (no crece)
    }

    snake.unshift(head); // Agrega la nueva cabeza al principio
}

// Cambia la dirección si es válida (no opuesta a la actual)
function setDirection(dir) {
    if (
        (dir === "left" && direction !== "right") ||
        (dir === "right" && direction !== "left") ||
        (dir === "up" && direction !== "down") ||
        (dir === "down" && direction !== "up")
    ) {
        direction = dir; // Cambia la dirección
    }
}

// Detecta teclas para mover la serpiente y reiniciar si hay "Game Over"
document.addEventListener("keydown", e => {
    if (e.key === "ArrowLeft") setDirection("left");
    if (e.key === "ArrowRight") setDirection("right");
    if (e.key === "ArrowUp") setDirection("up");
    if (e.key === "ArrowDown") setDirection("down");
    if (e.code === "Space" && gameOverEl.style.display === "block") initGame(); // Reinicia con barra espaciadora
});

// Muestra los controles en pantalla si es un dispositivo móvil
if (/Mobi|Android/i.test(navigator.userAgent)) {
    document.getElementById("controls").style.display = "block";
}

// Inicia el juego al cargar la página
playBtn.addEventListener("click", () => {
  playBtn.style.display = "none";
  canvas.style.display = "block";
  scoreEl.style.display = "block";
  controls.style.display = /Mobi|Android/i.test(navigator.userAgent) ? "block" : "none";
  initGame();
});
//initGame();
