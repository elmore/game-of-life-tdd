
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
		}
	};
}