let guy;
let x = 200;
let y = 200;
let guyX;
let guyY;
let guyWidth = 24;
let guyHeight = 24;
let numWorkers;
let numLvl1Workers;
let numLvl2Workers;
let numLvl3Workers;
let numLvl4Workers;
let numLvl5Workers;
let money;
let frame = 0;
let clickValue;
let dela = 5; // Animation delay
let moving = false;
let facingRight = true;
let timerMinutes = 3;
let timerSeconds = 0;
let isPaused = false;
let gameUI;
let moneyPerSecond = 1;
let currentFloor = 1;
let inElevator = false;
let showFloorMenu = false;
let showWalls = false; // New variable to control wall visibility

let box = { x: 0, y: 0, width: 0, height: 0, dragging: false };
let cornersHovered = null; // Track which corner is hovered
let hoveredWall = null; // Track which wall is hovered

let elevator = {
  x: 50,
  y: 247,
  width: 40,
  height: 65
};

let workerPositions1 = [];  
let workerPositions2 = []; 
let occupiedPositions = [];
let workerCost = 400;

// Coordinates and size of the worker to clone
const worker1X = 130; 
const worker1Y = 45;
const workerWidth = 30;
const workerHeight = 50;

// Coordinates for second worker
// const worker2X = 290; 
// const worker2Y = 250;

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
  numLvl2Workers = 0;
  numLvl3Workers = 0;
  numLvl4Workers = 0;
  numLvl5Workers = 0;
  money = 50;
  clickValue = numWorkers;
  gameUI = new GameUI();
  setInterval(timeIt, 1000);


  initializeWorkerPositions();


}

function draw() {
  background(220);

  if (showFloorMenu) {
    gameUI.drawFloorMenu(currentFloor);
    return;
  }

  image(map1, 90, 120);


  for (let pos of occupiedPositions) {
    if (pos.useWorker1) {
        // Copy and display the first worker section
        copy(map1, worker1X, worker1Y, workerWidth, workerHeight, 
             90 + pos.x, 120 + pos.y, workerWidth, workerHeight);
    } else {
        // Copy and display the second worker section
        copy(map1, worker2X, worker2Y, workerWidth, workerHeight, 
             90 + pos.x, 120 + pos.y, workerWidth, workerHeight);
    }
}


  // Draw elevator
  fill(100);
  rect(elevator.x, elevator.y, elevator.width, elevator.height);
  fill(150);
  textSize(12);
  textAlign(CENTER, CENTER);
  text("Floor " + currentFloor, elevator.x + elevator.width/2, elevator.y + elevator.height/2);

  moneyPerSecond = numLvl1Workers;

  gameUI.checkPauseButtonHover(mouseX, mouseY);
  gameUI.checkToolboxButtonHover(mouseX, mouseY);
  gameUI.drawUI({
    money,
    timerMinutes,
    timerSeconds,
    isPaused,
    width,
    height,
    moneyPerSecond
  });

  if (isPaused || gameUI.showUpgradesMenu) return;

  // Check for elevator collision
  if (checkCollision(x, y, guyWidth * 2, guyHeight * 2, {
    topLeft: { x: elevator.x, y: elevator.y },
    bottomRight: { x: elevator.x + elevator.width, y: elevator.y + elevator.height }
  })) {
    if (!inElevator) {
      inElevator = true;
      showFloorMenu = true;
    }
  }

  if (box.width > 0 && box.height > 0) {
    fill(255, 0, 0, 150);
    rect(box.x, box.y, box.width, box.height);

    cornersHovered = checkCornersHover(mouseX, mouseY);
    if (cornersHovered) {
      fill(0);
      text(`(${cornersHovered.x}, ${cornersHovered.y})`, mouseX + 5, mouseY - 5);
    }
  }

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

  let collisionDetected = false;
  hoveredWall = null;

  for (let wall of walls) {
    if (checkCollision(newX, newY, guyWidth * 2, guyHeight * 2, wall)) {
      collisionDetected = true;
      break;
    }
    if (mouseX >= wall.topLeft.x && mouseX <= wall.bottomRight.x &&
        mouseY >= wall.topLeft.y && mouseY <= wall.bottomRight.y) {
      hoveredWall = wall;
    }
  }

  if (!collisionDetected) {
    x = newX;
    y = newY;
  }

  if (moving) {
    if (frameCount % dela === 0) {
      frame = (frame + 1) % 6;
    }
  } else {
    frame = 0;
  }

  guyX = frame * guyWidth;
  guyY = 0;

  push();
  if (facingRight) {
    translate(x, y);
  } else {
    translate(x + guyWidth * 2, y);
    scale(-1, 1);
  }
  image(guy, 0, 0, guyWidth * 2, guyHeight * 2, guyX, guyY, guyWidth, guyHeight);
  pop();

  // Show walls if toggled
  if (showWalls) {
    for (let wall of walls) {
      fill(0, 100);
      rect(wall.topLeft.x, wall.topLeft.y,
           wall.bottomRight.x - wall.topLeft.x,
           wall.bottomRight.y - wall.topLeft.y);
      if (hoveredWall === wall) {
        fill(255, 0, 0);
        text(`Top Left: (${wall.topLeft.x}, ${wall.topLeft.y})`, wall.topLeft.x, wall.topLeft.y - 10);
        text(`Bottom Right: (${wall.bottomRight.x}, ${wall.bottomRight.y})`, wall.topLeft.x, wall.topLeft.y + 10);
      }
    }
  }
}

