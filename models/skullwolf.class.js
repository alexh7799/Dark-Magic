class Skullwolf extends MovableObject {
    height = 60;
    width = 65;
    posX = 600;
    posY = 380;
    speed = 0.5;
    world;
    isAttacking = false;
    currentAttackFrame = 0;
    isDying = false;
    deathAnimationComplete = false;
    opacity = 1;
    currentDeathFrame = 0;
    offset = {
        top: 50,
        left: 0,
        rigth: 0,
        bottom: 0
    }
    IMAGE_IDLE = [
        './img/skullwolf/idle/1.png',
        './img/skullwolf/idle/2.png',
        './img/skullwolf/idle/3.png',
        './img/skullwolf/idle/4.png',
        './img/skullwolf/idle/5.png',
        './img/skullwolf/idle/6.png'        
    ];
    IMAGE_DEAD = [
        './img/skullwolf/death/1.png',
        './img/skullwolf/death/2.png',
        './img/skullwolf/death/3.png',
        './img/skullwolf/death/4.png',
        './img/skullwolf/death/5.png',
        './img/skullwolf/death/6.png',
        './img/skullwolf/death/7.png'
    ];
    IMAGE_HURT = [
        './img/skullwolf/hit/1.png',
        './img/skullwolf/hit/2.png',
        './img/skullwolf/hit/3.png',
        './img/skullwolf/hit/4.png'
    ];
    IMAGE_ATTACK = [
        './img/skullwolf/attack/1.png',
        './img/skullwolf/attack/2.png',
        './img/skullwolf/attack/3.png',
        './img/skullwolf/attack/4.png'
    ];


    constructor() {
        super().loadImage('./img/skullwolf/idle/1.png');
        this.loadImages(this.IMAGE_IDLE);
        this.loadImages(this.IMAGE_DEAD);
        this.loadImages(this.IMAGE_HURT);
        this.loadImages(this.IMAGE_ATTACK);
        this.animate();
        this.startAttackInterval();
    }

    startAttackInterval() {
        setInterval(() => {
            this.isAttacking = true;
            setTimeout(() => {
                this.isAttacking = false;
            }, 1000);
        }, 5000);
    }
    
    animate() {
        setInterval(() => {
            if (this.isDeath()) {
                this.playAnimation(this.IMAGE_DEAD, false);
                this.deathAnimationComplete = true;
            } else if (!this.isDying) {
                if (this.isHurt()) {
                    this.playAnimation(this.IMAGE_HURT);
                } else if (this.isAttacking) {
                    this.playAnimation(this.IMAGE_ATTACK, false);
                } else {
                    this.playAnimation(this.IMAGE_IDLE);
                }
            }
        }, 1000/5);
        
    }
}