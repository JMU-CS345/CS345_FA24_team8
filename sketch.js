let workerPositions1 = []; // buy worker
let workerPositions2 = [];  // but worker
let occupiedPositions = []; // buy worker
let workerCost = 50;

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

let toBeCollected = 0
let money = 1000;

let img;
let finalText;
let button;
let spriteSheet;
let spriteWidth = 144 / 6; // Width of each frame
let spriteHeight = 24; // Height of each frame
let totalFrames = 6; // Number of frames in the sprite sheet
let currentFrame = 0; // Track the current frame
let spriteX, spriteY; // Sprite position
let isWalking = false; // Flag to start animation
let inputBox, submitButton;

let spriteScale = 4; // Change this to scale the sprite
let spriteDisplayWidth = spriteWidth * spriteScale; // Scaled width
let spriteDisplayHeight = spriteHeight * spriteScale; // Scaled height

let song;

let startOn = true;



let box = { x: 0, y: 0, width: 0, height: 0, dragging: false };
let cornersHovered = null;
let hoveredWall = null;

let elevator = {
  x: 50,
  y: 247,
  width: 40,
  height: 65
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

let moneyBag = {
  x: 400,
  y: 560,
  width: 35,
  height: 35,
};


function preload() {
  map1 = loadImage('assets/Office_Design_2.gif');
  guy = loadImage('assets/mort/base/move.png');
  chair = loadImage('assets/chair.png');
  chair2 = loadImage('assets/chair.png');
  test = loadImage('assets/test.png');
  desk = loadImage('assets/desk_occupied.png');
  worker1 = loadImage('assets/Worker1.gif');
  worker2 = loadImage('assets/Worker2.gif');
  money = loadImage('assets/office_assets/money/money_1.png');
  money2 = loadImage('assets/office_assets/money/money_2.png');
  money3 = loadImage('assets/office_assets/money/money_3.png');

  img = loadImage("assets/360_F_534160357_SRlpd1wPvPZiCghL.jpg");
  spriteSheet = loadImage("assets/mort/base/move.png");
  audio = loadSound("assets/music/Untitled-2.mp3");
}

function setup() {
  createCanvas(700, 700);
  spriteX = width / 2 - spriteDisplayWidth / 2; // Start in the center of the screen
  spriteY = height / 2 + 200; // Vertically centered

  button = createButton("Start");
  button.position(width / 2 - 50 + 365, height / 2 + 150 - 250); // Centered below the title
  button.size(100, 40);
  button.style("font-size", "20px");
  button.style("background-color", "#4CAF50"); // Green background
  button.style("color", "#FFFFFF"); // White text
  button.style("border", "none");
  button.style("border-radius", "8px");
  button.mousePressed(startGame); // Add an action when clicked
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
  setInterval(timeIt, 1000);


  initializeWorkerPositions();


}

function draw() {
  if (startOn) {
    displayStartScreen();
  } else {
    displayMainGame();
  }
}


function displayStartScreen() {

  background(20);
  image(img, 0, 0);


  // Title and Subtitle for the Start Screen
  textFont("Arial");
  textSize(60);
  textStyle(BOLD);
  strokeWeight(8);
  stroke(0, 102, 204); // Office-themed blue stroke color
  fill(255); // White fill
  text("Fossil Fortune", width / 2 - 200, height / 4); // Main title
  textSize(30);
  fill(255); // Subtitle color
  text("Build your office empire!", width / 2 - 180, height / 4 + 50); // Subtitle below the title


  if (isWalking) {
    // Draw and animate the sprite
    let sx = currentFrame * spriteWidth; // X position in the sprite sheet
    let sy = 0; // Y position in the sprite sheet (single row)
    image(
      spriteSheet,
      spriteX,
      spriteY,
      spriteDisplayWidth,
      spriteDisplayHeight,
      sx,
      sy,
      spriteWidth,
      spriteHeight
    );


    // Move the sprite to the right
    spriteX += 2;


    // Update the frame for animation
    if (frameCount % 6 === 0) {
      // Adjust the speed of animation
      currentFrame = (currentFrame + 1) % totalFrames;
    }


    // Stop walking if the sprite goes off-screen
    if (spriteX > width) {
      isWalking = false;
      noLoop(); // Stop the animation
      showInputScreen();
    }
  }
}

function displayMainGame() {
  background(220);
  strokeWeight(0);


  moneyPerSecond = numLvl1Workers + (2 * numLvl2Workers) + (3 * numLvl3Workers) + (4 * numLvl4Workers) + (5 * numLvl5Workers);
  clickValue = moneyPerSecond


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
  gameTracker();
  if (warning) {
    getPositive();
    isGameOver();
  }


  /*floorWorkers[currentFloor].forEach(worker => {
    let workerImage = worker.workerType === 1 ? worker1 : worker2;
    image(workerImage, mapOffsetX + worker.x, mapOffsetY + worker.y, workerWidth, workerHeight);
  });

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
  */

  renderWorkers();


  // Draw elevator
  fill(100);
  rect(elevator.x, elevator.y, elevator.width, elevator.height);
  fill(150);
  textSize(12);
  textAlign(CENTER, CENTER);
  text("Floor " + currentFloor, elevator.x + elevator.width / 2, elevator.y + elevator.height / 2);


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
    gameOver
  });


  if (isPaused || gameUI.showUpgradesMenu || gameUI.showFloorUpgradesMenu || gameUI.showWorkerUpgradesMenu) return;

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
    bottomRight: { x: moneyBag.x + moneyBag.width, y: moneyBag.y + elevator.height }
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
    newX -= 1;
    moving = true;
    facingRight = false;
  }


  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
    newX += 1;
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
      x += 1; // Undo movement
    }
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
      x -= 1; // Undo movement
    }
  }


  // Movement logic for Y
  if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
    newY -= 1;
    moving = true;
  }
  if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
    newY += 1;
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
      y += 1; // Undo movement
    }
    if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
      y -= 1; // Undo movement
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
    fill(255, 0, 0, 0); // Fully transparent fill
    rect(hitbox.x, hitbox.y, hitbox.width, hitbox.height);
    for (let wall of walls) {
      fill(0, 100);
      rect(wall.topLeft.x, wall.topLeft.y, wall.bottomRight.x - wall.topLeft.x, wall.bottomRight.y - wall.topLeft.y);


    }
  }


  /*image(chair, 185, 292);
  image(chair2, 377, 292);*/
  image(test, 90, 120);
  image(desk, 90, 120);
  image(money2, 400, 500);

  fill(255, 0, 0);
  textSize(12);
  textAlign(CENTER, CENTER);
  text(toBeCollected, moneyBag.x + moneyBag.width/2, moneyBag.y + moneyBag.height/2);

}

