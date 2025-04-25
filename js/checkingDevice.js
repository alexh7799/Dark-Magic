/**
 * Check if the device is a mobile device
 */
function checkMobileDevice() { 
    if(isMobile.any) {
        document.querySelectorAll('#hud').forEach(element => {
            element.style.display = 'flex';
            document.getElementById('hud').classList.remove('d-none');
        });
    } else {
        document.getElementById('hud').classList.add('d-none');
    }
}

/**
 * Handle the orientation change
 */
function handleOrientation() {
    if (screen.orientation) {
        let orientation = screen.orientation.type;
        if (orientation.includes('landscape')) {
            document.getElementById('rotate-device').classList.add('d-none');
        } else {
            world.stopGame();
            showRotateMessage();
        }
    } else if (window.matchMedia) {
        const query = window.matchMedia("(orientation: landscape)");
        if (query.matches) document.getElementById('rotate-device').classList.add('d-none');
        else showRotateMessage();
    }
}