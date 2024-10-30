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
let frame = 0;
let dela = 5; // Animation delay
let moving = false;
let facingRight = true; // To keep track of the character's direction


function preload() {
  map1 = loadImage('assets/Office_Design_2.gif');
  guy = loadImage('assets/mort/base/move.png');
}


function setup() {
  createCanvas(700, 700);

  x = width / 2;
  y = width / 2;
}

function draw() {
  background(220);
  image(map1, 90, 120);

  moving = false; // Reset moving state at the start of each frame

  // Movement and animation logic
  if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
    y -= 1;
    moving = true;
  }
  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
    x -= 1;
    moving = true;
    facingRight = false;
  }
  if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
    y += 1;
    moving = true;
  }
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
    x += 1;
    moving = true;
    facingRight = true;
  }

  // Handle animation frames if the character is moving
  if (moving) {
    if (frameCount % dela === 0) {
      frame = (frame + 1) % 6; // Loop through 6 frames
    }
  } else {
    frame = 0;
  }

  if (x > width) {
    x = -24;
  } else if (x < -24) {
    x = width;
  }
  if (y > height) {
    y = -24;
  } else if (y < -24) {
    y = height;
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

  if (!checkCollision(newX, newY) && withinCanvas(newX, newY)) {
    x = newX;
    y = newY;
  }

}

let walls = [
  { x1: 0, y1: 203, x2: 32, y2: 203 },
  { x1: 0, y1: 332, x2: 32, y2: 332 },
  { x1: 32, y1: 332, x2: 42, y2: 332 },
  { x1: 32, y1: 392, x2: 319, y2: 392 },
  { x1: 353, y1: 332, x2: 512, y2: 332 },
  { x1: 353, y1: 392, x2: 512, y2: 392 },
  { x1: 32, y1: 137, x2: 0, y2: 137 },
  { x1: 32, y1: 73, x2: 512, y2: 73 },
  { x1: 33, y1: 0, x2: 512, y2: 0 },
  { x1: 33, y1: 137, x2: 31, y2: 0 },
  { x1: 33, y1: 203, x2: 33, y2: 342 },
  { x1: 319, y1: 332, x2: 319, y2: 392 },
  { x1: 352, y1: 332, x2: 352, y2: 392 },
  { x1: 353, y1: 392, x2: 512, y2: 392 },
  { x1: 32, y1: 332, x2: 319, y2: 332 },
  { x1: 480, y1: 0, x2: 480, y2: 554 },
  { x1: 125, y1: 332, x2: 125, y2: 554 },
  { x1: 125, y1: 525, x2: 554, y2: 525 },
];

function checkCollision(newX, newY) {
  for (let wall of walls) {
    if (wall.y1 === wall.y2 && newY + frameHeight > wall.y1 && newY < wall.y1 &&
      ((newX + frameWidth > wall.x1 && newX < wall.x2) || (newX < wall.x1 && newX + frameWidth > wall.x2))) {
      return true;
    }

    if (wall.x1 === wall.x2 && newX + frameWidth > wall.x1 && newX < wall.x1 &&
      ((newY + frameHeight > wall.y1 && newY < wall.y2) || (newY < wall.y1 && newY + frameHeight > wall.y2))) {
      return true;
    }
  }
  return false;
}

function withinCanvas(newX, newY) {
  return newX >= 0 && newX + frameWidth <= width && newY >= 0 && newY + frameHeight <= height;
}
