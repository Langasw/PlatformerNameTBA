//prefab for player character
//written by Matt Loebach

function Player(game, xPass, yPass, key, frame){
	//call to Phaser.Sprite
	//create new sprite 
	Phaser.Sprite.call(this, game, xPass, yPass, key, frame); 
	//give player

	//add properties
	this.anchor.set(0.5); //anchor at center
	game.physics.arcade.enable(this); //enable physics
	this.enableBody = true; //enable body
	this.body.gravity.y = 180; //enable gravity (CHANGE GRAVITY HERE)
	//this.body.collideWorldBounds = true; // can collide with world bounds

	//animations
	this.animations.add('moving', [1], 10, true); //moving sprite is second on tempSpritesheet
	this.animations.add('still', [2], 10, true); //moving sprite is third on tempSpritesheet

	//declare keys
	var leftkey;
	game.input.keyboard.removeKeyCapture(Phaser.Keyboard.left);
	var rightKey;
	game.input.keyboard.removeKeyCapture(Phaser.Keyboard.right);
	var jumpKey;
	
}


Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {
	var playerVelocity = 200; //CHANGE PLAYER VELOCITY HERE

	this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.left);
	this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.right);
	this.jumpKey = game.input.keyboard.addKey(Phaser.Keyboard.up);

	//play animations

	//start by reseting velocity to zero
	this.body.velocity.x = 0;

	//basic player controls
	//create keyboard
	this.cursors = game.input.keyboard.createCursorKeys();

	//flip at left or right
	this.leftKey.onDown.add(leftFlip, this);
	this.rightKey.onDown.add(rightFlip, this);
	function leftFlip(){
		this.scale.x *= 2; //spritework faces other direction
	}
	function rightFlip(){
		this.scale.x *= 1.5; //spritework faces other direction
	}

	//horizontal movement
	if (this.cursors.left.isDown){ 	//if left key is pressed
		//move left
		this.body.velocity.x = -1 * playerVelocity; //move at negative playerVelocity speed
		
		this.animations.play('moving');
	}else if(this.cursors.right.isDown){ //if right key is pressed
		//more right
		this.body.velocity.x = playerVelocity; //move at playerVelocity speed
		//this.body.velocity.x = 200;
		this.animations.play('moving');
	}else{
		//stay still
		this.animations.play('still');
	}

	//jumping movement
	this.jumpKey.onDown.add(jump, this); //if up is pressed
	function jump(){
		this.body.velocity = -250; //jump
	}

	//player dies if they fall into a pit
	/*if(player.y < 1420){ //if they exceed y value too much (i.e fall out of world bounds)
		killPlayer();
	}*/


}