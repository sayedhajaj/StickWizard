function Block(position, dimensions){
    GameObject.call(this, position, dimensions);

    this.collide = function(player){
        var position = player.position;
        var dimensions = player.dimensions;
        function interSects(p1, p2, d1, d2){
            return (p1+d1 <= p2+d2 && p1+d1 >= p2 || p2+d2 <= p1+d1 && p2+d2 >= p1);
        }
        return interSects(position.a, this.position.a, dimensions.a, this.dimensions.a) &&
        interSects(position.b, this.position.b, dimensions.b, this.dimensions.b);
    };

    this.onGround = function(player){
        var bottom = player.position.b+player.dimensions.b;
        return (this.collide(player) && (bottom >= this.position.b && bottom <= this.position.b+this.dimensions.b));
    };

    this.putOnGround = function(player){
        player.position.b = this.position.b-player.dimensions.b;
        player.onGround = true;
    };

    this.handleCollision = function(gameObject){
        function getOverlap(p1, p2, d1, d2){
            if(p1<p2) return p2-p1+d1;
            if(p1>p2) return p1-p2+d2;
            return 0;
        }
        var xOverlap = getOverlap(gameObject.position.a, this.position.a, gameObject.dimensions.a, this.dimensions.a);
        var yOverlap = getOverlap(gameObject.position.b, this.position.b, gameObject.dimensions.b, this.dimensions.b);
        if(xOverlap > yOverlap){
            if(gameObject.position.a<this.position.a) gameObject.position.a = this.position.a-gameObject.dimensions.a;
            else if(gameObject.position.a>this.position.a) gameObject.position.a = this.position.a+this.dimensions.a;
        } else {
            if(gameObject.position.b<=this.position.b) gameObject.position.b = this.position.b-gameObject.dimensions.b;
            else if(gameObject.position.b>this.position.b) gameObject.position.b = this.position.b+this.dimensions.b;
            gameObject.velocity.b = 0;
        }

    };

    this.image = images["wall"];

}

Block.prototype = new GameObject();

Block.prototype.draw = function(){
    ctx.drawImage(this.image, this.position.a, this.position.b, this.dimensions.a, this.dimensions.b);
};
