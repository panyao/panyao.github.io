importScripts('sha1.js');


self.addEventListener('install', function(event) {
    
});

self.addEventListener('fetch', function(event) {

});

self.addEventListener('message', function(event) {
  for(var i=1; i<10; i++){
     var time = crack_slots();
     event.ports[0].postMessage({'test': 'Time: '+time+ 's'});
  }
});


function crack_slots(event)
{

    var st = (new Date).getTime();
    var ks = "abcdefghijklmnopqrstuvwxyz";
    var target = "81fe8bfe87576c3ecb22426f8e57847382917acf"; //abcd
    var s = "ab12cd34";
    var hash;
    var flag;
    
    for(var i=1; i<=2000000; i++){
        hash = hex_sha1(s);
        if(hash == target)
            flag = 1;
        
    }
    var et = (new Date).getTime();
    var time = parseInt(et-st)/1000;
    return time;
  //  setTimeout("crack_slots(event)", 1000);
}