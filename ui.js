class GameUI {
  constructor() {
    this.PAUSE_BUTTON = {
      x: 650,
      y: 10,
      width: 32,
      height: 32
    };
    this.MONEY_DISPLAY = {
      x: 10,
      y: 10,
      width: 160,
      height: 32
    };
    this.TIMER_DISPLAY = {
      x: 180,
      y: 10,
      width: 160,
      height: 32
    };
    this.FLOOR_MENU = {
      x: 200,
      y: 150,
      width: 300,
      height: 400
    };
    // New toolbox position for 700x700 canvas
    this.TOOLBOX_BUTTON = {
      x: 658,
      y: 658,
      width: 32,
      height: 32
    };
    this.UPGRADES_MENU = {
      x: 150,
      y: 100,
      width: 400,
      height: 450
    };
    this.pauseButtonHovered = false;
    this.toolboxButtonHovered = false;
    this.showUpgradesMenu = false;
    this.currentUpgradeHover = 0;

    this.UpgradesFloorY = 160

    this.UPGRADE_FLOOR_ONE_BUTTON = {
      x: this.UPGRADES_MENU.x + this.UPGRADES_MENU.width - 55, 
      y: this.UpgradesFloorY, 
      width: 32,
      height: 32
    }
    this.UPGRADE_FLOOR_TWO_BUTTON = {
      x: this.UPGRADES_MENU.x + this.UPGRADES_MENU.width - 55, 
      y: this.UpgradesFloorY + 40, 
      width: 32,
      height: 32
    }
    this.UPGRADE_FLOOR_THREE_BUTTON = {
      x: this.UPGRADES_MENU.x + this.UPGRADES_MENU.width - 55, 
      y: this.UpgradesFloorY + 80, 
      width: 32,
      height: 32
    }
    this.UPGRADE_FLOOR_FOUR_BUTTON = {
      x: this.UPGRADES_MENU.x + this.UPGRADES_MENU.width - 55, 
      y: this.UpgradesFloorY + 120, 
      width: 32,
      height: 32
    }
    this.UPGRADE_FLOOR_FIVE_BUTTON = {
      x: this.UPGRADES_MENU.x + this.UPGRADES_MENU.width - 55, 
      y: this.UpgradesFloorY + 160, 
      width: 32,
      height: 32
    }
    this.BUY_FLOOR_TWO_BUTTON = {
      x: this.UPGRADES_MENU.x + this.UPGRADES_MENU.width - 55,
      y: this.UpgradesFloorY + 200,
      width: 32,
      height: 32
    }
    this.BUY_FLOOR_THREE_BUTTON = {
      x: this.UPGRADES_MENU.x + this.UPGRADES_MENU.width - 55,
      y: this.UpgradesFloorY + 240,
      width: 32,
      height: 32
    }
    this.BUY_FLOOR_FOUR_BUTTON = {
      x: this.UPGRADES_MENU.x + this.UPGRADES_MENU.width - 55,
      y: this.UpgradesFloorY + 280,
      width: 32,
      height: 32
    }
    this.BUY_FLOOR_FIVE_BUTTON = {
      x: this.UPGRADES_MENU.x + this.UPGRADES_MENU.width - 55,
      y: this.UpgradesFloorY + 320,
      width: 32,
      height: 32
    }
  }

  checkPauseButtonHover(mouseX, mouseY) {
    this.pauseButtonHovered = mouseX >= this.PAUSE_BUTTON.x &&
      mouseX <= this.PAUSE_BUTTON.x + this.PAUSE_BUTTON.width &&
      mouseY >= this.PAUSE_BUTTON.y &&
      mouseY <= this.PAUSE_BUTTON.y + this.PAUSE_BUTTON.height;
    return this.pauseButtonHovered;
  }

  handlePauseClick(mouseX, mouseY, gameState) {
    if (this.checkPauseButtonHover(mouseX, mouseY)) {
      gameState.isPaused = !gameState.isPaused;
      return true;
    }
    return false;
  }

  drawGameOverScreen(width, height) {
    push();
    fill(0, 0, 0, 127);
    rect(0, 0, width, height);
    
    textAlign(CENTER, CENTER);
    textSize(48);
    fill(255);
    text("GAME OVER", width / 2, height / 2 - 40);

    textSize(24);
    fill(255, 0, 0);
    text("Click to Restart or Press R", width / 2, height / 2 + 40);
    pop();
  }

  drawMoneyDisplay(money, moneyPerSecond) {
    push();
    translate(this.MONEY_DISPLAY.x, this.MONEY_DISPLAY.y);
    fill('#4a5c68');
    rect(0, 0, this.MONEY_DISPLAY.width, this.MONEY_DISPLAY.height, 4);
    fill('#2c353b');
    rect(7, 8, 16, 16);
    fill('#8bac0f');
    rect(6, 7, 16, 16);
    fill('#9bbc0f');
    rect(12, 7, 4, 2);
    rect(11, 13, 6, 2);
    rect(12, 20, 4, 2);
    rect(10, 9, 2, 12);
    textAlign(LEFT, CENTER);
    textSize(16);
    fill('#9bbc0f');
    text(money.toString(), 32, this.MONEY_DISPLAY.height/2);
    if (moneyPerSecond !== undefined) {
      text("$" + moneyPerSecond.toString() + "/sec", 100, this.MONEY_DISPLAY.height/2);
    }
    pop();
  }

  drawTimerDisplay(minutes, seconds) {
    push();
    translate(this.TIMER_DISPLAY.x, this.TIMER_DISPLAY.y);
    fill('#4a5c68');
    rect(0, 0, this.TIMER_DISPLAY.width, this.TIMER_DISPLAY.height, 4);
    fill('#2c353b');
    rect(7, 8, 16, 16);
    fill('#8bac0f');
    rect(6, 7, 16, 16);
    fill('#9bbc0f');
    rect(13, 7, 2, 6);
    rect(13, 13, 6, 2);
    rect(6, 7, 2, 2);
    rect(20, 7, 2, 2);
    textAlign(LEFT, CENTER);
    textSize(16);
    fill('#9bbc0f');
    text(nf(minutes, 2) + ":" + nf(seconds, 2), 32, this.TIMER_DISPLAY.height/2);
    pop();
  }

  drawPauseButton(isPaused) {
    push();
    translate(this.PAUSE_BUTTON.x, this.PAUSE_BUTTON.y);
    if (this.pauseButtonHovered) {
      scale(1.1);
    }
    fill('#4a5c68');
    rect(0, 0, 32, 32, 4);
    if (isPaused) {
      fill('#2c353b');
      triangle(8, 8, 8, 24, 24, 16);
      fill('#8bac0f');
      triangle(7, 7, 7, 23, 23, 15);
    } else {
      fill('#2c353b');
      rect(7, 8, 7, 16);
      rect(18, 8, 7, 16);
      fill('#8bac0f');
      rect(6, 7, 7, 16);
      rect(17, 7, 7, 16);
      fill('#9bbc0f');
      rect(6, 7, 2, 2);
      rect(17, 7, 2, 2);
      fill('#306230');
      rect(8, 11, 3, 3);
      rect(19, 11, 3, 3);
      rect(6, 22, 7, 1);
      rect(17, 22, 7, 1);
    }
    pop();
  }

  drawPauseOverlay(width, height) {
    push();
    // Semi-transparent dark background
    fill(0, 0, 0, 127);
    rect(0, 0, width, height);
    
    // Menu container
    const menuWidth = 300;
    const menuHeight = 400;
    const menuX = width/2 - menuWidth/2;
    const menuY = height/2 - menuHeight/2;
    
    // Menu background
    fill('#4a5c68');
    rect(menuX, menuY, menuWidth, menuHeight, 8);
    
    // Title
    fill('#9bbc0f');
    textAlign(CENTER, TOP);
    textSize(36);
    text("PAUSED", width/2, menuY + 40);
    
    // Resume button
    const buttonWidth = 200;
    const buttonHeight = 40;
    const buttonX = width/2 - buttonWidth/2;
    let buttonY = menuY + 120;
    
    // Check if mouse is hovering over resume button
    const resumeHovered = mouseX >= buttonX && mouseX <= buttonX + buttonWidth &&
                         mouseY >= buttonY && mouseY <= buttonY + buttonHeight;
    
    fill(resumeHovered ? '#8bac0f' : '#2c353b');
    rect(buttonX, buttonY, buttonWidth, buttonHeight, 4);
    fill('#9bbc0f');
    textAlign(CENTER, CENTER);
    textSize(20);
    text("Resume", width/2, buttonY + buttonHeight/2);
    
    // Quit button
    buttonY = menuY + 180;
    const quitHovered = mouseX >= buttonX && mouseX <= buttonX + buttonWidth &&
                       mouseY >= buttonY && mouseY <= buttonY + buttonHeight;
    
    fill(quitHovered ? '#8bac0f' : '#2c353b');
    rect(buttonX, buttonY, buttonWidth, buttonHeight, 4);
    fill('#9bbc0f');
    text("Quit", width/2, buttonY + buttonHeight/2);
    
    // Volume slider
    const sliderWidth = 200;
    const sliderHeight = 8;
    const sliderX = width/2 - sliderWidth/2;
    const sliderY = menuY + 280;
    
    // Slider label
    textAlign(CENTER, BOTTOM);
    textSize(16);
    fill('#9bbc0f');
    text("Volume", width/2, sliderY - 10);
    
    // Slider track
    fill('#2c353b');
    rect(sliderX, sliderY, sliderWidth, sliderHeight, 4);
    
    // Slider handle
    const handleWidth = 20;
    const handleHeight = 20;
    
    if (this.volume === undefined) this.volume = 0.5;
    
    // Check if mouse is dragging the slider
    if (mouseIsPressed && 
        mouseX >= sliderX && mouseX <= sliderX + sliderWidth &&
        mouseY >= sliderY - handleHeight/2 && mouseY <= sliderY + handleHeight/2) {
      this.volume = constrain((mouseX - sliderX) / sliderWidth, 0, 1);
    }
    
    // Draw slider handle
    const handleX = sliderX + (sliderWidth * this.volume) - handleWidth/2;
    fill('#8bac0f');
    rect(handleX, sliderY - handleHeight/2 + sliderHeight/2, 
         handleWidth, handleHeight, 4);
    
    // Volume percentage
    textAlign(CENTER, TOP);
    textSize(14);
    text(Math.round(this.volume * 100) + "%", width/2, sliderY + 20);
    
    pop();
  }
  
  handlePauseMenuClick(mouseX, mouseY, width, height) {
    if (!this.isPaused) return false;
    
    const menuWidth = 300;
    const menuHeight = 400;
    const menuX = width/2 - menuWidth/2;
    const menuY = height/2 - menuHeight/2;
    
    const buttonWidth = 200;
    const buttonHeight = 40;
    const buttonX = width/2 - buttonWidth/2;
    
    // Resume button
    const resumeY = menuY + 120;
    if (mouseX >= buttonX && mouseX <= buttonX + buttonWidth &&
        mouseY >= resumeY && mouseY <= resumeY + buttonHeight) {
      return 'resume';
    }
    
    // Quit button
    const quitY = menuY + 180;
    if (mouseX >= buttonX && mouseX <= buttonX + buttonWidth &&
        mouseY >= quitY && mouseY <= quitY + buttonHeight) {
      return 'quit';
    }
    
    return false;
  }

  drawUI(gameState) {
    if (gameState.gameOver) {
      this.drawGameOverScreen(gameState.width, gameState.height);
    } else {
      this.drawMoneyDisplay(gameState.money, gameState.moneyPerSecond);
      this.drawTimerDisplay(gameState.timerMinutes, gameState.timerSeconds);
      if (gameState.isPaused) {
        this.drawPauseOverlay(gameState.width, gameState.height);
      }
      this.drawPauseButton(gameState.isPaused);
      this.drawToolboxButton();
      if (this.showUpgradesMenu) {
        this.drawUpgradesMenu();
      }
    }
  }

  drawFloorMenu(currentFloor) {
    push();
    fill(0, 0, 0, 127);
    rect(0, 0, width, height);
    
    fill('#4a5c68');
    rect(this.FLOOR_MENU.x, this.FLOOR_MENU.y, this.FLOOR_MENU.width, this.FLOOR_MENU.height, 8);
    
    textAlign(CENTER, TOP);
    textSize(24);
    fill('#9bbc0f');
    text("Select Floor", this.FLOOR_MENU.x + this.FLOOR_MENU.width/2, this.FLOOR_MENU.y + 20);

    for (let i = 5; i >= 1; i--) {
      let buttonY = this.FLOOR_MENU.y + 80 + (5-i) * 60;
      fill(i === currentFloor ? '#8bac0f' : '#2c353b');
      rect(this.FLOOR_MENU.x + 50, buttonY, this.FLOOR_MENU.width - 100, 40, 4);
      
      fill('#9bbc0f');
      textAlign(CENTER, CENTER);
      textSize(18);
      text("Floor " + i, this.FLOOR_MENU.x + this.FLOOR_MENU.width/2, buttonY + 20);
    }
    pop();
  }

  handleFloorSelection(mouseX, mouseY) {
    if (mouseX < this.FLOOR_MENU.x + 50 || mouseX > this.FLOOR_MENU.x + this.FLOOR_MENU.width - 50) {
      return null;
    }
    
    for (let i = 5; i >= 1; i--) {
      let buttonY = this.FLOOR_MENU.y + 80 + (5-i) * 60;
      if (mouseY >= buttonY && mouseY <= buttonY + 40) {
        return i;
      }
    }
    return null;
  }

  checkToolboxButtonHover(mouseX, mouseY) {
    this.toolboxButtonHovered = mouseX >= this.TOOLBOX_BUTTON.x &&
      mouseX <= this.TOOLBOX_BUTTON.x + this.TOOLBOX_BUTTON.width &&
      mouseY >= this.TOOLBOX_BUTTON.y &&
      mouseY <= this.TOOLBOX_BUTTON.y + this.TOOLBOX_BUTTON.height;
    return this.toolboxButtonHovered;
  }

  handleToolboxClick(mouseX, mouseY) {
    if (this.checkToolboxButtonHover(mouseX, mouseY)) {
      this.showUpgradesMenu = !this.showUpgradesMenu;
      return true;
    }
    
    if (this.showUpgradesMenu) {
      const menu = this.UPGRADES_MENU;
      if (mouseX < menu.x || mouseX > menu.x + menu.width ||
          mouseY < menu.y || mouseY > menu.y + menu.height) {
        this.showUpgradesMenu = false;
        return true;
      }
    }
    return false;
  }

  drawToolboxButton() {
    push();
    translate(this.TOOLBOX_BUTTON.x, this.TOOLBOX_BUTTON.y);
    if (this.toolboxButtonHovered) {
      scale(1.1);
    }
    
    // Button background
    fill('#4a5c68');
    rect(0, 0, 32, 32, 4);

    // Shadow layer
    fill('#2c353b');
    // Toolbox body shadow
    rect(8, 10, 16, 14);
    // Handle shadow
    rect(12, 7, 8, 3);

    // Main color layer
    fill('#8bac0f');
    // Toolbox body
    rect(7, 9, 16, 14);
    // Handle
    rect(11, 6, 8, 3);

    // Highlights and details
    fill('#9bbc0f');
    // Top edge highlight
    rect(7, 9, 16, 2);
    // Handle highlight
    rect(11, 6, 8, 1);
    // Lock detail
    rect(13, 11, 4, 4);

    pop();
  }

  drawUpgradesMenu() {
    push();
    // Dim background
    fill(0, 0, 0, 127);
    rect(0, 0, width, height);
    
    // Menu background
    fill('#4a5c68');
    rect(this.UPGRADES_MENU.x, this.UPGRADES_MENU.y, 
         this.UPGRADES_MENU.width, this.UPGRADES_MENU.height, 8);
    
    // Title
    textAlign(CENTER, TOP);
    textSize(24);
    fill('#9bbc0f');
    text("Upgrades", 
         this.UPGRADES_MENU.x + this.UPGRADES_MENU.width/2, 
         this.UPGRADES_MENU.y + 20);
    
    // Placeholder for upgrades content
    fill('#2c353b');
    rect(this.UPGRADES_MENU.x + 20, 
         this.UPGRADES_MENU.y + 60,
         this.UPGRADES_MENU.width - 40, 
         this.UPGRADES_MENU.height - 80, 4);
    
  //Floor one Upgrade text and button
  fill(237,17, 20);
  if (money >= workerCost && currentFloor === 1) {
    fill('#9bbc0f');
  }
  if (numLvl1Workers === maxWorkerCount) {
    fill(19, 84, 38)
  }
  text("Buy Floor One Worker " + (numLvl1Workers) + "/14", this.UPGRADES_MENU.x, 
    this.UpgradesFloorY,
    this.UPGRADES_MENU.width - 40, 
    this.UPGRADES_MENU.height - 80, 4)
  
  //Floor two Upgrade text and button
  fill(237,17, 20);
  if (money >= workerCost && currentFloor === 2) {
    fill('#9bbc0f');
  }
  if (numLvl2Workers === maxWorkerCount) {
    fill(19, 84, 38)
  }
  text("Buy Floor Two Worker " + (numLvl2Workers) + "/14", this.UPGRADES_MENU.x, 
    this.UpgradesFloorY + 40,
    this.UPGRADES_MENU.width - 40, 
    this.UPGRADES_MENU.height - 80, 4)
  
  //Floor three Upgrade text and button
  fill(237,17, 20);
  if (money >= workerCost && currentFloor === 3) {
    fill('#9bbc0f');
  }
  if (numLvl3Workers === maxWorkerCount) {
    fill(19, 84, 38)
  }
  text("Buy Floor Three Worker " + (numLvl3Workers) + "/14", this.UPGRADES_MENU.x + 9,
    this.UpgradesFloorY + 80,
    this.UPGRADES_MENU.width - 40, 
    this.UPGRADES_MENU.height - 80, 4)
  
  //Floor four Upgrade text and button
  fill(237,17, 20);
  if (money >= workerCost && currentFloor === 4) {
    fill('#9bbc0f');
  }
  if (numLvl4Workers === maxWorkerCount) {
    fill(19, 84, 38)
  }
  text("Buy Floor Four Worker " + (numLvl4Workers) + "/14", this.UPGRADES_MENU.x + 2,
    this.UpgradesFloorY + 120,
    this.UPGRADES_MENU.width - 40, 
    this.UPGRADES_MENU.height - 80, 4)
  
  //Floor five Upgrade text and button
  fill(237,17, 20);
  if (money >= workerCost && currentFloor === 5) {
    fill('#9bbc0f');
  }
  if (numLvl5Workers === maxWorkerCount) {
    fill(19, 84, 38)
  }
  text("Buy Floor Five Worker " + (numLvl5Workers) + "/14", this.UPGRADES_MENU.x, 
    this.UpgradesFloorY + 160,
    this.UPGRADES_MENU.width - 40, 
    this.UPGRADES_MENU.height - 80, 4)
  
  this.drawUpgradeButtons();

  //print floor purchases
  //floor two purchase
  fill(237,17, 20);
  if (money >= floorPrice) {
    fill('#9bbc0f');
  }
  if (purchasedFloors[2] === true) {
    fill(19, 84, 38)
  }
  text("Buy Second Floor", this.UPGRADES_MENU.x - 50, 
    this.UpgradesFloorY + 200,
    this.UPGRADES_MENU.width - 40, 
    this.UPGRADES_MENU.height - 80, 4)
  
  //floor three purchase
  fill(237,17, 20);
  if (money >= floorPrice && purchasedFloors[2] === true || purchasedFloors[3] === true) {
    fill('#9bbc0f');
  }
  if (purchasedFloors[3] === true) {
    fill(19, 84, 38)
  }
  text("Buy Third Floor", this.UPGRADES_MENU.x - 64, 
    this.UpgradesFloorY + 240,
    this.UPGRADES_MENU.width - 40, 
    this.UPGRADES_MENU.height - 80, 4)
  
  //floor four purchase
  fill(237,17, 20);
  if (money >= floorPrice && purchasedFloors[3] === true || purchasedFloors[4] === true) {
    fill('#9bbc0f');
  }
  if (purchasedFloors[4] === true) {
    fill(19, 84, 38)
  }
  text("Buy Fourth Floor", this.UPGRADES_MENU.x - 57, 
    this.UpgradesFloorY + 280,
    this.UPGRADES_MENU.width - 40, 
    this.UPGRADES_MENU.height - 80, 4)
  
  //floor five purchase
  fill(237,17, 20);
  if (money >= floorPrice && purchasedFloors[4] === true || purchasedFloors[5] === true) {
    fill('#9bbc0f');
  }
  if (purchasedFloors[5] === true) {
    fill(19, 84, 38)
  }
  text("Buy Fifth Floor", this.UPGRADES_MENU.x - 68, 
    this.UpgradesFloorY + 320,
    this.UPGRADES_MENU.width - 40, 
    this.UPGRADES_MENU.height - 80, 4)

    pop();
  }
  
  drawUpgradeButtons() {
    // floor one workers
    fill('#4a5c68');
    if (this.checkUpgradeButtonHover(mouseX, mouseY) === 1) {
      rect(this.UPGRADE_FLOOR_ONE_BUTTON.x, this.UPGRADE_FLOOR_ONE_BUTTON.y,
        this.UPGRADE_FLOOR_ONE_BUTTON.width * 1.1, this.UPGRADE_FLOOR_ONE_BUTTON.height * 1.1, 4);
      fill('#9bbc0f')
      text("$", this.UPGRADE_FLOOR_ONE_BUTTON.x + ((this.UPGRADE_FLOOR_ONE_BUTTON.width * 1.1) / 2),
        this.UPGRADE_FLOOR_ONE_BUTTON.y + ((this.UPGRADE_FLOOR_ONE_BUTTON.height * 1.1) / 10)) 
        //this.UPGRADES_MENU.width - 40, this.UPGRADES_MENU.height - 80, 4)
    } else {
      rect(this.UPGRADE_FLOOR_ONE_BUTTON.x, this.UPGRADE_FLOOR_ONE_BUTTON.y,
        this.UPGRADE_FLOOR_ONE_BUTTON.width, this.UPGRADE_FLOOR_ONE_BUTTON.height, 4);
      fill('#9bbc0f')
      text("$", this.UPGRADE_FLOOR_ONE_BUTTON.x + ((this.UPGRADE_FLOOR_ONE_BUTTON.width) / 2),
        this.UPGRADE_FLOOR_ONE_BUTTON.y + ((this.UPGRADE_FLOOR_ONE_BUTTON.height) / 20)) 
    }
  
    //floor two workers
    fill('#4a5c68');
    if (this.checkUpgradeButtonHover(mouseX, mouseY) === 2) {
      rect(this.UPGRADE_FLOOR_TWO_BUTTON.x, this.UPGRADE_FLOOR_TWO_BUTTON.y,
        this.UPGRADE_FLOOR_TWO_BUTTON.width * 1.1, this.UPGRADE_FLOOR_TWO_BUTTON.height * 1.1, 4);
      fill('#9bbc0f')
      text("$", this.UPGRADE_FLOOR_TWO_BUTTON.x + ((this.UPGRADE_FLOOR_TWO_BUTTON.width * 1.1) / 2),
        this.UPGRADE_FLOOR_TWO_BUTTON.y + ((this.UPGRADE_FLOOR_TWO_BUTTON.height * 1.1) / 10)) 
    } else {
      rect(this.UPGRADE_FLOOR_TWO_BUTTON.x, this.UPGRADE_FLOOR_TWO_BUTTON.y,
        this.UPGRADE_FLOOR_TWO_BUTTON.width, this.UPGRADE_FLOOR_TWO_BUTTON.height, 4);
      fill('#9bbc0f')
      text("$", this.UPGRADE_FLOOR_TWO_BUTTON.x + ((this.UPGRADE_FLOOR_TWO_BUTTON.width) / 2),
        this.UPGRADE_FLOOR_TWO_BUTTON.y + ((this.UPGRADE_FLOOR_TWO_BUTTON.height) / 20)) 
    }
  
    //floor three workers
    fill('#4a5c68');
    if (this.checkUpgradeButtonHover(mouseX, mouseY) === 3) {
      rect(this.UPGRADE_FLOOR_THREE_BUTTON.x, this.UPGRADE_FLOOR_THREE_BUTTON.y,
        this.UPGRADE_FLOOR_THREE_BUTTON.width * 1.1, this.UPGRADE_FLOOR_THREE_BUTTON.height * 1.1, 4);
      fill('#9bbc0f')
      text("$", this.UPGRADE_FLOOR_THREE_BUTTON.x + ((this.UPGRADE_FLOOR_THREE_BUTTON.width * 1.1) / 2),
          this.UPGRADE_FLOOR_THREE_BUTTON.y + ((this.UPGRADE_FLOOR_THREE_BUTTON.height * 1.1) / 10)) 
    } else {
      rect(this.UPGRADE_FLOOR_THREE_BUTTON.x, this.UPGRADE_FLOOR_THREE_BUTTON.y,
        this.UPGRADE_FLOOR_THREE_BUTTON.width, this.UPGRADE_FLOOR_THREE_BUTTON.height, 4);
      fill('#9bbc0f')
      text("$", this.UPGRADE_FLOOR_THREE_BUTTON.x + ((this.UPGRADE_FLOOR_THREE_BUTTON.width) / 2),
        this.UPGRADE_FLOOR_THREE_BUTTON.y + ((this.UPGRADE_FLOOR_THREE_BUTTON.height) / 20)) 
    }
  
    //FLOOR FOUR workers
    fill('#4a5c68');
    if (this.checkUpgradeButtonHover(mouseX, mouseY) === 4) {
      rect(this.UPGRADE_FLOOR_FOUR_BUTTON.x, this.UPGRADE_FLOOR_FOUR_BUTTON.y,
        this.UPGRADE_FLOOR_FOUR_BUTTON.width * 1.1, this.UPGRADE_FLOOR_FOUR_BUTTON.height * 1.1, 4);
      fill('#9bbc0f')
      text("$", this.UPGRADE_FLOOR_FOUR_BUTTON.x + ((this.UPGRADE_FLOOR_FOUR_BUTTON.width * 1.1) / 2),
          this.UPGRADE_FLOOR_FOUR_BUTTON.y + ((this.UPGRADE_FLOOR_FOUR_BUTTON.height * 1.1) / 10)) 
    } else {
      rect(this.UPGRADE_FLOOR_FOUR_BUTTON.x, this.UPGRADE_FLOOR_FOUR_BUTTON.y,
        this.UPGRADE_FLOOR_FOUR_BUTTON.width, this.UPGRADE_FLOOR_FOUR_BUTTON.height, 4);
      fill('#9bbc0f')
      text("$", this.UPGRADE_FLOOR_FOUR_BUTTON.x + ((this.UPGRADE_FLOOR_FOUR_BUTTON.width) / 2),
        this.UPGRADE_FLOOR_FOUR_BUTTON.y + ((this.UPGRADE_FLOOR_FOUR_BUTTON.height) / 20)) 
    }
  
    //FLOOR FIVE workers
    fill('#4a5c68');
    if (this.checkUpgradeButtonHover(mouseX, mouseY) === 5) {
      rect(this.UPGRADE_FLOOR_FIVE_BUTTON.x, this.UPGRADE_FLOOR_FIVE_BUTTON.y,
        this.UPGRADE_FLOOR_FIVE_BUTTON.width * 1.1, this.UPGRADE_FLOOR_FIVE_BUTTON.height * 1.1, 4);
      fill('#9bbc0f')
      text("$", this.UPGRADE_FLOOR_FIVE_BUTTON.x + ((this.UPGRADE_FLOOR_FIVE_BUTTON.width * 1.1) / 2),
          this.UPGRADE_FLOOR_FIVE_BUTTON.y + ((this.UPGRADE_FLOOR_FIVE_BUTTON.height * 1.1) / 10)) 
    } else {
      rect(this.UPGRADE_FLOOR_FIVE_BUTTON.x, this.UPGRADE_FLOOR_FIVE_BUTTON.y,
        this.UPGRADE_FLOOR_FIVE_BUTTON.width, this.UPGRADE_FLOOR_FIVE_BUTTON.height, 4);
      fill('#9bbc0f')
      text("$", this.UPGRADE_FLOOR_FIVE_BUTTON.x + ((this.UPGRADE_FLOOR_FIVE_BUTTON.width) / 2),
        this.UPGRADE_FLOOR_FIVE_BUTTON.y + ((this.UPGRADE_FLOOR_FIVE_BUTTON.height) / 20)) 
    }

    //Buying Floors
    //floor two purchase button
    fill('#4a5c68');
    if (this.checkUpgradeButtonHover(mouseX, mouseY) === 6) {
      rect(this.BUY_FLOOR_TWO_BUTTON.x, this.BUY_FLOOR_TWO_BUTTON.y,
        this.BUY_FLOOR_TWO_BUTTON.width * 1.1, this.BUY_FLOOR_TWO_BUTTON.height * 1.1, 4)
      fill('#9bbc0f')
      text("$", this.BUY_FLOOR_TWO_BUTTON.x + ((this.BUY_FLOOR_TWO_BUTTON.width * 1.1) / 2),
          this.BUY_FLOOR_TWO_BUTTON.y + ((this.BUY_FLOOR_TWO_BUTTON.height) * 1.1) / 10)
    } else {
      rect(this.BUY_FLOOR_TWO_BUTTON.x, this.BUY_FLOOR_TWO_BUTTON.y,
        this.BUY_FLOOR_TWO_BUTTON.width, this.BUY_FLOOR_TWO_BUTTON.height, 4)
      fill('#9bbc0f')
      text("$", this.BUY_FLOOR_TWO_BUTTON.x + ((this.BUY_FLOOR_TWO_BUTTON.width * 1.1) / 2),
          this.BUY_FLOOR_TWO_BUTTON.y + ((this.BUY_FLOOR_TWO_BUTTON.height)) / 20)
    }

    //floor three purchase button
    fill('#4a5c68');
    if (this.checkUpgradeButtonHover(mouseX, mouseY) === 7) {
      rect(this.BUY_FLOOR_THREE_BUTTON.x, this.BUY_FLOOR_THREE_BUTTON.y,
        this.BUY_FLOOR_THREE_BUTTON.width * 1.1, this.BUY_FLOOR_THREE_BUTTON.height * 1.1, 4)
      fill('#9bbc0f')
      text("$", this.BUY_FLOOR_THREE_BUTTON.x + ((this.BUY_FLOOR_THREE_BUTTON.width * 1.1) / 2),
          this.BUY_FLOOR_THREE_BUTTON.y + ((this.BUY_FLOOR_THREE_BUTTON.height) * 1.1) / 10)
    } else {
      rect(this.BUY_FLOOR_THREE_BUTTON.x, this.BUY_FLOOR_THREE_BUTTON.y,
        this.BUY_FLOOR_THREE_BUTTON.width, this.BUY_FLOOR_THREE_BUTTON.height, 4)
      fill('#9bbc0f')
      text("$", this.BUY_FLOOR_THREE_BUTTON.x + ((this.BUY_FLOOR_THREE_BUTTON.width * 1.1) / 2),
          this.BUY_FLOOR_THREE_BUTTON.y + ((this.BUY_FLOOR_THREE_BUTTON.height)) / 20)
    }

    //floor four purchase button
    fill('#4a5c68');
    if (this.checkUpgradeButtonHover(mouseX, mouseY) === 8) {
      rect(this.BUY_FLOOR_FOUR_BUTTON.x, this.BUY_FLOOR_FOUR_BUTTON.y,
        this.BUY_FLOOR_FOUR_BUTTON.width * 1.1, this.BUY_FLOOR_FOUR_BUTTON.height * 1.1, 4)
      fill('#9bbc0f')
      text("$", this.BUY_FLOOR_FOUR_BUTTON.x + ((this.BUY_FLOOR_FOUR_BUTTON.width * 1.1) / 2),
          this.BUY_FLOOR_FOUR_BUTTON.y + ((this.BUY_FLOOR_FOUR_BUTTON.height) * 1.1) / 10)
    } else {
      rect(this.BUY_FLOOR_FOUR_BUTTON.x, this.BUY_FLOOR_FOUR_BUTTON.y,
        this.BUY_FLOOR_FOUR_BUTTON.width, this.BUY_FLOOR_FOUR_BUTTON.height, 4)
      fill('#9bbc0f')
      text("$", this.BUY_FLOOR_FOUR_BUTTON.x + ((this.BUY_FLOOR_FOUR_BUTTON.width * 1.1) / 2),
          this.BUY_FLOOR_FOUR_BUTTON.y + ((this.BUY_FLOOR_FOUR_BUTTON.height)) / 20)
    }

    //floor five purchase button
    fill('#4a5c68');
    if (this.checkUpgradeButtonHover(mouseX, mouseY) === 9) {
      rect(this.BUY_FLOOR_FIVE_BUTTON.x, this.BUY_FLOOR_FIVE_BUTTON.y,
        this.BUY_FLOOR_FIVE_BUTTON.width * 1.1, this.BUY_FLOOR_FIVE_BUTTON.height * 1.1, 4)
      fill('#9bbc0f')
      text("$", this.BUY_FLOOR_FIVE_BUTTON.x + ((this.BUY_FLOOR_FIVE_BUTTON.width * 1.1) / 2),
          this.BUY_FLOOR_FIVE_BUTTON.y + ((this.BUY_FLOOR_TWO_BUTTON.height) * 1.1) / 10)
    } else {
      rect(this.BUY_FLOOR_FIVE_BUTTON.x, this.BUY_FLOOR_FIVE_BUTTON.y,
        this.BUY_FLOOR_FIVE_BUTTON.width, this.BUY_FLOOR_FIVE_BUTTON.height, 4)
      fill('#9bbc0f')
      text("$", this.BUY_FLOOR_FIVE_BUTTON.x + ((this.BUY_FLOOR_FIVE_BUTTON.width * 1.1) / 2),
          this.BUY_FLOOR_FIVE_BUTTON.y + ((this.BUY_FLOOR_FIVE_BUTTON.height)) / 20)
    }
  }
  
  checkUpgradeButtonHover(mouseX, mouseY) {
    if (mouseX >= this.UPGRADE_FLOOR_ONE_BUTTON.x &&
      mouseX <= this.UPGRADE_FLOOR_ONE_BUTTON.x + this.UPGRADE_FLOOR_ONE_BUTTON.width &&
      mouseY >= this.UPGRADE_FLOOR_ONE_BUTTON.y &&
      mouseY <= this.UPGRADE_FLOOR_ONE_BUTTON.y + this.UPGRADE_FLOOR_ONE_BUTTON.height
    ) {
      return 1;
    } 
    if (mouseX >= this.UPGRADE_FLOOR_TWO_BUTTON.x &&
      mouseX <= this.UPGRADE_FLOOR_TWO_BUTTON.x + this.UPGRADE_FLOOR_TWO_BUTTON.width &&
      mouseY >= this.UPGRADE_FLOOR_TWO_BUTTON.y &&
      mouseY <= this.UPGRADE_FLOOR_TWO_BUTTON.y + this.UPGRADE_FLOOR_TWO_BUTTON.height
    ) {
      return 2;
    } 
    if (mouseX >= this.UPGRADE_FLOOR_THREE_BUTTON.x &&
      mouseX <= this.UPGRADE_FLOOR_THREE_BUTTON.x + this.UPGRADE_FLOOR_THREE_BUTTON.width &&
      mouseY >= this.UPGRADE_FLOOR_THREE_BUTTON.y &&
      mouseY <= this.UPGRADE_FLOOR_THREE_BUTTON.y + this.UPGRADE_FLOOR_THREE_BUTTON.height
    ) {
      return 3;
    } 
    if (mouseX >= this.UPGRADE_FLOOR_FOUR_BUTTON.x &&
      mouseX <= this.UPGRADE_FLOOR_FOUR_BUTTON.x + this.UPGRADE_FLOOR_FOUR_BUTTON.width &&
      mouseY >= this.UPGRADE_FLOOR_FOUR_BUTTON.y &&
      mouseY <= this.UPGRADE_FLOOR_FOUR_BUTTON.y + this.UPGRADE_FLOOR_FOUR_BUTTON.height
    ) {
      return 4;
    } 
    if (mouseX >= this.UPGRADE_FLOOR_FIVE_BUTTON.x &&
      mouseX <= this.UPGRADE_FLOOR_FIVE_BUTTON.x + this.UPGRADE_FLOOR_FIVE_BUTTON.width &&
      mouseY >= this.UPGRADE_FLOOR_FIVE_BUTTON.y &&
      mouseY <= this.UPGRADE_FLOOR_FIVE_BUTTON.y + this.UPGRADE_FLOOR_FIVE_BUTTON.height
    ) {
      return 5;
    } 
    if (mouseX >= this.BUY_FLOOR_TWO_BUTTON.x && 
      mouseX <= this.BUY_FLOOR_TWO_BUTTON.x + this.BUY_FLOOR_TWO_BUTTON.width &&
      mouseY >= this.BUY_FLOOR_TWO_BUTTON.y &&
      mouseY <= this.BUY_FLOOR_TWO_BUTTON.y + this.BUY_FLOOR_TWO_BUTTON.height) {
        return 6
    }
    if (mouseX >= this.BUY_FLOOR_THREE_BUTTON.x && 
      mouseX <= this.BUY_FLOOR_THREE_BUTTON.x + this.BUY_FLOOR_THREE_BUTTON.width &&
      mouseY >= this.BUY_FLOOR_THREE_BUTTON.y &&
      mouseY <= this.BUY_FLOOR_THREE_BUTTON.y + this.BUY_FLOOR_THREE_BUTTON.height) {
        return 7
    }
    if (mouseX >= this.BUY_FLOOR_FOUR_BUTTON.x && 
      mouseX <= this.BUY_FLOOR_FOUR_BUTTON.x + this.BUY_FLOOR_FOUR_BUTTON.width &&
      mouseY >= this.BUY_FLOOR_FOUR_BUTTON.y &&
      mouseY <= this.BUY_FLOOR_FOUR_BUTTON.y + this.BUY_FLOOR_FOUR_BUTTON.height) {
        return 8
    }
    if (mouseX >= this.BUY_FLOOR_FIVE_BUTTON.x && 
      mouseX <= this.BUY_FLOOR_FIVE_BUTTON.x + this.BUY_FLOOR_FIVE_BUTTON.width &&
      mouseY >= this.BUY_FLOOR_FIVE_BUTTON.y &&
      mouseY <= this.BUY_FLOOR_FIVE_BUTTON.y + this.BUY_FLOOR_FIVE_BUTTON.height) {
        return 9
    }
    
    return 0;
  
  }
}