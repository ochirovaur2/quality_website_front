export function monkey(){
	let num = Math.floor(Math.random() * 10);
	console.log(num)
	if ( num == 5 || num == 8){
		$(".monkey").css("display","block");
		setTimeout(() => { $(".monkey").css("display","none"); }, 10000);
	}
}