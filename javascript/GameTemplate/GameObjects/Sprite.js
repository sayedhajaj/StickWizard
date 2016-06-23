function Sprite(position, dimensions){
    GameObject.call(this, position, dimensions);
    this.states = [];
    this.animations = [];
    this.currentAnimation = "";
}

Sprite.prototype = new GameObject();

Sprite.prototype.update = function(timePassed){
    GameObject.prototype.update.call(this, timePassed);
    var newState = this.states[0].update(this);
    if(newState) states.unshift(newState);
    this.animations[this.currentAnimation].update(timePassed);
};

Sprite.prototype.setAnimation = function(animation){
    if(this.currentAnimation == animation) return;
    this.currentAnimation = animation;
    this.animations[this.currentAnimation].init();
};

Sprite.prototype.draw = function(){
    ctx.putImageData(
        this.animations[this.currentAnimation].getImage().resizeImageData(new Vector(
            this.dimensions.a*widthScale, this.dimensions.b*heightScale)), 
        this.position.a*widthScale, this.position.b*heightScale);
};
