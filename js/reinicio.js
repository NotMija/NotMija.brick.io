function reiniciarJuego() {
    playerScore = 0;
    paddle = new Paddle();
    balls = [new Ball(paddle)];
    bricks = createBricks(createColors());
    powerUps = [];
    paddles = [paddle];
    gameState = 'playing';

    textSize(32);
    fill(255);
    textAlign(LEFT);
  }

  function reiniciarConTeclaF(event) {
    // Verificar si la tecla presionada es la "F" (código de tecla 70)
    if (event.key === 'F' || event.key === 'f') {
      reiniciarJuego();
    }
  }