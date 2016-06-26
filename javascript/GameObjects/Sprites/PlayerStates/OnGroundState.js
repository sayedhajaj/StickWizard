function OnGroundState(){
    PlayerState.call(this);
};

OnGroundState.prototype = new PlayerState();

OnGroundState.prototype.update = function(player, timePassed){
    if(!player.onGround) return new FallingState();
}

OnGroundState.prototype.handleKeyInput = function(player, evt, keyup){
    if(keyup){
        if(keystate[up]) return new JumpingState();
    }
    return null;
};
