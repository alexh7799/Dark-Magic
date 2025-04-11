class Tree extends MovableObject {
    width = 400;
    height= 480;
    
    /**
     * constructor for the tree
     * @param {string} imgPath 
     * @param {number} posX 
     * @param {number} posY 
     */
    constructor(imgPath, posX, posY) {
        super().loadImage(imgPath);
        this.posX = posX;
        this.posY = posY;
    }
}