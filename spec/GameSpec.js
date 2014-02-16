describe("Game", function() {
  var game;

  beforeEach(function() {
  
    game = new Game(grid);
	
  });

  it("should make any live cell with fewer than two live die", function() {
  
	game.startSim();
  });
  
  it("should make any live cell with more than three live neighbours die", function() {
  
	game.startSim();
  });
  
  it("should allow any live cell with two or three live neighbours live on to the next generation", function() {
  
	game.startSim();
  });
  
  it("should make any dead cell with exactly three live neighbours become a live cell", function() {
  
	game.startSim();
  });
    
});