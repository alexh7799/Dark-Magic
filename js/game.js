let canvas;
let world;
let isPaused = false;
let keyboard = new Keyboard();
let isMuted = false;
let sounds = [];

/**
 * Initialize the game
 */
function init() {
    canvas = document.getElementById('canvas');
    world  = new World(canvas, keyboard);
    initSounds();
    loadMuteStatus();
    world.stopGame();
}

/**
 * Toggle the mute status
 */
function toggleMute() {
    isMuted = !isMuted;
    localStorage.setItem('isMuted', isMuted);
    updateMuteStatus();
    playBackgroundMusic();
    document.activeElement.blur();
}

/**
 * Create the game world
 */
function createWorld() {
    if (world) {
        world.stopGame();
        world = null;
    }
    world = new World(canvas, keyboard);
    world.level = createLevel1();
    world.setWorld();
    loadMuteStatus();
}

/**
 * Load the mute status from local storage
 */
function loadMuteStatus() {
    isMuted = localStorage.getItem('isMuted') === 'true';
    updateMuteStatus();
}

/**
 * Initialize the sounds
 */
function initSounds() {
    if (world && world.character) {
        sounds = [
            world.SOUND_WALKING,
            world.SOUND_SPELL,
            world.SOUND_BACKGROUND,
            world.SOUND_HIT,
            world.SOUND_HEALMP,
            world.SOUND_WIN,
            world.SOUND_LOSE
        ]; 
    }
}

/**
 * Play the background music
 */
function playBackgroundMusic() {
    if (world && world.SOUND_BACKGROUND && !isMuted) {
        world.SOUND_BACKGROUND.loop = true;
        world.SOUND_BACKGROUND.volume = 0.1;
        world.SOUND_BACKGROUND.play();
    }else if (world && world.SOUND_BACKGROUND && isMuted) {
        world.SOUND_BACKGROUND.pause()
    }
}

/**
 * Update the mute status
 */
function updateMuteStatus() {
    const muteIcon = document.getElementById('mute');
    if (muteIcon) {
        muteIcon.src = isMuted ? 
            './img/ui/PNG/Icons/mute.svg' : 
            './img/ui/PNG/Icons/sound.svg';
    }
    if (sounds.length > 0) {
        sounds.forEach(sound => {
            if (sound) sound.muted = isMuted;
        });
    }
}

/**
 * Toggle the pause status
 */
function togglePause(isPaused) {
    if (isPaused) {
        world.stopGame();
    } else {
        world.playGame(); 
    }
    document.activeElement.blur();
}

/**
 * Start the game
 */
function startGame() {
    world.playGame();
    playBackgroundMusic();
    document.getElementById('menu').classList.add('d-none');
}

/**
 * Restart the game
*/
function restartGame() {
    world.SOUND_BACKGROUND.pause();
    createWorld();
    playBackgroundMusic();
    document.getElementById('victory-screen').classList.add('d-none');
    document.getElementById('options-screen').classList.add('d-none');
    document.getElementById('menu').classList.add('d-none');
}

/**
 * Go back to the home screen
 */
function toHomeScreen() {
    world.SOUND_BACKGROUND.pause();
    document.getElementById('victory-screen').classList.add('d-none');
    document.getElementById('options-screen').classList.add('d-none');
    document.getElementById('menu').classList.remove('d-none');
    createWorld();
    world.stopGame();
}

/**
 * Show the options screen
 */
function optionsGame(isHome) {
    togglePause(true);
    document.getElementById('button-container').innerHTML = '';
    if (isHome) {
        document.getElementById('button-container').innerHTML = rendererHomeOptions();
    } else {
        document.getElementById('button-container').innerHTML = rendererInGameOptions();
    }
    document.getElementById('options-screen').classList.remove('d-none');
}

/**
 * open the Impressum
 */
function impressumOpen() {
    document.getElementById('impressum').classList.remove('d-none');
    document.body.classList.add('overflow-auto')
}

/**
 * close the impressum
 */
function impressumClose() {
    document.getElementById('impressum').classList.add('d-none');
    document.body.classList.remove('overflow-auto')
}

/**
 * close the options
 */
function optionsClose() {
    document.getElementById('options-screen').classList.add('d-none');
}

