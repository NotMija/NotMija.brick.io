let playerScore = 0;
let paddle;
let balls; // Arreglo para rastrear todas las bolas en juego
let bricks;
let gameState;
let powerUps; // Arreglo para rastrear los power-ups
let paddles;

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

function draw() {
  if (gameState === 'playing') {
    background(0);
    paddle.display();
    textSize(32);
    fill(255);
    text(`Score: ${playerScore}`, width - 870, 580);

    // Romper ladrillos caen los items
    for (let i = 0; i < balls.length; i++) {
      const ball = balls[i];
      ball.bounceEdge();
      ball.bouncePaddle();
      ball.update();
      ball.display();

      for (let j = bricks.length - 1; j >= 0; j--) {
        const brick = bricks[j];
        if (brick && brick.isColliding(ball)) {
          const releasedPowerUp = brick.releasePowerUp();
          const releasedPowerUp2 = brick.releasePowerUp2();
          const releasedPowerUp3 = brick.releasePowerUp3();

          if (releasedPowerUp) {
            powerUps.push(releasedPowerUp);
          }

          if (releasedPowerUp2) {
            powerUps.push(releasedPowerUp2);
          }

          if (releasedPowerUp3) {
            powerUps.push(releasedPowerUp3);
          }

          ball.reverse('y');
          bricks.splice(j, 1);
          playerScore += brick.points;
        } else {
          brick.display();
        }
      }
    }
    //MOV IZQ O DRCH PALA
    if (keyIsDown(LEFT_ARROW)) {
      paddle.move('left');
    } else if (keyIsDown(RIGHT_ARROW)) {
      paddle.move('right');
    }

    // SI LOS ITEMS TOCAN LA PALA Y CLEAN 

    for (let i = powerUps.length - 1; i >= 0; i--) {
      const powerUp = powerUps[i];
      powerUp.display();
      powerUp.update();

      if (powerUp.location.y + powerUp.size / 2 > paddle.location.y && powerUp.location.y - powerUp.size / 2 < paddle.location.y + paddle.height) {
        if (powerUp.location.x + powerUp.size / 2 > paddle.location.x && powerUp.location.x - powerUp.size / 2 < paddle.location.x + paddle.width) {
          if (powerUp instanceof PaddleUP) {
            powerUp.applyEffect(paddle);
          } else if (powerUp instanceof BallX2) {
            const newBalls = powerUp.splitBall(balls, paddle);
            balls = balls.concat(newBalls);
          }
          powerUps.splice(i, 1);
        }
      }
    }

    // DETECTART WIM OR LOST CAIDA PELOTAS 

    for (let i = balls.length - 1; i >= 0; i--) {
      const ball = balls[i];
      ball.display();

      if (ball.belowBottom()) {
        balls.splice(i, 1);
      }
    }

    if (balls.length === 0) {
      gameState = 'Lose';
    }

    if (bricks.length === 0) {
      gameState = 'Win';
    }
    if (gameState === 'Win') {
      youWin();
    }
  }
  if (gameState === 'Lose') {
    gameOver();
  }

  //borrar powers de paddel y que se apliquen

  for (let i = powerUps.length - 1; i >= 0; i--) {
    const powerUp = powerUps[i];
    powerUp.display();
    powerUp.update();

    for (let j = 0; j < paddles.length; j++) {
      const paddle = paddles[j];

      // Verificar si la power-up está colisionando con el paddle
      if (typeof powerUp.isColliding === 'function' && powerUp.isColliding(paddle)) {
        if (powerUp instanceof PaddleUP) {
          powerUp.applyEffect(paddle);
        } else if (powerUp instanceof PaddleDown) {
          powerUp.applyEffect(paddle);
        }
        powerUps.splice(i, 1); // Eliminar el power
      }
    }
  }

  function youWin() {
    background(0);
    textSize(32);
    textAlign(CENTER);
    fill(80, 255, 80);
    text('YOU WIN', width / 2, height / 2);

    textSize(24);
    fill(255);
    text(`Score: ${playerScore}`, width / 2, height / 2 + 40);
  }

  function gameOver() {
    background(0);
    textSize(32);
    textAlign(CENTER);
    fill(255, 80, 80);
    text('GAME OVER', width / 2, height / 2);

    textSize(24);
    fill(255);
    text(`Score: ${playerScore}`, width / 2, height / 2 + 40);
  }

}