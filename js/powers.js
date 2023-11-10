class BallX2 {
  constructor(location) {
    this.radius = 8;
    this.size = this.radius * 3;
    this.location = location;
    this.velocity = createVector(0, 1);
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
    this.velocity = createVector(0, 1);
    this.isActive = false;
    this.shouldBeRemoved = false;
  }

  display() {
    image(this.image, this.location.x, this.location.y, this.widthIncrease, 20);
  }

  update() {
    this.location.add(this.velocity);
  }

  applyEffect(paddle) {
    paddle.width += this.widthIncrease;
  }
  markForRemoval() {
    this.shouldBeRemoved = true;
  }

  isColliding(paddle) {
    return (
      this.location.y > paddle.location.y &&
      this.location.y < paddle.location.y + paddle.height &&
      this.location.x > paddle.location.x - this.widthIncrease &&  // Ajusta aquí para detectar colisión en el lado izquierdo
      this.location.x < paddle.location.x + paddle.width + this.widthIncrease // Ajusta aquí para detectar colisión en el lado derecho
    );
  }
}


class PaddleDown {
  constructor(location) {
    this.widthDecrease = 20;
    this.image = loadImage('./art/menosTamaño.png');
    this.location = location;
    this.velocity = createVector(0, 1);
    this.isActive = false;
  }

  display() {
    // Ajusta el tercer y cuarto parámetro según el nuevo tamaño deseado
    const newWidth = this.widthDecrease; // Nueva anchura
    const newHeight = 20; // Nueva altura
    image(this.image, this.location.x, this.location.y, 20, 20);
  }

  update() {
    this.location.add(this.velocity);
  }

  applyEffect(paddle) {
    paddle.width -= this.widthDecrease; // Reducir la anchura del paddle
  }

  markForRemoval() {
    this.shouldBeRemoved = true;
  }

  isColliding(paddle) {
    return (
      this.location.y > paddle.location.y &&
      this.location.y < paddle.location.y + paddle.height &&
      this.location.x > paddle.location.x - this.widthDecrease &&  // Ajusta aquí para detectar colisión en el lado izquierdo
      this.location.x < paddle.location.x + paddle.width + this.widthDecrease // Ajusta aquí para detectar colisión en el lado derecho
    );
  }
}