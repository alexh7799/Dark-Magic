class DarkSamurai extends MovableObject {
    height = 110;
    width = 110;
    posX = 350;
    posY = 360;
    ground = 360;
    at = 30;
    exp = 50;
    speed = 7;
    acceleration = 0.8;
    offset = {
        top: 15,
        left: 15,
        rigth: 15,
        bottom: 15
    }
    otherDirection = true;
    IMAGE_IDLE = [
        './img/darkSamurai/idle/_1.png',
        './img/darkSamurai/idle/_2.png',
        './img/darkSamurai/idle/_3.png',
        './img/darkSamurai/idle/_4.png',
        './img/darkSamurai/idle/_5.png',
        './img/darkSamurai/idle/_6.png',
        './img/darkSamurai/idle/_7.png',
        './img/darkSamurai/idle/_8.png'    
    ];
    IMAGE_DEAD = [
        './img/darkSamurai/death/_1.png',
        './img/darkSamurai/death/_2.png',
        './img/darkSamurai/death/_3.png',
        './img/darkSamurai/death/_4.png',
        './img/darkSamurai/death/_5.png',
        './img/darkSamurai/death/_6.png',
        './img/darkSamurai/death/_7.png',
        './img/darkSamurai/death/_8.png',
        './img/darkSamurai/death/_9.png',
        './img/darkSamurai/death/_10.png',  
        './img/darkSamurai/death/_11.png',  
        './img/darkSamurai/death/_12.png',  
        './img/darkSamurai/death/_13.png',  
        './img/darkSamurai/death/_14.png'
    ];
    IMAGE_HURT = [
        './img/darkSamurai/hit/_1.png',
        './img/darkSamurai/hit/_2.png'   
    ];
    IMAGE_ATTACK = [
        './img/darkSamurai/attack1/_1.png',
        './img/darkSamurai/attack1/_2.png',
        './img/darkSamurai/attack1/_3.png',
        './img/darkSamurai/attack1/_4.png'    
    ];
    IMAGE_WALK = [
        './img/darkSamurai/run/_1.png',
        './img/darkSamurai/run/_2.png',
        './img/darkSamurai/run/_3.png',
        './img/darkSamurai/run/_4.png',
        './img/darkSamurai/run/_5.png',
        './img/darkSamurai/run/_6.png',
        './img/darkSamurai/run/_7.png',
        './img/darkSamurai/run/_8.png'
    ];
    IMAGE_JUMP = [
        './img/darkSamurai/jump/_1.png',
        './img/darkSamurai/jump/_2.png',
        './img/darkSamurai/jump/_3.png',
        './img/darkSamurai/jump/_4.png',
        './img/darkSamurai/jump/_5.png',
        './img/darkSamurai/jump/_6.png',
        './img/darkSamurai/jump/_7.png',
        './img/darkSamurai/jump/_8.png'
    ];

    /**
     * Constructor for DarkSamurai
     */
    constructor() {
        super().loadImage(this.IMAGE_IDLE[0]);
        this.loadImages(this.IMAGE_IDLE);
        this.loadImages(this.IMAGE_DEAD);
        this.loadImages(this.IMAGE_HURT);
        this.loadImages(this.IMAGE_ATTACK);
        this.loadImages(this.IMAGE_WALK);
        this.loadImages(this.IMAGE_JUMP)
        this.posX = 550 + Math.random() * 2600;
        this.speed = 4 + Math.random() * 7;
        this.startAttackInterval();
        this.applyGravity();
        this.animate();
    }
    
    /**
     * animate the dark samurai
     */
    animate() {
        setInterval(() => {
            if (this.isDeath()) {
                this.playAnimation(this.IMAGE_DEAD, false);
            } else if (!this.isDying) {
                if (this.isHurt()) this.playAnimation(this.IMAGE_HURT, false);
                else if (this.isAttacking) this.attackAnimation();
                else this.moveAnimation();
            }
        }, 1000/5);
    }

    /**
     * move the dark samurai
     */
    moveAnimation() {
        this.offset = {
            top: 15,
            left: 15,
            rigth: 15,
            bottom: 15
        }
        this.moveLeft();
        this.playAnimation(this.IMAGE_WALK);
    }

    /**
     * attack the dark samurai
     */
    attackAnimation() {
        this.offset = {
            top: 15,
            left: 5,
            rigth: 5,
            bottom: 15
        }
        this.playAnimation(this.IMAGE_ATTACK);
    }
}