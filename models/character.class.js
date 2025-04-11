class Character extends MovableObject {
    maxMp = 150;
    mp = 150;
    height = 130;
    width = 100;
    posX = 50;
    posY = 310;
    ground = 310;
    world;
    speed = 7;
    hp = 150;
    mpCost = 15;
    ballCooldown = 800; 
    lastShot = 0;
    lastPotionTime = 0;
    potionCooldown = 1000;  
    offset = {
        top: 70,
        left: 35,
        rigth: 35,
        bottom: 0
    }
    IMAGE_IDLE = [
        './img/heros/hero_1/idle/1.png',
        './img/heros/hero_1/idle/2.png',
        './img/heros/hero_1/idle/3.png',
        './img/heros/hero_1/idle/4.png',
        './img/heros/hero_1/idle/5.png',
        './img/heros/hero_1/idle/6.png',
        './img/heros/hero_1/idle/7.png',
        './img/heros/hero_1/idle/8.png'
    ];
    IMAGE_WALKING = [
        './img/heros/hero_1/walk/1.png',
        './img/heros/hero_1/walk/2.png',
        './img/heros/hero_1/walk/3.png',
        './img/heros/hero_1/walk/4.png',
        './img/heros/hero_1/walk/5.png',
        './img/heros/hero_1/walk/6.png',
        './img/heros/hero_1/walk/7.png'
    ];
    IMAGE_JUMPING = [
        './img/heros/hero_1/jump/1.png',
        './img/heros/hero_1/jump/2.png',
        './img/heros/hero_1/jump/3.png',
        './img/heros/hero_1/jump/4.png',
        './img/heros/hero_1/jump/5.png',
        './img/heros/hero_1/jump/6.png',
        './img/heros/hero_1/jump/7.png',
        './img/heros/hero_1/jump/8.png'
    ];
    IMAGE_DEAD = [
        './img/heros/hero_1/dead/1.png',
        './img/heros/hero_1/dead/2.png',
        './img/heros/hero_1/dead/3.png',
        './img/heros/hero_1/dead/4.png'
    ];
    IMAGE_HURT = [
        './img/heros/hero_1/hurt/1.png',
        './img/heros/hero_1/hurt/2.png',
        './img/heros/hero_1/hurt/3.png',
        './img/heros/hero_1/hurt/4.png'
    ];
    IMAGE_ATTACK = [
        './img/heros/hero_1/attack/1.png',
        './img/heros/hero_1/attack/2.png',
        './img/heros/hero_1/attack/3.png',
        './img/heros/hero_1/attack/4.png',
        './img/heros/hero_1/attack/5.png',
        './img/heros/hero_1/attack/6.png',
        './img/heros/hero_1/attack/7.png',
        './img/heros/hero_1/attack/8.png',
        './img/heros/hero_1/attack/9.png',
        './img/heros/hero_1/attack/10.png',
        './img/heros/hero_1/attack/11.png',
        './img/heros/hero_1/attack/12.png',
        './img/heros/hero_1/attack/13.png',
        './img/heros/hero_1/attack/14.png',
        './img/heros/hero_1/attack/15.png',
        './img/heros/hero_1/attack/16.png',
    ];

    /**
     * constructor of the character
     */
    constructor() {
        super().loadImage('./img/heros/hero_1/idle/1.png');
        this.loadImages(this.IMAGE_IDLE);
        this.loadImages(this.IMAGE_WALKING);
        this.loadImages(this.IMAGE_JUMPING);
        this.loadImages(this.IMAGE_HURT);
        this.loadImages(this.IMAGE_DEAD);
        this.loadImages(this.IMAGE_ATTACK)
        this.applyGravity();
        this.animate();
    }

    /**
     * animate the character
     */
    animate() {
        setInterval(() => {
            this.actionsCharacter();
            this.world.camera_x = -this.posX + 50;
        }, 1000 / 12)
        setInterval(() => {
            this.animationsCharacter();
        }, 1000/7)   
    }

    /**
     * actions for character
     */
    actionsCharacter() {
        if (this.world.keyboard.RIGHT && this.posX < this.world.level.level_end_x) {
            this.playWalkingSound();
            this.moveRight()
        } else if (this.world.keyboard.LEFT && this.posX > 0) {
            this.playWalkingSound();
            this.moveLeft()
        } else this.world.SOUND_WALKING.pause();
        if (this.world.keyboard.SPACE && !this.isAboveGround()) this.jump();
        if(this.world.keyboard.E && !this.isHurt() && this.world.ui[8].decreaseCount() && this.usePotion()) {                
            this.regenerateMp();
            this.playHealMpSound();
        }
    }

    /**
     * animations for Character
     */
    animationsCharacter() {
        if (this.isDeath()) {
            this.deathAnimation()
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGE_HURT)
            this.playHitSound();
        } else if (this.isAboveGround()) {
            this.playAnimation(this.IMAGE_JUMPING)
        } else if(this.world.keyboard.D && !this.isHurt() && this.mp >= this.mpCost && this.canShoot()) {
            this.playSpellSound();
            this.playAnimation(this.IMAGE_ATTACK, false)
            this.shootMagicball();
        }else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) this.playAnimation(this.IMAGE_WALKING)
        else this.playAnimation(this.IMAGE_IDLE)
    }

    /**
     * animate the death of the Character
     */
    deathAnimation() {
        this.playAnimation(this.IMAGE_DEAD, false)
        this.speed = 0;
        setTimeout(() => {
            this.clearAllIntervals();
            this.showEndScreen(false);
            this.playLoseSound();
        }, 1000);
    }

    /**
     * shoot magicball
     */
    shootMagicball() {
        let ball = new Magicball(
            this.posX + this.width - 70,
            this.posY + 55,
            this.otherDirection
        );
        this.mp -= this.mpCost;
        this.world.magicballs.push(ball);
        this.world.ui[4].updateProgressBar(this.mp);
    }

    /**
     * check the Potions cooldown
     * @returns {boolean} true if the character can use a potion
     */
    usePotion() {
        const currentTime = new Date().getTime();
        if (currentTime - this.lastPotionTime > this.potionCooldown) {
            this.lastPotionTime = currentTime;
            return true;
        }    
        return false;    
    }

    /**
     * regenerate the characters mp
     */
    regenerateMp() {
        this.mp = this.maxMp;
        this.world.ui[4].updateProgressBar(this.mp);
    }
    
    /**
     * check if the character can shoot
     * @returns {boolean} true if the character can shoot
     */
    canShoot() {
        const currentTime = new Date().getTime();
        if (currentTime - this.lastShot >= this.ballCooldown) {
            this.lastShot = currentTime;
            return true;
        }
        return false;
    }

    /**
     * Play walking sound
     */
    playWalkingSound() {
        if (this.world && this.world.SOUND_WALKING && !isMuted) {
            this.world.SOUND_WALKING.volume = 0.3;
            this.world.SOUND_WALKING.play();
        }
    }

    /**
     * Play Lose sound
     */
    playLoseSound() {
        if (this.world && this.world.SOUND_LOSE && !isMuted) {
            this.world.SOUND_LOSE.volume = 0.3;
            this.world.SOUND_LOSE.play();
        }
    }

    /**
     * Play heal mp sound
     */
    playHealMpSound() {
        if (this.world && this.world.SOUND_HEALMP && !isMuted) {
            this.world.SOUND_HEALMP.volume = 0.3;
            this.world.SOUND_HEALMP.play();
        }
    }

    /**
     * Play hit sound
     */
    playHitSound() {
        if (this.world && this.world.SOUND_HIT && !isMuted) {
            this.world.SOUND_HIT.volume = 0.3;
            this.world.SOUND_HIT.play();
        }
    }

    /**
     * Play spell sound
     */
    playSpellSound() {
        if (this.world && this.world.SOUND_SPELL && !isMuted) {
            this.world.SOUND_SPELL.volume = 0.3;
            this.world.SOUND_SPELL.play();
        }
    }
}