/**
 * replay the game
 */
function replayGame() {
    togglePause(false);
    document.getElementById('menu').classList.add('d-none');
    document.getElementById('victory-screen').classList.add('d-none');
    document.getElementById('options-screen').classList.add('d-none');
}

/**
 * Enable the fullscreen mode
 */
async function enableFullscreen() {
    try {
        let element = document.documentElement;
        if (element.requestFullscreen) {
            await element.requestFullscreen();
        } else if (element.webkitRequestFullscreen) {
            await element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
            await element.msRequestFullscreen();
        }
    } catch (error) {}
    document.activeElement.blur();
}

/**
 * Handle the window key event
 */
window.addEventListener('keydown' , (e) => {
    keyArrowDown(e,true);
    keyArrowUp(e,true);
    keyArrowRight(e,true);
    keyArrowLeft(e,true);
    keySpace(e,true); 
    keyD(e,true);
    keyE(e,true);
    if(e.key == 'p') optionsGame(false);
    if(e.key == 'f') enableFullscreen();
    if(e.key == 'm') toggleMute();
})

/** 
 * Handle the window keyup event
 */
window.addEventListener('keyup' , (e) => {
    keyArrowRight(e,false);
    keyArrowLeft(e,false);
    keyArrowDown(e,false);
    keyArrowUp(e,false);
    keySpace(e,false);
    keyD(e,false);
    keyE(e,false);
})

/**
 * key arrow right
 * @param {*} e 
 * @param {boolean} value 
 */
function keyArrowRight(e,value) {
    if(e.key == 'ArrowRight') {
        keyboard.RIGHT = value;
    }
}

/**
 * key arrow left
 * @param {*} e 
 * @param {boolean} value 
 */
function keyArrowLeft(e,value) {
    if(e.key == 'ArrowLeft') {
        keyboard.LEFT = value;
    }
}

/**
 * key arrow down
 * @param {*} e 
 * @param {boolean} value 
 */
function keyArrowDown(e,value) {
    if(e.key == 'ArrowDown') {
        keyboard.DOWN = value;
    }
}

/**
 * key arrow up
 * @param {*} e 
 * @param {boolean} value 
 */
function keyArrowUp(e,value) {    
    if(e.key == 'ArrowUp') {
        keyboard.UP = value;
    }
}

/**
 * key space
 * @param {*} e 
 * @param {boolean} value 
 */
function keySpace(e,value) {  
    if(e.key == ' ') {
        keyboard.SPACE = value;
    }
}

/**
 * key D
 * @param {*} e 
 * @param {boolean} value 
 */
function keyD(e,value) {  
    if(e.key == 'd') {
        keyboard.D = value;
    }
}

/**
 * key E
 * @param {*} e 
 * @param {boolean} value 
 */
function keyE(e,value) {  
    if(e.key == 'e') {
        keyboard.E = value;
    }
}

/**
 * Handle the touch events BtnLeft
 */
document.getElementById('btnLeft').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.LEFT = true;
})

/**
 * Handle the touch events BtnLeft
 */
document.getElementById('btnLeft').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.LEFT = false;
})

/**
 * Handle the touch events BtnRight
 */
document.getElementById('btnRight').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.RIGHT = true;
})

/**
 * Handle the touch events BtnRight
 */
document.getElementById('btnRight').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.RIGHT = false;
})

/** 
 * Handle the touch events BtnBall
 */
document.getElementById('btnBall').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.D = true;
})

/**
 * Handle the touch events BtnBall
 */
document.getElementById('btnBall').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.D = false;
})

/**
 * Handle the touch events BtnJump
 */
document.getElementById('btnJump').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.SPACE = true;
})

/**
 * Handle the touch events BtnJump
 */
document.getElementById('btnJump').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.SPACE = false;
})

/**
 * Handle the touch events BtnPotion
 */
document.getElementById('btnPotion').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.E = true;
})

/**
 * Handle the touch events BtnPotion
 */
document.getElementById('btnPotion').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.E = false;
})

/**close game change the orientation */
const mediaQuery = window.matchMedia("(orientation: portrait)");
mediaQuery.addEventListener("change", function(e) {
    if (e.matches) {
        togglePause(true)
        toHomeScreen()
    }
});