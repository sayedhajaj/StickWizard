function Camera(){
    this.position = new Vector2D(0, 0);
    this.velocity = new Vector2D(0, 0);

    this.update = function(){
        this.position = this.position.AddVector(this.velocity);
    };

    this.reset = function(){
        this.position = new Vector2D(0, 0);
        this.velocity = new Vector2D(0, 0);
    };

}
