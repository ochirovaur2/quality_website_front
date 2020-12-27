export class CustomDateUser  {
	constructor() {
	    
	    this.selected = null;
	    this.dateFrom = null;
	    this.dateTo = null;
	    this.rating = null;
	    this.user = '';
	    this.dates = 'month'
	}
	
	sendRequest(){

		
		
		if ($( "#select-js" ).val( )) {
			this.user = $( "#select-js" ).val( );
		};

		var myDatepicker = $('#datepicker').datepicker(	
				{
   					 dateFormat: 'dd.mm.yyyy'
   				}
		).data('datepicker');

		if (myDatepicker.selectedDates[1]){
			this.dates = `${Date.parse(String(myDatepicker.selectedDates[0]))}+${Date.parse(String(myDatepicker.selectedDates[1]))}`;
		} else if (myDatepicker.selectedDates[0]){
			this.dates = `${Date.parse(String(myDatepicker.selectedDates[0]))}`;
		}
   
		if ( $(".side-nav__form input[type='radio']:checked") ) {
			this.rating = $(".side-nav__form input[type='radio']:checked").val();
		}
    	window.location.href = `${window.location.protocol}//${window.location.host}/admin_panel/${this.dates}/${this.rating}/${this.user}` ;
    }

	
};
