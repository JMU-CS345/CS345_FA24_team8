let workerPositions1 = []; // buy worker
let workerPositions2 = [];  // but worker
let occupiedPositions = []; // buy worker
let workerCost = 50;
let money;
let toBeCollected = 0;
let startScreen = true;
let speedUpgradeCost = 500;
let time = false;

let musicStarted = false;
let gameWin = false;

// Coordinates and size of the worker to clone
const worker1X = 130;
const worker1Y = 50;
const workerWidth = 30;
const workerHeight = 50;

const mapOffsetX = 90;
const mapOffsetY = 120;

// Coordinates for second worker
const worker2X = 290;
const worker2Y = 250;

let guy;
let x = 200;
let y = 200;
let guyX;
let guyY;
let guyWidth = 24;
let guyHeight = 24;
let guySpeed = 1;
let maxGuySpeed = 4;

// Relating to number or workers
let numWorkers;
let numLvl1Workers;
let numLvl2Workers;
let numLvl3Workers;
let numLvl4Workers;
let numLvl5Workers;
let maxWorkerCount;
let clickValue;
let WorkerUpgradeQueue;

let frame = 0;
let dela = 5; // Animation delay
let moving = false;
let facingRight = true;
let timerMinutes = 3;
let timerSeconds = 0;
let isPaused = false;
let gameUI;
let moneyPerSecond = 2;
let currentFloor = 1;
let inElevator = false;
let showFloorMenu = false;
let showWalls = false;
let warning = false;
let negative = 0;
let gameOver = false;

let box = { x: 0, y: 0, width: 0, height: 0, dragging: false };
let cornersHovered = null;
let hoveredWall = null;

let elevator = {
  x: 50,
  y: 247,
  width: 40,
  height: 65
};

let moneyBag = {
  x: 400,
  y: 560,
  width: 35,
  height: 35,
};

let hitbox = {
  x: x + 14,
  y: y - 2,
  width: 30,
  height: 35,
};

let floorWorkers = {
  1: [],
  2: [],
  3: [],
  4: [],
  5: []
};

function saveWorkersToFloor(floor) {
  floorWorkers[floor] = [...occupiedPositions];
}

function loadWorkersForFloor(floor) {
  if (floorWorkers[floor]) {
    occupiedPositions = [...floorWorkers[floor]];
  } else {
    occupiedPositions = [];
  }
}


function switchFloor(newFloor) {
  if (purchasedFloors[newFloor]) {
    saveWorkersToFloor(currentFloor);
    currentFloor = newFloor;
    loadWorkersForFloor(currentFloor);
    x = elevator.x + elevator.width + 30;
    y = elevator.y + elevator.height / 2 - guyHeight;
  } else {
    alert("You haven't purchased this floor yet!");
  }
}

let floorWorkerCounts = {
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0
};

let floorWorkerPositions = {
  1: [],
  2: [],
  3: [],
  4: [],
  5: []
};



let map1;
let chair;
let chair2;
let test;
let desk;
let moneyIMAGE;

function preload() {
  map1 = loadImage('assets/Office_Design_2.gif');
  guy = loadImage('assets/mort/base/move.png');
  chair = loadImage('assets/chair.png');
  chair2 = loadImage('assets/chair.png');
  test = loadImage('assets/test.png');
  desk = loadImage('assets/money_2.png');
  moneyIMAGE = loadImage('assets/moneyIMAGE');

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
  maxWorkerCount = 14;
  money = 50;
  clickValue = moneyPerSecond;
  WorkerUpgradeQueue = []
  guySpeed = 1;

  // Start from floor 1 with worker #3
  let floor = 1;
  let workerNumber = 3;

  // Fill queue with Strings saying "Floor __ Worker #__"
  for (let i = 0; i < (5 * 13 + 1); i++) {
    let workerString = `Floor ${floor} Worker #${workerNumber}`;
    WorkerUpgradeQueue.push(workerString);

    workerNumber++;

    // If the worker number exceeds 14, move to the next floor
    if (workerNumber > 14) {
      workerNumber = 3;
      floor++;
    }
  }
  gameUI = new GameUI();
  setInterval(timeIt(), 1000);

  initializeWorkerPositions();
}

