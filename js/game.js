let playerScore = 0;
let paddle;
let balls; // Arreglo para rastrear todas las bolas en juego
let bricks;
let gameState;
let powerUps; // Arreglo para rastrear los power-ups
let paddles;
let boostSpeed = 2;
let boosting = false;

function setup() {
  let canvas = createCanvas(900, 600);
  canvas.parent('miCanvas');
  let colors = createColors();
  gameState = 'playing';
  paddle = new Paddle();
  balls = [new Ball(paddle)];
  bricks = createBricks(colors);
  powerUps = [];
  paddles = [paddle] // para que aumente o se recorte
  window.addEventListener('keydown', reiniciarConTeclaF);
  window.addEventListener('keydown', activarBoost);
  window.addEventListener('keyup', desactivarBoost);
}

// Colores y crear los brick filas, colums
function createColors() {
  const colors = [];
  colors.push(color(265, 165, 0));
  colors.push(color(135, 206, 250));
  colors.push(color(147, 112, 219));
  for (let i = 0; i < 10; i++) {
    colors.push(color(random(0, 255), random(0, 255), random(0, 255)));
  }
  return colors;
}

function createBricks(colors) {
  const bricks = [];
  const rows = 10;
  const bricksPerRow = 15;
  const brickWidth = width / bricksPerRow;

  for (let row = 0; row < rows; row++) {
    for (let i = 0; i < bricksPerRow; i++) {
      let brick = new Brick(createVector(brickWidth * i, 25 * row), brickWidth, 25, colors[floor(random(0, colors.length))]);
      bricks.push(brick);
    }
  }
  return bricks;
}
//TODO LO QUE SE DIBUJA EN EL CANVAS

function activarBoost(event) {
  // Verificar si la tecla presionada es la tecla Tab (código de tecla 9)
  if (event.key === ' ') {
    event.preventDefault();
    // Aplicar el aumento de velocidad al paddle
    paddle.boost(boostSpeed);
  }
}
function desactivarBoost(event) {
  // Verificar si la tecla liberada es la barra espaciadora
  if (event.key === ' ') {
    
    event.preventDefault();

    boosting = false / 2  ; // le meto un /2 para quitar el x2 que se aplica y no haga bug
    paddle.restoreOriginalSpeed();
  }
}
