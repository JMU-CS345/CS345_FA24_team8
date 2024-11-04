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
      this.pauseButtonHovered = false;
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
      fill(0, 0, 0, 127);
      rect(0, 0, width, height);
      fill(255);
      textAlign(CENTER, CENTER);
      textSize(36);
      text("PAUSED", width/2, height/2);
      textSize(16);
      text("Click pause button or press P to resume", width/2, height/2 + 40);
      pop();
    }
  
    drawUI(gameState) {
      this.drawMoneyDisplay(gameState.money, gameState.moneyPerSecond);
      this.drawTimerDisplay(gameState.timerMinutes, gameState.timerSeconds);
      if (gameState.isPaused) {
        this.drawPauseOverlay(gameState.width, gameState.height);
      }
      this.drawPauseButton(gameState.isPaused);
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
  }