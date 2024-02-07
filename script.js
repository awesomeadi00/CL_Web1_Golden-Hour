// document.addEventListener("scroll", function () {
//     // Getting current scroll position and sun element
//     var scrollPosition = window.scrollY; 
//     var sun = document.getElementById("sun");

//     //Getting total scrollable distance
//     var windowHeight = window.innerHeight;
//     var docHeight = document.body.offsetHeight;
//     var totalScrollableDistance = docHeight - windowHeight;

//     // The sun's horizontal movement is directly tied to the scroll progress
//     var progress = scrollPosition / totalScrollableDistance;

//     // Calculate the sun's left position to move from start to end of the window width
//     var sunLeft = progress * (window.innerWidth - sun.offsetWidth);

//     // Calculate a parabolic path for the vertical position
//     var peak = 0.5; // Highest point of the sun in the middle of the scroll
//     var verticalPosition = 4 * peak * (progress - progress * progress); // Parabolic formula
//     var sunTop = (windowHeight / 2) - (verticalPosition * windowHeight); // Center the sun vertically and apply the arc offset

//     // Adjusting the sun's position on the screen based on its pixels
//     sun.style.left = sunLeft + 'px';
//     sun.style.top = sunTop + 'px';
// });


// TEST 2
let sun = document.getElementById("sun");
let targetLeft = 0;
let targetTop = 0;
let currentLeft = 0;
let currentTop = 0;

function updateSunPosition() {
    // Ease the movement by interpolating current position towards the target
    const easeFactor = 0.1;
    currentLeft += (targetLeft - currentLeft) * easeFactor;
    currentTop += (targetTop - currentTop) * easeFactor;

    sun.style.left = `${currentLeft}px`;
    sun.style.top = `${currentTop}px`;

    requestAnimationFrame(updateSunPosition);
}

function calculateTargetPositions(scrollPos) {
    var windowHeight = window.innerHeight;
    var docHeight = document.body.offsetHeight;
    var totalScrollableDistance = docHeight - windowHeight;

    var progress = scrollPos / totalScrollableDistance;
    targetLeft = progress * (window.innerWidth - sun.offsetWidth);

    var peak = 0.5; // Adjust the arc's peak
    var verticalPosition = 4 * peak * (progress - progress * progress);
    targetTop = (windowHeight / 2) - (verticalPosition * windowHeight);
}

document.addEventListener("scroll", function () {
    var scrollPosition = window.scrollY;
    calculateTargetPositions(scrollPosition);
});

// Initialize the continuous animation loop
requestAnimationFrame(updateSunPosition);
