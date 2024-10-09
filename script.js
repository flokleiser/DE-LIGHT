let circleColor;
let targetColor
let circleRadius1 = 250; // at 60 cm distance perfect
let targetRadius = 250;
let lerpAmount = 0.5;
let previousKey = null;
let keyStates = {};

let currentMode = 1;

// Initializing the canvas
function setup() {
  createCanvas(1000, 800);
  circleColor = color(255);
  targetColor = color(255)
}

// draw loop (runs every frame)
function draw() {

  // setMode()

  handleKeyPress()
  background(0);
  circleColor = lerpColor(circleColor, targetColor, lerpAmount);
  circleRadius1 = lerp(circleRadius1, targetRadius, lerpAmount);
  fill(circleColor);


 if (currentMode === 1) {
  ellipse(width / 2, height / 2, circleRadius1, circleRadius1);
 }
 else if (currentMode === 2) {
  ellipse(width / 4, height / 4, circleRadius1, circleRadius1);
  ellipse((width / 4)*3, (height / 4 * 3), circleRadius1, circleRadius1);
  ellipse((width / 4)*3, height / 4 , circleRadius1, circleRadius1);
  ellipse(width / 4, (height / 4)*3  , circleRadius1, circleRadius1);
 }

  textAlign(CENTER);
  textSize(16);
  text(`${key} : ${keyCode}`, 50, 50);
}

function handleKeyPress() {
  // handle the key presses
  let currentKey = null;

  if (keyStates[49]) {
    currentMode = 1;
    console.log('Mode 1 selected');
  } else if (keyStates[50]) {
    currentMode = 2;
    console.log('Mode 2 selected');
  }

  if (currentMode === 1) { // first mode
    if (keyStates[65]) { // A (weak)
      currentKey = 'a';
      targetColor = color(238, 210, 2);
      targetRadius = 275;
    } 
    if (keyStates[83]) { // S (mid)
      currentKey = 's';
      targetColor = color(255, 102, 0);
      targetRadius = 325;
    } 
    if (keyStates[87]) { // W (strong)
      currentKey = 'w';
      targetColor = color(255, 0, 0);
      targetRadius = 375;
    }
    if (!keyStates[65] && !keyStates[83] && !keyStates[87]) { //set to white otherwise
      targetColor = color(255);
      targetRadius = 250;
    }
  } else if (currentMode === 2) {
    // testing different mode
  }

    if (currentKey !== previousKey) {
      if (currentKey === 'a') {
        console.log('A --> weak punch')
      } else if (currentKey === 's') {
        console.log('S --> mid punch')
      } else if (currentKey === 'w') {
        console.log('W --> strong punch')
      } else {
        console.log('------------------')
      }
      previousKey = currentKey;
    }

  }


  function keyPressed() {
    keyStates[keyCode] = true;
  }
  function keyReleased() {
    keyStates[keyCode] = false;
  }