/*
function draw() {
  background(220);

  moneyPerSecond = numLvl1Workers + (2 * numLvl2Workers) + (3 * numLvl3Workers) + (4 * numLvl4Workers) + (5 * numLvl5Workers);
  clickValue = moneyPerSecond

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
  gameTracker();
  if (warning) {
    getPositive();
    isGameOver();
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
  text("Floor " + currentFloor, elevator.x + elevator.width/2, elevator.y + elevator.height/2);




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
    gameOver
  });

  if (isPaused || gameUI.showUpgradesMenu || gameUI.showFloorUpgradesMenu || gameUI.showWorkerUpgradesMenu) return;

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
    bottomRight: { x: moneyBag.x + moneyBag.width, y: moneyBag.y + elevator.height }
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
    newX -= 1;
    moving = true;
    facingRight = false;
  }

  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
    newX += 1;
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
      x += 1; // Undo movement
    }
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
      x -= 1; // Undo movement
    }
  }

  // Movement logic for Y
  if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
    newY -= 1;
    moving = true;
  }
  if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
    newY += 1;
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
      y += 1; // Undo movement
    }
    if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
      y -= 1; // Undo movement
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

  image(chair, 185, 292 );
  image(chair2, 377, 292); 
  image(test, 90, 120);
  image(desk, 90, 120);
  image(money2, 400, 500);

  fill(255, 0, 0);
  textSize(12);
  textAlign(CENTER, CENTER);
  text(toBeCollected, moneyBag.x + moneyBag.width/2, moneyBag.y + moneyBag.height/2);

}
*/

