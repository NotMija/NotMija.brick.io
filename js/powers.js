class BallX2 {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.image = BallX2Img; // Imagen del power-up
      this.active = true;
      this.speedy = 2; // Velocidad de caída
    }
  
    display() {
      if (this.active) {
        image(this.image, this.x, this.y);
      }
    }
  
    update() {
      if (this.active) {
        this.y += this.speedy;
      }
    }
  
    isCollected(paddle) {
      if (
        this.active &&
        this.y + this.image.height > paddle.y &&
        this.x + this.image.width > paddle.x &&
        this.x < paddle.x + paddle.w
      ) {
        this.active = false;
        // Implementa el efecto del power-up
        // ...
        return true;
      }
      return false;
    }
  }
  