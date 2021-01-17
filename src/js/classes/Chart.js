import { sortTable } from '../functions/sort-table.js';

export class Chart  {
  constructor() {  }

  sendXhrReq(time, postUrl, user, rating, djangoPath) {
  	let xhr = new XMLHttpRequest();

	postUrl = postUrl + djangoPath + time + '/' + rating + '/';


	if (user != '') {
	    postUrl = postUrl + user + '/'
	}

	xhr.open('POST', postUrl, true)
	xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

	xhr.send();

	return xhr
  };

  getChartByUser(xhr){
	  	xhr.onreadystatechange = function() { // (3)
	  		console.log(xhr.responseText)
	    if (xhr.readyState != 4) return;

	    if (xhr.status == 200) {

	   
	        let response = JSON.parse(xhr.responseText);
	        $(".loader-js").css("display","none");
	        $('#charts-by-user-js').toggleClass( "box__hidden" );
	        var chartsByUser = document.getElementById('charts-by-user-js');
	        chartsByUser.innerHTML = "" ;

	      
	      
	        let counter = 0;
	        for (var user_data in response['series'])  {
	          
	          var data = {
	              labels: [user_data],
	                series: [
	                [response['series'][user_data][5]],
	                [response['series'][user_data][4] ],
	                [response['series'][user_data][3]],
	                [response['series'][user_data][2] ],
	                [response['series'][user_data][1]],
	              ]
	            };

	            var options = {

	              high: response['max'] + 1,
	              seriesBarDistance: 10,
	              plugins: [
	                  Chartist.plugins.tooltip()
	                ],
	              axisY: {
	                offset: 70
	              }};
	              
	            let markup = `<div class=" ct-chart-main-${counter}"></div>`
	            chartsByUser.insertAdjacentHTML('afterbegin', markup);
	            new Chartist.Bar(`.ct-chart-main-${counter}`, data, options);
	            counter += 1;
	        }
	        
	        // Scroll to comments if need
			if (localStorage.getItem('scroll-pagination-js')) {
		    	
		    	setTimeout(() => {$("#comments-js")[0].scrollIntoView(); }, 200);
		    	localStorage.removeItem('scroll-pagination-js');
		    }
	        
	    } else {
	      console.log(xhr.status + ': ' + xhr.statusText)
	      };
	      
	  };
  };

  getChartLineMain(xhr){
  	xhr.onreadystatechange = function() { // (3)
  		console.log(xhr.responseText)
	  if (xhr.readyState != 4) return;

	  if (xhr.status == 200) {

	 
	    let response = JSON.parse(xhr.responseText);
	    $(".loader-js").css("display","none");
	    var chart = new Chartist.Line('.ct-chart-line-chart-main', {
		  labels: response['dates'],
		  series: [
		    response['rating']
		  ]
		}, {
		  low: 1,
		  high: 5,
		  fullWidth: true,
		  plugins: [
		    Chartist.plugins.tooltip()
		  ]
		});
	  	$(".loader-js").css("display","none");
		

	  } else {

	    console.log(xhr.status + ': ' + xhr.statusText)
	    };
	    
	};
  };

  getTotalRating(xhr){
  	xhr.onreadystatechange = function() { // (3)
  		console.log(xhr.responseText)
	  if (xhr.readyState != 4) return;

	  if (xhr.status == 200) {

	 
	    let response = JSON.parse(xhr.responseText);
	    var totalHTML = document.getElementById('count-total-js');

		totalHTML.innerHTML = `Оценок всего: ${response['total']}` ;
		

	  } else {

	    console.log(xhr.status + ': ' + xhr.statusText)
	    };
	    
	};
  };

  getTotalAverageOfRating(xhr){
  	xhr.onreadystatechange = function() { // (3)
  		console.log(xhr.responseText)
	  if (xhr.readyState != 4) return;

	  if (xhr.status == 200) {

	 
	    let response = JSON.parse(xhr.responseText);
	    var totalHTML = document.getElementById('average-total-js');

		totalHTML.innerHTML = `Средний бал: ${response['average']}` ;
		

	  } else {

	    console.log(xhr.status + ': ' + xhr.statusText)
	    };
	    
	};
  };

