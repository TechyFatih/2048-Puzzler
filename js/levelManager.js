var levels = [];

// Add a new level
function addLevel(level) {
	levels[level.level] = level;
}

// Create a new level
function Level(level, size, tiles, target, moveLimit) {
	this.level = level;
	this.size = size;
	this.startTiles = tiles;
	this.target = target;
	this.moveLimit = moveLimit;
}
function getValidator(levelNumber) {
	return function(condition, message) {
		if (!condition) {
			console.error('Level ' + levelNumber + ' is misformatted (' + message + ')');
			throw "level misformatted";
		}
	}
}
//number of lines of level metadata before the level itself
var dataLines = 2;
function readLevel(levelNumber) {
	var validate = getValidator(levelNumber);
	return function(dataString) {
		//console.log(dataString);
		var lines = dataString.replace(/\r/g, '').split("\n"); validate(lines.length > dataLines, 'not enough lines');
		var target = parseInt(lines[0]); 	validate(target !== NaN, 'target is not a number');
		var moveLimit = parseInt(lines[1]); validate(moveLimit !== NaN, 'moveLimit is not a number');
		var size = lines.length - dataLines;
		var startTiles = new Array();
		for (var y = 0; y < size; y++) {
			var row = lines[y + dataLines];
			//allow additional spaces or tabs in level data
			var rowTileData = row.replace(/\s+/g, " ").split(" ", size); validate(rowTileData.length === size, 'row ' + y + " doesn't have enough tiles (" + rowTileData + ')');
			for (var x = 0; x < size; x++) {
				var tileData = rowTileData[x];
				switch (tileData) {
					case '_': continue; //no tile
					case 'X': 
						tileData = -1;
						break;
					default:
						tileData = parseInt(tileData);
				}
				startTiles.push(new Tile({x:x, y:y}, tileData));
			}
		}
		levels[levelNumber] = new Level(levelNumber, size, startTiles, target, moveLimit);
	};
}
var numLevels = 16;
// Call each level's script to add them
for (var i = 1; i < numLevels; i++) {
	$.get("js/levels/level" + i + ".txt", readLevel(i));
	//$.getScript("js/levels/level" + i + ".js");
}

function writeLevel(manager) {//to write current level, use writeLevel();
    if (manager === undefined) manager = gameManager;
	var output = manager.target + '\n' + manager.moveLimit + '\n';
	var size = manager.grid.size;
	for (var y = 0; y < size; y++) {
		for (var x = 0; x < size; x++) {
			var cell = manager.grid.cells[x][y];
			if (cell === null) output += '_';
			  else if (cell.value === -1) output += 'X';
			  else output += cell.value;
			output += " ";
		}
		output = output.substring(0, output.length - 1);
		output += "\n";
    }
	output = output.substring(0, output.length - 1);
	return output;
}
