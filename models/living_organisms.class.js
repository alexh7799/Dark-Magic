class MovableObject extends DrawableObject {
    hp = 50;
    at = 5;
    exp = 50;
    speed = 0.15;
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
    }

    constructor() {
        super()
    }

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0 ) {
                this.posY -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000/60)
    }

    isAboveGround() {
        return this.posY < 310;
    }

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

    isColliding(mo) {
        return  (this.posX + this.width - this.offset.rigth) > (mo.posX + mo.offset.left) && 
                (this.posY + this.height - this.offset.bottom) > (mo.posY + mo.offset.top) && 
                (this.posX + this.offset.left) < (mo.posX + mo.width - mo.offset.rigth) &&
                (this.posY + this.offset.top) < (mo.posY + mo.height - mo.offset.bottom);
    }

    moveLeft() {  
        this.posX -= this.speed;
        this.otherDirection = true;
    }

    moveRight() {
        this.posX += this.speed;
        this.otherDirection = false;
    }

    isDeath() {
        this.isDead = true;
        return this.hp == 0;
    }

    hit(enemy) {
        this.hp -= enemy.at;
        if(this.hp <= 0) {
            this.hp = 0;
        }else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.2;
    }

    jump() {
        this.speedY = 6;  
    }
}