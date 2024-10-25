let guy;
let frameWidth = 24;
let frameHeight = 24;
let x, y;
let scaleFactor = 1;


function preload() {
  guy = loadImage('assets/mort/base/idle.png');
  map = loadImage('assets/Office_Design_2.gif');
}


function setup() {
  createCanvas(512, 544);
}

function draw() {
  background(220);
  image(map, 0, 10);
  image(guy, x, y, frameWidth, frameHeight, 0, 0, frameWidth, frameHeight);

  let newWidth = frameWidth * scaleFactor;
  let newHeight = frameHeight * scaleFactor;
  image(img, x, y, newWidth, newHeight, 0, 0, frameWidth, frameHeight);

  movement();


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

function movement() {
  let newX = x;
  let newY = y;

  if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
    newY -= 1.5;
  }
  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
    newX -= 1.5;
  }
  if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
    newY += 1.5;
  }
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
    newX += 1.5;
  }

  if (!checkCollision(newX, newY) && withinCanvas(newX, newY)) {
    x = newX;
    y = newY;
  }
}
