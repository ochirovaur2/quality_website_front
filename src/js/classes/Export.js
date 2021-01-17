export class Export {
  constructor() { 
  		this.rating = 5;
	    this.user = '';
	    this.dates = 'month';
	    this.email = null;
	}

  sendXhrReq( postUrl, djangoPath ) {
  	let xhr = new XMLHttpRequest();
  	let send_flag = true;
  	var myDatepicker = $('#datepicker').datepicker(	
			{
					 dateFormat: 'dd.mm.yyyy'
				}
	).data('datepicker');

  	this.email = document.getElementById('export-email-js').value;

    if (!this.email) {
    	send_flag = false;
    	alert('Пожалуйста, заполните почту')
    } 
    console.log(Date.parse(String(myDatepicker.selectedDates[0])))
    if (!Date.parse(String(myDatepicker.selectedDates[0]))) {
    	send_flag = false;
    	alert('Пожалуйста, выберите даты')
    }

    if (send_flag) {
    	if ($( "#select-js" ).val( )) {
			this.user = $( "#select-js" ).val( );
		};

		

		if (myDatepicker.selectedDates[1]){
			this.dates = `${Date.parse(String(myDatepicker.selectedDates[0]))}+${Date.parse(String(myDatepicker.selectedDates[1]))}`;
		} else if (myDatepicker.selectedDates[0]){
			this.dates = `${Date.parse(String(myDatepicker.selectedDates[0]))}`;
		}

		if ( $(".side-nav__form input[type='radio']:checked") ) {
			this.rating = $(".side-nav__form input[type='radio']:checked").val();
		}

	  	

		postUrl = postUrl + djangoPath + this.email + '/' + this.dates + '/' + this.rating + '/';

		if (this.user != '') {
		    postUrl = postUrl + this.user + '/'
		}
		
		xhr.open('POST', postUrl, true)
		xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

		xhr.send();

		
    }
    return xhr

	
  };

  exportComments(xhr) {
  		if (xhr) {
  			xhr.onreadystatechange = function() { // (3)
		  	console.log(xhr.responseText)
		    if (xhr.readyState != 4) return;


		    if (xhr.status == 200) {
		    	alert('Письмо отправлено!')
		    	 
		    } else{ 
		    	alert('Произошла ошибка!')
		    	 
		    }
		  }
		  $(".monkey").css("display","none");
  		} 

  		


	  	
	}
}