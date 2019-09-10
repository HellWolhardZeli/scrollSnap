// var sections = document.querySelectorAll(".container");


// for (var i = 0; i < sections.length; i++) {
//     console.log(sections[i]);
// }


function elementYPosition(eID) {
    var elm = document.getElementById(eID);
    var y = elm.offsetTop;
    var node = elm;
    while (node.offsetParent && node.offsetParent != document.body) {
        node = node.offsetParent;
        y += node.offsetTop;
    }
    return y;
}




function smoothScroll(stopY) {
    var startY = window.pageYOffset || document.documentElement.scrollTop;


    var distance = stopY > startY ? stopY - startY : startY - stopY;
    if (distance < 100) {
        scrollTo(0, stopY);
        return;
    }
    var speed = Math.round(distance / 20);
    if (speed >= 20) speed = 20;
    var step = Math.round(distance / 25);
    var leapY = stopY > startY ? startY + step : startY - step;
    var timer = 0;
    if (stopY > startY) {
        for (var i = startY; i < stopY; i += step) {
            setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
            leapY += step;
            if (leapY > stopY) leapY = stopY;
            timer++;
        }
        return;
    }
    for (var i = startY; i > stopY; i -= step) {
        setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
        leapY -= step;
        if (leapY < stopY) leapY = stopY;
        timer++;
    }
}






document.onkeydown = checkKey;

function checkKey(e) {


    e = e || window.event;
    var wndwHeight = window.innerHeight;
    var crntScrl = window.pageYOffset || document.documentElement.scrollTop;
    var scrlAmnt = (crntScrl % wndwHeight) / wndwHeight; // gives the percentage of scroll within the window
    var crntScrn = Math.floor(crntScrl / wndwHeight); // Gives the number of the current screen


    if (e.keyCode == '38') {
        var scrlTo = wndwHeight * (crntScrn - 1);
        // console.log("scrollto " + scrlTo);
        smoothScroll(scrlTo);
    } else if (e.keyCode == '40') {
        var scrlTo = wndwHeight * (crntScrn + 1);
        // console.log("scrollto " + scrlTo);
        smoothScroll(scrlTo);
    }

}



var timeout;
var snapTop = 0.5;
var snapBtm = 1 - snapTop;



window.onwheel = function (ev) {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
        snapScroll();
    }, 30);
};

function snapScroll() {
    // get scrollheight
    var wndwHeight = window.innerHeight;
    var crntScrl = window.pageYOffset || document.documentElement.scrollTop;
    var scrlAmnt = (crntScrl % wndwHeight) / wndwHeight; // gives the percentage of scroll within the window
    var crntScrn = Math.floor(crntScrl / wndwHeight); // Gives the number of the current screen

    if (scrlAmnt <= snapTop) {
        var scrlTo = wndwHeight * crntScrn;
        smoothScroll(scrlTo);
    } else if (scrlAmnt >= snapBtm) {
        var scrlTo = wndwHeight * (crntScrn + 1);
        smoothScroll(scrlTo);
    }
}
