//circle 1
let circleColor1;
let targetColor1;
let circleRadius1 = 250; // at 60 cm distance perfect
let targetRadius1 = 250;

//circle 2
let circleColor2;
let targetColor2;
let circleRadius2 = 250;
let targetRadius2 = 250;

//circle 3
let circleColor3;
let targetColor3;
let circleRadius3 = 250;
let targetRadius3 = 250;

//circle 4
let circleColor4;
let targetColor4;
let circleRadius4 = 250;
let targetRadius4 = 250;

//big circle 1
let circleColorBig;
let targetColorBig;
let circleRadiusBig = 525;
let targetRadiusBig = 525;

let lerpAmount = 0.5;
let previousKey = null;
let keyStates = {};

let randomNumberGenerated= false

let currentMode = 0;
let selectedMode = 0

let fading = false
let fadingTimer = 0
let otherTimer = 0

let testColor = 255

let randomCircle1Test = false
let randomCircle2Test = false   
let randomNumberSeed1 = [2, 5, 0, 1, 3, 4]
let randomNumberSeed2 = [5, 0, 1, 3, 4, 2]
// let randomNumberSeed3 =
// let randomNumberSeed4 =
// let randomNumberSeed5 =



function setup() {
    createCanvas(1120, 865);
    returnRandomNumber();
    console.log(randomNumber)
    // if (randomNumber < 1) {
    //     randomCircle1Test = true, randomCircle2Test = false
    //     console.log('case 1')
    // }
    // if (randomNumber > 1) {
    //     randomCircle2Test = true, randomCircle1Test = false;
    //     console.log('case 2')
    // }


    //eventlisteners for mouse click
    canvas.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        keyStates[3] = true;
        handleKeyPress();
    });

    canvas.addEventListener("mouseup", (e) => {
        if (e.button === 2) {
            keyStates[3] = false;
        }
    });

    circleColor1 = color(255);
    targetColor1 = color(255);

    circleColor2 = color(255);
    targetColor2 = color(255);

    circleColor3 = color(255);
    targetColor3 = color(255);

    circleColor4 = color(255);
    targetColor4 = color(255);

    circleColorBig = color(255);
    targetColorBig = color(255);
}

function draw() {
    handleKeyPress();

	circleColor1 = lerpColor(circleColor1, targetColor1, lerpAmount);
    circleRadius1 = lerp(circleRadius1, targetRadius1, lerpAmount);
    circleColor2 = lerpColor(circleColor2, targetColor2, lerpAmount);
    circleRadius2 = lerp(circleRadius2, targetRadius2, lerpAmount);
    circleColor3 = lerpColor(circleColor3, targetColor3, lerpAmount);
    circleRadius3 = lerp(circleRadius3, targetRadius3, lerpAmount);
    circleColor4 = lerpColor(circleColor4, targetColor4, lerpAmount);
    circleRadius4 = lerp(circleRadius4, targetRadius4, lerpAmount);
    circleColorBig = lerpColor(circleColorBig, targetColorBig, lerpAmount);
    circleRadiusBig = lerp(circleRadiusBig, targetRadiusBig, lerpAmount);

    if (currentMode === 0) {
		menu();
    } else if (currentMode === 1) {
        //this kinda works for fading the color
        // checkFade()
		mode1();
    } else if (currentMode === 2) {
		mode2();
    } else if (currentMode === 3) {
		mode3();
	} else if (currentMode === 4) {
		mode4();
	}
}

//custom draw function test
// function mode1Draw() {
//     let scale = 1
//     background(0,0,0,10);
//     handleKeyPress();

// 	circleColor1 = lerpColor(circleColor1, targetColor1, lerpAmount);
//     circleRadius1 = lerp(circleRadius1, targetRadius1, lerpAmount);
//     circleColor2 = lerpColor(circleColor2, targetColor2, lerpAmount);
//     circleRadius2 = lerp(circleRadius2, targetRadius2, lerpAmount);
//     circleColor3 = lerpColor(circleColor3, targetColor3, lerpAmount);
//     circleRadius3 = lerp(circleRadius3, targetRadius3, lerpAmount);
//     circleColor4 = lerpColor(circleColor4, targetColor4, lerpAmount);
//     circleRadius4 = lerp(circleRadius4, targetRadius4, lerpAmount);
//     circleColorBig = lerpColor(circleColorBig, targetColorBig, lerpAmount);
//     circleRadiusBig = lerp(circleRadiusBig, targetRadiusBig, lerpAmount);
//     // mode1()
//     circle(width/2,height/2,scale)
// }


//failed transition test
// function setFade() {
//     fading = true
//     fadeTimer = 0
//     fadeTimer++
//     if (fadeTimer > 1000) {
//        fading = false 
//        return
//     }
//     console.log('fading' + fading)
// }

