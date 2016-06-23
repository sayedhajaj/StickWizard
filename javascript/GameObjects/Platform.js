function Platform(x, y, width, height){
    Block.call(this, x, y, width, height);

    this.collide = function(position, dimensions, velocity){
        return false;
    };
}

Platform.prototype = new Block();
