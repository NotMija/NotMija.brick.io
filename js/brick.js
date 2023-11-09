class Brick {
  constructor(location, width, height, color) {
    this.location = location;
    this.width = width;
    this.height = height;
    this.color = color;
    this.points = 1;
    this.containsBallX2 = random() < 0.07; // 7% de posibilidades de contener BallX2
    this.containsPaddleUP = random() < 0.07; // 7% de posibilidades
  }

  display() {
    fill(this.color);
    rect(this.location.x, this.location.y, this.width, this.height);
  }

  // liberar el power-up
  releasePowerUp() {
    if (this.containsBallX2) {
      this.containsBallX2 = false; // Desactiva el BallX2 en el ladrillo
      return new BallX2(createVector(this.location.x + this.width / 2, this.location.y + this.height));
    }
    return null;
  }

  releasePowerUp2() {
    if (this.containsPaddleUP) {
      this.containsPaddleUP = false;
      return new PaddleUP(createVector(this.location.x + this.width / 2, this.location.y + this.height));
    }
    return null;
  }

  isColliding(ball) {
    if (ball && ball.location) { // Verifica que 'ball' y 'ball.location' estén definidos
      if (ball.location.y - ball.radius <= this.location.y + this.height &&
          ball.location.y + ball.radius >= this.location.y &&
          ball.location.x + ball.radius >= this.location.x &&
          ball.location.x - ball.radius <= this.location.x + this.width) {
        return true;
      }
    }
    return false;
  }
}  
  
  
  