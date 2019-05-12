function WheelPlatform(game, xPass, yPass, key, lowY, highY/*, frame*/){
	//call to Phaser.Sprite
	//create new sprite 
	Phaser.Sprite.call(this, game, xPass, yPass, key/*, frame*/); 
	//add properties
	this.anchor.set(0.5, 1); //anchor at center
	game.physics.p2.enable(this); //enable physics
	this.body.clearShapes();
	//load body
	this.body.setRectangle(150, 15);
	//this.body.loadPolygon('stageHitbox', 'lowerCliff');

	//this.enableBody = true; //enable body
	//this.body.setRectangle(50, 84);
	//game.physics.p2.gravity.y = 200; //enable gravity (CHANGE GRAVITY HERE)
	//this.body.collideWorldBounds = true; // can collide with world bounds
	this.body.kinematic = true;
	
	//animations
	this.animations.add('waterfall', [1], 10, true); //moving sprite is second on tempSpritesheet
	//this.animations.add('still', [2], 10, true); //moving sprite is third on tempSpritesheet
	this.upward = 0;
}

WheelPlatform.prototype = Object.create(Phaser.Sprite.prototype);
WheelPlatform.prototype.constructor = WheelPlatform;
WheelPlatform.prototype.update = function() {
	//ex: 300
	var platformSpeed = 90; //speed at which platform changes x

	//swap directions
	if(this.body.y < (this.lowY)){
		this.upward = 1;
	}
	if(this.body.y > (this.highY)){
		this.upward = 0;
	}

	if(this.upward == 0){
		this.body.velocity.y = -1 * platformSpeed;
	}
	if(this.upward == 1){
		this.body.velocity.y = platformSpeed;
	}
	
}