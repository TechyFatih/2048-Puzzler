addLevel(new Level(
	11, //level
	4, //size
		[ //startTiles
			new Tile({x:0, y:0}, 4), new Tile({x:1, y:0}, -1), new Tile({x:2, y:0}, 4), new Tile({x:3, y:0}, 2),
			new Tile({x:0, y:1}, 4), new Tile({x:1, y:1}, 4), new Tile({x:2, y:1}, 2), new Tile({x:3, y:1}, 2),
			new Tile({x:0, y:2}, 4), new Tile({x:1, y:2}, 8), new Tile({x:2, y:2}, -1), new Tile({x:3, y:2}, 2),
			new Tile({x:0, y:3}, 8), new Tile({x:1, y:3}, 4), new Tile({x:2, y:3}, -1), new Tile({x:3, y:3}, 16)
		],
	64, //target
	8 //moves
));