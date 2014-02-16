
function Cell(doc) {

	var _self = this;
	
	_self.el = doc.createElement('td');
	
	_self.isSet = false;
	
	_self.set = function() {
	
		_self.el.style.backgroundColor = '#888';
	};
	
	_self.unset = function() {
	
		_self.el.style.backgroundColor = '#fff';
	};
	
	$(_self.el).click(function() {
		
		if(_self.isSet) {
		
			_self.unset();
			
		} else {
		
			_self.set();
			
		}
		
		_self.isSet = !_self.isSet;
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
			
			_table[y][x].set();
		},
		
		unset : function(x, y) {
			
			_table[y][x].unset();
		},
		
		render : function(el) {
			
			el.appendChild(makeTable(_size));
		},
		
		setSize : function(size) {
		
			_size = size;
		}
	
	};
}