function draw() {
  if (startScreen) {
    displayStartScreen();
  } else {
    background(220);

    moneyPerSecond = numLvl1Workers + (2 * numLvl2Workers) + (3 * numLvl3Workers) + (4 * numLvl4Workers) + (5 * numLvl5Workers);
    clickValue = moneyPerSecond

    strokeWeight(1);
    stroke(51);
    let c = color(52, 235, 152)
    c.setAlpha(128);

    fill(c);
    textSize(100);
    text(currentFloor, 140, 570)


    if (showFloorMenu) {
      gameUI.drawFloorMenu(currentFloor);
      return;
    }
    image(map1, 90, 120);
    textSize(20);
    text(companyName, width / 2 - 20, 90);
    gameTracker();
    if (warning) {
      getPositive();
      isGameOver();
    }

    if (numLvl1Workers + numLvl2Workers + numLvl3Workers + numLvl4Workers + numLvl5Workers >= 70) {
      gameWin = true;
    }

    // buy worker
    for (let pos of occupiedPositions) {
      if (pos.workerType === 1) {
        // Copy worker 1's image to the new position
        copy(map1, worker1X, worker1Y, workerWidth, workerHeight,
          mapOffsetX + pos.x, mapOffsetY + pos.y, workerWidth, workerHeight);
      } else if (pos.workerType === 2) {
        // Copy worker 2's image to the new position
        copy(map1, worker2X, worker2Y, workerWidth, workerHeight,
          mapOffsetX + pos.x, mapOffsetY + pos.y, workerWidth, workerHeight);
      }
    }

    // Draw elevator
    fill(100);
    rect(elevator.x, elevator.y, elevator.width, elevator.height);
    fill(150);
    textSize(12);
    textAlign(CENTER, CENTER);
    text("Floor " + currentFloor, elevator.x + elevator.width / 2, elevator.y + elevator.height / 2);

    image(moneyIMAGE, 400, 500);
    fill(255, 0, 0);
    textSize(12);
    textAlign(CENTER, CENTER);
    text(toBeCollected, moneyBag.x + moneyBag.width/2, moneyBag.y + moneyBag.height/2);

    //moneyPerSecond = numLvl1Workers + (2 * numLvl2Workers) + (3 * numLvl3Workers) + (4 * numLvl4Workers) + (5 * numLvl5Workers);

    gameUI.checkPauseButtonHover(mouseX, mouseY);
    gameUI.checkToolboxButtonHover(mouseX, mouseY);
    gameUI.drawUI({
      money,
      timerMinutes,
      timerSeconds,
      isPaused,
      width,
      height,
      moneyPerSecond,
      gameOver,
      gameWin
    });

    if (isPaused || gameUI.showUpgradesMenu || gameUI.showFloorUpgradesMenu
       || gameUI.showWorkerUpgradesMenu || gameUI.showPlayerUpgradesMenu) return;

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

    if (checkCollision(x, y, guyWidth * 2, guyHeight * 2, {
      topLeft: { x: moneyBag.x, y: moneyBag.y },
      bottomRight: { x: moneyBag.x + moneyBag.width, y: moneyBag.y + moneyBag.height }
    })) {
      money = toBeCollected + money;
      toBeCollected = 0;
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

    let collisionDetectedX = false;
    let collisionDetectedY = false;

    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
      newX -= guySpeed;
      moving = true;
      facingRight = false;
    }

    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
      newX += guySpeed;
      moving = true;
      facingRight = true;
    }

    hitbox.x = newX + (facingRight ? 14 : 4); // Adjust based on direction

    for (let wall of walls) {
      if (checkCollision(hitbox.x, hitbox.y, hitbox.width, hitbox.height, wall)) {
        collisionDetectedX = true;
        break;
      }
    }

    if (!collisionDetectedX) {
      x = newX;
    } else {
      // If collision is detected, stop movement in X direction
      if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
        x += guySpeed; // Undo movement
      }
      if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
        x -= guySpeed; // Undo movement
      }
    }

    // Movement logic for Y
    if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
      newY -= guySpeed;
      moving = true;
    }
    if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
      newY += guySpeed;
      moving = true;
    }

    // Collision check for Y direction
    hitbox.y = newY + 6;
    for (let wall of walls) {
      if (checkCollision(hitbox.x, hitbox.y, hitbox.width, hitbox.height, wall)) {
        collisionDetectedY = true;
        break;
      }
    }

    // Apply Y movement if no collision detected
    if (!collisionDetectedY) {
      y = newY;
    } else {
      // If collision is detected, stop movement in Y direction
      if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
        y += guySpeed; // Undo movement
      }
      if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
        y -= guySpeed; // Undo movement
      }
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
      hitbox.x = x + 14;
    } else {
      translate(x + guyWidth * 2, y);
      scale(-1, 1);
      hitbox.x = x + 5;
    }
    image(guy, 0, 0, guyWidth * 2, guyHeight * 2, guyX, guyY, guyWidth, guyHeight);
    pop();

    // Show walls if toggled
    if (showWalls && box.width > 0 && box.height > 0) {
      fill(255, 0, 0, 150);
      rect(box.x, box.y, box.width, box.height);

      // Show the coordinates of the top-left and bottom-right corners
      fill(0);
      textSize(12);
      text(`Top Left: (${Math.floor(box.x)}, ${Math.floor(box.y)})`, box.x + 5, box.y - 10);
      text(`Bottom Right: (${Math.floor(box.x + box.width)}, ${Math.floor(box.y + box.height)})`, box.x + 5, box.y + box.height + 10);
    }

    // Update box width and height if dragging
    if (box.dragging) {
      box.width = mouseX - box.x;
      box.height = mouseY - box.y;
    }
    if (showWalls) {
      fill(255, 0, 0, 0);  // Fully transparent fill
      rect(hitbox.x, hitbox.y, hitbox.width, hitbox.height);
      for (let wall of walls) {
        fill(0, 100);
        rect(wall.topLeft.x, wall.topLeft.y, wall.bottomRight.x - wall.topLeft.x, wall.bottomRight.y - wall.topLeft.y);

      }
    }

    //image(chair2, 377, 292);
    //image(test, 90, 120);
    //image(desk, 90, 120);


  }
}

