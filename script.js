//to-do: add reset() function with currentMode parameter, to reload the page
let circleColor1;
let targetColor1;
let circleRadius1 = 250; 
let targetRadius1 = 250;
let circleColor2;
let targetColor2;
let circleRadius2 = 250;
let targetRadius2 = 250;
let circleColor3;
let targetColor3;
let circleRadius3 = 250;
let targetRadius3 = 250;
let circleColor4;
let targetColor4;
let circleRadius4 = 250;
let targetRadius4 = 250;
let circleColorBig;
let targetColorBig;
let circleRadiusBig = 525;
let targetRadiusBig = 525;
let lerpAmount = 0.5;
let previousKey = null;
let keyStates = {};
let randomNumberGenerated= false
let currentMode = 5;
let selectedMode = 0
let reflexTimer = 0
let hitCircle1 = false;
let hitCircle2 = false;
let hitCircle3 = false;
let hitCircle4 = false;
let hitCircleBig = false;
let randomCircle1Test = false
let randomCircle2Test = false   
let randomCircle3Test = false
let randomCircle4Test = false
let randomCircleBigTest = false
let randomCircleTimeout = 500
let isAnyButtonPressed = false
let isSpaceButtonPressed = false
let fadeInTimer = 0
let fadeOutTimerSmall = 100 
let fadeOutTimerBig = 255
let transitionColor = 0
let transitionColorSmall = 0
let transitionColorBig = 0
let fadeOutBigCircleRadius = 1
let fadeOutFlag = false
let fadeInFlag = false

//sound tests
let soundLibraryAvailable = typeof p5 !== 'undefined' && typeof p5.SoundFile !== 'undefined';
let menuSelectSound
let menuConfirmSound
let punchSound
let successSound
let failSound
let isPlayingMenuSelectSound = false;
let isPlayingPunchSound = false;
let isPlayingMenuConfirmSound = false;
let isPlayingSuccessSound = false;
let isPlayingFailSound = false;
let confirmSoundCounter = 0

//mode 4 variables
let punchProgress = 0
let punchFillTimer = 0

//mode 3 variables
let randomWordAndColorSwitch = true 
let randomNumberWord;
let randomNumberColor

let logoImage
let logoImageScale = 0.65 

function preload() {
    if (soundLibraryAvailable) {
        punchSound = loadSound('./components/sounds/punch_test.wav');
        menuConfirmSound = loadSound('./components/sounds/menu_confirm2.wav');
        menuSelectSound = loadSound('./components/sounds/menu_select.wav');
        successSound = loadSound('./components/sounds/success.wav');
        failSound = loadSound('./components/sounds/fail.wav');
    }
    iconSpeed = loadImage('./components/images/Icons_Speed.png');
    iconGrowing = loadImage('./components/images/Icons_Growing.png');   
    iconReaction = loadImage('./components/images/Icons_Reactions.png'); 
    iconColor = loadImage('./components/images/Icons_Color-Coordination.png');
    logoImage = loadImage('./components/images/Logo.png');
    // logoTitleImage = loadImage('./components/images/LogoTitle.png');
    // logoTitleImage = loadImage('./components/images/LogoTitleNew.png');
    logoTitleImage = loadImage('./components/images/logotestgradient.png');
}
function setup() {
    const urlParams = new URLSearchParams(window.location.search);
    const modeParam = urlParams.get('mode');
    
    if (modeParam !== null) {
        currentMode = parseInt(modeParam, 10);
    }

    
    // createCanvas(1120, 865, WEBGL);
    // createCanvas(1290, 865);
    createCanvas(1380, 1035);
    returnRandomNumber();

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
        // uiBackButton("Back")
        // uiTitleText("Mode Select")
    } else if (currentMode === 1) {
        testModeFadeOut(mode1);
    } else if (currentMode === 2) {
        testModeFadeOut(mode2);
    } else if (currentMode === 3) {
        testModeFadeOut(mode3)
	} else if (currentMode === 4) {
        testModeFadeOut(mode4)
	} else if (currentMode === 5) {
        logo();
    }
}

