class BackgroundObject extends DrawableObject {
    width = 720;
    height= 480;
    
    /**
     * Create a new background object
     * @param {Stimg} imgPath 
     * @param {number} posX 
     * @param {number} posY 
     */
    constructor(imgPath, posX, posY) {
        super().loadImage(imgPath);
        this.posX = posX;
        this.posY = posY;
    }
}