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
  
      this.pauseButtonHovered = false;
    }
  
    // Check if mouse is over pause button
    checkPauseButtonHover(mouseX, mouseY) {
      this.pauseButtonHovered = mouseX >= this.PAUSE_BUTTON.x && 
                               mouseX <= this.PAUSE_BUTTON.x + this.PAUSE_BUTTON.width &&
                               mouseY >= this.PAUSE_BUTTON.y && 
                               mouseY <= this.PAUSE_BUTTON.y + this.PAUSE_BUTTON.height;
      return this.pauseButtonHovered;
    }
  
    // Draw money display
    drawMoneyDisplay(money, mult) {
      push();
      translate(this.MONEY_DISPLAY.x, this.MONEY_DISPLAY.y);
      fill('#4a5c68');
      rect(0, 0, this.MONEY_DISPLAY.width, this.MONEY_DISPLAY.height, 4);
      
      // Background
      fill('#2c353b');
      rect(7, 8, 16, 16);
      
      // Icon
      fill('#8bac0f');
      rect(6, 7, 16, 16);
      fill('#9bbc0f');
      rect(12, 7, 4, 2);
      rect(11, 13, 6, 2);
      rect(12, 20, 4, 2);
      rect(10, 9, 2, 12);
      
      // Text
      textAlign(LEFT, CENTER);
      textSize(16);
      fill('#9bbc0f');
      text(money.toString(), 32, this.MONEY_DISPLAY.height/2);
      text("$" + mult.toString() + "/sec", 100, this.MONEY_DISPLAY.height/2);
      
      pop();
    }
  
    // Draw timer display
    drawTimerDisplay(minutes, seconds) {
      push();
      translate(this.TIMER_DISPLAY.x, this.TIMER_DISPLAY.y);
      
      // Background
      fill('#4a5c68');
      rect(0, 0, this.TIMER_DISPLAY.width, this.TIMER_DISPLAY.height, 4);
      
      // Icon
      fill('#2c353b');
      rect(7, 8, 16, 16);
      fill('#8bac0f');
      rect(6, 7, 16, 16);
      fill('#9bbc0f');
      rect(13, 7, 2, 6);
      rect(13, 13, 6, 2);
      rect(6, 7, 2, 2);
      rect(20, 7, 2, 2);
      
      // Text
      textAlign(LEFT, CENTER);
      textSize(16);
      fill('#9bbc0f');
      text(nf(minutes, 2) + ":" + nf(seconds, 2), 32, this.TIMER_DISPLAY.height/2);
      
      pop();
    }
  
    // Draw pause button
    drawPauseButton() {
      push();
      translate(this.PAUSE_BUTTON.x, this.PAUSE_BUTTON.y);
      
      if (this.pauseButtonHovered) {
        scale(1.1);
      }
      
      // Background
      fill('#4a5c68');
      rect(0, 0, 32, 32, 4);
      
      // Icon
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
      
      pop();
    }
    
    drawPauseOverlay(width, height) {
      fill(0, 0, 0, 127);
      rect(0, 0, width, height);
      fill(255);
      textAlign(CENTER, CENTER);
      textSize(36);
      text("PAUSED", width/2, height/2);
      textAlign(LEFT, TOP);
      textSize(24);
    }
  
    // Draw all UI elements
    drawUI(gameState) {
      this.drawMoneyDisplay(gameState.money, gameState.moneyPerSecond);
      this.drawTimerDisplay(gameState.timerMinutes, gameState.timerSeconds);
      this.drawPauseButton();
      
      if (gameState.isPaused) {
        this.drawPauseOverlay(gameState.width, gameState.height);
        // Redraw UI elements on top of overlay
        this.drawMoneyDisplay(gameState.money);
        this.drawTimerDisplay(gameState.timerMinutes, gameState.timerSeconds);
        this.drawPauseButton();
      }
    }
  }