//different modes
function logo() {
    background(0);
    imageMode(CENTER)
    // image(logoImage, width / 2, height / 2, logoImage.width, logoImage.height);
    image(logoTitleImage, width / 2, height / 2, logoTitleImage.width*logoImageScale, logoTitleImage.height*logoImageScale);
    logoHexagon(width/2, height/2, circleRadiusBig/275);
}
function menu() {
    background(0);
	fill(255);

    checkButtonPress()
    if (isAnyButtonPressed) {
        playSoundOnce(menuSelectSound);
    }


    let centerTextSize = (circleRadiusBig / 2) - 50 ;
    switch (selectedMode) {
        case 1: circleRadius1 = circleRadius1 + 30; break;
        case 2: circleRadius2 = circleRadius2 + 30; break;
        case 3: circleRadius3 = circleRadius3 + 30; break;
        case 4: circleRadius4 = circleRadius4 + 30; break;
    }

    fill(selectedMode === 1 ? 255 : 100)
    // ellipse(width / 6.5 - 50, height / 4.75, circleRadius1, circleRadius1);
    ellipse(width / 6.5, height / 4.75, circleRadius1, circleRadius1);
    fill(selectedMode === 2 ? 255 : 100)
    ellipse(width / 6.5, (height / 4.75) * 3.75, circleRadius2, circleRadius2);
    // ellipse(width / 6.5, (height / 4.75 + 1) * 3.75, circleRadius2, circleRadius2);
    fill(selectedMode === 3 ? 255 : 100)
    ellipse( (width / 6.5) * 5.5, (height / 4.75) * 3.75, circleRadius3, circleRadius3 );
    fill(selectedMode === 4 ? 255 : 100)
    ellipse((width / 6.5) * 5.5, height / 4.75, circleRadius4, circleRadius4);
    hexagon(width/2, height/2, 255, circleRadiusBig/275);

    imageMode(CENTER)
    textAlign(CENTER)

    fill(0);
	textSize(32);
	textAlign(CENTER, CENTER);
	textSize(centerTextSize);
	text("▶", width / 2 + 20, height / 2 + 20);
	textSize(circleRadius1 / 4);
    image(iconGrowing, width/6.5, height / 4.75, circleRadius1, circleRadius1)   
    image(iconReaction, width/6.5, height / 4.75 * 3.75, circleRadius2, circleRadius2)   
    image(iconColor, width/6.5 * 5.5, height / 4.75 * 3.75, circleRadius3, circleRadius3)   
    image(iconSpeed, width/6.5 * 5.5, height / 4.75, circleRadius4, circleRadius4)   
}
function mode1() {
    background(0);
    drawPunchingBags(circleColor1, circleColor2, circleColor3, circleColor4, circleColorBig);
    checkButtonPress()
    if (isAnyButtonPressed) {
        playSoundOnce(punchSound);
    }
}
function mode2() {
    //weird lag, probably needs to be fixed
    background(0);
    reflexTimer += 1;

    let timeOutNumber = 150 

    checkButtonPress()
    if (isAnyButtonPressed) {
        playSoundOnce(punchSound);
    }

    circleColor1 = color(0);
    circleColor2 = color(0);
    circleColor3 = color(0);
    circleColor4 = color(0);
    circleColorBig = color(0);

    drawPunchingBags(circleColor1, circleColor2, circleColor3, circleColor4, circleColorBig);

    if (randomNumber < 1) {
        randomCircle1Test = true, randomCircle2Test = false, randomCircle3Test = false, randomCircle4Test = false, randomCircleBigTest = false;
        // console.log('case 1');
    }
    if (randomNumber > 1 && randomNumber < 2) {
        randomCircle1Test = false, randomCircle2Test = true, randomCircle3Test = false, randomCircle4Test = false, randomCircleBigTest = false;
        // console.log('case 2');
    }
    if (randomNumber > 2 && randomNumber < 3) {
        randomCircle1Test = false, randomCircle2Test = false, randomCircle3Test = true, randomCircle4Test = false, randomCircleBigTest = false;
        // console.log('case 3');
    }
    if (randomNumber > 3 && randomNumber < 4) {
        randomCircle1Test = false, randomCircle2Test = false, randomCircle3Test = false, randomCircle4Test = true, randomCircleBigTest = false;
        // console.log('case 4');
    }
    if (randomNumber > 4 && randomNumber < 5) {
        randomCircle1Test = false, randomCircle2Test = false, randomCircle3Test = false, randomCircle4Test = false, randomCircleBigTest = true;
        // console.log('case 5');
    }

    if (reflexTimer > 50) {
        if (randomCircle1Test) {
            circleColor1 = hitCircle1 ? color(0, 255, 0) : color(255);
            drawPunchingBags(circleColor1, circleColor2, circleColor3, circleColor4, circleColorBig);

            if (keyStates[65] || keyStates[83] || keyStates[87]) {
                hitCircle1 = true;
                circleColor1 = color(0, 255, 0);
                drawPunchingBags(circleColor1, circleColor2, circleColor3, circleColor4, circleColorBig);
            }
            if (reflexTimer > 100) {
                hitCircle1 = false;
                reflexTimer = 0;
                returnRandomNumber();
            }
            if (reflexTimer > timeOutNumber - 25 && !hitCircle1) {
                circleColor1 = color(255, 0, 0);
                playSoundOnce(failSound);
                drawPunchingBags(circleColor1, circleColor2, circleColor3, circleColor4, circleColorBig);
            }
        }
        if (randomCircle2Test) {
            circleColor2 = hitCircle2 ? color(0, 255, 0) : color(255);
            drawPunchingBags(circleColor1, circleColor2, circleColor3, circleColor4, circleColorBig);

            if (keyStates[70] || keyStates[71] || keyStates[68]) {
                hitCircle2 = true;
                circleColor2 = color(0, 255, 0);
                drawPunchingBags(circleColor1, circleColor2, circleColor3, circleColor4, circleColorBig);
            }
            if (reflexTimer > timeOutNumber) {
                hitCircle2 = false;
                reflexTimer = 0;
                returnRandomNumber();
            }
            if (reflexTimer > timeOutNumber - 25 && !hitCircle2) {
                circleColor2 = color(255, 0, 0);
                playSoundOnce(failSound);
                drawPunchingBags(circleColor1, circleColor2, circleColor3, circleColor4, circleColorBig);
            }
        }
        if (randomCircle3Test) {
            circleColor3 = hitCircle3 ? color(0, 255, 0) : color(255);
            drawPunchingBags(circleColor1, circleColor2, circleColor3, circleColor4, circleColorBig);

            if (keyStates[38] || keyStates[40] || keyStates[37]) {
                hitCircle3 = true;
                circleColor3 = color(0, 255, 0);
                drawPunchingBags(circleColor1, circleColor2, circleColor3, circleColor4, circleColorBig);
            }
            if (reflexTimer > timeOutNumber) {
                hitCircle3 = false;
                reflexTimer = 0;
                returnRandomNumber();
            }
            if (reflexTimer > timeOutNumber - 25 && !hitCircle3) {
                circleColor3 = color(255, 0, 0);
                playSoundOnce(failSound);  
                drawPunchingBags(circleColor1, circleColor2, circleColor3, circleColor4, circleColorBig);
            }
        }
        if (randomCircle4Test) {
            circleColor4 = hitCircle4 ? color(0, 255, 0) : color(255);
            drawPunchingBags(circleColor1, circleColor2, circleColor3, circleColor4, circleColorBig);

            if (keyStates[39] || keyStates[32] || keyStates[82]) {
                hitCircle4 = true;
                circleColor4 = color(0, 255, 0);
                drawPunchingBags(circleColor1, circleColor2, circleColor3, circleColor4, circleColorBig);
            }
            if (reflexTimer > timeOutNumber) {
                hitCircle4 = false;
                reflexTimer = 0;
                returnRandomNumber();
            }
            if (reflexTimer > timeOutNumber - 25 && !hitCircle4) {
                circleColor4 = color(255, 0, 0);
                playSoundOnce(failSound);
                drawPunchingBags(circleColor1, circleColor2, circleColor3, circleColor4, circleColorBig);
            }
        }
        if (randomCircleBigTest) {
            circleColorBig = hitCircleBig ? color(0, 255, 0) : color(255);
            drawPunchingBags(circleColor1, circleColor2, circleColor3, circleColor4, circleColorBig);

            if (keyStates[3]) {
                hitCircleBig = true;
                circleColorBig = color(0, 255, 0);
                drawPunchingBags(circleColor1, circleColor2, circleColor3, circleColor4, circleColorBig);
            }
            if (reflexTimer > timeOutNumber) {
                hitCircleBig = false;
                reflexTimer = 0;
                // reloadWindow(2)
                console.log('window should reload')
                returnRandomNumber();
            }
            if (reflexTimer > timeOutNumber - 25&& !hitCircleBig) {
                circleColorBig = color(255, 0, 0);
                playSoundOnce(failSound);
                drawPunchingBags(circleColor1, circleColor2, circleColor3, circleColor4, circleColorBig);
            }
        }
    }

    if (reflexTimer > timeOutNumber) {
        reflexTimer = 0
        returnRandomNumber()
        // reloadWindow(2)
        // console.log('window should reload')
    }

    circleColor1 = color(0)
    circleColor2 = color(0)
    circleColor3 = color(0)
    circleColor4 = color(0)
    circleColorBig = color(0)

    // uiBackButton("Back to Mode Select")
    // uiTitleText("Reflex Test")
 
}
function mode3() {
    let cyanCircle = ['A'.charCodeAt(0), 'W'.charCodeAt(0), 'S'.charCodeAt(0)];
    let purpleCircle = ['F'.charCodeAt(0), 'G'.charCodeAt(0), 'D'.charCodeAt(0)];
    let redCircle = [38, 40, 37];
    let greenCircle = ['R'.charCodeAt(0), 32, 39];

    background(0);

    let correctCircle
    if (randomNumberWord === 0) {
        correctCircle = purpleCircle
    } else if (randomNumberWord === 1) {
        correctCircle = cyanCircle
    } else if (randomNumberWord === 2) {
        correctCircle = redCircle
    } else if (randomNumberWord === 3) {
        correctCircle = greenCircle
    }

    console.log(`Press ${correctCircle} for the correct circle`);

    checkButtonPress()
    if (isAnyButtonPressed) {
        playSoundOnce(punchSound);
        let correctKeyPressed = correctCircle.some(code => keyStates[code]);
        if (correctKeyPressed) {
            console.log('Correct button pressed');
            playSoundOnceFailOrSuccess(successSound);
        } else {
            console.log('Incorrect button pressed');
            playSoundOnceFailOrSuccess(failSound);
        }
        randomWordAndColorSwitch = true;
    }
    fill('#9ce9f3');
    ellipse(width / 6.5, height / 4.75, circleRadius1, circleRadius1);
    fill('#8a0cf3');
    ellipse(width / 6.5, (height / 4.75) * 3.75, circleRadius2, circleRadius2);
    fill('#f3160c');
    ellipse( (width / 6.5) * 5.5, (height / 4.75) * 3.75, circleRadius3, circleRadius3 );
    fill('#75f30c');
    ellipse((width / 6.5) * 5.5, height / 4.75, circleRadius4, circleRadius4);
    fill('#9ce9f3');
    hexagon(width/2, height/2, color(100,100,100,50), circleRadiusBig/275);

    randomWordAndColor()

}
function mode4() {
    successColor = color(100, 100, 100, 50);
    background(0);
	// fill(255)
	drawPunchingBags(color(100), color(100), color(100), color(100), successColor);

    fill(255);
    ellipse(width / 2, height / 2, punchProgress, punchProgress);

    if (punchProgress < 525) {
        punchFillTimer += 1 
        let totalSeconds = Math.floor(punchFillTimer / 60);
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;

        let timeString = nf(minutes, 2) + ':' + nf(seconds, 2);

        textSize(50);
        textAlign(CENTER, CENTER);
        // text(punchFillTimer, width / 2, height / 2 - 100);
        text(timeString, width / 2, height / 2 - 300);

    }
    
    checkButtonPress()
    if (isAnyButtonPressed) {

        if (keyStates[65] || keyStates[70] || keyStates[38] || keyStates[39]) {
            punchProgress += 3 
        }
        if (keyStates[83] || keyStates[71] || keyStates[40] || keyStates[32]) {
            punchProgress += 4
        }
        if (keyStates[87] || keyStates[68] || keyStates[37] || keyStates[82]) {
            punchProgress += 5 
        }
        playSoundOnce(punchSound);
    }
    
    if (punchProgress > 525) {
        successColor = color(0,255,0,50)
        drawPunchingBags(color(100), color(100), color(100), color(100), successColor);

        playSoundOnce(successSound);

        if (keyStates[3]) {
            punchProgress = 0
            timeString = 0
            punchFillTimer = 0
            successColor = color(100,100,100,50)
        }
    }

}

