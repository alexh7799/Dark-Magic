class Coin extends MovableObject {
    posX;
    posY;
    height = 40;
    width = 40;
    img;
    IMAGE_COIN = [
        './img/coin/coin_1.png',
        './img/coin/coin_2.png',
        './img/coin/coin_3.png',
        './img/coin/coin_4.png',
        './img/coin/coin_5.png',
        './img/coin/coin_6.png'
    ];

    /**
     * Constructor for Coin
     * @param {number} x 
     * @param {number} y 
     */
    constructor(x,y) {
        super().loadImage(this.IMAGE_COIN[0]);
        this.loadImages(this.IMAGE_COIN);
        this.posX = x;
        this.posY = y;
        this.animate();
    }

    /**
     * animate the coin
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGE_COIN)
        }, 1000 / 5)
    }
}