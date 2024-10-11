//circle 1
let circleColor1;
let targetColor1;
let circleRadius1 = 250; // at 60 cm distance perfect
let targetRadius1 = 250;
let transitionRadius = 10000

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

let currentMode = 0;
let selectedMode = 0

let fading = false
let fadingTimer = 0

function setup() {
    createCanvas(1120, 865);

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
	background(0);
    background(0,0,0,10);
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
		mode1();
    } else if (currentMode === 2) {
		mode2();
    } else if (currentMode === 3) {
		mode3();
	} else if (currentMode === 4) {
		mode4();
	}
}

//failed transition test
function transitionMode1() {
	fill(circleColor1);
	ellipse(width / 6.5, height / 4.75, circleRadius1, circleRadius1);
	circleRadius1 = lerp(circleRadius1, transitionRadius, 0.001);
}

function menu() {
	fill(255);
	drawPunchingBags();

	//menu texts
	fill(0);
	textSize(32);
	textAlign(CENTER, CENTER);
	textSize(circleRadiusBig / 2);
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
	fill(circleColor1);
	ellipse(width / 6.5, height / 4.75, circleRadius1, circleRadius1);
	fill(circleColor2);
	ellipse( width / 6.5, (height / 4.75) * 3.75, circleRadius2, circleRadius2 );
	fill(circleColor3);
	ellipse( (width / 6.5) * 5.5, (height / 4.75) * 3.75, circleRadius3, circleRadius3 );
	fill(circleColor4);
	ellipse( (width / 6.5) * 5.5, height / 4.75, circleRadius4, circleRadius4 );
	fill(circleColorBig);
	ellipse(width / 2, height / 2, circleRadiusBig, circleRadiusBig);
}
function mode2() {
	fill(255)
	ellipse( (width / 6.5) * 5.5, height / 4.75, circleRadius1, circleRadius1 );
	ellipse(width / 2, height / 2, circleRadiusBig, circleRadiusBig);
}
function mode3() {
    console.log('mode 3')
    initModeAnimation()

	//todo
}
function mode4() {
	fill(255)
	drawPunchingBags();
	fill(0)
	textSize(circleRadius2 / 4);
	text("Exit", width / 6.5, (height / 4.75) * 3.75);
	textSize(circleRadius3 / 4);
	text("Exit", (width / 6.5) * 5.5, (height / 4.75) * 3.75);
}

function initModeAnimation() {
	clear()
	fill(50)	
	drawPunchingBags()
}

function drawPunchingBags() {
    ellipse(width / 6.5, height / 4.75, circleRadius1, circleRadius1);
    ellipse(width / 6.5, (height / 4.75) * 3.75, circleRadius2, circleRadius2);
    ellipse(
        (width / 6.5) * 5.5,
        (height / 4.75) * 3.75,
        circleRadius3,
        circleRadius3
    );
    ellipse((width / 6.5) * 5.5, height / 4.75, circleRadius4, circleRadius4);
    ellipse(width / 2, height / 2, circleRadiusBig, circleRadiusBig);
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

//key press handling
function handleKeyPress() {
    let currentKey = null;

    //SETTING MODES
	if (selectedMode != 0 && keyStates[48] || (keyStates[70] || keyStates[71] || keyStates[68]) && (keyStates[38] || keyStates[40] || keyStates[37])) {
		currentMode = 0;
		selectedMode = 0;
		fading = false
		fadingTimer = 0
		console.log("Reset modes");
	}
	
	if (currentMode === 0) {
		if (keyStates[65] || keyStates[83] || keyStates[87]) {
			selectedMode= 1;
			console.log("Mode 1");
		} else if (keyStates[70] || keyStates[71] || keyStates[68]) {
			selectedMode= 2;
			console.log("Mode 2");
		} else if (keyStates[38] || keyStates[40] || keyStates[37]) {
			selectedMode= 3;
			console.log("Mode 3");
		} else if (keyStates[39] || keyStates[32] || keyStates[82]) {
			selectedMode= 4;
			console.log("Mode 4");
		}
	}

	if (selectedMode != 0 && keyStates[3]) {
		// initModeAnimation();
		currentMode = selectedMode;
		console.log("Selected mode: " + currentMode);
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
