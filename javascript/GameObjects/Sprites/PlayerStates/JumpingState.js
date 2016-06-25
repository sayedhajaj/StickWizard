function JumpingState(){
    PlayerState.call(this);
};

JumpingState.prototype = new PlayerState();

JumpingState.prototype.handleKeyInput = function(player, evt, keyup){
    if(keyup){
        //if(keystate[right] || keystate[left]) return new WalkingState(keystate[right]);
    }
    return null;
};
