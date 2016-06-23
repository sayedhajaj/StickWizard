var canvas, ctx, gameTitle;
var defaultWidth, defaultHeight, keystate, up=38, down=40, left=37, right=39, p=80, f=70, space=32, enter=13;
var fullScreen;
var heightScale, widthScale;
var gpm, lm;
var isPhone;
var fps=30, camera;


function main(gameName){
    isPhone = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    gameTitle = gameName;
    canvas = document.getElementById(gameTitle);
    canvas.focus();
    ctx = canvas.getContext("2d");
    keystate = {};

    defaultWidth = canvas.width;
	defaultHeight = canvas.height;
	widthScale = 1;
	heightScale = 1;
    fullScreen = isPhone;

    gpm = new GamePageManager();
    lm = new LevelManager();
    camera = new Camera();

    keystate = {};

    window.onresize = function(){setFullScreen();};
    document.onwebkitfullscreenchange = setFullScreen();
	document.addEventListener("keydown", function(evt) {
		keystate[evt.keyCode] = true;
		gpm.handleKeyInput(evt, true);
	});
	document.addEventListener("keyup", function(evt) {
		gpm.handleKeyInput(evt, false);
		delete keystate[evt.keyCode];
	});

	canvas.addEventListener('mousedown', function(evt){
		var x = evt.offsetX;
		var y = evt.offsetY;
		gpm.handleMouseDown(x, y);
	});

	canvas.addEventListener('mouseup', function(evt){
		var x = evt.offsetX;
		var y = evt.offsetY;
		gpm.handleMouseUp(x, y);
	});
	canvas.addEventListener('click', function(evt){
		var x = evt.offsetX;
		var y = evt.offsetY;
		gpm.handleMouseClick(x, y);
	});

	canvas.addEventListener('mousemove', function(evt){
		var x = evt.offsetX;
		var y = evt.offsetY;
		gpm.handleMouseMove(x, y);
	});

	canvas.addEventListener('touchstart', function(evt){
		var touch = evt.touches[0];
		var x = touch.pageX;
		var y = touch.pageY;
		gpm.handleTouchClick(x, y);
	});

	canvas.addEventListener('touchmove', function(evt){
		var touch = evt.touches[0];
		var x = touch.pageX;
		var y = touch.pageY;
		evt.preventDefault();
		gpm.handleTouchMove(x, y);
	});

	window.addEventListener('deviceorientation', function(evt){
		gpm.handleDeviceOrientation(evt.gamma, evt.beta, evt.alpha);
	});

	canvas.ondragstart = function(e) {
	    if (e && e.preventDefault) { e.preventDefault(); }
	    if (e && e.stopPropagation) { e.stopPropagation(); }
	    return false;
	};

	canvas.onselectstart = function(e) {
	    if (e && e.preventDefault) { e.preventDefault(); }
	    if (e && e.stopPropagation) { e.stopPropagation(); }
	    return false;
	};

	document.body.ontouchstart = function(e) {
	    if (e && e.preventDefault) { e.preventDefault(); }
	    if (e && e.stopPropagation) { e.stopPropagation(); }
	    return false;
	};

	document.body.ontouchmove = function(e) {
	    if (e && e.preventDefault) { e.preventDefault(); }
	    if (e && e.stopPropagation) { e.stopPropagation(); }
	    return false;
	};
    init();
    play();
}


function create2DArray(sizes){
	var array = new Array(sizes[0]);
	for(var i=0; i < sizes[0]; i++)	array[i] = (new Array(sizes[1]));
	return array;
}

function toRadians(degrees){
	return degrees * Math.PI / 180;
}

function toDegrees(radians){
	return radians * 180 / Math.PI;
}

function setFullScreen(){
    if(fullScreen){
        if ((window.innerWidth/canvas.width)<(window.innerHeight/canvas.height)) {
            canvas.height*=window.innerWidth/canvas.width;
            canvas.width=window.innerWidth;
        } else {
            canvas.width*=window.innerHeight/canvas.height;
            canvas.height=window.innerHeight;
        }
        widthScale = canvas.width/defaultWidth;
        heightScale = canvas.height/defaultHeight;
        ctx.scale(widthScale, heightScale);
    } else {
        canvas.width=defaultWidth;
        canvas.height=defaultHeight;

        widthScale = 1;
        heightScale = 1;
    }

    this.fullScreen=!this.fullScreen;
}

function play(){
    var animFrame = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    null;
    var now = then = Date.now();
    var delta = 0;
    var gameLoop = function(){
        now = Date.now();
        delta = now - then;
        var currentPage = gpm.currentPage;
        if(currentPage) currentPage.update(delta);
        if(currentPage) currentPage.draw();
        then = now;
    }
    if (animFrame !== null) {
        var recursiveAnim = function() {
            gameLoop();
            animFrame(recursiveAnim);
        };
        animFrame(recursiveAnim);
    } else {
        setInterval(gameLoop, 1000/fps);
    }
};


function requestFullScreen(){
    if(canvas.requestFullscreen) canvas.requestFullscreen();
    else if(canvas.mozRequestFullScreen) canvas.mozRequestFullScreen();
    else if(canvas.webkitRequestFullscreen) canvas.webkitRequestFullscreen();
    else if(canvas.msRequestFullscreen) canvas.msRequestFullscreen();
}

function loadImages(onFinished, sources){
    var images = {};
    var loadedImages = 0;
    var numImages = 0;
    for (var src in sources) {
        numImages++;
    }
    for (var src in sources) {
        images[src] = new Image();
        images[src].onload = function(){
            if (++loadedImages >= numImages) {
                onFinished();
            }
        };
        images[src].src = sources[src];
    }
    return images;
}

Image.prototype.getSubImage = function(x, y, width, height){
    var imageCanvas = document.createElement('canvas');
    imageCanvas.width = this.width;
    imageCanvas.height = this.height;
    var imageCtx = imageCanvas.getContext("2d");
    imageCtx.drawImage(this, 0, 0);
    return imageCtx.getImageData(x, y, width, height);
};

ImageData.prototype.makeTransparent = function(r, g, b){
    var imageData = this.data;
    for (var i = 0; i < imageData.length; i+= 4) {
        if(imageData[i] === r && imageData[i+1] === g && imageData[i+2] === b){
            imageData[i+3] = null;
        }
    }
    return this;
};

ImageData.prototype.resizeImageData = function(dimensions){
    var imageCanvas = document.createElement('canvas');
    imageCanvas.width = this.width;
    imageCanvas.height = this.height;
    var imageCtx = imageCanvas.getContext("2d");
    imageCtx.putImageData(this, 0, 0);
    var destCanvas = document.createElement('canvas');
    destCanvas.width = dimensions.a;
    destCanvas.height = dimensions.b;
    destCtx = destCanvas.getContext("2d");
    destCtx.scale(dimensions.a/this.width, dimensions.b/this.height);
    destCtx.drawImage(imageCanvas, 0, 0);
    return destCtx.getImageData(0, 0, dimensions.a, dimensions.b);
}