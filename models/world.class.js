class World {
    character = new Character();
    sun = new Sun();
    level = level1;
    magicballs = [];
    coins = [];
    potions = [
        new Potions(850),
        new Potions(2000)
    ];
    ctx;
    canvas;
    keyboard;
    camera_x = 0;
    MAX_X = 2500;
    SOUND_WIN = new Audio('./audio/completed.wav');
    SOUND_BACKGROUND = new Audio('./audio/background.wav');
    SOUND_WALKING = new Audio('./audio/walking.wav');
    SOUND_SPELL = new Audio('./audio/spell.mp3');
    SOUND_LOSE = new Audio('./audio/fail.wav');
    SOUND_HEALMP = new Audio('./audio/healmp.wav');
    SOUND_HIT = new Audio('./audio/hit.wav');
    ui = [
        new UiElement('./img/ui/PNG/MiniPanel06.jpg', 50, 168, 5, 5),
        new UiElement('./img/ui/PNG/ProgressBar_05/BarV5_Bar.png', 10, 150, 19, 10),
        new UiElement('./img/ui/PNG/ProgressBar_05/BarV5_ProgressBar.png', 10, 150, 19, 10),
        new UiElement('./img/ui/PNG/ProgressBar_09/BarV9_Bar.png', 10, 150, 19, 22),
        new UiElement('./img/ui/PNG/ProgressBar_09/BarV9_ProgressBar.png', 10, 150, 19, 22),
        new UiElement('./img/coin/coin_1.png', 18, 18, 8, 34),
        new UiElement('./img/ui/PNG/Heart.svg', 10, 13, 8, 10),
        new UiElement('./img/ui/PNG/Mana.svg', 10, 13, 8, 22),
        new UiElement('./img/mp-potion/Icon5.png', 18, 24, 85, 34),
    ];
    
    /**
     * constructor of the world
     * @param {*} canvas 
     * @param {*} keyboard 
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d')
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.generateCoins();
        this.draw();
        this.setWorld();
        this.checkCollisions();
    }

    /**
     * stop the game
     */
    stopGame() {
        this.clearAllIntervals();
    }

    /**
     * play the game
     */
    playGame() {
        this.character.animate();
        this.character.applyGravity();
        this.level.enemies.forEach(enemy => {
            enemy.animate();
            enemy.startAttackInterval();
        });
        this.coins.forEach(coin => coin.animate())
        this.potions.forEach(potion => potion.animate())
        this.setWorld();
        this.checkCollisions();
    }

    /**
     * set the world in character and enemies
     */
    setWorld() {
        this.character.world = this;
        this.level.enemies.forEach(enemy => enemy.world = this);
    }

    /**
     * generate coins
     */
    generateCoins() { 
        let groupCount = 6;
        let coinsPerGroup =  4 + Math.random() * 2;
        let groupDistance = 400 + Math.random() * 500;
        let startX = 400;
        let minDistance = 15;
        for(let g = 0; g < groupCount; g++) {
            let groupStartX = startX + (g * groupDistance);
            this.generateCoinGroup(groupStartX, coinsPerGroup, minDistance);
        }
    }

    /**
     * generate coin group
     * @param {number} groupStartX 
     * @param {number} coinsPerGroup 
     * @param {number} minDistance 
     */
    generateCoinGroup(groupStartX, coinsPerGroup, minDistance) { 
        let baseY = 280;
        let lastX = groupStartX;
        for(let i = 0; i < coinsPerGroup; i++) {
            let x = lastX + minDistance + (Math.random() * 50);
            if(x > this.MAX_X) break;
            let y = baseY + (i % 2 === 0 ? -50 : 50) + Math.random() * 30;
            y = Math.max(280, Math.min(400, y));
            this.coins.push(new Coin(x, y));
            lastX = x;
        }
    }

    /**
     * remove enemy from world
     * @param {*} enemy 
     */
    removeFromWorld(enemy) {
        setTimeout(() => {
            const index = this.level.enemies.indexOf(enemy);
            if (index > -1) {
                this.level.enemies.splice(index, 1);
            }
        }, 800)
    }

    /**
     * check the collisions
     */
    checkCollisions() {
        setInterval(()=> {
            this.checkCharacterCollisions();
            this.checkCoinsCollisions();
            this.checkPotionCollisions();
        }, 50);
        setInterval(() => {
            this.checkMagicballCollisions();
        }, 1000 /40);
    }

    /**
     * check the Character collisions
     */
    checkCharacterCollisions() {
        this.level.enemies.forEach((enemy) => {
            if(this.character.isColliding(enemy) && enemy.isAttacking) {
                this.character.hit(enemy);
                this.ui[2].updateProgressBar(this.character.hp)
            }
        })
    }

    /**
     * check the coins collisions
     */
    checkCoinsCollisions() {
        this.coins.forEach((coin, index) => {
            if(this.character.isColliding(coin)) {
                this.ui[5].updateCount();
                this.coins.splice(index, 1);
            }
        });
    }

    /**
     * check the potion collisions
     */
    checkPotionCollisions() { 
        this.potions.forEach((potion, index) => {
            if(this.character.isColliding(potion)) {
                this.ui[8].updateCount();
                this.potions.splice(index, 1);
            }
        });
    }

    /**
     * check the magicball collisions
     */
    checkMagicballCollisions() {
        this.magicballs = this.magicballs.filter(ball => {
            this.magicballs.forEach((ball, index) => {
                this.checkEnemyCollisions(ball, index);
            });
            return !ball.shouldBeRemoved();
        });
        this.magicballs.forEach(ball => ball.move());
    }

    /**
     * check the enemy collisions with the magicball
     * @param {object} ball 
     * @param {number} index 
     */
    checkEnemyCollisions(ball, index) {
        this.level.enemies.forEach(enemy => {
            if (enemy.isColliding(ball)) {
                enemy.hit(ball);
                this.magicballs.splice(index, 1);
                if (enemy.isDeath()) this.removeFromWorld(enemy);
                return false;
            }
        });
    }

    /**
     * draw the world
     */
    draw() {
        this.ctx.clearRect(0, 0 , this.canvas.width, this.canvas.height)
        this.ctx.translate(this.camera_x, 0);
        this.drawBackground();
        this.drawObjects();
        this.drawUI();
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        })
    }

    /**
     * draw the background
     */
    drawBackground() {
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.sun);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.tree);
    }

    /**
     * draw the moveble objects
     */
    drawObjects() {
        this.addToMap(this.character);
        this.addObjectsToMap(this.magicballs);
        this.addObjectsToMap(this.potions);
        this.addObjectsToMap(this.coins);
        this.addObjectsToMap(this.level.enemies);
        this.level.enemies.forEach(enemy => {
            if(enemy instanceof Endboss) {
                enemy.drawHealthBar(this.ctx);
            }
        });
    }

    /**
     * draw the UI
     */
    drawUI() {
        this.ctx.translate(-this.camera_x, 0);
        this.addObjectsToMap(this.ui);
        this.ui[5].drawNumber(this.ctx, this.ui[5].count);
        this.ui[8].drawNumber(this.ctx, this.ui[8].count);
        this.ctx.translate(this.camera_x, 0);
        this.ctx.translate(-this.camera_x, 0);
    }

    /**
     * add objects to map
     * @param {*} object 
     */
    addObjectsToMap(object) {
        object.forEach(obj => {
            this.addToMap(obj)
        })
    }

    /**
     * add to map
     * @param {*} mo 
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo)
        }
        mo.draw(this.ctx)
        if (mo.otherDirection) {
            this.flipImageBack(mo)
        }
    }

    /**
     * flip the image
     * @param {*} mo 
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1,1);
        mo.posX = mo.posX * -1;
    }

    /**
     * flip the image back
     * @param {*} mo 
     */
    flipImageBack(mo) {
        mo.posX = mo.posX * -1;
        this.ctx.restore();
    }

    /**
     * clear all intervals
     */
    clearAllIntervals() {
        for (let i = 1; i < 9999; i++) window.clearInterval(i);
    }
}