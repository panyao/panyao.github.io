
importScripts('sha1.js');
onmessage = function(event){init(event.data)}
var iter_count=0;
var slot_size = 1000000;
var hash_id=0;
var slots;
var targethash;
var salt;
var algo;
var salt_location;
var inp;
var i=0;
var st;
var ks = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_+=!@#$%^&*(){}[]|\\:;\"'?/<>,.";
var base = ks.length;
var clear = new Array();
var cracked = 0;
var hash_clear="";

var worklength;
var result;
var et;
var st;

function init(_hash_id)
{
    postMessage("Worker started");
    hash_id = _hash_id;
    get_work(hash_id);
}

function get_work()
{
    var g_w = new XMLHttpRequest();
    g_w.open("POST", "http://graycomputingserver-120937.nitrousapp.com:1337/graycomputing");
    g_w.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    g_w.send("hash_id=" + hash_id);
    g_w.onreadystatechange = function()
    {
        if(g_w.readyState == 4)
        {
            work = JSON.parse(g_w.responseText);
           

            targethash = work.hash;
			worklength = work.worklength;

            base = ks.length;
            algo = work.algo;


            crack_slots();
            setTimeout("get_work()", 1000);
           
           
        }
    }
}

function crack_slots()
{
    var i=0;
    var speed=0;

 
	postMessage("Currently cracking ==> Length:" + worklength + " for Hash ID - " + hash_id + " @ " +  speed + " hashes/second" );
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
		if(hash == targethash){
			result = s;
			cracked = 1;
			break;
		}
	}
	et = (new Date).getTime();
	if(cracked == 1){
		 postMessage("Cracked: "+ result + " Time: "+ parseInt(et-st));
	}
	else{
		 postMessage("Length: " +  worklength + " for Hash ID - " + hash_id + " Time: "+ parseInt(et-st));
	}
	speed = parseInt((slot_size * 1000)/(et-st));
       

    submit_result();
}


function submit_result()
{
    var s_r = new XMLHttpRequest();
    s_r.open("POST", "http://graycomputingserver-120937.nitrousapp.com:1337/graycomputing");
    s_r.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    s_r.send("hash_id=" + hash_id + "&worklength=" + worklength + "&cracked=" + cracked + "&time=" + parseInt(et-st));
}


