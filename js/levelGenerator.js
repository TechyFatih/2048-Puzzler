            function getRandomPosition(size) {
                return {x:Math.floor(Math.random()*size), y:Math.floor(Math.random() * size)};
            }
            function getRandomUnoccupiedPosition(grid, size) {
                var position = getRandomPosition(size);
                if (grid.cellAvailable(position)) {
                    return position;
                } else {
                    return getRandomUnoccupiedPosition(grid, size);
                }
            }
            //var merginess = .25;
            var maxTries = 15;
            var maxRegens = 7;
            var moveCumProbTable = [
                .1, //.1
                .45,//.35
                .65,//.2
                1   //.35
            ];
            function getRandomDirection(prevMove) {
                var choice = Math.random();
                var rotation = 0;
                while (choice >= moveCumProbTable[rotation]) {
                    rotation++;
                }
                return (prevMove + rotation) % 4;
            }
            var partialLevels;
            function generateLevel(size, difficulty, complexity) {
                var regen = 0;
                do {
                    console.log("Level " + regen);
                    var grid = new Grid(size);
                    var target = Math.pow(2, Math.round((difficulty / 2)));
                    var numNumbers = 1;
                    grid.insertTile(new Tile(getRandomPosition(size), target));
                    var numBlocks = Math.round(size*complexity*Math.random());
                    for (var i = 0; i < numBlocks; i++) {
                        grid.insertTile(new Tile(getRandomUnoccupiedPosition(grid, size), -1));
                    }
                    var numZeroes = Math.round(size*complexity*complexity*Math.random());
                    for (var i = 0; i < numZeroes; i++) {
                        grid.insertTile(new Tile(getRandomUnoccupiedPosition(grid, size), 0));
                    }
                    var moves = "";
                    var states = [];
                    partialLevels = [];
                    var numMoves = difficulty * 2;
                    var prevMove = 0;
                    movesLoop:
                    for (var i = 0; i < numMoves; i++) {
                        readLevel(-2)(writeLevel({target:target, moveLimit:numMoves, grid:grid}));
                        partialLevels.push(levels[-2]);
                        var curCells = grid.serialize().cells;
                        var curTarget = target;
                        states.push(curCells);
                        triesLoop:
                        for (var tries = 0; tries < maxTries; tries++) {
                            prevMove = getRandomDirection(prevMove);
                            getMerges(grid, numNumbers, numZeroes);
                            var reverseMoveVector = GameManager.prototype.getVector((prevMove + 2) % 4);
                            var traversals = GameManager.prototype.buildTraversals.call({size:size}, reverseMoveVector);
                            var moveTile = GameManager.prototype.moveTile.bind({grid:grid});
                            var changed = false;
                            // Traverse the grid in the right direction and move tiles
                            var success = traversals.x.every(function (x) {
                             return traversals.y.every(function (y) {
                                var cell = { x: x, y: y };
                                var tile = grid.cellContent(cell);
                                if (tile && tile.isMovable()) {
                                  var positions = findFarthestPosition(grid, cell, reverseMoveVector);
                                  var next      = grid.cellContent(positions.next);
                                  //(next && next.value === tile.value) implies that a merge would be required
                                  if (positions.secondFarthest) { //room to merge
                                      if (tile.tryMerge || next && next.value === tile.value) {
                                          var newValue;
                                          if (tile.value === 0) {
                                              numZeroes++;
                                              newValue = 0;
                                          } else {
                                            numNumbers++;
                                            newValue = tile.value / 2;
                                            if (newValue < 2) {
                                                if (newValue !== 1) {
                                                    console.log(writeLevel({target:target, moveLimit:numMoves, grid:grid}));
                                                    throw "Somehow attempted to split to something less than 2 but not 1";
                                                }
                                                newValue = 2;
                                                grid.eachCell(function(x, y, tile) {
                                                    if (tile && tile.value > 0) tile.value *= 2;
                                                });
                                                target *= 2;
                                            }
                                          }
                                          grid.removeTile(tile);
                                          grid.insertTile(new Tile(positions.secondFarthest, newValue));
                                          grid.insertTile(new Tile(positions.farthest, newValue));
                                      } else {
                                          moveTile(tile, positions.farthest);
                                      }
                                      changed = true;
                                  } else {//no room to merge
                                      if (next && next.value === tile.value) {//need to merge
                                        return false; //can't make the move
                                      } else if (!GameManager.prototype.positionsEqual(tile, positions.farthest)) {
                                        moveTile(tile, positions.farthest);
                                        changed = true;
                                      }
                                  }
                                }
                                return true;
                              });
                            });
                            //could eliminate success variable and put everything inside the if condition, but ew
                            if (!success || numNumbers <= 1 || containsSameState(size, states, grid.cells)) {
                                grid.cells = grid.fromState(curCells);
                                target = curTarget;
                                //continue triesLoop;//try again with different direction and merges
                            } else if (changed) {
                                console.log("Try " + tries)
                                //writeLevel({target:target, moveLimit:numMoves, grid:grid});
                                moves = directionNames[prevMove] + "\n" + moves;
                                continue movesLoop;
                            }
                        }
                        console.info("Failed");
                        numMoves = i;
                        break; //can't find another move
                    }
                    regen++;
                } while (numMoves < difficulty && regen <= maxRegens);
                console.info(moves);
                return writeLevel({target:target, moveLimit:numMoves, grid:grid});
                //moves given don't work, but the levels are solvable
            }
            function getMerges(grid, numNumbers, numZeroes) {
                var numMerginess = getMerginess(numNumbers);
                var zeroMerginess = getZeroMerginess(numZeroes, numNumbers);
                grid.eachCell(function (x, y, tile) {
                    if (tile) {
                        if (tile.value > 0) {
                            tile.tryMerge = Math.random() < numMerginess;
                        } else if (tile.value === 0) {
                            tile.tryMerge = Math.random() < zeroMerginess;
                        }
                    }
                });
            }
            //merginess algorithms are important
            function getMerginess(numNumbers) {
                return Math.pow(.5, numNumbers - 1);
            }
            function getZeroMerginess(numZeroes, numNumbers) {
                return (numNumbers - (numZeroes * 2)) / (numNumbers + numZeroes);
            }
            function findFarthestPosition(grid, cell, vector) {
                var prev2, previous = null;

                // Progress towards the vector direction until an obstacle is found
                do {
                  prev2 = previous;
                  previous = cell;
                  cell     = { x: previous.x + vector.x, y: previous.y + vector.y };
                } while (grid.withinBounds(cell) &&
                         grid.cellAvailable(cell));

                return {
                  secondFarthest: prev2,
                  farthest: previous,
                  next: cell // Used to check if a merge is required
                };
            }
            function tilesEqual(tile1, tile2) {
                if (tile1 === null) return tile2 === null;
                else if (tile2 === null) return false;
                else return tile1.value === tile2.value;
            }
            function cellsEqual(size, cells1, cells2) {
                for (var x = 0; x < size; x++) {
                    for (var y = 0; y < size; y++) {
                        if (!tilesEqual(cells1[x][y], cells2[x][y])) return false;
                    }
                }
                return true;
            }
            function containsSameState(size, states, state) {
                return states.some(function (prevState) {
                    return cellsEqual(size, state, prevState);
                });
            }
            function loadRandomLevel(size, difficulty, complexity) {
                    readLevel(-1)(generateLevel(size, difficulty, complexity));
                    //for (var i = 0; i < partialLevels.length; i++) 
                    //}
                    gameManager.loadLevel(levels[-1]);
            }
			function displaySteps() {
				var i = 0;
				var loadNext = function() {
					gameManager.loadLevel(partialLevels[i]); 
					i++;
					if (i < partialLevels.length) setTimeout(loadNext, 650);
				};
				loadNext();
			}
            //generateLevel(4, 10, .7);