const musicTracks = [
  "assets/music/Untitled-2.mp3",
  "assets/music/JazzyDinos.mp3",
  "assets/music/345 - P-Funk 16 Bit.mp3",
  "assets/music/345 - 16 Bit Soul.mp3",
  "assets/music/345 - P-Funk 2.mp3",
  "assets/music/Untitled.mp3",
  "assets/music/Untitled-3.mp3"
]

let currentTrackIndex = 0;
let audio = new Audio(musicTracks[currentTrackIndex]);

// Initialize volume
let volume = 0.5;
audio.volume = volume;

function playNextTrack() {
  currentTrackIndex = (currentTrackIndex + 1) % musicTracks.length;
  audio.src = musicTracks[currentTrackIndex];
  audio.volume = volume; // Ensure volume persists across tracks
  audio.play();
}

// Event listeners
audio.addEventListener("ended", playNextTrack);

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
  clickValue = moneyPerSecond;
  gameUI = new GameUI();
  timerMinutes = 3;
  timerSeconds = 0;
  selectedFloor = 1;
  currentFloor = 1;
  warning = false;
  backPos = false;
  gameOver = false;
  gameWin = false;
  negative = 0;
}

function gameTracker() {
  if (!isPaused) {
    if (money < 0) {
      if (!warning) {
        alert("Warning!");
        warning = true;
      }
    }
  }
}


function getPositive() {
  if (money >= 0) {
    negative++;
  }
}


function isGameOver() {
  if (!isPaused) {
    if (warning && money < 0 && negative >= 1) {
      gameOver = true;
    }
  }
}

let purchasedFloors = {
  1: true,
  2: false,
  3: false,
  4: false,
  5: false
};

let floorPrice = 500; // Initial price for a floor


