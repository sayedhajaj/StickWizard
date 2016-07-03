function Platform(x, y, width, height){
    Block.call(this, x, y, width, height);

    this.collide = function(player){
        return this.onGround(player);
    };

    this.handleCollision = function(player){
        this.putOnGround(player);
    };
}

Platform.prototype = new Block();