  getPieChart(xhr){
	  	xhr.onreadystatechange = function() { // (3)
	  		console.log(xhr.responseText)
	    if (xhr.readyState != 4) return;

	    if (xhr.status == 200) {
	      
	   
	      let response = JSON.parse(xhr.responseText);

	      let labels = [5, 4, 3, 2, 1];

	      let seriesSum = 0;

	      // Delete zero elements and count series sum
	      for (let i in  response['series']) {
	      	if (response['series'][i] == 0){
	      		labels[i] = ' ';
	      		
	      	} else{
	      		seriesSum += response['series'][i];
	      	}
	      };

	     	
	      
	      for (let i in response['series']) {
	      	if (response['series'][i] != ' '){
	      		response['series'][i] = ((response['series'][i] / seriesSum ) * 100).toFixed(1);
	      		
	      	} ;
	      	

	      };
	      
	      var data = {
	        labels: labels,
	        series: response['series']
	      };

	      var sum = function(a, b) { return a + b };
	      $(".loader-js").css("display","none");
	      new Chartist.Pie('.ct-chart-pie-chart-main', data, {
	        labelInterpolationFnc: function(value) {
	          return value;
	        },
	        width: 300,
	        height: 300,

	        plugins: [
	            Chartist.plugins.tooltip()
	          ]
	      });
	      

	    } else {

	      console.log(xhr.status + ': ' + xhr.statusText)
	    };
	      
	  };
  };
  getMainTable(xhr){
  	xhr.onreadystatechange = function() { // (3)
  		console.log(xhr.responseText)
	  if (xhr.readyState != 4) return;

	  if (xhr.status == 200) {

	 
	    let response = JSON.parse(xhr.responseText);
	    
	   	var table = document.getElementById('users-table__body-js');
		table.innerHTML = "" ;
		console.log(response)
		for (var user_data in response['series'])  {
			let markup = `<tr class="users-table__body-row">
						      <td class="users-table__body-data ">
						      	<a class='color-dark' href="${window.location.protocol}//${window.location.host}/admin_panel/month/5/${user_data}">
			                      ${user_data}
			                    </a>
						      </td>
						     
						      
						      <td class="users-table__body-data">${response['series'][user_data]['average']}</td>
						      <td class="users-table__body-data">${response['series'][user_data][5]}</td>
						      <td class="users-table__body-data">${response['series'][user_data][4]}</td>
						      <td class="users-table__body-data">${response['series'][user_data][3]}</td>
						      <td class="users-table__body-data">${response['series'][user_data][2]}</td>
						      <td class="users-table__body-data">${response['series'][user_data][1]}</td>
						      
						      <td class="users-table__body-data">${response['series'][user_data]['total']}</td>
						    </tr>`
			table.insertAdjacentHTML('afterbegin', markup);
		}
		// Sort table auto upload
		(function (){
			var f_sl = 1;
			var f_nm = 1;
			var n = $("#sort-five-js").prevAll().length
		    f_sl *= -1;
		    sortTable(f_sl,n);
		    f_sl = 1;
		    f_sl *= -1;
		    n = $("#sort-five-js").prevAll().length
			sortTable(f_sl,n);
			f_sl = 1;
			f_sl *= -1;
			n = $("#average-js").prevAll().length
			sortTable(f_sl,n);
		})();

		$('#mainTable tbody tr td:nth-child(2)').each( function(){
	   		//add item to array
	   		console.log(this.innerHTML)
	    	this.innerHTML = parseFloat($(this).text() / 10).toFixed(1);
	      
		});
		
		
		
		

		
		

	  } else {

	    console.log(xhr.status + ': ' + xhr.statusText)
	    };
	    
	};
  };
};