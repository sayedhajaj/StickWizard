function PlayerState(){

}

PlayerState.prototype.enter = function(){

};

PlayerState.prototype.update = function(player){
    if(player.velocity.Length()==0) player.setAnimation("idle");
    if(player.velocity.Length()!=0 && player.velocity.b==0) player.setAnimation("walk");
}

PlayerState.prototype.handleKeyInput = function(player, evt, keyup){
    if(keyup){
        if(keystate[right]) player.velocity.a = 5;
    } else {
        if(keystate[right]) player.velocity.a = 0;
    }
};
