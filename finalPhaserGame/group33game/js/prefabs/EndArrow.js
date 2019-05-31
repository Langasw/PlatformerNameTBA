function EndArrow(game, xPass, yPass, key/*, frame*/){
	//call to Phaser.Sprite
	//create new sprite 
	Phaser.Sprite.call(this, game, xPass, yPass, key/*, frame*/); 
	//add properties
	this.anchor.set(0.5); //anchor at center
	this.scale.set(0.5);
	game.physics.p2.enable(this); //enable physics
	this.body.clearShapes();
	//load body
	this.body.setRectangle(112*0.5, 72*0.5);
	//this.body.loadPolygon('stageHitbox', 'lowerCliff');

	//this.enableBody = true; //enable body
	//this.body.setRectangle(50, 84);
	//game.physics.p2.gravity.y = 200; //enable gravity (CHANGE GRAVITY HERE)
	//this.body.collideWorldBounds = true; // can collide with world bounds
	this.body.kinematic = true;
	this.animations.add('waterfall', [1], 10, true); //moving sprite is second on tempSpritesheet
	//this.animations.add('still', [2], 10, true); //moving sprite is third on tempSpritesheet
	this.upward = 0;
}

EndArrow.prototype = Object.create(Phaser.Sprite.prototype);
EndArrow.prototype.constructor = EndArrow;
EndArrow.prototype.update = function(){
		
}