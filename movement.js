let x = 200;
let y = 200;
let guy;
let guyX;
let guyY;
let guyWidth = 24;
let guyHeight = 24;
let frame = 0;
let dela = 5; // Animation delay
let moving = false;
let facingRight = true; // To keep track of the character's direction

function setup() {
  createCanvas(400, 400);

  x = width / 2;
  y = width / 2;

  guy = loadImage('move.png');
}

function draw() {
  background(220);

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
    translate(x + guyWidth * 5, y); // Adjust translate when facing left
    scale(-1, 1); // Flip the sprite horizontally when facing left
  }
  
  image(guy, 0, 0, guyWidth * 5, guyHeight * 5, guyX, guyY, guyWidth, guyHeight);
  
  pop(); // Restore the previous transformation state
}