function mousePressed() {

  if (showFloorMenu) {
    let selectedFloor = gameUI.handleFloorSelection(mouseX, mouseY);

    if (selectedFloor !== null) {
      // if (!purchasedFloors[selectedFloor] && money >= floorPrice) {
      //   money -= floorPrice;
      //   purchasedFloors[selectedFloor] = true;
      //   floorPrice += 500;
      // }


      switchFloor(selectedFloor);
      showFloorMenu = false;
      inElevator = false;

      // Set the player's position to exit the elevator
      x = elevator.x + elevator.width + 30;
      y = elevator.y + elevator.height / 2 - (guyHeight);
    }
  }

  if (gameUI.pauseButtonHovered) {
    togglePause();
    return;
  }

  if (isPaused) {
    console.log("Game is paused, checking for menu clicks");
    const pauseAction = gameUI.handlePauseMenuClick(mouseX, mouseY, width, height);
    console.log("Pause action:", pauseAction);
    if (pauseAction === 'resume') {
      isPaused = false;
      return;
    } else if (pauseAction === 'quit') {
      window.location.reload();
      return;
    }
  }

  if (gameUI.handleToolboxClick(mouseX, mouseY)) {
    return;
  }

  if (!isPaused && !gameUI.showUpgradesMenu) {
    toBeCollected += clickValue;
  }

  if (!isPaused && gameOver) {
    restart();
  }


  if (showWalls && !box.dragging) {
    box.x = mouseX;
    box.y = mouseY;
    box.dragging = true;
  }

  //if click on upgrades menu buy worker
  if (gameUI.showUpgradesMenu) {
    if (gameUI.checkUpgradeButtonHover(mouseX, mouseY) === 1) {
      gameUI.showWorkerUpgradesMenu = true
      gameUI.showUpgradesMenu = false
    }
    if (gameUI.checkUpgradeButtonHover(mouseX, mouseY) === 2) {
      gameUI.showFloorUpgradesMenu = true
      gameUI.showUpgradesMenu = false
    }
    if (gameUI.checkUpgradeButtonHover(mouseX, mouseY) === 7) {
      gameUI.showUpgradesMenu = false
    }
    if (gameUI.checkUpgradeButtonHover(mouseX, mouseY) === 3) {
      gameUI.showPlayerUpgradesMenu = true;
      gameUI.showUpgradesMenu = false;
    }
  } else if (gameUI.showWorkerUpgradesMenu) {
    if (gameUI.checkUpgradeButtonHover(mouseX, mouseY) === 7) {
      gameUI.showWorkerUpgradesMenu = false
      gameUI.showUpgradesMenu = true
    }
    if (gameUI.checkUpgradeButtonHover(mouseX, mouseY) === 1 && currentFloor === 1 &&
        numLvl1Workers < maxWorkerCount) {
      buyWorker();
    }
    if (gameUI.checkUpgradeButtonHover(mouseX, mouseY) === 2 && currentFloor === 2 &&
          numLvl2Workers < maxWorkerCount) {
        buyWorker();
    }
    if (gameUI.checkUpgradeButtonHover(mouseX, mouseY) === 3 && currentFloor === 3 &&
          numLvl3Workers < maxWorkerCount) {
        buyWorker();
    }
    if (gameUI.checkUpgradeButtonHover(mouseX, mouseY) === 4 && currentFloor === 4 &&
          numLvl4Workers < maxWorkerCount) {
        buyWorker();
    }
    if (gameUI.checkUpgradeButtonHover(mouseX, mouseY) === 5 && currentFloor === 5 &&
          numLvl5Workers < maxWorkerCount) {
        buyWorker();
    }
  } else if (gameUI.showFloorUpgradesMenu) {
    if (gameUI.checkUpgradeButtonHover(mouseX, mouseY) === 7) {
      gameUI.showFloorUpgradesMenu = false
      gameUI.showUpgradesMenu = true
    }
    if (money >= floorPrice) {
      if (gameUI.checkUpgradeButtonHover(mouseX, mouseY) === 1) {
        money -= floorPrice;
        floorPrice += 500;
        purchasedFloors[2] = true
        numLvl2Workers += 2
      }
      if (gameUI.checkUpgradeButtonHover(mouseX, mouseY) === 2 && purchasedFloors[2]) {
        money -= floorPrice;
        floorPrice += 500;
        purchasedFloors[3] = true
        numLvl3Workers += 2
      }
      if (gameUI.checkUpgradeButtonHover(mouseX, mouseY) === 3 && purchasedFloors[3]) {
        money -= floorPrice;
        floorPrice += 500;
        purchasedFloors[4] = true
        numLvl4Workers += 2
      }
      if (gameUI.checkUpgradeButtonHover(mouseX, mouseY) === 4 && purchasedFloors[4]) {
        money -= floorPrice;
        floorPrice += 500;
        purchasedFloors[5] = true
        numLvl5Workers += 2
      }
    }
  } else if (gameUI.showPlayerUpgradesMenu) {
    if ((gameUI.checkUpgradeButtonHover(mouseX, mouseY) === 7)) {
      gameUI.showPlayerUpgradesMenu = false;
      gameUI.showUpgradesMenu = true;
    }
    if (money >= speedUpgradeCost) {
      if (gameUI.checkUpgradeButtonHover(mouseX, mouseY) === 1) {
        if (guySpeed <= maxGuySpeed) {
          guySpeed += 1;
          money -= speedUpgradeCost;
          speedUpgradeCost += 500;
        }
      }
    }
  }

}

