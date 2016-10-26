class StickWizardLevel extends Level {
    constructor(){
        super();
        this.walls = [];
        this.enemies = [];
        this.levelString = ``;
        this.blocksize = 40;
        this.playerBoundPos = new Vector2D(220, 140);
        this.playerBoundSize = new Vector2D(120, 110);
    }

    parseLevel() {
        var level = this.levelString.split("\n");
        for(var y = 0; y < level.length; y++){
            for(var x = 0; x < level[y].length; x++){
                if(level[y][x].toUpperCase() === "W")
                    this.walls.push(new Block(new Vector2D(x*this.blocksize, y*this.blocksize), new Vector2D(this.blocksize, this.blocksize)));
                if(level[y][x].toUpperCase() === "F")
                    this.walls.push(new Platform(new Vector2D(x*this.blocksize, y*this.blocksize), new Vector2D(this.blocksize, this.blocksize)));
                //if(level[y][x].toUpperCase() === "E")
                    //this.enemies.push(new (x*this.blocksize, y*this.blocksize, this.blocksize, this.blocksize));
                if(level[y][x].toUpperCase() === "P")
                    this.player = new Player(new Vector2D(x*this.blocksize, y*this.blocksize), new Vector2D(this.blocksize, this.blocksize));

            }
        }
    }

    init(){
        camera.reset();
        this.walls = [];
        this.enemies = [];
        this.parseLevel();
        camera.position = this.playerBoundPos.SubtractVector(this.player.position);
    }

    cameraScroll(){
        var screenPos = this.player.position.AddVector(camera.position);

        if(screenPos.x < this.playerBoundPos.x) camera.velocity.x = Math.abs(this.player.velocity.x);
        else if(screenPos.x > this.playerBoundPos.x+this.playerBoundSize.x) camera.velocity.x = -Math.abs(this.player.velocity.x);
        else camera.velocity.x = 0;

        if(screenPos.y<this.playerBoundPos.y) camera.velocity.y = Math.abs(this.player.velocity.y);
        else if(screenPos.y>=this.playerBoundPos.y+this.playerBoundSize.y) camera.velocity.y = -Math.abs(this.player.velocity.y);
        else camera.velocity.y = 0;
        camera.setTransforms();
    }

    update(delta) {
        this.player.update(delta, this.walls);
        this.cameraScroll();
        camera.update();
    }

    draw() {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = ctx.strokeStyle = "blue";
        //ctx.save();
        ctx.strokeRect(this.playerBoundPos.x, this.playerBoundPos.y, this.playerBoundSize.x, this.playerBoundSize.y);
        camera.transformContext();
        for (var wall of this.walls) {
            wall.draw();
        }
        this.player.draw();
        camera.resetContextTransform();
        //ctx.restore();
    }

    handleKeyInput(keyup) {
    	if(keyup){
    		if (keystate[f]) {
                requestFullScreen();
    		}
        }
        this.player.handleKeyInput(keyup);
    }

    handleTouchMove(x, y){
        if(mouseTraveled.y < -this.player.dimensions.y/2) keystate[up] = true;
        else delete keystate[up];
        if(mouseTraveled.x<-this.player.dimensions.x/2) keystate[left] = true;
        else if(mouseTraveled.x>this.player.dimensions.x/2) keystate[right] = true;
        else {
            this.player.handleKeyInput(false);
            delete keystate[right];
            delete keystate[left];
        }

        this.player.handleKeyInput(true);
    }

    handleTouchEnd(x, y) {
        this.player.handleKeyInput(false);
        delete keystate[right];
        delete keystate[left];
        delete keystate[up];

    }

}
