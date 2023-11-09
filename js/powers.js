class BallX2 {
  constructor(location) {
    this.radius = 8;
    this.size = this.radius * 3;
    this.location = location;
    this.velocity = createVector(0, 2);
    this.image = loadImage('./art/MULTI.png');
  }

  display() {
    image(this.image, this.location.x - this.size * 2, this.location.y - this.size * 2, this.size, this.size);
  }

  update() {
    this.location.add(this.velocity);
  }

  splitBall(balls) {
    if (balls.length > 0) {
      const newBalls = [];
      for (let i = 0; i < balls.length; i++) {
        const newBall = new Ball(balls[i].paddle);
        newBall.location.x = this.location.x; // Ajusta la posición inicial si es necesario
        newBalls.push(newBall);
      }
  
      return newBalls;
    }
    return [];
  }
  
}

class PaddleUP {
  constructor(location) {
    this.widthIncrease = 20;
    this.image = loadImage('./art/masTamaño.png');
    this.location = location;
    this.velocity = createVector(0, 2);
    this.isActive = false; // Nueva propiedad para rastrear el estado del PaddleUP
  }
  

  display() {
    image(this.image, this.location.x, this.location.y, this.widthIncrease, 10);
  }

  update() {
    this.location.add(this.velocity);
  }

  applyEffect(paddle) {
    paddle.width += this.widthIncrease;
  }
}