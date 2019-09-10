function smoothScroll(stopY) {
    var startY = window.pageYOffset || document.documentElement.scrollTop;


    var distance = stopY > startY ? stopY - startY : startY - stopY;
    if (distance < 100) {
        scrollTo(0, stopY);
        return;
    }
    var speed = Math.round(distance / 100);
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



var timeout;
var snapTop = 0.5;
var snapBtm = 1 - snapTop;



window.onscroll = function (ev) {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
        snapScroll();
    }, 100);
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
