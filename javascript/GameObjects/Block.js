function Block(position, dimensions){
    GameObject.call(this, position, dimensions);

    this.collide = function(position, dimensions){
        return false;
    };
    this.image = images["wall"];

}

Block.prototype = new GameObject();

Block.prototype.draw = function(){
    ctx.drawImage(this.image, this.position.a, this.position.b, this.dimensions.a, this.dimensions.b);
};
