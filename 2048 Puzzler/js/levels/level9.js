addLevel(new Level(
	9, //level
	4, //size
		[ //startTiles
			new Tile({x:0, y:0}, 4), /*new Tile({x:1, y:0}, 2),*/ new Tile({x:2, y:0}, 8), new Tile({x:3, y:0}, 16),
			new Tile({x:0, y:1}, 4), new Tile({x:1, y:1}, 4), new Tile({x:2, y:1}, -1), new Tile({x:3, y:1}, 32),
			new Tile({x:0, y:2}, -1), new Tile({x:1, y:2}, 16), new Tile({x:2, y:2}, 4), new Tile({x:3, y:2}, 4),
			new Tile({x:0, y:3}, 4), new Tile({x:1, y:3}, 32) /*new Tile({x:2, y:3}, 8), new Tile({x:3, y:3}, 32)*/
		],
	128, //target
	11 //moves
));