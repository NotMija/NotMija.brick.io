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
  
        if (boosting) {
          paddle.boost(boostSpeed);
        }
  
        for (let j = bricks.length - 1; j >= 0; j--) {
          const brick = bricks[j];
          if (brick && brick.isColliding(ball)) {
            const releasedPowerUp = brick.releasePowerUp();
            const releasePowerUpMas = brick.releasePowerUpMas();
            const releasePowerUpMenos = brick.releasePowerUpMenos();
  
            if (releasedPowerUp) {
              powerUps.push(releasedPowerUp);
            }
  
            if (releasePowerUpMas) {
              powerUps.push(releasePowerUpMas);
            }
  
            if (releasePowerUpMenos) {
              powerUps.push(releasePowerUpMenos);
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
  
      // DETECTAR WIM OR LOST CAIDA PELOTAS 
  
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
  
      balls = [];
      bricks = [];
      powerUps = [];
      paddles = [];
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
  
      balls = [];
      bricks = [];
      powerUps = [];
      paddles = [];
    }
  
  }