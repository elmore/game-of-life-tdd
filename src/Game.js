

function Game(grid) {

	var size = { x : 5, y : 5 }

	grid.setSize(size);

	grid.render(document.body);
	
	var countSetNeighbours = function(x, y) {
	
		var count = 0;
	
		grid.onEachNeighbourCell(x, y, function(nx, ny) {
		
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
			
			grid.set(toSet);
			grid.unset(toUnset);
		}
	};
}