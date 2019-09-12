// var sections = document.querySelectorAll(".container");


// for (var i = 0; i < sections.length; i++) {
//     console.log(sections[i]);
// }


//scrollTo of javaScript but with custom animations

var mobile = false;

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



//
//
//
//
//
//

// document.querySelector("#swipezone").addEventListener("touchstart", startTouch, false);
// document.querySelector("#swipezone").addEventListener("touchmove", moveTouch, false);

// // Swipe Up / Down / Left / Right
// var initialX = null;
// var initialY = null;

// function startTouch(e) {
//     initialX = e.touches[0].clientX;
//     initialY = e.touches[0].clientY;
//     mobile = true;
// };

// function moveTouch(e) {
//     if (initialX === null) {
//         return;
//     }

//     if (initialY === null) {
//         return;
//     }

//     var currentX = e.touches[0].clientX;
//     var currentY = e.touches[0].clientY;

//     var diffX = initialX - currentX;
//     var diffY = initialY - currentY;

//     if (Math.abs(diffX) > Math.abs(diffY)) {
//         // sliding horizontally
//         if (diffX > 0) {
//             // swdocument.querySelector("#swipezone") 
//             console.log("swiped left");
//         } else {
//             // swiped right
//             console.log("swiped right");
//         }
//     } else {
//         // sliding vertically
//         if (diffY > 0) {
//             // swiped up
//             console.log("swiped up");
//         } else {
//             // swiped down
//             console.log("swiped down");
//         }
//     }

//     initialX = null;
//     initialY = null;

//     e.preventDefault();
// };



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



window.onscroll = function (ev) {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
        snapScroll();
    }, 60);
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
