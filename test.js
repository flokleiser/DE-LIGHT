let circleColor;
let targetColor
let circleRadius1 = 250;
let targetRadius = 250;
let lerpAmount = 0.5;
let previousKey = null;
let keyStates = {};

let currentMode = 1;

function setup() {
  createCanvas(1000, 800);
  circleColor1 = color(255);
  targetColor1 = color(255)
}

function draw() {
  handleKeyPress()
  background(0);
  circleColor1 = lerpColor(circleColor1, targetColor1, lerpAmount);
  circleRadius1 = lerp(circleRadius1, targetRadius1, lerpAmount);
  fill(circleColor1);
  ellipse(width / 2, height / 2, circleRadius1, circleRadius1);
}

function handleKeyPress() {
  let currentKey = null;
    if (keyCode === 65) { // A (weak)
      currentKey = 'a';
      targetColor1 = color(238, 210, 2);
      targetRadius1 = 275;
    } 
    else if (keyCode === 87) {
        console.log('test')
    }
  }
