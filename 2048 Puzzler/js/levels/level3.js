addLevel(new Level(
	3, //level
	3, //size
		[ //startTiles
			new Tile({x:0, y:0}, 2), new Tile({x:1, y:0}, 8), new Tile({x:2, y:0}, 4),
			new Tile({x:0, y:1}, 2), /*new Tile({x:1, y:1}, 2),*/ new Tile({x:2, y:1}, 8),
			new Tile({x:0, y:2}, 4), new Tile({x:1, y:2}, 2), new Tile({x:2, y:2}, 2)
		],
	 32, //target
	 6 //moves
));