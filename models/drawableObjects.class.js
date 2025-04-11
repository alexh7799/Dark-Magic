class DrawableObject {
    posX;
    posY;
    height;
    width;
    img;
    currentImage = 0;
    imageCache = {};

    /**
     * Constructor for DrawableObject
     */
    constructor() {}

    /**
     * draw a frame around the object
     * @param {*} ctx 
     */
    drawFrame(ctx) {
        if(this instanceof Character || this instanceof FrostCurse || this instanceof DarkSamurai ||  this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.posX, this.posY, this.width, this.height);
            ctx.stroke();
        }
    }

    /**
     * draw the object
     * @param {*} ctx 
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.posX, this.posY, this.width, this.height);
    }

    /**
     * load an image
     * @param {String} path 
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * load multiple images
     * @param {*} arr 
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image()
            img.src = path;
            this.imageCache[path] = img;           
        });
    }

    /**
     * clear all intervals
     */
    clearAllIntervals() {
        for (let i = 1; i < 9999; i++) window.clearInterval(i);
    }
}