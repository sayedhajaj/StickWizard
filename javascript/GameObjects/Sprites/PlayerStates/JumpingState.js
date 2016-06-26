function JumpingState(){
    PlayerState.call(this);
    this.jumpTime = 0;
    this.jumpFrame = 0;
};

JumpingState.prototype = new PlayerState();

JumpingState.prototype.enter = function(player){
    player.setAnimation("jump");
};

JumpingState.prototype.update = function(player, timePassed){
    this.jumpTime += timePassed;
    this.jumpFrame++;
    if(this.jumpTime >= 400) return new FallingState();
    if(player.velocity.b > -4) player.velocity.b -= Math.floor(2*Math.cos(this.jumpFrame/60));
};
