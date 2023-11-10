function reiniciarJuego() {
    playerScore = 0;
    paddle = new Paddle();
    balls = [new Ball(paddle)];
    bricks = createBricks(createColors());
    powerUps = [];
    paddles = [paddle];
    gameState = 'playing';
  }