class Paddle {
  constructor() {
    this.width = 150
    this.height = 10
    this.color = color(255)
    this.location = createVector((width / 2) - (this.width / 2), height - 75)
    const speed = 6
    this.speed = {
      right: createVector(speed, 0),
      left: createVector(speed * -1, 0)
    }
  }

  display() {
    fill(this.color)
    rect(this.location.x, this.location.y, this.width, this.height)
  }

  move(direction) {
    this.location.add(this.speed[direction])

    if (this.location.x < 0) {
      this.location.x = 0
    } else if (this.location.x + this.width > width) {
      this.location.x = width - this.width
    }
  }
  boost(boostSpeed) {
    // Aumentar la velocidad actual del paddle
    this.speed.right.mult(boostSpeed);
    this.speed.left.mult(boostSpeed);
  }
  restoreOriginalSpeed() {
    this.speed.right.mult(1 / boostSpeed);
    this.speed.left.mult(1 / boostSpeed)
}
}