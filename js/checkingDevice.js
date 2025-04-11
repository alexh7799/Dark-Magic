/**
 * Check if the device is a mobile device
 */
function checkMobileDevice() { 
    setInterval(() => handleOrientation(),1000)
    if (/Android|WebOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || navigator.userAgentData.mobile || navigator.maxTouchPoints > 0) {
        document.getElementById('hud').classList.remove('d-none');
        if (!screen.orientation && !screen.orientation.type.includes('landscape')) {
            showRotateMessage();
        }
        if (screen.orientation) {
            screen.orientation.addEventListener('change', handleOrientation);
        } else if (window.matchMedia) {
            window.matchMedia("(orientation: landscape)").addEventListener(handleOrientation);
        }
    } else document.getElementById('hud').classList.add('d-none');
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