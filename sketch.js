let guy;
let frameWidth = 24;
let frameHeight = 24;
let scaleFactor = 1;

let x = 200;
let y = 200;
let guyX;
let guyY;
let guyWidth = 24;
let guyHeight = 24;
let numWorkers;
let money;
let frame = 0;
let clickValue;
let dela = 5; // Animation delay
let moving = false;
let facingRight = true; // To keep track of the character's direction


let timerValue = 5;

function preload() {
  map1 = loadImage('assets/Office_Design_2.gif');
  guy = loadImage('assets/mort/base/move.png');
}

function setup() {
  createCanvas(700, 700);

  x = 125;
  y = 282;
  numWorkers = 2;
  money = 50;
  clickValue = numWorkers;
  textSize(24); 
  textAlign(LEFT, TOP);

  setInterval(timeIt, 1000); 
}

function draw() {
  background(220);
  image(map1, 90, 120);

  fill(0); // Set text color to black
  text("Money: $" + money, 10, 10);
  text("Time until rent: " + timerValue, 10, 40);

  moving = false; // Reset moving state at the start of each frame

  // Movement and animation logic
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

  // Check for collision
  for (let wall of walls) {
    if (checkCollision(newX, newY, guyWidth, guyHeight, wall)) {
      // Reset position if a collision occurs
      newX = x;
      newY = y;
    }
  }

  // Update position if no collision
  x = newX;
  y = newY;

  // Handle animation frames if the character is moving
  if (moving) {
    if (frameCount % dela === 0) {
      frame = (frame + 1) % 6; // Loop through 6 frames
    }
  } else {
    frame = 0;
  }

  // Set the sprite frame position for the animation
  guyX = frame * guyWidth;
  guyY = 0;

  push(); // Save the current transformation state

  if (facingRight) {
    translate(x, y); // Normal translate when facing right
  } else {
    translate(x + guyWidth * 2, y); // Adjust translate when facing left
    scale(-1, 1); // Flip the sprite horizontally when facing left
  }

  image(guy, 0, 0, guyWidth * 2, guyHeight * 2, guyX, guyY, guyWidth, guyHeight);
  pop();
}

// Timer function
function timeIt() {
  if (timerValue > 0) {
    timerValue--;
  } else {
    alert("Rent is due! $250 deducted.");
    money -= 250; 
    timerValue = 5; 
  }
}

// Wall collision boundaries
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

function withinCanvas(newX, newY) {
  return newX >= 0 && newX + frameWidth <= width && newY >= 0 && newY + frameHeight <= height;
}

// Mouse click increases money by clickValue
function mousePressed() {
  money += clickValue;
}
