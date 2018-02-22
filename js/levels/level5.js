addLevel(new Level(
	5, //level
	4, //size
		[ //startTiles
			/*new Tile({x:0, y:0}, 2), */new Tile({x:1, y:0}, 8), /*new Tile({x:2, y:0}, 8), */new Tile({x:3, y:0}, 16),
			new Tile({x:0, y:1}, 8), /*new Tile({x:1, y:1}, 4), */new Tile({x:2, y:1}, 8), /*new Tile({x:3, y:1}, 2), */
			new Tile({x:0, y:2}, 8), new Tile({x:1, y:2}, 4), /*new Tile({x:2, y:2}, 2), new Tile({x:3, y:2}, 2), */
			new Tile({x:0, y:3}, 4), new Tile({x:1, y:3}, 4), new Tile({x:2, y:3}, 2), new Tile({x:3, y:3}, 2)
		],
	64, //target
	5 //moves
));