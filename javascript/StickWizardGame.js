var sources = {
    "wall": "images/Wall.png",
    "player sprite sheet": "images/spritesheet_template2.png"
};
var images = loadImages(function(){main("stickWizard");}, sources);

var stickWizardLevel;
var playerAnimations;
function init(){
    lm.addLevel(new Level1());
    lm.setLevelFromStart(0);
}
