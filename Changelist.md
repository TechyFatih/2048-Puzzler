1:52 PM 4/27/2014 (Thariq):
Fixed style.css problem
Transferred inline css from index.html to style.css
Added proper wrapping of text.
Edited style.css to edit text sizes and retry box. (retry box now changes when hovered)
Added text below game for instructions

5:04 PM 4/27/2014 (Umair):
Level 9 is updated to a max of 13 moves

5:06 PM 4/27/2014 (Thariq):
	Mouse now changes after hovering over keep playing and retry buttons.

6:13 PM 4/27/2014 (Griffin):
	Retry after winning the game now works properly

6:50 PM 4/27/204 (Fatih):
Each level has a “level” integer attribute
gameManager.js and levelManager.js modified for this change
‘Enter’ restarts game, ‘Space’ continues game (keyboardInputManager)
Altered keepPlaying function in gameManager.js to only keep playing if:
Level is won
Level is not last level
gameManager.js modified to include numLevels attribute
application.js properly edited

8:00 PM 4/27/2014 (Griffin):
	Reverted keybinds
	When you fail a level, Space and enter now also restart game
	Fixed incrementing level number with space on last level

8:39 PM 4/27/2014 (Fatih):
Added Level 10 (currently solvable in 8 moves)
Switched Level 6 and Level 7

10:00 PM 4/27/2014 (Griffin):
	Added movable obstacles (number 0, will merge with other 0s)
	Added level 11 (found solution in 24 moves)
	Added logging of movement so that we can more easily document our solutions
	Reordered victory buttons, and changed "Keep going" to "Next level"



10:12 PM 4/28/2014 (Fatih):
Fixed Level 12
Scaled Level 10 down by 4

10:07 AM 4/29/2014 (Thariq)
Made a new level (level 3) to add more diversity in grid sizes
All levels after level 3 were moved forward, renamed, and variables were changed
Retry and Next Level buttons now light up when hovered over. (It didn't work before because apparently i used the wrong class selector.)
Added level 14 (Possible, but extremely hard)


6:58 PM 4/29/2014 (Griffin)
	Found 11-move solution to level 13, moved target

9:20 PM 4/30/2014 (Griffin)
	Changed level format
	Now stored much more compactly in text files:
		First line is target, second line is number of moves
		Then, each line represents a row of tiles
			Use _ for not having a tile, and X for immovable obstacles

12:36 AM 5/5/2014 (Fatih)
Found 17-move solution to level 12

9:27 PM 4/30/2014 (Griffin)
	Added level generator file, but didn't set the game manager to ever use it. It always produces solvable levels, but they're rarely interesting.
	Added level 15 which was automatically generated in 17 moves; solved it in 11 moves.
	Modified writeLevel to be usable by the level generator--still works the same for writing the current level
