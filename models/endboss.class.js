class Endboss extends MovableObject {
    height = 250;
    width = 250;
    posX = 2550;
    posY = 250;
    hp = 200;
    at = 20;
    exp = 150;
    speed = 0;
    isRunning = false;
    moveRange = 300;
    otherDirection = true;
    isTriggered = false;
    offset = {
        top: 50,
        left: 50,
        rigth: 50,
        bottom: 50
    };
    IMAGE_IDLE = [
        './img/crow/idle/_1.png',
        './img/crow/idle/_2.png',
        './img/crow/idle/_3.png',
        './img/crow/idle/_4.png'
    ];
    IMAGE_DEAD = [
        './img/crow/death/_1.png',
        './img/crow/death/_2.png',
        './img/crow/death/_3.png',
        './img/crow/death/_4.png',
        './img/crow/death/_5.png'
    ];
    IMAGE_HURT = [
        './img/crow/hit/_1.png',
        './img/crow/hit/_2.png',
        './img/crow/hit/_3.png'
    ];
    IMAGE_ATTACK = [
        './img/crow/attack/_1.png',
        './img/crow/attack/_2.png',
        './img/crow/attack/_3.png',
        './img/crow/attack/_4.png',
        './img/crow/attack/_5.png'
    ];
    IMAGE_WALK = [
        './img/crow/walk/_1.png',
        './img/crow/walk/_2.png',
        './img/crow/walk/_3.png',
        './img/crow/walk/_4.png'
    ];

    /**
     * Constructor of the Endboss class
     */
    constructor() {
        super().loadImage(this.IMAGE_IDLE[0]);
        this.loadImages(this.IMAGE_IDLE);
        this.loadImages(this.IMAGE_DEAD);
        this.loadImages(this.IMAGE_HURT);
        this.loadImages(this.IMAGE_ATTACK);
        this.loadImages(this.IMAGE_WALK);
        this.moveRange = 150 + Math.random() * 500;
        this.animate();
    }

    /**
     * draw the health bar
     * @param {*} ctx 
     */
    drawHealthBar(ctx) {
        ctx.fillStyle = 'rgba(0,0,0,0.5)';
        ctx.fillRect(this.posX + 50, this.posY - 30, 150, 10);
        let percentage = this.hp / 200;
        ctx.fillStyle = '#AB212B';
        ctx.fillRect(this.posX + 50, this.posY - 30, 150 * percentage, 10);
    }

    /**
     * start the attack of the endboss
     */
    startAttack() {
        this.isAttacking = true;
        setTimeout(() => {
            this.isAttacking = false;
            this.moveRange = 150 + Math.random()* 500;
            this.startMovementPattern();
        }, 1000);
    }

    /**
     * start the movement pattern of the endboss
     */
    startMovementPattern() {
        if (!this.isRunning) {
            this.startSprint();
        }
    }

    /**
     * start the sprint of the endboss
     */
    startSprint() {
        if (!this.isRunning) {
            this.isRunning = true;
            let startX = this.posX;
            this.speed = 8;
            let sprintInterval = setInterval(() => {
                if (!this.otherDirection) this.sprintLeft(sprintInterval, startX);
                else this.sprintRight(sprintInterval, startX);
            }, 1000 / 60);
        }
    }

    /**
     * sprint to the left
     * @param {number} sprintInterval 
     * @param {number} startX 
     */
    sprintLeft(sprintInterval, startX) {
        if (this.posX <= 2750) {
            this.posX += this.speed;
            if (this.posX > startX + this.moveRange) {
                clearInterval(sprintInterval);
                this.endSprint();
            }
        } else {
            clearInterval(sprintInterval);
            this.endSprint();
        }
    }

    /**
     * sprint to the right
     * @param {number} sprintInterval 
     * @param {number} startX 
     */
    sprintRight(sprintInterval, startX) {   
        this.posX -= this.speed;
        if (this.posX < startX - this.moveRange) {
            clearInterval(sprintInterval);
            this.endSprint();
        }
    }

    /**
     * end the sprint of the endboss
     */
    endSprint() {
        this.isRunning = false;
        this.speed = 0;
        this.otherDirection = !this.otherDirection;
        setTimeout(() => {
            this.startAttack();
        }, 1000);
    }

    /**
     * animate the endboss
     */
    animate() {
        setInterval(() => {
            if (!this.isTriggered) this.checkCharacterDistance();
            if (this.isDeath()) this.deathAnimation(); 
            else if (this.isHurt()) this.playAnimation(this.IMAGE_HURT);
            else if (this.isAttacking) this.playAnimation(this.IMAGE_ATTACK);
            else if (this.isRunning) this.playAnimation(this.IMAGE_WALK);
            else this.playAnimation(this.IMAGE_IDLE);
        }, 1000 / 5);
    }

    /**
     * animate the death of the endboss
     */
    deathAnimation() {
        this.speed = 8;
        this.playAnimation(this.IMAGE_DEAD, false);
        setTimeout(() => {
            this.clearAllIntervals();
            this.showEndScreen(true);
            this.playWinningSound();
        }, 500);
    }

    /**
     * check the distance to the character
     */
    checkCharacterDistance() {
        if(this.world && this.world.character) {
            if (this.world.character.posX >= 2150) {
                this.isTriggered = true;
                this.startAttack();
            } else if (!this.isTriggered) {
                this.isTriggered = false;
                this.isAttacking = false;
            }
        }
    }

    /**
     * Play win sound
     */
    playWinningSound() {
        if (this.world && this.world.SOUND_WIN && !isMuted) {
            this.world.SOUND_WIN.volume = 0.3;
            this.world.SOUND_WIN.play();
        }
    }
}