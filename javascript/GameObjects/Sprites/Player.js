function Player(position, dimensions){
    Sprite.call(this, position, dimensions);
    this.onGround = false;
    this.animations = (function(){
        var animList = [];
        var animStates = ["idle", "walk", "jump", "fall"];
        var anim;
        for(var y = 20; y <= images["player sprite sheet"].height-80; y += 100){
        	anim = new Animation(150);
        	for(var x = 0; x <= images["player sprite sheet"].width-50; x += 50){
                var frame = images["player sprite sheet"].getSubImage(x, y, 40, 80).makeTransparent(255, 0, 255);
                frame = frame.resizeImageData(dimensions)
        		anim.addFrame(frame);
        	}
        	animList[animStates[(y-20)/100]] = anim;
        }
        animList["fall"] = animList["jump"].getReversedAnimation();
        return animList;
    })();
    this.currentAnimation = "idle";
    this.states.unshift(new IdleState());
    this.fallHeight = 0;
    this.states[0].enter(this);
}

Player.prototype = new Sprite();

Player.prototype.handleKeyInput = function(keyup){
    var newState = this.states[0].handleKeyInput(this, keyup);
    if(newState) {
        this.states.unshift(newState);
        this.states[0].enter(this);
    }
};

Player.prototype.update = function(timePassed, blocks) {
    Sprite.prototype.update.call(this, timePassed, blocks);
    /*if(this.velocity.Length()!=0) {
        var origin = new Vector2D(0, 0);
        origin = this.position.AddVector(this.dimensions.Multiply(0.5));
        this.transform = Matrix3D.translation(origin.Multiply(-1));
        this.transform = Matrix3D.Multiply(Matrix3D.rotation(180), this.transform);
        this.transform = Matrix3D.Multiply(Matrix3D.translation(origin.Multiply(1)), this.transform);
    }*/


};
