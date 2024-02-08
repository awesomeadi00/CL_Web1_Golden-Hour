let sun = document.getElementById("sun");
let targetLeft = 0;
let targetTop = 0;
let currentLeft = 0;
let currentTop = 0;

// This function updates the left and top positions of the run based on the scrollPos
function updateSunPosition() {
    const easeFactor = 0.1;
    currentLeft += (targetLeft - currentLeft) * easeFactor;
    currentTop += (targetTop - currentTop) * easeFactor;

    sun.style.left = `${currentLeft}px`;
    sun.style.top = `${currentTop}px`;

    requestAnimationFrame(updateSunPosition);
}

// This function gets the scrollPos from the addEventListener (gets the Y coordinate of the window) and adjusts the suns next position
function calculateTargetPositions(scrollPos) {
    // Calculates the total scrollable distance of the entire webpage. 
    var windowHeight = window.innerHeight;
    var docHeight = document.body.offsetHeight;
    var totalScrollableDistance = docHeight - windowHeight;

    // Scale factor to shrink the horizontal movement
    var horizontalScaleFactor = 0.9; 

    // Sees where we are currently in the webpage and therefore adjusts the left to right. 
    var progress = scrollPos / totalScrollableDistance;
    targetLeft = progress * (window.innerWidth - sun.offsetWidth) * horizontalScaleFactor;

    // Adjust targetLeft to center the arc after applying the scale
    var adjustedWidth = (window.innerWidth - (window.innerWidth * horizontalScaleFactor)) / 2;
    targetLeft += adjustedWidth;

    // This adjusts the height of the sun based on the formula of a quadratic curve
    var peak = 0.5;
    var verticalPosition = 4 * peak * (progress - progress * progress);
    targetTop = (windowHeight / 2) - (verticalPosition * windowHeight);
}
// Listener event which gets the scroll position when the user scrolls
document.addEventListener("scroll", function () {
    var scrollPosition = window.scrollY;
    calculateTargetPositions(scrollPosition);
});

// This function is called when the webpage loads: 
document.addEventListener('DOMContentLoaded', () => {
    const cursorFollower = document.createElement('div');
    cursorFollower.classList.add('cursor-follower');
    document.body.appendChild(cursorFollower);

    const size = 85; // Size of the cursor shadow

    // Adjusts the pixel size of the cursor during movement. 
    function moveCursorFollower(e) {
        cursorFollower.style.left = `${e.clientX}px`;
        cursorFollower.style.top = `${e.clientY}px`;
    }

    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursorFollower.style.opacity = '1';         // Make it visible
            cursorFollower.style.width = `${size}px`;   // Grow to final size
            cursorFollower.style.height = `${size}px`;  // Grow to final size
            cursorFollower.style.transform = `translate(-50%, -50%) scale(1)`; // Scale up smoothly
            document.addEventListener('mousemove', moveCursorFollower);
        });

        link.addEventListener('mouseleave', () => {
            cursorFollower.style.opacity = '0';     // Fade out
            cursorFollower.style.width = `0`;       // Shrink back
            cursorFollower.style.height = `0`;      // Shrink back
            cursorFollower.style.transform = `translate(-50%, -50%) scale(0)`; // Scale down smoothly
            document.removeEventListener('mousemove', moveCursorFollower);
        });
    });

    // This is for smooth scrolling when clicked on a hyperlink or button
    document.querySelectorAll('.navContainer a, .buttonContainer a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default anchor behavior

            const targetId = this.getAttribute('href'); // Get the target ID from the href attribute
            const targetElement = document.querySelector(targetId); // Find the target element

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth', // Smooth scroll
                    block: 'start' // Scroll to the start of the target element
                });
            }
        });
    });
});

// Calculate initial positions based on a scroll position of 0
// Set initial current position to match target
calculateTargetPositions(0); 
currentLeft = targetLeft; 
currentTop = targetTop; 

// Apply initial position before starting the animation
sun.style.left = `${currentLeft}px`;
sun.style.top = `${currentTop}px`;

// Continuous animation loop for the sun
requestAnimationFrame(updateSunPosition);