function restart() {
  x = 125;
  y = 282;
  numLvl1Workers = 2;
  numLvl2Workers = 0;
  numLvl3Workers = 0;
  numLvl4Workers = 0;
  numLvl5Workers = 0;
  numWorkers = 2;
  money = 50;
  clickValue = numWorkers;
  gameUI = new GameUI();
  setInterval(timeIt, 1000);
  timerMinutes = 3;
  timerSeconds = 0;
  selectedFloor = 1;
  currentFloor = 1;
}

function mousePressed() {
  if (showFloorMenu) {
    let selectedFloor = gameUI.handleFloorSelection(mouseX, mouseY);
    if (selectedFloor !== null) {
      currentFloor = selectedFloor;
      showFloorMenu = false;
      inElevator = false;
      
      x = elevator.x + elevator.width + 30;
      y = elevator.y + elevator.height / 2 - (guyHeight);
      return;
    }
  }

  if (gameUI.pauseButtonHovered) {
    togglePause();
    return;
  }

  if (gameUI.handleToolboxClick(mouseX, mouseY)) {
    return;
  }

  if (!isPaused && !gameUI.showUpgradesMenu) {
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

  if (key === 'm' || key === 'M') {
    showWalls = !showWalls; // Toggle wall visibility
  }

  if (key === 'u' || key === 'U') {
    gameUI.showUpgradesMenu = !gameUI.showUpgradesMenu;
  }



  if (key === 'b' || 'B') {
    if (money >= workerCost) {
    money -= workerCost;

    let newWorkerPos;
    
    // Check if workerPositions1 still has positions
    if (workerPositions1.length > 0) {
        newWorkerPos = workerPositions1.shift();  // Use position from workerPositions1
        newWorkerPos.useWorker1 = true;
    } else if (workerPositions2.length > 0) {
        newWorkerPos = workerPositions2.shift();  // Use position from workerPositions2
        newWorkerPos.useWorker1 = false;
    }

    // Add the worker to the occupied positions list if we have a valid position
    if (newWorkerPos) {
        occupiedPositions.push(newWorkerPos);
      }
    }
  }
}

function initializeWorkerPositions() {
  workerPositions1.push({ x: 800, y: 800 });  // 1st
  // workerPositions1.push({ x: 320, y: 50 });  // 2nd
  // workerPositions1.push({ x: 98, y: 175 });  // 3rd 
  // workerPositions1.push({ x: 194, y: 175 }); // 4th
  // workerPositions1.push({ x: 290, y: 175 }); // 5th
  // workerPositions1.push({ x: 383, y: 175 });  // 6th
  
        
  // workerPositions2.push({ x: 386, y: 250 });  // 7th buy
  // workerPositions2.push({ x: 98, y: 250 });  // 8th buy
  // workerPositions2.push({ x: 194, y: 250 });  // 9th buy
  // workerPositions2.push({ x: 130, y: 120 });  // 10th buy
  // workerPositions2.push({ x: 226, y: 120 });  // 11th buy
  // workerPositions2.push({ x: 323, y: 120 });  // 12th buy

}

function timeIt() {
  if (!isPaused) {
    if (timerMinutes === 0 && timerSeconds === 0 && money < 0) {
      restart();
    } else if (timerMinutes === 0 && timerSeconds === 0) {
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
  { topLeft: { x: 204, y: 450 }, bottomRight: { x: 217, y: 644 } },
  { topLeft: { x: 206, y: 633 }, bottomRight: { x: 584, y: 643 } },
  { topLeft: { x: 108, y: 442 }, bottomRight: { x: 395, y: 503 } },
  { topLeft: { x: 455, y: 442 }, bottomRight: { x: 570, y: 503 } },
];

function checkCollision(px, py, pWidth, pHeight, wall) {
  return (
    px + pWidth > wall.topLeft.x &&
    px < wall.bottomRight.x &&
    py + pHeight > wall.topLeft.y &&
    py < wall.bottomRight.y
  );
}

function checkCornersHover(mx, my) {
  const corners = [
    { x: box.x, y: box.y }, // Top-left
    { x: box.x + box.width, y: box.y }, // Top-right
    { x: box.x, y: box.y + box.height }, // Bottom-left
    { x: box.x + box.width, y: box.y + box.height } // Bottom-right
  ];

  for (let corner of corners) {
    if (dist(mx, my, corner.x, corner.y) < 10) { // 10 pixels radius for hover
      return corner;
    }
  }

  return null; // No corner hovered
}