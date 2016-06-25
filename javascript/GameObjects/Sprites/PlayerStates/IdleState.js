function IdleState(){
    OnGroundState.call(this);
};

IdleState.prototype = new OnGroundState();

IdleState.prototype.enter = function(player){
    player.velocity = new Vector(0, 0);
    player.setAnimation("idle");
};

IdleState.prototype.handleKeyInput = function(player, evt, keyup){
    if(keyup){
        if(keystate[right] || keystate[left]) return new WalkingState(keystate[right]);
    }
    return OnGroundState.prototype.handleKeyInput(player, evt, keyup);
};