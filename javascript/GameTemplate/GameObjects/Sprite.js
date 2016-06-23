function Sprite(position, dimensions){
    GameObject.call(this, position, dimensions);
    this.states = [];
    this.animations = [];
    this.currentAnimation = "";
}

Sprite.prototype = new GameObject();

Sprite.prototype.update = function(timePassed){
    //this.states[0].update(this, timePassed);
    this.animations[this.currentAnimation].update(timePassed);
};

Sprite.prototype.setAnimation = function(animation){
    this.currentAnimation = animation;
    this.animations[this.currentAnimation].init();
};

Sprite.prototype.draw = function(){
    ctx.putImageData(this.animations[this.currentAnimation].getImage(), this.position.a, this.position.b);
};
