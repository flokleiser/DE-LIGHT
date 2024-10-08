let circleColor;
let previousKey = null;
let keyStates = {};

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
    // if (keyIsDown(65)) { // A (weak)
    //   currentKey = 'a';
    //   circleColor = color(0, 255, 0);
    // } else if (keyIsDown(83)) { // S (mid)
    //   currentKey = 's';
    //   circleColor = color(0, 0, 255);
    // } else if (keyIsDown(87)) { // W (strong)
    //   currentKey = 'w';
    //   circleColor = color(255, 0, 0);
    // } else {
    //   circleColor = color(255);
    // }
    if (keyStates[65]) { // A (weak)
      currentKey = 'a';
      circleColor = color(0, 255, 0);
    } 
    if (keyStates[83]) { // S (mid)
      currentKey = 's';
      circleColor = color(0, 0, 255);
    } 
    if (keyStates[87]) { // W (strong)
      currentKey = 'w';
      circleColor = color(255, 0, 0);
    }
    if (!keyStates[65] && !keyStates[83] && !keyStates[87]) {
      circleColor = color(255);
    }
   

    // printing key presses to the console only once
    if (currentKey !== previousKey) {
      if (currentKey === 'a') {
        console.log('A --> weak punch')
      } else if (currentKey === 's') {
        console.log('S --> mid punch')
      } else if (currentKey === 'w') {
        console.log('W --> strong punch')
      } else {
        console.log('-')
      }
      previousKey = currentKey;
    }

  }

  // checking if multiple keys pressed
  function keyPressed() {
    keyStates[keyCode] = true;
  }
  
  function keyReleased() {
    keyStates[keyCode] = false;
  }