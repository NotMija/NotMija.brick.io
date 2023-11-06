let playerScore = 0
let paddle
let ball
let bricks
let gameState

function setup() {
  createCanvas(800, 600)

  let colors = createColors()
  gameState = 'playing'
  paddle = new Paddle()
  ball = new Ball(paddle)

  bricks = createBricks(colors)
}

function createColors() {
  const colors = []
  colors.push(color(265, 165, 0))
  colors.push(color(135, 206, 250))
  colors.push(color(147, 112, 219))
  for (let i = 0; i < 10; i++) {
    colors.push(color(random(0, 255), random(0, 255), random(0, 255)))
  }
  return colors
}

function createBricks(colors) {
  const bricks = []
  const rows = 10
  const bricksPerRow = 10
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
  if(gameState === 'playing') {
    background(0)

    ball.bounceEdge()
    ball.bouncePaddle()
    
    ball.update()

    if (keyIsDown(LEFT_ARROW)) {
      paddle.move('left')
    } else if (keyIsDown(RIGHT_ARROW)) {
      paddle.move('right')
    }

    for (let i = bricks.length - 1; i >= 0; i--) {
      const brick = bricks[i]
      if (brick.isColliding(ball)) {
        ball.reverse('y')
        bricks.splice(i, 1)
        playerScore += brick.points
      } else {
        brick.display()
      }
    }

    paddle.display()
    ball.display()

    textSize(32)
    fill(255)
    text(`Score:${playerScore}`, width - 770, 580)

    if (ball.belowBottom()) {
      gameState = 'Lose';
    }

    if (bricks.length === 0) {
      gameState = 'Win';
    }
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