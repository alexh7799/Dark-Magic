class MovableObject extends DrawableObject {
    hp = 20;
    at = 5;
    exp = 50;
    speed = 0.15;
    ground = 310;
    otherDirection = false;
    isDead = false;
    speedY = 0;
    acceleration = 0.2;
    lastHit = 0;
    offset = {
        top: 0,
        left: 0,
        rigth: 0,
        bottom: 0
    };
    
    /**
     * constructor
     */
    constructor() {
        super();
    }

    /**
     * apply gravity to the object
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0 ) {
                this.posY -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000/60);
    }

    /**
     * is the object above the ground
     * @returns {boolean} is the object above the ground
     */
    isAboveGround() {
        return this.posY < this.ground;
    }

    /**
     * play an animation
     * @param {String} images 
     * @param {boolean} replay 
     */
    playAnimation(images, replay = true) {
        if (replay) {
            let i = this.currentImage % images.length;
            let path = images[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        } else {
            for (let i = 0; i < images.length; i++) {
                let path = images[i];
                this.img = this.imageCache[path];
            }
        } 
    }

    /**
     * Check if the object is colliding with another object
     * @param {*} mo 
     * @returns 
     */
    isColliding(mo) {
        return  (this.posX + this.width - this.offset.rigth) > (mo.posX + mo.offset.left) && 
                (this.posY + this.height - this.offset.bottom) > (mo.posY + mo.offset.top) && 
                (this.posX + this.offset.left) < (mo.posX + mo.width - mo.offset.rigth) &&
                (this.posY + this.offset.top) < (mo.posY + mo.height - mo.offset.bottom);
    }

    /**
     * move the object to the left
     */
    moveLeft() {  
        this.posX -= this.speed;
        this.otherDirection = true;
    }

    /**
     * move the object to the right
     */
    moveRight() {
        this.posX += this.speed;
        this.otherDirection = false;
    }

    /**
     * is the object dead
     * @returns {Boolean} is the object dead
     */
    isDeath() {
        this.isDead = true;
        return this.hp == 0;
    }

    /**
     * hit the object
     * @param {*} obj 
     */
    hit(obj) {
        if (!this.isHurt()) {
            this.hp -= obj.at;
            if(this.hp <= 0) {
                this.hp = 0;
            }else {
                this.lastHit = new Date().getTime();
            }
        }
    }

    /**
     * start the attack interval
     */
    startAttackInterval() {
        setInterval(() => {
            this.isAttacking = true;
            setTimeout(() => {
                this.isAttacking = false;
            }, 1000);
        }, 5000);
    }

    /**
     * is the object hurt
     * @returns {boolean} is the object hurt
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.3;
    }

    /**
     * jump the object
     */
    jump() {
        this.speedY = 6;  
    }

    /**
     * show the end screen
     * @param {*} isWin 
     */
    showEndScreen(isWin) {
        let endText = document.getElementById('end-text');
        this.world.SOUND_BACKGROUND.pause();
        if (isWin) endText.innerText = 'Victory!';
        else endText.innerText = 'Game Over!';
        document.getElementById('victory-screen').classList.remove('d-none');
    }
}