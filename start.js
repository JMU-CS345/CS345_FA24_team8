
let img;
let finalText;
let button;
let spriteSheet;
let spriteWidth = (144 / 6); // Width of each frame
let spriteHeight = 24; // Height of each frame
let totalFrames = 6; // Number of frames in the sprite sheet
let currentFrame = 0; // Track the current frame
let spriteX, spriteY; // Sprite position
let isWalking = false; //Flag to start animation

let spriteScale = 4; // Change this to scale the sprite
let spriteDisplayWidth = spriteWidth * spriteScale; // Scaled width
let spriteDisplayHeight = spriteHeight * spriteScale; // Scaled height

function preload() {
  img = loadImage("2211.w030.n003.491B.p1.491-2.jpg");
  spriteSheet = loadImage("assets/mort/base/move.png");
}

function setup() {
  createCanvas(700, 700); // Updated canvas size
  noLoop();
  textAlign(CENTER, CENTER);

  // Create the start button
  button = createButton("Start");
  button.position(width / 2 - 50, height / 2 + 150 - 200); // Centered below the title
  button.size(100, 40);
  button.style("font-size", "20px");
  button.style("background-color", "#FF69B4"); // Hot pink background
  button.style("color", "#FFFFFF"); // White text
  button.style("border", "none");
  button.style("border-radius", "8px");
  button.mousePressed(startGame); // Add an action when clicked

  spriteX = width / 2 - spriteDisplayWidth / 2; // Start in the center of the screen
  spriteY = height / 2 + 125; // Vertically centered
}

function draw() {
  background(20);
  image(img, 0, 0);
  textFont("Georgia");
  textSize(80);
  textStyle(BOLD);
  strokeWeight(8);
  stroke(255, 105, 180); // Hot pink stroke color
  fill(255); // White fill
  finalText = text("Fossil Fortune", width / 2, height / 4); // Title near the top

  if (isWalking) {
    // Draw and animate the sprite
    let sx = currentFrame * spriteWidth; // X position in the sprite sheet
    let sy = 0; // Y position in the sprite sheet (single row)
    image(spriteSheet, spriteX, spriteY, spriteDisplayWidth, spriteDisplayHeight, sx, sy, spriteWidth, spriteHeight);

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
      setName();
    }
  }
}

function startGame() {
  isWalking = true; // Start the animation
  button.hide();
  loop(); // Start the draw loop
}

function setName() {
  background(0);
  textSize(25);
  text('Please create business name!', 325, 335);
  
  inputBox = createInput();
  inputBox.position(300, 350); // Set the position of the input box
  inputBox.size(200); // Set the width of the input box
  
  //Submit button
  let button = createButton('Submit');
  button.position(inputBox.x + inputBox.width + 10, 20);
  //button.mousePressed(restart());
}

