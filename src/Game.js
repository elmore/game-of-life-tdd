
function CoordinateHelper(size) {
	
	this.onEachNeighbour = function(x, y, action) {
	
		var neighbours = getNeighbours(x, y);
						
		for(var i=0; i<neighbours.length; i++) {
		
			action(neighbours[i].x, neighbours[i].y)
		}
	};
	
	var getNeighbours = function(x, y) {
	
		var neighbours = [];
						
		if(x < size.x) {
		
			neighbours.push({x : x+1, y : y});
		}
		
		if(x > 1) {
		
			neighbours.push({x : x-1, y : y});
		}
		
		if(y < size.y) {
		
			neighbours.push({x : x, y : y+1});
		}
		
		if(y > 1) {
		
			neighbours.push({x : x, y : y-1});
		}
		
		if(x < size.x && y < size.y) {
		
			neighbours.push({x : x+1, y : y+1});
		}
		
		if(x < size.x && y > 1) {
		
			neighbours.push({x : x+1, y : y-1});
		}
		
		if(x > 1 && y < size.y) {
		
			neighbours.push({x : x-1, y : y+1});
		}
		
		if(x > 1 && y > 1) {
		
			neighbours.push({x : x-1, y : y-1});
		}
		
		return neighbours;
	};
};

function Game(grid) {

	var size = { x : 5, y : 5 }

	grid.setSize(size);

	grid.render(document.body);
	
	var _gridHelp = new CoordinateHelper(size);
	
	var countSetNeighbours = function(x, y) {
	
		var count = 0;
	
		_gridHelp.onEachNeighbour(x, y, function(nx, ny) {
		
			if(grid.isCellSet(nx, ny)) {
			
				count++;
			}
		});
		
		return count;
	};
	
	var isVeryLonely = function(x, y) {
	
		return (countSetNeighbours(x, y) < 2);
	};
	
	var isOverCrowded = function(x, y) {
		
		return (countSetNeighbours(x, y) > 3);
	};
	
	var isHuddled = function(x, y) {
	
		return (countSetNeighbours(x, y) === 3);
	};
	
	return {

		nextIteration : function() {
		
			var toUnset = [];
			var toSet = [];
		
			grid.onEachCell(function(x, y) {
			
				if(grid.isCellSet(x, y) && 
				(isVeryLonely(x, y) || isOverCrowded(x, y))) {
					
					toUnset.push({ x : x, y : y });
				}
				
				if(!grid.isCellSet(x, y) && isHuddled(x, y)) {
				
					toSet.push({ x : x, y : y });
				}
				
			});
			
			for(var i=0; i<toSet.length; i++) {
			
				grid.set(toSet[i].x, toSet[i].y);
			}
			
			for(var i=0; i<toUnset.length; i++) {
			
				grid.unset(toUnset[i].x, toUnset[i].y);
			}
		}
	};
}