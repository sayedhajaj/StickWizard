function FallingState(){
    PlayerState.call(this);
    this.fallTime = 0;
    this.fallFrame = 0;
};

FallingState.prototype = new PlayerState();

FallingState.prototype.enter = function(player){
    player.setAnimation("fall");
    player.velocity = new Vector(0, 0);
};

FallingState.prototype.update = function(player, timePassed){
    this.fallTime += timePassed;
    this.fallFrame++;
    if(player.velocity.b < 7) player.velocity.b += Math.floor(4*Math.cos(this.fallFrame/60));
    if(player.onGround) return new IdleState();
};
