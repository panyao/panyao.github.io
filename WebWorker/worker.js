
importScripts('sha1.js');
onmessage = function(event){init(event.data)}
var st;
var ks = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_+=!@#$%^&*(){}[]|\\:;\"'?/<>,.";
var base = ks.length;
var num;
var t;

var worklength= 1000000;
var result;
var et;
var st;

function init()
{
    postMessage("Worker started");
    
    dowork();
}


function dowork()
{
    var i=0;
    var speed=0; 

    var request = new XMLHttpRequest();
    var url = "https://browserddos.herokuapp.com/speed/0";
    request.open("GET", url);
    request.send();

	st = (new Date).getTime();
	
	for(i=1; i<=worklength; i++){
		 var s = "";
		 num = i;
		 while(num >= 1){
			t = num%ks.length;
			s = s.concat(ks.charAt(t));
			num = Math.floor(num/ks.length);
		 }
		var hash = hex_sha1(s);
		
	}
	et = (new Date).getTime()-st;
	

    var request = new XMLHttpRequest();
    var url = "https://browserddos.herokuapp.com/speed/"+et;
    request.open("GET", url);
    request.send();
    
}





