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
  createCanvas(400, 400);
}

function draw() {
  background(220);
  image(map, 0, 10);
  image(guy, x, y, frameWidth, frameHeight, 0, 0, frameWidth, frameHeight);

  let newWidth = frameWidth * scaleFactor;
  let newHeight = frameHeight * scaleFactor;
  image(img, x, y, newWidth, newHeight, 0, 0, frameWidth, frameHeight);
}

let walls = [
  { x1: 0, y1: 203, x2: 32, y2: 203 },
  { x1: 0, y1: 342, x2: 32, y2: 342 },
  { x1: 32, y1: 342, x2: 319, y2: 342 },
  { x1: 32, y1: 400, x2: 319, y2: 400 },
  { x1: 353, y1: 342, x2: 400, y2: 342 },
  { x1: 343, y1: 400, x2: 400, y2: 400 },
  { x1: 32, y1: 137, x2: 0, y2: 137 },
  { x1: 32, y1: 73, x2: 400, y2: 73 },
  { x1: 33, y1: 0, x2: 400, y2: 0 },
  { x1: 31, y1: 137, x2: 31, y2: 0 },
  { x1: 33, y1: 203, x2: 33, y2: 342 },
  { x1: 319, y1: 342, x2: 319, y2: 400 },
  { x1: 352, y1: 342, x2: 352, y2: 400 },
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
