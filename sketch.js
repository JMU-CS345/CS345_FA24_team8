let guy;
let x = 200;
let y = 200;
let guyX;
let guyY;
let guyWidth = 24;
let guyHeight = 24;
let numWorkers;
let numLvl1Workers;
let money;
let frame = 0;
let clickValue;
let dela = 5; // Animation delay
let moving = false;
let facingRight = true;
let timerMinutes = 1;
let timerSeconds = 0;
let isPaused = false;
let gameUI;
let moneyPerSecond;

function preload() {
  map1 = loadImage('assets/Office_Design_2.gif');
  guy = loadImage('assets/mort/base/move.png');
}

function setup() {
  createCanvas(700, 700);
  x = 125;
  y = 282;
  numLvl1Workers = 2;
  numWorkers = 2;
  money = 50;
  clickValue = numWorkers;
  gameUI = new GameUI();
  setInterval(timeIt, 1000);
}

function draw() {
  background(220);
  image(map1, 90, 120);

  moneyPerSecond = numLvl1Workers;
  
  // Update pause button hover state and draw UI
  gameUI.checkPauseButtonHover(mouseX, mouseY);
  gameUI.drawUI({
    money,
    timerMinutes,
    timerSeconds,
    isPaused,
    width,
    height
  });

  if (isPaused) return;

  // Movement logic
  moving = false;
  let newX = x;
  let newY = y;

  if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
    newY -= 1;
    moving = true;
  }
  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
    newX -= 1;
    moving = true;
    facingRight = false;
  }
  if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
    newY += 1;
    moving = true;
  }
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
    newX += 1;
    moving = true;
    facingRight = true;
  }

  // Wall collision checks
  for (let wall of walls) {
    if (checkCollision(newX, newY, guyWidth, guyHeight, wall)) {
      newX = x;
      newY = y;
    }
  }

  x = newX;
  y = newY;

  // Animation handling
  if (moving) {
    if (frameCount % dela === 0) {
      frame = (frame + 1) % 6;
    }
  } else {
    frame = 0;
  }

  guyX = frame * guyWidth;
  guyY = 0;

  // Character rendering
  push();
  if (facingRight) {
    translate(x, y);
  } else {
    translate(x + guyWidth * 2, y);
    scale(-1, 1);
  }
  image(guy, 0, 0, guyWidth * 2, guyHeight * 2, guyX, guyY, guyWidth, guyHeight);
  pop();
}

function mousePressed() {
  // Check if pause button was clicked
  if (gameUI.pauseButtonHovered) {
    togglePause();
    return;
  }
  
  // Only add money if not paused
  if (!isPaused) {
    money += clickValue;
  }
}

function togglePause() {
  isPaused = !isPaused;
}

function keyPressed() {
  if (key === 'p' || key === 'P') {
    togglePause();
  }
}

function timeIt() {
  if (!isPaused) {
    if (timerMinutes === 0 && timerSeconds === 0) {
      alert("Rent is due! $500 deducted.");
      money -= 500;
      timerMinutes = 3;
      timerSeconds = 0;
    } else if (timerSeconds === 0) {
      timerMinutes--;
      timerSeconds = 59;
    } else {
      timerSeconds--;
      money += numLvl1Workers
    }
  }
}

let walls = [
  { topLeft: { x: 79, y: 182 }, bottomRight: { x: 122, y: 247 } },
  { topLeft: { x: 122, y: 131 }, bottomRight: { x: 570, y: 181 } },
  { topLeft: { x: 570, y: 121 }, bottomRight: { x: 592, y: 643 } },
  { topLeft: { x: 90, y: 312 }, bottomRight: { x: 121, y: 451 } },
  { topLeft: { x: 111, y: 442 }, bottomRight: { x: 409, y: 452 } },
  { topLeft: { x: 435, y: 442 }, bottomRight: { x: 569, y: 501 } },
  { topLeft: { x: 219, y: 453 }, bottomRight: { x: 410, y: 502 } },
  { topLeft: { x: 204, y: 450 }, bottomRight: { x: 217, y: 644 } },
  { topLeft: { x: 206, y: 633 }, bottomRight: { x: 584, y: 643 } }
];

function checkCollision(px, py, pWidth, pHeight, wall) {
  return (
    px + pWidth > wall.topLeft.x &&
    px < wall.bottomRight.x &&
    py + pHeight > wall.topLeft.y &&
    py < wall.bottomRight.y
  );
}