function mouseReleased() {
  // Stop dragging the boxwd when mouse is released
  if (box.dragging) {
    box.dragging = false;
  }
}

function togglePause() {
  isPaused = !isPaused;
  gameUI.isPaused = isPaused;
}

function keyPressed() {
  if ((key === 'p' || key === 'P') && !startScreen) {
    togglePause();
  }

  if ((key === 'm' || key === 'M') && !startScreen) {
    showWalls = !showWalls; // Toggle wall visibility
  }

  if ((key === 'u' || key === 'U') && !startScreen) {
    gameUI.showUpgradesMenu = !gameUI.showUpgradesMenu;
  }

  if (key === 't' || key === 'T') {
    if (musicStarted == false) {
      audio.play();
      musicStarted = true;
    }
  }

  if ((key === 'y' || key === 'Y') && !startScreen) {
    gameWin = true;
  }

  if ((gameOver && key === 'r' || key === 'R') && !startScreen) {
    restart();
  }

  if ((gameWin && key === 'r' || key === 'R') && !startScreen) {
    restart();
  }

  if (key === 'q') {
    gameUI.showFloorUpgradesMenu = false;
    gameUI.showUpgradesMenu = false;
    gameUI.showWorkerUpgradesMenu = false;
  }


  if ((key === 'b' || key === 'B') && !startScreen) {
    buyWorker()
  }
}

// function getNextWorkerPosition() {
//   // Check if positions for worker type 1 are still available
//   if (floorWorkerPositions[currentFloor].length > 0) {
//     // Determine worker type based on position
//     let position = floorWorkerPositions[currentFloor].shift();
//     let workerType = (position.x === 221 || position.x === 320 || position.x === 98 || position.x === 194 || position.x === 290 || position.x === 383) ? 1 : 2;

//     return { x: position.x, y: position.y, workerType: workerType };
//   }
//   return null; // No positions available
// }

function getNextWorkerPosition() {
  if (floorWorkerPositions[currentFloor].length > 0) {
    let position = floorWorkerPositions[currentFloor].shift();

    // Define workerType based on specific positions
    if (
      (position.x === 221 && position.y === 50) ||
      (position.x === 320 && position.y === 50) ||
      (position.x === 98 && position.y === 175) ||
      (position.x === 194 && position.y === 175) ||
      (position.x === 290 && position.y === 175) ||
      (position.x === 383 && position.y === 175)
    ) {
      position.workerType = 1;
    } else if (
      (position.x === 386 && position.y === 250) ||
      (position.x === 98 && position.y === 250) ||
      (position.x === 194 && position.y === 250) ||
      (position.x === 130 && position.y === 120) ||
      (position.x === 226 && position.y === 120) ||
      (position.x === 323 && position.y === 120)
    ) {
      position.workerType = 2;
    } else {
      position.workerType = 1; // Default to workerType 1 if not explicitly mapped
    }

    return position;
  }
  return null; // No positions available
}




