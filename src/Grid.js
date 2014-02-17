
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
		
	var onEachCell = function(action) {
	
		for(var x=1; x<=_size.x; x++) {
		
			for(var y=1; y<=_size.y; y++) {
			
				action(_table[y][x]);
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

	return {
	
		set : function(x, y) {
			
			if(typeof(x) === 'object') {
				
				$(x).each(function(i, coords) {
					
					_table[coords.y][coords.x].set();
				});
				
			} else {
			
				_table[y][x].set();
			}
		},
		
		unset : function(x, y) {
		
			if(typeof(x) === 'object') {
				
				$(x).each(function(i, coords) {
					
					_table[coords.y][coords.x].unset();
				});
				
			} else {
			
				_table[y][x].unset();
			}
		},
		
		render : function(el) {
			
			el.appendChild(makeTable(_size));
		},
		
		setSize : function(size) {
		
			_size = size;
		},
		
		isCellSet : function(x, y) {
			
			return _table[y][x].isSet;
		},
		
		clear : function() {
		
			onEachCell(function(cell) {
			
				cell.unset();
			});
		}
	};
}