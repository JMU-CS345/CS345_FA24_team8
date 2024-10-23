let x;
let y;

function setup() {
  createCanvas(400, 400);
  
  x = width / 2;
  y = width/ 2;
  
}

function draw() {
  background(220);

  if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
    y -= 1;
  } else if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
    x -= 1;
  } else if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
    y += 1;
  } else if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
    x += 1;
  }
 

  fill(0);
  
  circle(x, y, 25);
}