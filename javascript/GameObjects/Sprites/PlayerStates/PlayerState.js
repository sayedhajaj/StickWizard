function PlayerState(){

}

PlayerState.prototype.enter = function(player){

};

PlayerState.prototype.update = function(player, timePassed, args){
    blocks = args[0];
    player.onGround = false;
    for (var wall of blocks) {
        if(wall.collide(player)) {
            wall.handleCollision(player);
            if(wall.onGround(player)) wall.putOnGround(player);
        }
    }
}

PlayerState.prototype.handleKeyInput = function(player, keyup){
    if(keyup){
        if(keystate[right]) player.velocity.x = 5;
        if(keystate[left]) player.velocity.x = -5;
    } else {
        if(keystate[right] || keystate[left]) player.velocity.x = 0;
    }
    return null;
};