//kinda successful fade test
function checkFade() {
    if (fading) {
        circleColor1 = color(testColor);
        testColor -= 5 
        background(0,0,0,10);
        console.log('fading')
    } 
    if ( testColor < 0) {
        background(0)
        fading = false
        console.log('fade stopped')
        circleColor1 = lerpColor(circleColor1, targetColor1, lerpAmount);
    }
}

//different modes
function menu() {
    background(0);
	fill(255);

    let centerTextSize = (circleRadiusBig / 2) - 50 ;
    // let selectedColor = color(0, 255, 0);
	// drawPunchingBags();
    switch (selectedMode) {
        case 1: circleRadius1 = circleRadius1 + 30; break;
        case 2: circleRadius2 = circleRadius2 + 30; break;
        case 3: circleRadius3 = circleRadius3 + 30; break;
        case 4: circleRadius4 = circleRadius4 + 30; break;
    }

    fill(selectedMode === 1 ? 255 : 100)
    ellipse(width / 6.5, height / 4.75, circleRadius1, circleRadius1);
    fill(selectedMode === 2 ? 255 : 100)
    ellipse(width / 6.5, (height / 4.75) * 3.75, circleRadius2, circleRadius2);
    fill(selectedMode === 3 ? 255 : 100)
    ellipse( (width / 6.5) * 5.5, (height / 4.75) * 3.75, circleRadius3, circleRadius3 );
    fill(selectedMode === 4 ? 255 : 100)
    ellipse((width / 6.5) * 5.5, height / 4.75, circleRadius4, circleRadius4);
    hexagon(width/2, height/2, 255);

	//menu texts
	fill(0);
	textSize(32);
	textAlign(CENTER, CENTER);
	textSize(centerTextSize);
	text("▶", width / 2 + 20, height / 2 + 20);
	textSize(circleRadius1 / 4);
	text("Mode 1", width / 6.5, height / 4.75);
	textSize(circleRadius2 / 4);
	text("Mode 2", width / 6.5, (height / 4.75) * 3.75);
	textSize(circleRadius3 / 4);
	text("Mode 3", (width / 6.5) * 5.5, (height / 4.75) * 3.75);
	textSize(circleRadius4 / 4);
	text("Mode 4", (width / 6.5) * 5.5, height / 4.75);
}
function mode1() {
    background(0);
    drawPunchingBags(circleColor1, circleColor2, circleColor3, circleColor4, circleColorBig);
    hexagon(width/2, height/2, circleColorBig)

    fill(0);
    textSize(circleRadiusBig / 7);
	textAlign(CENTER, CENTER);
	text("Free Punch", width / 2, height / 2 );

}
function mode2() {
    background(0);
    otherTimer += 1
    console.log(otherTimer)

    circleColor1 = color(0)
    circleColor2 = color(0)
    circleColor3 = color(0)
    circleColor4 = color(0)
    circleColorBig = color(0)

    drawPunchingBags(circleColor1, circleColor2, circleColor3, circleColor4, circleColorBig);

    if (randomNumber < 1) {
        randomCircle1Test = true, randomCircle2Test = false
        console.log('case 1')
    }
    if (randomNumber > 1) {
        randomCircle2Test = true, randomCircle1Test = false;
        console.log('case 2')
    }

    if (otherTimer > 150) {
        // if (randomNumber < 2) {
        //     console.log('check')
        // } 
        if (randomCircle1Test) {
            circleColor1 = color(0,255,0);
            drawPunchingBags(circleColor1, circleColor2, circleColor3, circleColor4, circleColorBig);

            if (keyStates[65] || keyStates[83] || keyStates[87]) {
                circleColor1 = color(0);
                otherTimer = 0
            }
        }
        if (randomCircle2Test) {
            circleColor2 = color(0,255,0);
            drawPunchingBags(circleColor1, circleColor2, circleColor3, circleColor4, circleColorBig);
            if (keyStates[70] || keyStates[71] || keyStates[68]) {
                circleColor2 = color(0);
                otherTimer = 0
            }
        }
    }


    if (otherTimer > 200) {
        otherTimer = 0
        returnRandomNumber()
    }

    circleColor1 = color(0)
    circleColor2 = color(0)
    circleColor3 = color(0)
    circleColor4 = color(0)
    circleColorBig = color(0)

    // setTimeout(() => {
    //     circleColor1 = color(255) 
    //         console.log('color check');
    // }, 500);

    fill(255);
    textSize(circleRadiusBig / 7);
    textAlign(CENTER, CENTER);
    text("Reflex Mode", width / 2, height / 8);
}
function mode3() {
    // console.log('mode 3')
    // initModeAnimation()
    background(0);
    hexagon(width/2, height/2, circleColorBig)

    fill(0);
    textSize(circleRadiusBig / 7);
	textAlign(CENTER, CENTER);
	text("Not done yet", width / 2, height / 2 );
}
function mode4() {
    background(0);
	fill(255)
	drawPunchingBags(circleColor1, circleColor2, circleColor3, circleColor4, circleColorBig);
	fill(0)
	textSize(circleRadius2 / 4);
	text("Exit", width / 6.5, (height / 4.75) * 3.75);
	textSize(circleRadius3 / 4);
	text("Exit", (width / 6.5) * 5.5, (height / 4.75) * 3.75);

    fill(0);
    textSize(circleRadiusBig / 7);
	textAlign(CENTER, CENTER);
	text("How to Exit", width / 2, height / 2 );
}

