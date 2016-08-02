function Block(position, dimensions){
    GameObject.call(this, position, dimensions);

    this.collide = function(player){
        var position = player.position;
        var dimensions = player.dimensions;
        function interSects(p1, p2, d1, d2){
            return (p1+d1 <= p2+d2 && p1+d1 >= p2 || p2+d2 < p1+d1 && p2+d2 > p1);
        }
        return interSects(position.x, this.position.x, dimensions.x, this.dimensions.x) &&
        interSects(position.y, this.position.y, dimensions.y, this.dimensions.y);
    };

    this.onGround = function(gameObject){
        var bottom = gameObject.position.y+gameObject.dimensions.y;
        var xOverlap = this.getOverlap(gameObject.position.x, this.position.x, gameObject.dimensions.x, this.dimensions.x);
        var yOverlap = this.getOverlap(gameObject.position.y, this.position.y, gameObject.dimensions.y, this.dimensions.y);
        return (xOverlap < yOverlap &&
        (bottom >= this.position.y && bottom <= this.position.y+this.dimensions.y));
    };

    this.putOnGround = function(player){
        player.position.y = this.position.y-player.dimensions.y;
        player.onGround = true;
    };

    this.getOverlap = function(p1, p2, d1, d2){
        if(p1<p2) return p2-p1+d1;
        if(p1>p2) return p1-p2+d2;
        return 0;
    };

    this.handleCollision = function(gameObject){
        var xOverlap = this.getOverlap(gameObject.position.x, this.position.x, gameObject.dimensions.x, this.dimensions.x);
        var yOverlap = this.getOverlap(gameObject.position.y, this.position.y, gameObject.dimensions.y, this.dimensions.y);
        if(xOverlap > yOverlap){
            if(gameObject.position.x<this.position.x) gameObject.position.x = this.position.x-gameObject.dimensions.x;
            else if(gameObject.position.x>this.position.x) gameObject.position.x = this.position.x+this.dimensions.x;
        } else {
            if(gameObject.position.y<this.position.y) gameObject.position.y = this.position.y-gameObject.dimensions.y;
            else if(gameObject.position.y>this.position.y) gameObject.position.y = this.position.y+this.dimensions.y;
        }

    };

    this.image = images["wall"];

}

Block.prototype = new GameObject();

Block.prototype.draw = function(){
    //ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.drawImage(this.image, this.position.x, this.position.y, this.dimensions.x, this.dimensions.y);
};
