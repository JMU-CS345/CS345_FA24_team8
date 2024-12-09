let first = false;
let showTitle = true;
let showCompany = false;

let width = 700;
let height = 700;

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

function preload() {
  img = loadImage("assets/360_F_534160357_SRlpd1wPvPZiCghL.jpg");
  spriteSheet = loadImage("assets/mort/base/move.png");
  audio = loadSound("assets/music/Untitled-2.mp3");
  map1 = loadImage('assets/Office_Design_2.gif');
  guy = loadImage('assets/mort/base/move.png');
  chair = loadImage('assets/chair.png');
  chair2 = loadImage('assets/chair.png');
  test = loadImage('assets/test.png');
  desk = loadImage('assets/desk_occupied.png');
}

function setup() {
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

function displayStartScreen() {

  createCanvas(700, 700);

  background(20);
  image(img, 0, 0);

  // Title and Subtitle for the Start Screen
  textFont("Arial");
  textSize(60);
  textStyle(BOLD);
  strokeWeight(8);
  stroke(0, 102, 204); // Office-themed blue stroke color
  fill(255); // White fill
  if (showTitle) {
    text("Fossil Fortune", width / 2 - 200, height / 4); // Main title
    textSize(30);
    fill(255); // Subtitle color
    text("Build your office empire!", width / 2 - 180, height / 4 + 50); // Subtitle below the title
  }

  if (showCompany) {
    textSize(25);
    fill(255);
    textAlign(CENTER, CENTER);
    text("Please create your business name!", width / 2, height / 2 - 50);
  }


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

  // Update the frame for animation
  if (frameCount % 6 === 0) {
    // Adjust the speed of animation
    currentFrame = (currentFrame + 1) % totalFrames;
  }

  if (isWalking) {
    spriteX += 2;
  }

  if (first) {
    if (spriteX < 300) {
      spriteX += 2;
    }
  }


  // Stop walking if the sprite goes off-screen
  if (spriteX > width) {
    showInputScreen();
    isWalking = false;
  }
}

function startGame() {
  isWalking = true; // Start the animation
  button.hide();
  loop();
}

function showInputScreen() {
  showTitle = false;
  showCompany = true;
  image(img, 0, 0);

  spriteX = 0;
  spriteY = 550;

  first = true;
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
      startScreen = false;
      loop(); // Resume the draw loop
    });
  } else {
    submitButton.show(); // Show the button if it already exists
  }
}