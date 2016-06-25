function OnGroundState(){
    PlayerState.call(this);
};

OnGroundState.prototype = new PlayerState();

OnGroundState.prototype.handleKeyInput = function(player, evt, keyup){
    if(keyup){
        if(keystate[up]) return new JumpingState();
    }
    return null;
};
