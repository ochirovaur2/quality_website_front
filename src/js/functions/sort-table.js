export function sortTable(f,n){
	var rows = $('#mainTable tbody  tr').get();


	$('#mainTable tbody tr td:nth-child(2)').each( function(){
	   //add item to array
	    if (Number.isInteger(+$(this).text()) == false ) {
	    	this.innerHTML = parseInt((parseFloat($(this).text()) * 10), 10) ;
	    } else {
	    	this.innerHTML = $(this).text() * 10
	    }
	    
	      
	});


	rows.sort(function(a, b) {

		var A = getVal(a);
		var B = getVal(b);
		
		if(A < B) {
			return -1*f;
		}
		if(A > B) {
			return 1*f;
		}
		return 0;
	});

	function getVal(elm){
		var v = $(elm).children('td').eq(n).text().toUpperCase();
		if ($.isNumeric(v)){
			v = parseInt(v,10);
		} 

		return v;
	}

	$.each(rows, function(index, row) {
		$('#mainTable').children('tbody').append(row);
	});


	$('#mainTable tbody tr td:nth-child(2)').each( function(){
	   //add item to array
	  	
	    this.innerHTML = parseFloat($(this).text() / 10).toFixed(1);
	      
	});



};



