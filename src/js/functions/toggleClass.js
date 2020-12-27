import { Chart } from '../classes/Chart.js';

export function toggleClass (time, postUrl, user, rating, djangoPath){
	$( ".diagram-js" ).click(function() {
		
		$(".loader-js").css("display","block");
		

	  
	    let chart = new Chart();
        chart.getChartByUser ( chart.sendXhrReq(time, postUrl, user, rating, djangoPath) )
	  	
	  	

	});
	
};