beforeEach(function () {

  jasmine.addMatchers({
  
    toHaveCss: function () {
	
      return {
	  
        compare: function (actual, expected) {

		  var pass = true;
		  
		  for(var p in expected) {
			console.log(actual.style[p]);
			console.log(expected[p]);
			pass &= actual.style[p] == expected[p];
		  }
		  
          return {
		  
            pass: pass
          }
        }
      };
    }

  });
});



DOM_HELPER = {

	findTdByIndex : function(tblName, x, y) {
		
		var g = $('#' + tblName);
		
		var tr = g.find('tr')[y-1];
		
		return $(tr).find('td')[x-1];
	}


};
