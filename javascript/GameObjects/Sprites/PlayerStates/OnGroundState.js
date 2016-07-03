function OnGroundState(){
    PlayerState.call(this);
};

OnGroundState.prototype = new PlayerState();

OnGroundState.prototype.update = function(player, timePassed, args){
    if(!player.onGround) return new FallingState();
    PlayerState.prototype.update(player, timePassed, args);
};

OnGroundState.prototype.handleKeyInput = function(player, keyup){
    if(keyup){
        if(keystate[up]) return new JumpingState();
    }
    return null;
};
