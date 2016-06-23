function GameObject(position, dimensions){
    this.position = position;
    this.dimensions = dimensions;
    this.velocity = new Vector(0, 0);
};

GameObject.prototype.update = function(timePassed){
    this.position = this.position.AddVector(this.velocity);
};
