let sun = document.getElementById("sun");
let targetLeft = 0;
let targetTop = 0;
let currentLeft = 0;
let currentTop = 0;

function updateSunPosition() {
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

    var peak = 0.5;
    var verticalPosition = 4 * peak * (progress - progress * progress);
    targetTop = (windowHeight / 2) - (verticalPosition * windowHeight);
}

document.addEventListener("scroll", function () {
    var scrollPosition = window.scrollY;
    calculateTargetPositions(scrollPosition);
});

// Continuous animation loop
requestAnimationFrame(updateSunPosition);
