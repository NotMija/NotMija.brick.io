class BallX2 {
  constructor(location) {
    this.radius = 8;
    this.size = this.radius * 3;
    this.location = location;
    this.velocity = createVector(0, 2); // Ajusta la velocidad
    this.image = loadImage('./art/MULTI.png'); // Carga la imagen del power-up
  }

  display() {
    image(this.image, this.location.x - this.size * 2, this.location.y - this.size * 2, this.size, this.size);
  }

  update() {
    this.location.add(this.velocity);
  }

  split() {
    const newBalls = [
      new Ball(this.paddle, this.location.x, this.location.y),
      new Ball(this.paddle, this.location.x, this.location.y)
    ];

    return newBalls;
  }
}
