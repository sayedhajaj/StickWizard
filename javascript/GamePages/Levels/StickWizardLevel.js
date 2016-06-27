function StickWizardLevel(){
    Level.call(this);
    this.walls = [];
    this.enemies = [];
    this.levelString = ``;
    this.blocksize = 40;
    this.playerBoundPos = new Vector(220, 140);
    this.playerBoundSize = new Vector(120, 110);
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
    camera.position = this.playerBoundPos.SubtractVector(this.player.position);
};


StickWizardLevel.prototype.update = function(delta){
    this.player.update(delta);
    this.player.onGround = false;
    for (var wall of this.walls) {
        if(wall.collide(this.player)) {
            wall.handleCollision(this.player);
            if(wall.onGround(this.player)) wall.putOnGround(this.player);
        }
    }

    screenPos = this.player.position.AddVector(camera.position);

    if(screenPos.a < this.playerBoundPos.a) camera.velocity.a = Math.abs(this.player.velocity.a);
    else if(screenPos.a > this.playerBoundPos.a+this.playerBoundSize.a) camera.velocity.a = -Math.abs(this.player.velocity.a);
    else camera.velocity.a = 0;

    if(screenPos.b<this.playerBoundPos.b) camera.velocity.b = Math.abs(this.player.velocity.b);
    else if(screenPos.b>=this.playerBoundPos.b+this.playerBoundSize.b) camera.velocity.b = -Math.abs(this.player.velocity.b);
    else camera.velocity.b = 0;
    camera.update();

};


StickWizardLevel.prototype.draw = function(){
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = ctx.strokeStyle = "blue";
    ctx.save();
    //ctx.strokeRect(this.playerBoundPos.a, this.playerBoundPos.b, this.playerBoundSize.a, this.playerBoundSize.b);
    ctx.translate(camera.position.a, camera.position.b);
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
    //this.player.handleMouseDown(x, y);
};
StickWizardLevel.prototype.handleTouchDown = function(x, y){StickWizardLevel.prototype.handleMouseDown(x, y);};
StickWizardLevel.prototype.handleTouchClick = function(x, y){StickWizardLevel.prototype.handleMouseDown(x, y);};
