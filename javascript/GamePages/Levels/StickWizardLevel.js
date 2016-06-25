function StickWizardLevel(){
    Level.call(this);
    this.walls = [];
    this.enemies = [];
    this.levelString = ``;
    this.blocksize = 40;
    this.parseLevel = function(){
        var level = this.levelString.split("\n");
        for(var y = 0; y < level.length; y++){
            for(var x = 0; x < level[y].length; x++){
                if(level[y][x].toUpperCase() === "W")
                    this.walls.push(new Block(new Vector(x*this.blocksize, y*this.blocksize), new Vector(this.blocksize, this.blocksize)));
                if(level[y][x].toUpperCase() === "F")
                    this.walls.push(new Platform(new Vector(x*this.blocksize, y*this.blocksize), new Vector(this.blocksize, this.blocksize)));
                //if(level[y][x].toUpperCase() === "E")
                    //this.enemies.push(new (x*this.blocksize, y*this.blocksize, this.blocksize, this.blocksize));
                if(level[y][x].toUpperCase() === "P")
                    this.player = new Player(new Vector(x*this.blocksize, y*this.blocksize), new Vector(this.blocksize, this.blocksize));

            }
        }
    };
}

StickWizardLevel.prototype = new Level();

StickWizardLevel.prototype.init = function(){
    camera.reset();
    this.walls = [];
    this.enemies = [];
    this.parseLevel();


};


StickWizardLevel.prototype.update = function(delta){
    this.player.update(delta);
    this.player.onGround = false;
    for (var wall of this.walls) {
        if(wall.collide(this.player)) wall.handleCollision(this.player);
        if(wall.onGround(this.player)) wall.putOnGround(this.player);
    }

};


StickWizardLevel.prototype.draw = function(){
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "blue";
    ctx.save();
    /*for(var x = 0; x < 640; x++)
        ctx.fillRect(x, (200)+100*Math.cos(x/20), 5, 10);*/
    for (var wall of this.walls) {
        wall.draw();
    }
    this.player.draw();
    ctx.restore();
};


StickWizardLevel.prototype.handleKeyInput = function(evt, keyup){
	if(keyup){
		if (keystate[f]) {
            requestFullScreen();
		}
    }
    this.player.handleKeyInput(evt, keyup);
}

StickWizardLevel.prototype.handleMouseDown = function(x, y){
    this.player.handleMouseDown(x, y);
};
StickWizardLevel.prototype.handleTouchDown = function(x, y){StickWizardLevel.prototype.handleMouseDown(x, y);};
StickWizardLevel.prototype.handleTouchClick = function(x, y){StickWizardLevel.prototype.handleMouseDown(x, y);};
