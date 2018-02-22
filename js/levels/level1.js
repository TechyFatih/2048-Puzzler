addLevel(new Level(
	1, //level;
	3, //size
	[ //startTiles
		new Tile({x:0, y:0}, 2), /*new Tile({x:1, y:0}, 4),*/ new Tile({x:2, y:0}, 4),
		new Tile({x:0, y:1}, 4), new Tile({x:1, y:1}, 2), /*new Tile({x:2, y:1}, 4),*/
		/*new Tile({x:0, y:2}, 4),*/ new Tile({x:1, y:2}, 4) /*new Tile({x:2, y:2}, 2),*/
	],
	16, //target
	4 //moves
));