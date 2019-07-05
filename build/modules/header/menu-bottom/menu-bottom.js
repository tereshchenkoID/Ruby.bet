setInterval(function() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    
    if(h<10){ h = "0"+h; }
    if(m<10){ m = "0"+m; }
    if(s<10){ s = "0"+s; }

    $('#clock').text(h+":"+m+":"+s+" GMT+2");
}, 500);