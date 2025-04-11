function rendererHomeOptions() {
    return `<div id="home-btn" class="btn" onclick="toHomeScreen()">
                <img src="./img/ui/PNG/MiniPanel06.jpg">
                <img src="./img/ui/PNG/Btn01.png">
                <p>Home</p>
            </div>`;
}

function rendererInGameOptions() {
    return `<div id="restart-btn" class="btn" onclick="restartGame()">
                <img src="./img/ui/PNG/MiniPanel06.jpg">
                <img src="./img/ui/PNG/Btn01.png">
                <p>Restart</p>
            </div>
            <div id="home-btn" class="btn" onclick="toHomeScreen()">
                <img src="./img/ui/PNG/MiniPanel06.jpg">
                <img src="./img/ui/PNG/Btn01.png">
                <p>Home</p>
            </div>
            <div id="play-btn" class="btn" onclick="replayGame()">
                <img src="./img/ui/PNG/MiniPanel06.jpg">
                <img src="./img/ui/PNG/Btn01.png">
                <p>Play</p>
            </div>`;
}          