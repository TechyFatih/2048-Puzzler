function HTMLActuator() {
  this.gridContainer	= document.querySelector(".grid-container");
  this.tileContainer    = document.querySelector(".tile-container");
//  this.scoreContainer   = document.querySelector(".score-container");
  this.bestContainer    = document.querySelector(".best-container");
  this.messageContainer = document.querySelector(".game-message");
  this.movesLeftContainer = document.querySelector(".moves-left-container");
  this.levelContainer = document.querySelector(".level-container");
  //this.sharingContainer = document.querySelector(".score-sharing");

  //this.score = 0;
}

HTMLActuator.prototype.actuate = function (grid, metadata) {
  var self = this;

  window.requestAnimationFrame(function () {
	self.clearContainer(self.gridContainer);
    self.clearContainer(self.tileContainer);

	// Create grid and tiles
	for (var curSize=0; curSize<grid.size; curSize++) {
		var row = document.createElement("div");
		row.setAttribute("class", "grid-row");
		for (var i=0; i<grid.size; i++) {
			var cell = document.createElement("div");
			cell.setAttribute("class", "grid-cell");
			row.appendChild(cell);
		}
		self.gridContainer.appendChild(row);
	}
	
	// Center grid and tiles on background
	$(self.gridContainer).css("top", (60.625*(4-grid.size)+15)+"px");
	$(self.gridContainer).css("left", (60.625*(4-grid.size)+15)+"px");
	$(self.tileContainer).css("top", (60.625*(4-grid.size)+15)+"px");
	$(self.tileContainer).css("left", (60.625*(4-grid.size)+15)+"px");
	
    grid.cells.forEach(function (column) {
      column.forEach(function (cell) {
        if (cell) {
          self.addTile(cell);
        }
      });
    });
    
	self.updateMovesLeft(metadata.movesLeft);
	self.levelContainer.textContent = metadata.level;
	
   // self.updateScore(metadata.score);
  //  self.updateBestScore(metadata.bestScore);

    if (metadata.terminated) {
      if (metadata.over) {
        self.message(false); // You lose
      } else if (metadata.won) {
        self.message(true); // You win!
      }
    }

  });
};

// Continues the game (both restart and keep playing)
HTMLActuator.prototype.continueGame = function () {
  if (typeof ga !== "undefined") {
    ga("send", "event", "game", "restart");
  }

  this.clearMessage();
};

HTMLActuator.prototype.clearContainer = function (container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
};

HTMLActuator.prototype.addTile = function (tile) {
  var self = this;

  var wrapper   = document.createElement("div");
  var inner     = document.createElement("div");
  var position  = tile.previousPosition || { x: tile.x, y: tile.y };
  var positionClass = this.positionClass(position);

  // We can't use classlist because it somehow glitches when replacing classes
  var classes = ["tile", "tile-" + tile.value, positionClass];

  if (tile.value > 2048) classes.push("tile-super");

  this.applyClasses(wrapper, classes);

  inner.classList.add("tile-inner");
  inner.textContent = tile.value;

  if (tile.previousPosition) {
    // Make sure that the tile gets rendered in the previous position first
    window.requestAnimationFrame(function () {
      classes[2] = self.positionClass({ x: tile.x, y: tile.y });
      self.applyClasses(wrapper, classes); // Update the position
    });
  } else if (tile.mergedFrom) {
    classes.push("tile-merged");
    this.applyClasses(wrapper, classes);

    // Render the tiles that merged
    tile.mergedFrom.forEach(function (merged) {
      self.addTile(merged);
    });
  } else {
    classes.push("tile-new");
    this.applyClasses(wrapper, classes);
  }

  // Add the inner part of the tile to the wrapper
  wrapper.appendChild(inner);

  // Put the tile on the board
  this.tileContainer.appendChild(wrapper);
};

HTMLActuator.prototype.applyClasses = function (element, classes) {
  element.setAttribute("class", classes.join(" "));
};

HTMLActuator.prototype.normalizePosition = function (position) {
  return { x: position.x + 1, y: position.y + 1 };
};

HTMLActuator.prototype.positionClass = function (position) {
  position = this.normalizePosition(position);
  return "tile-position-" + position.x + "-" + position.y;
};
HTMLActuator.prototype.updateMovesLeft = function (movesLeft) {
  this.clearContainer(this.movesLeftContainer);
  this.movesLeftContainer.textContent = movesLeft;
}
/*HTMLActuator.prototype.updateScore = function (score) {
  this.clearContainer(this.scoreContainer);

  var difference = score - this.score;
  this.score = score;

  this.scoreContainer.textContent = this.score;

  if (difference > 0) {
    var addition = document.createElement("div");
    addition.classList.add("score-addition");
    addition.textContent = "+" + difference;

    this.scoreContainer.appendChild(addition);
  }
};*/

/*HTMLActuator.prototype.updateBestScore = function (bestScore) {
  this.bestContainer.textContent = bestScore;
};*/

HTMLActuator.prototype.message = function (won) {
  var end = gameManager.level >= numLevels - 1;
  var type    = won ? (end ? "game-end" : "game-won" ) : "game-over";
  var message = won ? (end ? "Congratulations, you've won!" : "Success!"): "Out of moves!";

  if (typeof ga !== "undefined") {
    ga("send", "event", "game", "end", type, this.score);
  }

  this.messageContainer.classList.add(type);
  this.messageContainer.getElementsByTagName("p")[0].textContent = message;

 // this.clearContainer(this.sharingContainer);
  //this.sharingContainer.appendChild(this.scoreTweetButton());
//  twttr.widgets.load();
};

HTMLActuator.prototype.clearMessage = function () {
  // IE only takes one value to remove at a time.
  this.messageContainer.classList.remove("game-won");
  this.messageContainer.classList.remove("game-over");
  this.messageContainer.classList.remove("game-end");
};

/*HTMLActuator.prototype.scoreTweetButton = function () {
  var tweet = document.createElement("a");
  tweet.classList.add("twitter-share-button");
  tweet.setAttribute("href", "https://twitter.com/share");
  tweet.setAttribute("data-via", "gabrielecirulli");
  tweet.setAttribute("data-url", "http://git.io/2048");
  tweet.setAttribute("data-counturl", "http://gabrielecirulli.github.io/2048/");
  tweet.textContent = "Tweet";

  var text = "I scored " + this.score + " points at 2048, a game where you " +
             "join numbers to score high! #2048game";
  tweet.setAttribute("data-text", text);

  return tweet;
};*/
