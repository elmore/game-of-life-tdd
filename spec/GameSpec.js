describe("Game", function() {
  var game, grid;

  beforeEach(function() {

	grid = new Grid(document, 'my-grid');
  
    game = new Game(grid);
	
	grid.clear();
	
  });

  it("should make any live cell with fewer than two live neighbours die", function() {
  
	// single cell on its own
	grid.set(2, 2);
	
	game.nextIteration();
	
	expect(grid.isCellSet(2, 2)).not.toBeTruthy();
	
	grid.clear();
	
	// 2 neighbours
	grid.set(2, 2);
	grid.set(1, 2);
	grid.set(3, 2);
	
	game.nextIteration();
	
	expect(grid.isCellSet(2, 2)).toBeTruthy();
	
	grid.clear();
	
	// one neighbour
	grid.set(2, 2);
	grid.set(1, 2);
	
	game.nextIteration();
	
	expect(grid.isCellSet(2, 2)).not.toBeTruthy();
  });
  
  it("should make any live cell with more than three live neighbours die", function() {
  
	// 4 neighbours
	grid.set(2, 2);
	grid.set(1, 2);
	grid.set(3, 2);
	grid.set(2, 1);
	grid.set(2, 3);

	game.nextIteration();
	
	expect(grid.isCellSet(2, 2)).not.toBeTruthy();
  });
  
  it("should allow any live cell with two or three live neighbours live on to the next generation", function() {
  
	// 2 neighbours
	grid.set(2, 2);
	grid.set(1, 2);
	grid.set(3, 2);
	
	game.nextIteration();
	
	expect(grid.isCellSet(2, 2)).toBeTruthy();
	
	grid.clear();
	
	// 3 neighbours
	grid.set(2, 2);
	grid.set(1, 2);
	grid.set(3, 2);
	grid.set(2, 1);
	
	game.nextIteration();
	
	expect(grid.isCellSet(2, 2)).toBeTruthy();
  });
  
  it("should make any dead cell with exactly three live neighbours become a live cell", function() {
  
	// 3 neighbours
	grid.set(1, 2);
	grid.set(3, 2);
	grid.set(2, 1);
	
	game.nextIteration();
	
	expect(grid.isCellSet(2, 2)).toBeTruthy();
  });
    
});