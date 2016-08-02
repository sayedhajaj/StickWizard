function JumpingState(){
    PlayerState.call(this);
    this.jumpTime = 0;
    this.jumpFrame = 0;
};

JumpingState.prototype = new PlayerState();

JumpingState.prototype.enter = function(player){
    player.setAnimation("jump");
};

JumpingState.prototype.update = function(player, timePassed, args){
    this.jumpTime += timePassed;
    this.jumpFrame++;
    if(this.jumpTime >= 400) return new FallingState();
    //else console.log(this.jumpTime);
    if(player.velocity.y > -4) player.velocity.y -= Math.floor(2*Math.cos(this.jumpFrame/60));
    PlayerState.prototype.update(player, timePassed, args);
};
