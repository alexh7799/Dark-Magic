class Magicball extends MovableObject {
    speed = 8;
    at = 20;
    maxDistance = 220;
    distanceTraveled = 0;
    speedY = -0.35;
    acceleration = 0.025;
    currentImage = 0;
    height = 60;
    width = 80;
    offset = {
        top: 10,
        left: 10,
        rigth: 10,
        bottom: 10
    };
    IMAGES_WATERBALL = [
        './img/heros/hero_1/waterball/1.png',
        './img/heros/hero_1/waterball/2.png',
        './img/heros/hero_1/waterball/3.png',
        './img/heros/hero_1/waterball/4.png',
        './img/heros/hero_1/waterball/5.png',
        './img/heros/hero_1/waterball/6.png',
        './img/heros/hero_1/waterball/7.png',
        './img/heros/hero_1/waterball/8.png',
        './img/heros/hero_1/waterball/9.png',
    ];
    
    /**
     * Constructor of the Magicball class
     * @param {number} x 
     * @param {number} y 
     * @param {boolean} otherDirection 
     */
    constructor(x, y, otherDirection) {
        super().loadImage('./img/heros/hero_1/waterball/1.png');
        this.loadImages(this.IMAGES_WATERBALL);
        this.posX = x;
        this.posY = y;
        this.otherDirection = otherDirection;
        this.animate();
    }

    /**
     * animate the magicball
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_WATERBALL);
        }, 100);
    }

    /**
     * move the magicball
     */
    move() {
        if (this.otherDirection) {
            this.posX -= this.speed;
        } else {
            this.posX += this.speed;
        }
        this.posY -= this.speedY;
        this.speedY -= this.acceleration;
        this.distanceTraveled += this.speed;
    }

    /**
     * Remove the magicball
     * @returns {boolean} if the magicball should be removed
     */
    shouldBeRemoved() {
        return this.distanceTraveled >= this.maxDistance || this.posY >= 450; 
    }
}