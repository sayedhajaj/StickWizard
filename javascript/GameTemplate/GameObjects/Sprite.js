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
    var newState = this.states[0].update(this, timePassed);
    if(newState) {
        this.states.unshift(newState);
        this.states[0].enter(this);
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
    var tempCanv = document.createElement('canvas');
    var tempCtx = tempCanv.getContext("2d");
    var imageToDraw = this.animations[this.currentAnimation].getImage();
    if(!this.facingRight) imageToDraw = imageToDraw.flipImageDataHorizontally();
    tempCtx.putImageData(imageToDraw, 0, 0);
    ctx.drawImage(tempCanv, this.position.a, this.position.b);
};
