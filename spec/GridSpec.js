
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
  
});
