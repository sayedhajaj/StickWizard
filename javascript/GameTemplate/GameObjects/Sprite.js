function Sprite(position, dimensions){
    GameObject.call(this, position, dimensions);
    this.states = [];
    this.animations = [];
    this.currentAnimation = "";
    this.facingRight = true;
}

Sprite.prototype = new GameObject();

Sprite.prototype.update = function(timePassed){
    GameObject.prototype.update.call(this, timePassed);
    var newState = this.states[0].update(this);
    if(newState) {
        states.unshift(newState);
        states[0].enter(this);
    }
    this.animations[this.currentAnimation].update(timePassed);
    if(this.velocity.a<0) this.facingRight = false;
    if(this.velocity.a>0) this.facingRight = true;

};

Sprite.prototype.setAnimation = function(animation){
    if(this.currentAnimation == animation) return;
    this.currentAnimation = animation;
    this.animations[this.currentAnimation].init();
};

Sprite.prototype.draw = function(){
    ctx.scale(-1, 1);
    var imageToDraw = this.animations[this.currentAnimation].getImage().resizeImageData(new Vector(
        this.dimensions.a*widthScale, this.dimensions.b*heightScale));
    if(!this.facingRight) imageToDraw = imageToDraw.flipImageDataHorizontally();
    ctx.putImageData(imageToDraw, this.position.a*widthScale, this.position.b*heightScale);
};
