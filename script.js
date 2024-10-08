let circleColor;
let previousKey = null;

function setup() {
  createCanvas(1000, 800);
  circleColor = color(255);
}

function draw() {
  handleKeyPress()
  background(0);
  fill(circleColor);
  ellipse(width / 2, height / 2, 100, 100);
}

function handleKeyPress() {
  let currentKey = null;

  // handling key presses
    if (keyIsDown(65)) { // A (weak)
      currentKey = 'a';
      circleColor = color(0, 255, 0);
    } else if (keyIsDown(83)) { // S (mid)
      currentKey = 's';
      circleColor = color(0, 0, 255);
    } else if (keyIsDown(87)) { // W (strong)
      currentKey = 'w';
      circleColor = color(255, 0, 0);
    } else {
      circleColor = color(255);
    }

    // printing key presses to the console only once
    if (currentKey !== previousKey) {
      if (currentKey === 'a') {
        console.log('a, weak punch')
      } else if (currentKey === 's') {
        console.log('s, mid punch')
      } else if (currentKey === 'w') {
        console.log('w, strong punch')
      } else {
        console.log('-')
      }
      previousKey = currentKey;
    }

  }