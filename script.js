//circle 1
let circleColor1;
let targetColor1;
let circleRadius1 = 250; // at 60 cm distance perfect
let targetRadius1 = 250;

//circle 2
let circleColor2;
let targetColor2;
let circleRadius2 = 250; // at 60 cm distance perfect
let targetRadius2 = 250;

//circle 3
let circleColor3;
let targetColor3;
let circleRadius3 = 250; // at 60 cm distance perfect
let targetRadius3 = 250;

//circle 4 
let circleColor4;
let targetColor4;
let circleRadius4 = 250; // at 60 cm distance perfect
let targetRadius4 = 250;

let lerpAmount = 0.5;
let previousKey = null;
let keyStates = {};

let currentMode = 1;

// Initializing the canvas
function setup() {
  createCanvas(1000, 800);
  circleColor1 = color(255);
  targetColor1 = color(255)

  circleColor2 = color(255);
  targetColor2 = color(255)

  circleColor3 = color(255);
  targetColor3 = color(255)

  circleColor4 = color(255);
  targetColor4 = color(255)
}

// draw loop (runs every frame)
function draw() {
  handleKeyPress()
  background(0);
  circleColor1 = lerpColor(circleColor1, targetColor1, lerpAmount);
  circleRadius1 = lerp(circleRadius1, targetRadius1, lerpAmount);
  circleColor2 = lerpColor(circleColor2, targetColor2, lerpAmount);
  circleRadius2 = lerp(circleRadius2, targetRadius2, lerpAmount);
  circleColor3 = lerpColor(circleColor3, targetColor3, lerpAmount);
  circleRadius3 = lerp(circleRadius3, targetRadius3, lerpAmount);
  circleColor4 = lerpColor(circleColor4, targetColor4, lerpAmount);
  circleRadius4 = lerp(circleRadius4, targetRadius4, lerpAmount);


 if (currentMode === 1) { // only one circle
  fill(circleColor1);
  ellipse(width / 2, height / 2, circleRadius1, circleRadius1);
 }

 else if (currentMode === 2) { // four circles
  // fill(circleColor2);
  ellipse(width / 4, height / 4, circleRadius1, circleRadius1);
  ellipse((width / 4)*3, (height / 4 * 3), circleRadius2, circleRadius2);
  ellipse((width / 4)*3, height / 4 , circleRadius3, circleRadius3);
  ellipse(width / 4, (height / 4)*3  , circleRadius4, circleRadius4);
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
    console.log('Mode 1');
  } else if (keyStates[50]) {
    currentMode = 2;
    console.log('Mode 2');
  }



  if (currentMode === 1) { // first mode
    if (keyStates[65]) { // A (weak)
      currentKey = 'a';
      targetColor1 = color(238, 210, 2);
      targetRadius1 = 275;
    } 
    if (keyStates[83]) { // S (mid)
      currentKey = 's';
      targetColor1 = color(255, 102, 0);
      targetRadius1 = 325;
    } 
    if (keyStates[87]) { // W (strong)
      currentKey = 'w';
      targetColor1 = color(255, 0, 0);
      targetRadius1 = 375;
    }
    if (!keyStates[65] && !keyStates[83] && !keyStates[87]) { //set to white otherwise
      targetColor1 = color(255);
      targetRadius1 = 250;
    }



  } else if (currentMode === 2) {
    //FIRST PUNCHING BAG
    if (keyStates[65]) { // A (weak)
      targetColor1 = color(238, 210, 2);
      targetRadius1 = 275;
    } 
    if (keyStates[83]) { // S (mid)
      targetColor1 = color(255, 102, 0);
      targetRadius1 = 325;
    } 
    if (keyStates[87]) { // W (strong)
      targetColor1 = color(255, 0, 0);
      targetRadius1 = 375;
    }

    //SECOND PUNCHING BAG
    if (keyStates[70]) { // F (weak)
      targetColor2 = color(238, 210, 2);
      targetRadius2 = 275;
    } 
    if (keyStates[71]) { // G (mid)
      targetColor2 = color(255, 102, 0);
      targetRadius2 = 325;
    } 
    if (keyStates[68]) { // D (strong)
      targetColor2 = color(255, 0, 0);
      targetRadius2 = 375;
    }

    //THIRD PUNCHING BAG
    if (keyStates[38]) { // arrow up (weak)
      targetColor3 = color(238, 210, 2);
      targetRadius3 = 275;
    } 
    if (keyStates[40]) { // arrow down (mid)
      targetColor3 = color(255, 102, 0);
      targetRadius3 = 325;
    } 
    if (keyStates[37]) { // arrow left (strong)
      targetColor3 = color(255, 0, 0);
      targetRadius3 = 375;
    }

    //FOURTH PUNCHING BAG
    if (keyStates[39]) { // arrow right(weak)
      targetColor4 = color(238, 210, 2);
      targetRadius4 = 275;
    } 
    if (keyStates[32]) { // spacebar (mid)
      targetColor4 = color(255, 102, 0);
      targetRadius4 = 325;
    } 
    //idk how to make this mouse click
    // if (keyStates[37]) { // arrow left (strong)
    //   targetColor3 = color(255, 0, 0);
    //   targetRadius3 = 375;
    // }


    if (!keyStates[65] && !keyStates[83] && !keyStates[87] &&! keyStates[70] && !keyStates[71] && !keyStates[68]  &&! keyStates[38] && !keyStates[40] && !keyStates[37] && !keyStates[39] && !keyStates[32]) { //set to white otherwise
      targetColor1 = color(255);
      targetRadius1 = 250;
      targetColor2 = color(255);
      targetRadius2 = 250;
      targetColor3 = color(255);
      targetRadius3 = 250;
      targetColor4 = color(255);
      targetRadius4 = 250;
    }
  }

  if (currentMode === 1) {
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

  }


  function keyPressed() {
    keyStates[keyCode] = true;
  }
  function keyReleased() {
    keyStates[keyCode] = false;
  }
