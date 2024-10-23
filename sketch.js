let guy;
let frameWidth = 24;
let frameHeight = 24;
let x, y;
let scaleFactor = 1;


function preload() {
  guy = loadImage('assets/mort/base/idle.png');
}


function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  image(guy, x, y, frameWidth, frameHeight, 0, 0, frameWidth, frameHeight);

  let newWidth = frameWidth * scaleFactor;
  let newHeight = frameHeight * scaleFactor;
  image(img, x, y, newWidth, newHeight, 0, 0, frameWidth, frameHeight);
}
