import '../vendors/chartist-plugin-tooltip.js';
import '../vendors/datepicker.js';
import '../vendors/custom-select.js';
import { Chart } from '../classes/Chart.js';
import { monkey } from './monkey.js';
import { news } from './news.js';
import { sortTable } from '../functions/sort-table.js';
import '../functions/sendCustomDateUserFunc.js';
import { toggleClass } from './toggleClass.js'
import {Export} from '../classes/Export.js';


export function main(){

	// Sort table
	(function (){
		var f_sl = 1;
		var f_nm = 1;
		$(".sort-table-js").click(function(){
		    f_sl *= -1;
		    var n = $(this).prevAll().length;
		    sortTable(f_sl,n);
		    $( ".users-table__head-data" ).removeClass( "users-table__chosen" );
		    $(this).addClass( "users-table__chosen" );
		});
	}) ();

	// Sort table

	// random monkey
	monkey()
	// random monkey

	// news 
	news()
	// news

	// requests
	let user = '';
	if (document.getElementById('user-js')) {
		user = document.getElementById('user-js').dataset.user;
	}
	let dict = {
		"month": ' текущий месяц',
		"day": ' текущий день',
		'yesterday': 'вчерашний день',
		"week": ' текущую неделю',
		"quarter": ' текущий квартал',
		"year": ' текущий год',
		'7': '7 дней',
		'14': '14 дней',
		'30': '30 дней',
		'90': '90 дней',
		'365': '365 дней',
	};
	
	let time = document.getElementById('time-js').dataset.time;
	let rating = 5
	if (document.getElementById('rating-js')) {
		rating = document.getElementById('rating-js').dataset.rating;
	}

	let userName = '';
	if (document.getElementById('user-js')) {
		userName = `(${document.getElementById('user-js').dataset.user})`;
	}
	
	 

	

	let postUrl = window.location.protocol + "//" + window.location.host + "/" + 'admin_panel/';

    
    

    let chart = new Chart();

    chart.getChartByUser ( chart.sendXhrReq(time, postUrl, user,rating,  'api/get_charts_by_user/') );
    chart.getChartLineMain ( chart.sendXhrReq(time, postUrl, user,rating,  'api/get_main_chart/') );
    chart.getPieChart ( chart.sendXhrReq(time, postUrl, user,rating,  'api/get_main_pie_chart/') );
    chart.getMainTable ( chart.sendXhrReq(time, postUrl, user,rating,  'api/get_main_user_table/') );
    chart.getTotalRating ( chart.sendXhrReq(time, postUrl, user,rating,  'api/get_total_rating/') );
    chart.getTotalAverageOfRating ( chart.sendXhrReq(time, postUrl, user,rating,  'api/get_total_average_of_rating/') );
    
    // show/hide diagram

	toggleClass(time, postUrl, user,rating,  'api/get_charts_by_user/')

	// show/hide diagram

	// django pagination for comments
	$(".django-pagination-js").click(function(e){
	    e.preventDefault();
	    localStorage.setItem('scroll-pagination-js', true);
	    
	    window.location.href = $(this).attr('href');
	    
	});


	// Change main header 
	let header = document.getElementById('header-main-js');
	if (time.indexOf('+') > -1) {
		let dates = time.split("+");
		console.log(dates)
		let dateFrom = new Date(parseInt(dates[0]));
		console.log(dateFrom)
		dateFrom = dateFrom.toLocaleDateString(); ;
		console.log(dateFrom)
		let dateTo = new Date(parseInt(dates[1]));
		dateTo = dateTo.toLocaleDateString();; 
		time = `${dateFrom} - ${dateTo}`;
		header.innerHTML = `Статистика ${time} ${userName}`;
	}  else{
		header.innerHTML = `Статистика за ${dict[time]} ${userName}`;
	}
	
	
	// End Change main header


 	document.getElementById('export-btn-js').onclick = function(e) {
 		$(".monkey").css("display","block");
		
	   	e.preventDefault()
	    let export_inst = new Export();
    	let postUrl = window.location.protocol + "//" + window.location.host + "/" + 'export/';
    	
		export_inst.exportComments(export_inst.sendXhrReq( postUrl, 'api/export_comments/'))
	    
	    
	};
	

	

};