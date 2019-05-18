//create constructor for snowflake
function Title(game, key){
	//call to Phaser.Sprite
	//create new sprite at randomx and y values


	Phaser.Sprite.call(this, game, game.rnd.integerInRange(0, game.width), game.rnd.integerInRange(0, game.height), key); 


	//add properties
	this.anchor.set(0.5); 
	game.physics.enable(this);
	this.body.angularVelocity = game.rnd.integerInRange(0, 90); //make angle random (keep an eye on this)
	//randomize velocity
	this.body.velocity.x = game.rnd.integerInRange(0, 80); //x, keep eye on these values
	this.body.velocity.y = game.rnd.integerInRange(70, 60); //y, keep eye on these values
}

Title.prototype = Object.create(Phaser.Sprite.prototype);
Title.prototype.constructor = Title;

Title.prototype.update = function() {

	//it always rotates a few degrees (?)
	this.body.angle =+3;

	if(this.x < -30){ //if snow reaches left border
		this.x = game.width+25 //move it to right side
	}
	else if(this.x > game.width+30){//if snow reaches right border
		this.x = -25; //move it to the left side
	}
	if(this.y > game.height+25){//if snow reaches bottom
		this.y = -25;//move it to top
	}
}
