let playerScore = 0;
let paddle;
let balls; // Arreglo para rastrear todas las bolas en juego
let bricks;
let gameState;
let powerUps; // Arreglo para rastrear los power-ups

function setup() {
  createCanvas(800, 600);

  let colors = createColors();
  gameState = 'playing';
  paddle = new Paddle();
  balls = [new Ball(paddle)]; // Agregamos la bola inicial al arreglo
  bricks = createBricks(colors);
  powerUps = []; // Inicializamos el arreglo de power-ups
}


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
  const bricks = []
  const rows = 10
  const bricksPerRow = 15
  const brickWidth = width / bricksPerRow
  for (let row = 0; row < rows; row++) {
    for (let i = 0; i < bricksPerRow; i++) {
      brick = new Brick(createVector(brickWidth * i, 25 * row), brickWidth, 25, colors[floor(random(0, colors.length))])
      bricks.push(brick)
    }
  }
  return bricks
}

function draw() {
  if (gameState === 'playing') {
    background(0);
    paddle.display();
    textSize(32);
    fill(255);
    text(`Score: ${playerScore}`, width - 770, 580);

    for (let i = 0; i < balls.length; i++) {
      const ball = balls[i];
      ball.bounceEdge();
      ball.bouncePaddle();
      ball.update();
      ball.display();
    }

    if (keyIsDown(LEFT_ARROW)) {
      paddle.move('left');
    } else if (keyIsDown(RIGHT_ARROW)) {
      paddle.move('right');
    }

    for (let i = bricks.length - 1; i >= 0; i--) {
      const brick = bricks[i];
      if (brick && brick.isColliding(balls[0])) { // Comprobamos solo con la primera bola
        const releasedPowerUp = brick.releasePowerUp();
        if (releasedPowerUp) {
          powerUps.push(releasedPowerUp);
        }

        for (let j = 0; j < balls.length; j++) {
          balls[j].reverse('y');
        }

        bricks.splice(i, 1);
        playerScore += brick.points;
      } else {
        brick.display();
      }
    }

    // POWERS UPS ALEATORIOS 
    for (let i = powerUps.length - 1; i >= 0; i--) {
      const powerUp = powerUps[i];
      powerUp.display();
      powerUp.update();

      if (powerUp.location.y + powerUp.size / 2 > paddle.location.y && powerUp.location.y - powerUp.size / 2 < paddle.location.y + paddle.height) {
        // Colisión con el paddle
        if (powerUp.location.x + powerUp.size / 2 > paddle.location.x && powerUp.location.x - powerUp.size / 2 < paddle.location.x + paddle.width) {
          if (powerUp instanceof BallX2) {
            // Aplicar el power-up BallX2
            const newBalls = powerUp.splitBall(balls, paddle); // Divide la pelota
            balls = balls.concat(newBalls); // Agrega las nuevas bolas al arreglo de bolas
          }
          powerUps.splice(i, 1); // Elimina el power-up si no toca la pala
        }
      }

      for (let i = balls.length - 1; i >= 0; i--) {
        const ball = balls[i];
        ball.display();

        if (ball.belowBottom()) {
          balls.splice(i, 1);
        }
      }

      if (balls.length === 0) { // Si no quedan bolas en juego
        gameState = 'Lose';
      }
      if (bricks.length === 0) {
        gameState = 'Win';
      } else {
        textSize(100);
        if (gameState === 'Lose') {
          fill(255, 0, 255);
          gameOver();
        } else if (gameState === 'Win') {
          fill(255);
          text('You Win!!!', width / 2 - 180, height / 2);
        }
      }
    }
  }
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