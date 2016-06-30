function WalkingState(right){
    OnGroundState.call(this);
    this.right = right;
};

WalkingState.prototype = new OnGroundState();

WalkingState.prototype.enter = function(player){
    player.velocity.b = 0;
    if(this.right) player.velocity.a = 5;
    else player.velocity.a = -5;
    player.setAnimation("walk");
};

WalkingState.prototype.handleKeyInput = function(player, keyup){
    if(keyup){

    } else {
        if(keystate[right] || keystate[left]) return new IdleState();
    }
    return OnGroundState.prototype.handleKeyInput(player, keyup);
};