function hexagon(centerX, centerY, fillColor) {
    fill(fillColor)
    push();
    translate(centerX, centerY);
    scale(circleRadiusBig/275);
    beginShape();
      vertex(-75, -130);
      vertex(75, -130);
      vertex(150, 0);
      vertex(75, 130);
    vertex(-75, 130);
      vertex(-150, 0);
      endShape(CLOSE); 
      pop();
  }

function drawPunchingBags(fillColor1, fillColor2, fillColor3, fillColor4, fillColorBig) {
    fill(fillColor1);
    ellipse(width / 6.5, height / 4.75, circleRadius1, circleRadius1);
    fill(fillColor2);
    ellipse(width / 6.5, (height / 4.75) * 3.75, circleRadius2, circleRadius2);
    fill(fillColor3);
    ellipse( (width / 6.5) * 5.5, (height / 4.75) * 3.75, circleRadius3, circleRadius3 );
    fill(fillColor4);
    ellipse((width / 6.5) * 5.5, height / 4.75, circleRadius4, circleRadius4);
    // ellipse(width / 2, height / 2, circleRadiusBig, circleRadiusBig);
    fill(fillColorBig);
    hexagon(width/2, height/2, fillColorBig);
}

function resetPunchingBags() {
    targetColor1 = color(255);
    targetRadius1 = 250;
    targetColor2 = color(255);
    targetRadius2 = 250;
    targetColor3 = color(255);
    targetRadius3 = 250;
    targetColor4 = color(255);
    targetRadius4 = 250;
    targetRadiusBig = 525;
    targetColorBig = color(255);
}

function returnRandomNumber() {
    // return randomNumber = random(1, 5);
    return randomNumber = random(0, 2);
}

//key press handling
function handleKeyPress() {
    let currentKey = null;

    //SETTING MODES
	if (selectedMode != 0 && keyStates[48] || (keyStates[70] || keyStates[71] || keyStates[68]) && (keyStates[38] || keyStates[40] || keyStates[37])) {
		currentMode = 0;
		selectedMode = 0;
		fading = false
		fadingTimer = 0
        otherTimer = 0
		console.log("Reset modes");
        returnRandomNumber()
	}
	
	if (currentMode === 0) {
		if (keyStates[65] || keyStates[83] || keyStates[87]) {
			selectedMode= 1;
			// console.log("Mode 1");
		} else if (keyStates[70] || keyStates[71] || keyStates[68]) {
			selectedMode= 2;
			// console.log("Mode 2");
		} else if (keyStates[38] || keyStates[40] || keyStates[37]) {
			selectedMode= 3;
			// console.log("Mode 3");
		} else if (keyStates[39] || keyStates[32] || keyStates[82]) {
			selectedMode= 4;
			// console.log("Mode 4");
		}
	}

	if (selectedMode != 0 && keyStates[3]) {
		// initModeAnimation();
		currentMode = selectedMode;
		// console.log("Selected mode: " + currentMode);
	}

    //FIRST PUNCHING BAG
    if (keyStates[65]) {
        // A (weak)
        currentKey = "a";
        targetColor1 = color(238, 210, 2);
        targetRadius1 = 275;
    }
    if (keyStates[83]) {
        // S (mid)
        currentKey = "s";
        targetColor1 = color(255, 102, 0);
        targetRadius1 = 325;
    }
    if (keyStates[87]) {
        // W (strong)
        currentKey = "w";
        targetColor1 = color(255, 0, 0);
        targetRadius1 = 375;
    }

    //SECOND PUNCHING BAG
    if (keyStates[70]) {
        // F (weak)
        currentKey = "f";
        targetColor2 = color(238, 210, 2);
        targetRadius2 = 275;
    }
    if (keyStates[71]) {
        // G (mid)
        currentKey = "g";
        targetColor2 = color(255, 102, 0);
        targetRadius2 = 325;
    }
    if (keyStates[68]) {
        // D (strong)
        currentKey = "d";
        targetColor2 = color(255, 0, 0);
        targetRadius2 = 375;
    }

    //THIRD PUNCHING BAG
    if (keyStates[38]) {
        // Arrow up (weak)
        currentKey = "arrow up";
        targetColor3 = color(238, 210, 2);
        targetRadius3 = 275;
    }
    if (keyStates[40]) {
        // Arrow down (mid)
        currentKey = "arrow down";
        targetColor3 = color(255, 102, 0);
        targetRadius3 = 325;
    }
    if (keyStates[37]) {
        // Arrow left (strong)
        currentKey = "arrow left";
        targetColor3 = color(255, 0, 0);
        targetRadius3 = 375;
    }

    //FOURTH PUNCHING BAG
    if (keyStates[39]) {
        // Arrow right (weak)
        currentKey = "arrow right";
        targetColor4 = color(238, 210, 2);
        targetRadius4 = 275;
    }
    if (keyStates[32]) {
        // Spacebar (mid)
        currentKey = "spacebar";
        targetColor4 = color(255, 102, 0);
        targetRadius4 = 325;
    }
    if (keyStates[82]) {
        // Left-click (mid)
        currentKey = "R/mouse pressed";
        targetColor4 = color(255, 0, 0);
        targetRadius4 = 375;
    }

    //MIDDLE PUNCHING BAG
    if (keyStates[3]) {
        // Right-click (simulated key code 3)
        currentKey = "right-click";
        targetColorBig = color(255, 0, 0);
        targetRadiusBig = 555;
        if (currentMode === 0 ){
            returnRandomNumber()
        }
    }

    //RESETTING
    if (
        !keyStates[65] &&
        !keyStates[83] &&
        !keyStates[87] &&
        !keyStates[70] &&
        !keyStates[71] &&
        !keyStates[68] &&
        !keyStates[38] &&
        !keyStates[40] &&
        !keyStates[37] &&
        !keyStates[39] &&
        !keyStates[32] &&
        !keyStates[82] &&
        !keyStates[3]
    ) {
        resetPunchingBags();
    }
}