//helper functions
function reloadWindow(mode) {
    if (mode !== undefined) {
        window.location.href = `${window.location.pathname}?mode=${mode}`;
        console.log('window reloaded')
    } else {
        window.location.reload();
    }
}
function uiTitleText(modeText){
    fill(100)
    textAlign(CENTER, CENTER);
    textSize(50);
    text(modeText, width/2, height/12)
}
function uiBackButton(uiBackButtonText) {
    let point1 = createVector(width/2.6, height/15*14)
    let point2 = createVector(width/2.6*1.6, height/15*14)
    stroke(100)
    strokeWeight(5)
    line(point1.x, point1.y, point2.x, point2.y)
    line(point1.x, point1.y, point1.x - 50, point1.y - 30)
    line(point2.x, point2.y, point2.x + 50, point2.y - 30)
    strokeWeight(0)
    stroke(0)
    // fill(255,255,255,75)
    fill(100)
    textAlign(CENTER, CENTER);
    textSize(25);
    text(uiBackButtonText, width/2, height/15*14 - 25)
}
function hexagon(centerX, centerY, fillColor, hexagonScale) {
    fill(fillColor)
    push();
    translate(centerX, centerY);
    scale(hexagonScale);
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
function logoHexagon(centerX, centerY, hexagonScale) {
    fill(255,255,255,40)
    push();
    translate(centerX, centerY);
    scale(hexagonScale);
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
    hexagon(width/2, height/2, fillColorBig, circleRadiusBig/275);
}
function checkButtonPress() {   
    if (currentMode != 0) {
        if (keyStates[65] || keyStates[83] || keyStates[87] || keyStates[70] || keyStates[71] || keyStates[68] || keyStates[38] || keyStates[40] || keyStates[37] || keyStates[39] || keyStates[32] || keyStates[82] || keyStates[3]) {
            isAnyButtonPressed = true
        }
        else {
            isAnyButtonPressed = false
        }
    }
    if (currentMode === 0) {
        if (keyStates[65] || keyStates[83] || keyStates[87] || keyStates[70] || keyStates[71] || keyStates[68] || keyStates[38] || keyStates[40] || keyStates[37] || keyStates[39] || keyStates[32] || keyStates[82]) {
            isAnyButtonPressed = true
        }
        else {
            isAnyButtonPressed = false
        }
}
}
function playSoundOnce(soundFile) {
    if (soundLibraryAvailable && soundFile && typeof soundFile.play === 'function') {
        if (currentMode != 0) {
            if (!isPlayingPunchSound) {
                isPlayingPunchSound = true;
                soundFile.play();
                soundFile.onended(() => {
                    isPlayingPunchSound = false;
                });
            }
        }
        else {
            if (!isPlayingMenuSelectSound) {
                isPlayingMenuSelectSound = true;
                soundFile.play();
                soundFile.onended(() => {
                    isPlayingMenuSelectSound = false;
                });
            }
        }
    }
}
function playSoundOnceFailOrSuccess(soundFile) {
    if (soundLibraryAvailable && soundFile && typeof soundFile.play === 'function') {
        if (!isPlayingSuccessSound) {
            isPlayingSuccessSound= true;
            soundFile.play();
            soundFile.onended(() => {
                isPlayingSuccessSound= false;
            });
        }
        if (!isPlayingFailSound) {
            isPlayingFailSound= true;
            soundFile.play();
            soundFile.onended(() => {
                isPlayingFailSound= false;
            });
        }
    }
}
function testModeFadeIn(){
    background(0);
    if (fadeInTimer < 255) {
        fadeInTimer += 5 
    } 
    transitionColor = color(255,255,255,fadeInTimer)

    fill(transitionColor);
    ellipse(width / 6.5, height / 4.75, circleRadius1, circleRadius1);
    fill(transitionColor);
    ellipse(width / 6.5, (height / 4.75) * 3.75, circleRadius2, circleRadius2);
    fill(transitionColor);
    ellipse( (width / 6.5) * 5.5, (height / 4.75) * 3.75, circleRadius3, circleRadius3 );
    fill(transitionColor);
    ellipse((width / 6.5) * 5.5, height / 4.75, circleRadius4, circleRadius4);
    fill(transitionColor);
    hexagon(width/2, height/2,transitionColor, circleRadiusBig/275);
}
function testModeFadeOut(targetMode){
    if (fadeOutFlag === false) {
        background(0);
        confirmSoundCounter += 1
        if (confirmSoundCounter <= 1) {
            playSoundOnce(menuConfirmSound);
        }
        if (fadeOutTimerBig > 0) {
            fadeOutTimerBig -= 3 
            fadeOutTimerSmall -= 1 
            fadeOutBigCircleRadius += 10
        } else {
            fadeOutFlag = true
            fadeOutBigCircleRadius = 1
        }
        circleRadiusBig = circleRadiusBig + fadeOutBigCircleRadius

        // transitionColorSmall = color(100,100,100,fadeOutTimerSmall)
        transitionColorSmall = color(fadeOutTimerSmall)
        // transitionColorBig = color(255, 255, 255, fadeOutTimerBig);
        transitionColorBig = color(fadeOutTimerBig);

        fill(transitionColorSmall);
        ellipse(width / 6.5, height / 4.75, circleRadius1, circleRadius1);
        fill(transitionColorSmall);
        ellipse(width / 6.5, (height / 4.75) * 3.75, circleRadius2, circleRadius2);
        fill(transitionColorSmall);
        ellipse( (width / 6.5) * 5.5, (height / 4.75) * 3.75, circleRadius3, circleRadius3 );
        fill(transitionColorSmall);
        ellipse((width / 6.5) * 5.5, height / 4.75, circleRadius4, circleRadius4);
        hexagon(width/2, height/2,transitionColorBig, circleRadiusBig/275);
    }
    if (fadeOutFlag === true) {
        targetMode()
    }
}
function randomWordAndColor() {

    let randomWordArray= ['Purple', 'Cyan', 'Red', 'Green']
    let randomColorArray = [color('#9ce9f3'), color('#8a0cf3'), color('#f3160c'), color('#75f30c')]

    if (randomWordAndColorSwitch === true) {   
        randomNumberWord = floor(random(0,4))
        randomNumberColor = floor(random(0,4))
        randomWordAndColorSwitch = false

        return (randomNumberColor, randomNumberWord)
    }
    
    textSize(50)
    textAlign(CENTER, CENTER)
    fill(randomColorArray[randomNumberColor])
    text(randomWordArray[randomNumberWord], width / 2, height / 2)

}
function punchMeterCircle() {
    fill(255);
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
function returnRandomNumber() {
    // return randomNumber = random(1, 5);
    return randomNumber = random(0, 5);
}

//key press handling
function handleKeyPress() {
    console.log(`Key pressed: ${key} (keyCode: ${keyCode})`);
    let currentKey = null;
    // console.log(keyCode)

    //SETTING MODES
	if (selectedMode != 0 && keyStates[48] || (keyStates[70] || keyStates[71] || keyStates[68]) && (keyStates[38] || keyStates[40] || keyStates[37])) {
		currentMode = 0;
		selectedMode = 0;
		fading = false
        reflexTimer = 0
		console.log("Reset modes");
        returnRandomNumber()
        hitCircle1 = false;
        hitCircle2 = false;
        hitCircle3 = false;
        hitCircle4 = false;
        hitCircleBig = false;
        randomCircle1Test = false
        randomCircle2Test = false   
        randomCircle3Test = false
        randomCircle4Test = false
        randomCircleBigTest = false
        randomCircleTimeout = 500
        fadeInTimer = 0
        fadeOutTimerSmall = 100 
        fadeOutTimerBig = 255
        transitionColorSmall = 0
        fadeInFlag = false
        fadeOutFlag = false
        fadeOutBigCircleRadius = 1
        transitionColorBig = 0
        confirmSoundCounter = 0
        punchProgress = 0
	}

    if (currentMode === 5) {
        if (keyStates[3]) {
            currentMode = 0;
            selectedMode = 0;
        }
    }
	
	if (currentMode === 0) {
		if (keyStates[65] || keyStates[83] || keyStates[87]) {
			selectedMode= 1;
		} else if (keyStates[70] || keyStates[71] || keyStates[68]) {
			selectedMode= 2;
		} else if (keyStates[38] || keyStates[40] || keyStates[37]) {
			selectedMode= 3;
		} else if (keyStates[39] || keyStates[32] || keyStates[82]) {
			selectedMode= 4;
		}
	}

	if (selectedMode != 0 && keyStates[3]) {
		currentMode = selectedMode;
	}

    //FIRST PUNCHING BAG
    if (keyStates[65]) {
        // A (weak)
        currentKey = "a";
        targetColor1 = color(238, 210, 2);
        targetRadius1 = 275;
        // targetRadius1 = 275;
    }
    if (keyStates[83]) {
        // S (mid)
        currentKey = "s";
        targetColor1 = color(255, 102, 0);
        targetRadius1 = 325;
        // targetRadius1 = 275;
    }
    if (keyStates[87]) {
        // W (strong)
        currentKey = "w";
        targetColor1 = color(255, 0, 0);
        targetRadius1 = 375;
        // targetRadius1 = 300;
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


// checking which keys are pressed
function keyPressed() {
    keyStates[keyCode] = true;

}
function keyReleased() {
    keyStates[keyCode] = false;
}
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
function keyPressed() {
    keyStates[keyCode] = true;
}
function keyReleased() {
    keyStates[keyCode] = false;
}
