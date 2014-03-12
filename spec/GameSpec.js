describe("Game", function() {
  var game, grid;

  beforeEach(function() {

	grid = new Grid(document, 'my-grid');
  
    game = new Game(grid);
	
	grid.clear();
	
  });

  it("should make any live cell with fewer than two live neighbours die", function() {
  
	expect(false).toBeTruthy();
  });
  
  it("should make any live cell with more than three live neighbours die", function() {
  
	expect(false).toBeTruthy();
  });
  
  it("should allow any live cell with two or three live neighbours live on to the next generation", function() {
  
	expect(false).toBeTruthy();
  });
  
  it("should make any dead cell with exactly three live neighbours become a live cell", function() {
  
	expect(false).toBeTruthy();
  });
    
});