const musicTracks = [
  "assets/music/345 - P-Funk 16 Bit.mp3",
  "assets/music/345 - 16 Bit Soul.mp3",
  "assets/music/345 - P-Funk 2.mp3",
  "assets/music/Untitled.mp3",
  "assets/music/Untitled-2.mp3",
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
  1: true, // The first floor is already purchased at the start
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
      if (!purchasedFloors[selectedFloor]) {
        // Check if the player has enough money
        if (money >= floorPrice) {
          money -= floorPrice; // Deduct the floor price
          purchasedFloors[selectedFloor] = true; // Mark floor as purchased
          floorPrice += 500; // Increment price for the next floor
        } else {
          alert("Not enough money to buy this floor!");
          return; // Exit if the player can't afford the floor
        }
      }

      // Switch to the selected floor
      currentFloor = selectedFloor;
      showFloorMenu = false;
      inElevator = false;

      // Set the player's position to exit the elevator
      x = elevator.x + elevator.width + 30;
      y = elevator.y + elevator.height / 2 - (guyHeight);
    }

    if (inElevator && showFloorMenu) {
      let selectedFloor = gameUI.handleFloorSelection(mouseX, mouseY); // Determine selected floor
      if (selectedFloor !== null && purchasedFloors[selectedFloor]) {
        switchFloor(selectedFloor); 
        showFloorMenu = false;      
        inElevator = false;        
      }
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
  } else if (gameUI.showWorkerUpgradesMenu && money >= workerCost) {
    if (gameUI.checkUpgradeButtonHover(mouseX, mouseY) === 1) {
      buyWorker();
      money -= workerCost;
      workerCost += 100;
      let newWorkerPos = getNextWorkerPosition();
      if (newWorkerPos) {
        occupiedPositions.push(newWorkerPos);
      }
    }
  } else if (gameUI.showFloorUpgradesMenu && money >= floorPrice) {
    if (gameUI.checkUpgradeButtonHover(mouseX, mouseY) === 1) {
      money -= floorPrice;
      floorPrice += 500;
      purchasedFloors[2] = true
    }
    if (gameUI.checkUpgradeButtonHover(mouseX, mouseY) === 2 && purchasedFloors[2]) {
      money -= floorPrice;
      floorPrice += 500;
      purchasedFloors[3] = true
    }
    if (gameUI.checkUpgradeButtonHover(mouseX, mouseY) === 3 && purchasedFloors[3]) {
      money -= floorPrice;
      floorPrice += 500;
      purchasedFloors[4] = true
    }
    if (gameUI.checkUpgradeButtonHover(mouseX, mouseY) === 4 && purchasedFloors[4]) {
      money -= floorPrice;
      floorPrice += 500;
      purchasedFloors[5] = true
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

  if (key === 't' || key === 'T') {
    audio.play();
  }

  if (gameOver && key === 'r' || key === 'R') {
    restart();
  }
  if (key === 'q') {
    gameUI.showFloorUpgradesMenu = false;
    gameUI.showUpgradesMenu = false;
    gameUI.showWorkerUpgradesMenu = false;
  }


  if (key === 'b' || key === 'B') {
    if (money >= workerCost) {
      WorkerUpgradeQueue.pop();
      //money -= workerCost;
      buyWorker();
      //workerCost += 100;
      let newWorkerPos = getNextWorkerPosition();
      if (newWorkerPos) {
        occupiedPositions.push(newWorkerPos);
      }
    }
  }
}

// buy worker
function getNextWorkerPosition() {
  if (workerPositions1.length > 0) {
    let position = workerPositions1.shift();
    return { x: position.x, y: position.y, workerType: 1 };
  }
  if (workerPositions2.length > 0) {
    let position = workerPositions2.shift();
    return { x: position.x, y: position.y, workerType: 2 };
  }
  return null;
}



function switchFloor(newFloor) {
  saveWorkersToFloor(currentFloor); 
  currentFloor = newFloor;
  loadWorkersForFloor(currentFloor); 
}

function saveWorkersToFloor(floor) {
  floorWorkers[floor] = [occupiedPositions]; // ...
}

function loadWorkersForFloor(floor) {
  if (floorWorkers[floor]) {
    occupiedPositions = [floorWorkers[floor]]; //...
  } else {
    occupiedPositions = []; 
  }
}


//w buy worker
function initializeWorkerPositions() {
  workerPositions1.push({ x: 221, y: 50 });
  workerPositions1.push({ x: 320, y: 50 });
  workerPositions1.push({ x: 98, y: 175 });
  workerPositions1.push({ x: 194, y: 175 });
  workerPositions1.push({ x: 290, y: 175 });
  workerPositions1.push({ x: 383, y: 175 });

  // // Predefined coordinates for worker type 2
  workerPositions2.push({ x: 386, y: 250 });
  workerPositions2.push({ x: 98, y: 250 });
  workerPositions2.push({ x: 194, y: 250 });
  workerPositions2.push({ x: 130, y: 120 });
  workerPositions2.push({ x: 226, y: 120 });
  workerPositions2.push({ x: 323, y: 120 });

}

function renderWorkers() {
  for (let worker of floorWorkers[currentFloor]) {
    if (worker.workerType === 1) {
      // Copy worker 1's image to the worker's position
      copy(map1, worker1X, worker1Y, workerWidth, workerHeight,
           mapOffsetX + worker.x, mapOffsetY + worker.y, workerWidth, workerHeight);
    } else if (worker.workerType === 2) {
      // Copy worker 2's image to the worker's position
      copy(map1, worker2X, worker2Y, workerWidth, workerHeight,
           mapOffsetX + worker.x, mapOffsetY + worker.y, workerWidth, workerHeight);
    }
  }
}


// buy worker
function buyWorker() {
  if (money >= workerCost) {
    let newWorkerPos = getNextWorkerPosition();
    if (currentFloor === 1 && (numLvl1Workers < maxWorkerCount)) {
      numLvl1Workers++;
    } else if (currentFloor === 2 && (numLvl2Workers < maxWorkerCount)) {
      numLvl2Workers++;
    } else if (currentFloor === 3 && (numLvl3Workers < maxWorkerCount)) {
      numLvl3Workers++;
    } else if (currentFloor === 4 && (numLvl4Workers < maxWorkerCount)) {
      numLvl4Workers++;
    } else if (currentFloor === 5 && (numLvl5Workers < maxWorkerCount)) {
      numLvl5Workers++;
    }
    if (money >= workerCost) {
      let newWorkerPos = getNextWorkerPosition();
      if (newWorkerPos && floorWorkers[currentFloor].length < maxWorkerCount) {
        floorWorkers[currentFloor].push({
          x: newWorkerPos.x,
          y: newWorkerPos.y,
          workerType: newWorkerPos.workerType,
        });
        occupiedPositions.push(newWorkerPos);
        money -= workerCost;
        workerCost += 100;
      }
    }
  }
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
  { topLeft: { x: 188, y: 215 }, bottomRight: { x: 471, y: 250 } },
  { topLeft: { x: 158, y: 331 }, bottomRight: { x: 526, y: 352 } },
  { topLeft: { x: 410, y: 569 }, bottomRight: { x: 420, y: 590 } },
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

function startGame() {
  isWalking = true; // Start the animation
  button.hide();
  loop();
}

function showInputScreen() {
  background(0);
  textSize(25);
  fill(255);
  textAlign(CENTER, CENTER);
  text("Please create your business name!", width / 2, height / 2 - 50);

  // Check if the input box and button are already created
  if (!inputBox) {
    inputBox = createInput();
    inputBox.position(width / 2 + 200, height / 2);
    inputBox.size(200);
  } else {
    inputBox.show(); // Show the input box if it already exists
  }

  if (!submitButton) {
    submitButton = createButton("Submit");
    submitButton.position(inputBox.x + inputBox.width + 20, inputBox.y);
    submitButton.size(100, 30);
    submitButton.style("font-size", "16px");
    submitButton.style("background-color", "#4CAF50");
    submitButton.style("color", "#FFFFFF");
    submitButton.style("border", "none");
    submitButton.style("border-radius", "5px");
    submitButton.mousePressed(() => {
      companyName = inputBox.value();
      submitButton.hide();
      inputBox.hide();
      startOn = false; // Proceed to the main game
      loop(); // Resume the draw loop
    });
  } else {
    submitButton.show(); // Show the button if it already exists
  }
}

function saveWorkersToFloor(floor) {
  occupiedPositionsList[floor - 1] = [...occupiedPositionsList[floor - 1]];
}


function loadWorkersForFloor(floor) {
  if (!occupiedPositionsList[floor - 1]) {
    occupiedPositionsList[floor - 1] = [];
  }
}