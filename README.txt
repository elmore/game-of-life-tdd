
TDD Exercise
============

Resources 
---------

https://jasmine.github.io/

http://www.youtube.com/watch?v=XcuBvj0pw-E

Task
----

Your task is to write a program to calculate the next
generation of Conway's game of life, given any starting
position. You start with a two dimensional grid of cells, 
where each cell is either alive or dead. The grid is finite, 
and no life can exist off the edges. When calculating the 
next generation of the grid, follow these four rules:

1. Any live cell with fewer than two live neighbours dies, 
   as if caused by underpopulation.
2. Any live cell with more than three live neighbours dies, 
   as if by overcrowding.
3. Any live cell with two or three live neighbours lives 
   on to the next generation.
4. Any dead cell with exactly three live neighbours becomes 
   a live cell.

Examples: * indicates live cell, . indicates dead cell

Example input: (4 x 8 grid)
4 8
........
....*...
...**...
........

Example output:
4 8
........
...**...
...**...
........


UI
----

There is an object called Grid which you can use to 
interact with an HTML grid. Its fully tested and you 
will see the tests when you run the spec runner.

The grid has the following methods:


void set(x, y) 	
	Makes square black at x, y (indexed from 1, not 0)

void unset(x, y) 
	Makes square white

void render(el) 
	Draws the grid

void setSize(size)
	sets the width and height of the grid. size is an object eg:
	size = { x : 5, y : 5 }

bool isCellSet(x, y) 
	returns true if the cell is black

void clear()
	turns all cells white

void onEachCell(action)
	calls the function 'action' once on each cell in the grid. 
		
void onEachNeighbourCell(x, y, action)
	calls the function 'action' once on each of the neighbour 
	cells of the cell x, y
