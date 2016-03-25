importScripts('serviceworker-cache-polyfill.js');
importScripts('sha1.js');

// The SW will be shutdown when not in use to save memory,
// be aware that any global state is likely to disappear
console.log("SW startup");

self.addEventListener('install', function(event) {
  console.log("SW installed");
});

self.addEventListener('activate', function(event) {
  console.log("SW activated");
});

self.addEventListener('fetch', function(event) {
  console.log("Caught a fetch!");
  event.respondWith(new Response("Hello world!"));
});

onmessage = function(event){init(event.data)}

function init(_hash_id)
{
    postMessage("Worker started");
    hash_id = _hash_id;
    get_work(hash_id);
}

function get_work()
{
    var g_w = new XMLHttpRequest();
    g_w.open("POST", "http://1-dot-tonal-premise-641.appspot.com/graycomputing");
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
    s_r.open("POST", "http://1-dot-tonal-premise-641.appspot.com/graycomputing");
    s_r.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    s_r.send("hash_id=" + hash_id + "&worklength=" + worklength + "&cracked=" + cracked + "&time=" + parseInt(et-st));
}