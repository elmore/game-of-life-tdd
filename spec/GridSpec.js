
describe("Grid", function() {
  var grid;

  beforeEach(function() {
  
    grid = new Grid(document, 'my-grid');
	
  });

  afterEach(function() {
  
	if(document.getElementById('my-grid') != null) {
	
		document.body.removeChild(document.getElementById('my-grid'));
	}
  });
  
  it("should draw a grid", function() {
  
    grid.render(document.body);
	
    expect(document.getElementById('my-grid')).not.toBeNull()
  });

  it("should draw grid with correct dimensions", function() {
  
	grid.setSize({ x: 10, y:10 });
  
    grid.render(document.body);
	
	var g = $('#my-grid');
	
    expect(g).not.toBeNull()
	
	var trs = g.find('tr');
	
	trs.each(function(i, el) {
		
		expect($(el).find('td').length).toEqual(10);
		
	});
	
	expect(trs.length).toEqual(10);
  });
  
  it("should be indexible", function() {
  
    grid.render(document.body);
  
	for(var x=1; x<=5; x++) {
	
		for(var y=1; y<=5; y++) {
		
			var td = DOM_HELPER.findTdByIndex('my-grid', x, y);
		
			grid.set(x, y);
			
			expect(td).toHaveCss({ backgroundColor : 'rgb(136, 136, 136)' });
			
			grid.unset(x, y);
			
			expect(td).toHaveCss({ backgroundColor : 'rgb(255, 255, 255)' });
		}
	}
  
  });
  
  it("should switch on click", function() {
  
    grid.render(document.body);
	
	var td = DOM_HELPER.findTdByIndex('my-grid', 3, 3);
	
	$(td).trigger('click');
	
	expect(td).toHaveCss({ backgroundColor : 'rgb(136, 136, 136)' });
	
	$(td).trigger('click');
			
	expect(td).toHaveCss({ backgroundColor : 'rgb(255, 255, 255)' });
  });
  
  it("should return correct state of a cell", function() {
  
    grid.render(document.body);
  
	grid.set(2, 2);
	
	expect(grid.isCellSet(2, 2)).toBeTruthy();
  });
  
  it("should clear all cells when directed", function() {
  
    grid.render(document.body);
	
	grid.set(2, 2);
	grid.set(5, 4);
	grid.set(1, 5);
	
	expect(grid.isCellSet(2, 2)).toBeTruthy();
	expect(grid.isCellSet(5, 4)).toBeTruthy();
	expect(grid.isCellSet(1, 5)).toBeTruthy();
	
	grid.clear();
	
	expect(grid.isCellSet(2, 2)).not.toBeTruthy();
	expect(grid.isCellSet(5, 4)).not.toBeTruthy();
	expect(grid.isCellSet(1, 5)).not.toBeTruthy();
	
  });
  
  it("should accept an array of points to set", function() {
  
    grid.render(document.body);
	
	grid.set([{x: 1, y : 1}, { x : 2, y : 5} ,{ x : 3, y : 4}]);
	
	expect(grid.isCellSet(1, 1)).toBeTruthy();
	expect(grid.isCellSet(2, 5)).toBeTruthy();
	expect(grid.isCellSet(3, 4)).toBeTruthy();
  
  });
  
  it("should accept an array of points to unset", function() {
  
    grid.render(document.body);
	
	grid.set([{x: 1, y : 1}, { x : 2, y : 5} ,{ x : 3, y : 4}]);
	
	grid.unset([{x: 1, y : 1}, { x : 2, y : 5} ,{ x : 3, y : 4}]);
	
	expect(grid.isCellSet(1, 1)).not.toBeTruthy();
	expect(grid.isCellSet(2, 5)).not.toBeTruthy();
	expect(grid.isCellSet(3, 4)).not.toBeTruthy();
  });
  
  it("should expose iterator for all cells", function() {
	
	grid.setSize({ x : 3, y : 3 });
	
    grid.render(document.body);

	var expectedCells = [null, [null, false, false, false],
						[null, false, false, false],
						[null, false, false, false]];
	
	grid.onEachCell(function(x, y) {
		
		expectedCells[x][y] = true;	
	});
	
	expect(expectedCells[1][1]).toBeTruthy();
	expect(expectedCells[1][2]).toBeTruthy();
	expect(expectedCells[1][3]).toBeTruthy();
	expect(expectedCells[2][1]).toBeTruthy();
	expect(expectedCells[2][2]).toBeTruthy();
	expect(expectedCells[2][3]).toBeTruthy();
	expect(expectedCells[3][1]).toBeTruthy();
	expect(expectedCells[3][2]).toBeTruthy();
	expect(expectedCells[3][3]).toBeTruthy();
  });	
});