//w buy worker
function initializeWorkerPositions() {

  const defaultPositions = [
    { x: 221, y: 50 },
   { x: 320, y: 50 },
   { x: 98, y: 175 },
    { x: 194, y: 175 },
   { x: 290, y: 175 },
   { x: 383, y: 175 },
    { x: 386, y: 250 },
    { x: 98, y: 250 },
    { x: 194, y: 250 },
    { x: 130, y: 120 },
    { x: 226, y: 120 },
    { x: 323, y: 120 }
  ];

  for (let floor = 1; floor <= 5; floor++) {
    floorWorkerPositions[floor] = [...defaultPositions];
  }

}


function buyWorker() {
  if (floorWorkerCounts[currentFloor] < 14 && money >= workerCost) {
    if (currentFloor === 1) {
      numLvl1Workers++;
    } else if (currentFloor === 2) {
      numLvl2Workers++;
    } else if (currentFloor === 3) {
      numLvl3Workers++;
    } else if (currentFloor === 4) {
      numLvl4Workers++;
    } else if (currentFloor === 5) {
      numLvl5Workers++;
    }
    let newWorkerPos = getNextWorkerPosition();
    if (newWorkerPos) {
      occupiedPositions.push(newWorkerPos);
      floorWorkerCounts[currentFloor]++;
      money -= workerCost;
      workerCost += 100;
    }
  } else if (floorWorkerCounts[currentFloor] >= 14) {
    alert("Maximum workers reached for this floor!");
}
}



function timeIt() {
  if (!isPaused && !startScreen) {
    if (timerMinutes === 0 && timerSeconds === 0 && money < 0) {
      gameOver = true;
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
      toBeCollected += moneyPerSecond
    }
  }
}

let walls = [
  { topLeft: { x: 79, y: 182 }, bottomRight: { x: 122, y: 247 } },
  { topLeft: { x: 122, y: 131 }, bottomRight: { x: 570, y: 160 } },
  { topLeft: { x: 570, y: 121 }, bottomRight: { x: 592, y: 643 } },
  { topLeft: { x: 90, y: 312 }, bottomRight: { x: 121, y: 451 } },
  { topLeft: { x: 204, y: 450 }, bottomRight: { x: 217, y: 644 } },
  { topLeft: { x: 206, y: 633 }, bottomRight: { x: 584, y: 643 } },
  { topLeft: { x: 108, y: 442 }, bottomRight: { x: 395, y: 488 } },
  { topLeft: { x: 455, y: 442 }, bottomRight: { x: 570, y: 503 } },
  { topLeft: { x: 241, y: 543 }, bottomRight: { x: 280, y: 579 } },
  { topLeft: { x: 318, y: 565 }, bottomRight: { x: 375, y: 585 } },
  { topLeft: { x: 350, y: 502 }, bottomRight: { x: 373, y: 568 } },
  { topLeft: { x: 479, y: 539 }, bottomRight: { x: 535, y: 559 } },
  { topLeft: { x: 479, y: 558 }, bottomRight: { x: 503, y: 616 } },
  { topLeft: { x: 480, y: 597 }, bottomRight: { x: 533, y: 616 } },
  { topLeft: { x: 455, y: 442 }, bottomRight: { x: 570, y: 503 } },
  { topLeft: { x: 516, y: 231 }, bottomRight: { x: 562, y: 259 } },
  { topLeft: { x: 455, y: 442 }, bottomRight: { x: 570, y: 503 } },
  { topLeft: { x: 160, y: 338 }, bottomRight: { x: 532, y: 394 } },
  { topLeft: { x: 188, y: 215 }, bottomRight: { x: 471, y: 278 } },
  { topLeft: { x: 158, y: 331 }, bottomRight: { x: 526, y: 352 } },
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
