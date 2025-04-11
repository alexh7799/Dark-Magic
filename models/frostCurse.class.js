class FrostCurse extends MovableObject {
    height = 80;
    width = 65;
    posX = 600;
    posY = 370;
    speed = 7;
    world;
    isAttacking = false;
    isDying = false;
    deathAnimationComplete = false;
    otherDirection = true;
    offset = {
        top: 10,
        left: 15,
        rigth: 15,
        bottom: 10
    }
    IMAGE_RUN = [
        './img/frost_curse/run/_1.png',
        './img/frost_curse/run/_2.png',
        './img/frost_curse/run/_3.png',
        './img/frost_curse/run/_4.png',       
    ];
    IMAGE_DEAD = [
        './img/frost_curse/death/_1.png',
        './img/frost_curse/death/_2.png',
        './img/frost_curse/death/_3.png',
        './img/frost_curse/death/_4.png',
        './img/frost_curse/death/_5.png',
        './img/frost_curse/death/_6.png',
        './img/frost_curse/death/_7.png',
        './img/frost_curse/death/_8.png',
        './img/frost_curse/death/_9.png',
        './img/frost_curse/death/_10.png',
        './img/frost_curse/death/_11.png',
    ];

    /**
     * Constructor of the FrostCurse class
     */
    constructor() {
        super().loadImage(this.IMAGE_RUN[0]);
        this.loadImages(this.IMAGE_RUN);
        this.loadImages(this.IMAGE_DEAD);
        this.posX = 550 + Math.random() * 2600;
        this.speed = 4 + Math.random() * 6;
        this.animate();
    }
    
    /**
     * animate the frost curse
     */
    animate() {
        setInterval(() => {
            if (this.isDeath()) {
                this.playAnimation(this.IMAGE_DEAD, false);
            } else if (!this.isDying) {
                this.isAttacking = true;
                this.moveLeft();
                this.playAnimation(this.IMAGE_RUN);
            }
        }, 1000/5); 
    }
}