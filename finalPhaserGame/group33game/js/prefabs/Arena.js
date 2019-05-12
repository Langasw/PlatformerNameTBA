//prefab for Arena

function Arena(game, xPass, yPass, key/*, frame*/){
	//call to Phaser.Sprite
	//create new sprite 
	Phaser.Sprite.call(this, game, xPass, yPass, key/*, frame*/); 
	//add properties
	this.anchor.set(0); //anchor at center
	game.physics.p2.enable(this); //enable physics
	this.body.clearShapes();
	//load body
	this.body.loadPolygon('stageHitbox', 'lowerCliff');
	this.body.loadPolygon('stageHitbox', 'housePlatform');
	this.body.loadPolygon('stageHitbox', 'caveLeft');
	this.body.loadPolygon('stageHitbox', 'caveRight');
	this.body.loadPolygon('stageHitbox', 'waterFall');
	this.body.loadPolygon('stageHitbox', 'garden');

	//this.enableBody = true; //enable body
	//this.body.setRectangle(50, 84);
	//game.physics.p2.gravity.y = 200; //enable gravity (CHANGE GRAVITY HERE)
	//this.body.collideWorldBounds = true; // can collide with world bounds
	this.body.kinematic = true;
	//animations
	this.animations.add('waterfall', [1], 10, true); //moving sprite is second on tempSpritesheet
	//this.animations.add('still', [2], 10, true); //moving sprite is third on tempSpritesheet
}

Arena.prototype = Object.create(Phaser.Sprite.prototype);
Arena.prototype.constructor = Arena;
Arena.prototype.update = function() {
	
}