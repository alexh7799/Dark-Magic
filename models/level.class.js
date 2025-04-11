class Level {
    backgroundObjects;
    enemies;
    tree;
    level_end_x = 2700;

    /**
     * Constructor for Level
     * @param {*} backgroundObjects 
     * @param {*} enemies 
     * @param {*} tree 
     */
    constructor(backgroundObjects, enemies, tree) {
        this.backgroundObjects = backgroundObjects;
        this.enemies = enemies;
        this.tree = tree;
    }
}