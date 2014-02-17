
function Cell(doc) {

	var _self = this;
	
	_self.el = doc.createElement('td');
	
	_self.isSet = false;
	
	_self.set = function() {
	
		_self.el.style.backgroundColor = '#888';
		
		_self.isSet = true;
	};
	
	_self.unset = function() {
	
		_self.el.style.backgroundColor = '#fff';
		
		_self.isSet = false;
	};
	
	$(_self.el).click(function() {
	
		if(_self.isSet) {
		
			_self.unset();
			
		} else {
		
			_self.set();
			
		}
	});
}

function Row(doc, cols) {

	var _self = this;

	_self.el = doc.createElement('tr');
	
	var arrRow = [];
	
	for(var i=1; i<=cols; i++) {
	
		var col = new Cell(doc);
	
		_self.el.appendChild(col.el);
		
		arrRow[i] = col;
	}
	
	_self.getCells = function() {
	
		return arrRow;
	};
}

function Grid(doc, name) {

	var _size = { x : 5, y : 5 }, 
		_table = [];
	
	var _getNeighbours = function(x, y) {
	
		var neighbours = [];
						
		if(x < _size.x) {
		
			neighbours.push({x : x+1, y : y});
		}
		
		if(x > 1) {
		
			neighbours.push({x : x-1, y : y});
		}
		
		if(y < _size.y) {
		
			neighbours.push({x : x, y : y+1});
		}
		
		if(y > 1) {
		
			neighbours.push({x : x, y : y-1});
		}
		
		if(x < _size.x && y < _size.y) {
		
			neighbours.push({x : x+1, y : y+1});
		}
		
		if(x < _size.x && y > 1) {
		
			neighbours.push({x : x+1, y : y-1});
		}
		
		if(x > 1 && y < _size.y) {
		
			neighbours.push({x : x-1, y : y+1});
		}
		
		if(x > 1 && y > 1) {
		
			neighbours.push({x : x-1, y : y-1});
		}
		
		return neighbours;
	};
	
	var _onEachCell = function(action) {
	
		for(var x=1; x<=_size.x; x++) {
		
			for(var y=1; y<=_size.y; y++) {
			
				action(_table[y][x], x, y);
			}
		}
	};
	
	var makeTable = function(size) {
	
		var tbl = doc.createElement('table');
		
		tbl.id = name;
		
		for(var i=1; i<=size.y; i++) {
		
			var row = new Row(doc, size.x);
		
			tbl.appendChild( row.el );
			
			_table[i] = row.getCells();
		}
		
		return tbl;
	};

	var getCell = function(x, y) {
	
		return _table[y][x];
	};
	
	var onOneOrAll = function(xOrArr, y, action) {
	
		if(typeof(xOrArr) === 'object') {
			
			$(xOrArr).each(function(i, coords) {
				
				action(getCell(coords.x, coords.y));
			});
			
		} else {
			
			action(getCell(xOrArr, y));
		}
	};
	
	var _onEachNeighbour = function(x, y, action) {
	
		var neighbours = _getNeighbours(x, y);
						
		for(var i=0; i<neighbours.length; i++) {
		
			action(neighbours[i]);
		}
	};	
	
	return {
	
		set : function(x, y) {					
			
			onOneOrAll(x, y, function(cell) { cell.set(); });
		},
		
		unset : function(x, y) {
		
			onOneOrAll(x, y, function(cell) { cell.unset(); });
		},
		
		render : function(el) {
			
			el.appendChild(makeTable(_size));
		},
		
		setSize : function(size) {
		
			_size = size;
		},
		
		isCellSet : function(x, y) {
			
			return getCell(x, y).isSet;
		},
		
		clear : function() {
		
			_onEachCell(function(cell) {
			
				cell.unset();
			});
		},
		
		onEachCell : function(action) {
		
			_onEachCell(function(cell, x, y) {
			
				action(x, y);
			});
		},
		
		onEachNeighbourCell : function(x, y, action) {
		
			_onEachNeighbour(x, y, function(coords) {
			
				action(coords.x, coords.y);
			});
		
		}
	};
}