function Level(x, y, imgNum){
    GamePage.call(this);
    this.score = 0;
}
Level.prototype = new GamePage();
