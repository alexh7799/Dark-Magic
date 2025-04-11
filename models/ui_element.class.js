class UiElement extends DrawableObject{
    posX = 5;
    posY = 5;
    height = 10;
    width = 100;
    count = 0;
    percentage = 150;

    /**
     * constructor for the UiElement
     * @param {string} image 
     * @param {number} height 
     * @param {number} width 
     * @param {number} offsetX 
     * @param {number} offsetY 
     */
    constructor(image, height, width, offsetX, offsetY) {
        super().loadImage(image);
        this.posX = 5 + offsetX;
        this.posY = 5 + offsetY;
        this.height = height;
        this.width = width;
        this.maxWidth = width;
    }

    /**
     * set the percentage of the progress bar
     * @param {number} currentHP 
     * @param {number} maxHP 
     * @returns 
     */
    setPercentage(currentHP, maxHP = 150) {
        this.percentage = Math.round((currentHP / maxHP) * 100);
        this.width = this.maxWidth * (this.percentage / 100);
        return this.percentage;
    }

    /**
     * update the progress bar
     * @param {number} currentValue 
     * @param {number} maxValue 
     */
    updateProgressBar(currentValue, maxValue) {
        this.setPercentage(currentValue, maxValue);
    }

    /**
     * draw the number for coin and potion
     * @param {*} ctx 
     * @param {number} number 
     * @param {number} x 
     * @param {number} y 
     */
    drawNumber(ctx, number, x = this.posX + 23, y = this.posY + 14) {
        ctx.font = '14.4px Arial';
        ctx.fillStyle = 'white';
        ctx.fillText(number, x, y);
    }

    /**
     * update the count
     */
    updateCount() {
        this.count++;
    }

    /**
     * decrease the count
     * @returns {boolean}
     */
    decreaseCount() {
        if (this.count > 0) {
            this.count--;
            return true;
        }
        return false;
    }
}