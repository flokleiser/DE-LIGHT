let circleColor;

function setup() {
  createCanvas(1000, 800);
  circleColor = color(255);
}

function draw() {
  testKeyIsDown()
  background(0);
  fill(circleColor);
  ellipse(width / 2, height / 2, 100, 100);
}

function testKeyIsDown() {
    if (keyIsDown(65)) { // A (weak)
      circleColor = color(0, 255, 0);
    } else if (keyIsDown(83)) { // S (mid)
      circleColor = color(0, 0, 255);
    } else if (keyIsDown(87)) { // W (strong)
      circleColor = color(255, 0, 0);
    } else {
      circleColor = color(255);
    }
  }
