class Sun extends DrawableObject{
    posX = -80;
    posY = 0;
    width = 820;
    height= 480;

    /**
     * Create a sun object
     */
    constructor() {
        super().loadImage('./img/background/Layers/2.png');
    }
}