//console.log messages, remove in final build
if (currentMode === 1) {
    // once circle, colored
    if (currentKey !== previousKey) {
        if (currentKey === "a") {
            console.log("A --> weak punch");
        } else if (currentKey === "s") {
            console.log("S --> mid punch");
        } else if (currentKey === "w") {
            console.log("W --> strong punch");
        } else {
            console.log("------------------");
        }
        previousKey = currentKey;
    }
}
if (currentMode === 2) {
    // four circles, sized
    if (currentKey !== previousKey) {
        if (currentKey === "a") {
            console.log("PunchThing 1 --> weak punch");
        } else if (currentKey === "s") {
            console.log("PunchThing 1 --> mid punch");
        } else if (currentKey === "w") {
            console.log("PunchThing 1 --> strong punch");
        } else if (currentKey === "f") {
            console.log("PunchThing 2 --> weak punch");
        } else if (currentKey === "g") {
            console.log("PunchThing 2 --> mid punch");
        } else if (currentKey === "d") {
            console.log("PunchThing 2 --> strong punch");
        } else if (currentKey === "arrow up") {
            console.log("PunchThing 3 --> weak punch");
        } else if (currentKey === "arrow down") {
            console.log("PunchThing 3 --> mid punch");
        } else if (currentKey === "arrow left") {
            console.log("PunchThing 3 --> strong punch");
        } else if (currentKey === "arrow right") {
            console.log("PunchThing 4 --> weak punch");
        } else if (currentKey === "spacebar") {
            console.log("PunchThing 4 --> mid punch");
        } else if (currentKey === "R/mouse pressed") {
            console.log("PunchThing 4 --> strong punch");
        } else if (currentKey === "right-click") {
            console.log("PunchThing Middle --> punch");
        } else {
            console.log("------------------");
        }
        previousKey = currentKey;
    }
}
if (currentMode === 3) {
    // one big one small
    if (currentKey !== previousKey) {
        if (currentKey === "a") {
            console.log("PunchThing 1 --> weak punch");
        } else if (currentKey === "s") {
            console.log("PunchThing 1 --> mid punch");
        } else if (currentKey === "w") {
            console.log("PunchThing 1 --> strong punch");
        } else if (currentKey === "d") {
            console.log("PunchThing Big");
        } else {
            console.log("------------------");
        }
        previousKey = currentKey;
    }
}

// converting mouse to r
function mousePressed() {
    if (mouseButton === LEFT) {
        keyStates[82] = true;
        handleKeyPress();
    }
}
function mouseReleased() {
    if (mouseButton === LEFT) {
        keyStates[82] = false;
    }
}

// checking which keys are pressed
function keyPressed() {
    keyStates[keyCode] = true;
}
function keyReleased() {
    keyStates[keyCode] = false;
}
