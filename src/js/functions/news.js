export function news(){
	let flag = 0;
	if(localStorage.getItem('news-js') ){
		flag = localStorage.getItem('news-js');
	}
	if( flag == 0 ) {

		let news = document.getElementById('news-js');
		news.style.display = "block";
		news.onclick = function(){
			news.style.display = "none";
			
			localStorage.setItem('news-js', JSON.stringify(1))
				
			
		};
	} 
	
	
}