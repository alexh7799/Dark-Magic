class Potions extends MovableObject {
    posX;
    posY;
    height = 35;
    width = 45;
    img;
    floatOffset = 2;
    floatSpeed = 0.05;
    currentTime = 0;

    /**
     * constructor for the potions
     * @param {*} x 
     */
    constructor(x) {
        super().loadImage('./img/mp-potion/Icon5.png');
        this.posX = x;
        this.posY = 400;
        this.animate();
    }

    /**
     * animate the potion
     */
    animate() {
        setInterval(() => {
            this.currentTime += this.floatSpeed;
            this.posY = 400 + Math.sin(this.currentTime) * this.floatOffset;
        }, 1000/60);
    }
}