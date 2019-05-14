//Main Project
"use strict"; //use strict

var game = new Phaser.Game(1200, 1320, Phaser.AUTO);

//declare variables
var player;
//var platform; //group for platformable objects (bridges, clouds, background)
//var touchPlatform; //group for objects that have collission with objects (player)
var currentLevel = 1;
var arena;
var endArrow;
var waterfallPlatform;
var CutsceneText;
var cutsceneTime; //timer for cutscenes
var cutsceneLength = 50; //minimum time a cutscene can last
var upward = 0; //movement of the waterfall platform
var lowY; //lowest y point of the waterfall platform in the stage
var highY; //highest y point of the waterfall platform in the stage
var direction = 1; //1 for left, 0 for right
var jumpAnimOnce = 0;
var jumpOnce = 1;
var testTimer = 0;
var jumpNoise;
var deathFallNoise;
var windNoise;

//Main Menu state
var MainMenu = function(game) {};
MainMenu.prototype = {
	preload: function(){
		console.log('MainMenu: preload');
		// preload assets
		game.load.image('tempPlayer', 'assets/img/placeholderSprite.png');
		game.load.image('testArena', 'assets/img/testArenaWide.png');
		game.load.atlas('tempSpriteheet', 'assets/img/betaSpriteAtlas.png', 'js/json/betaSpriteAtlas.json');
		game.load.image('collideTest', 'assets/img/testSprite.png');
		game.load.image('wheelPlatform', 'assets/img/betaWheelPlatform.png');
		game.load.image('betaArrow', 'assets/img/betaArrow.png');
		game.load.image('controlWindow', 'assets/img/controlWindow.png');
		game.load.image('secretWalls', 'assets/img/secretWalls.png');
		game.load.image('caveBackground', 'assets/img/betaCaveBGWide.png');
		game.load.physics('stageHitboxWide', 'js/json/stageWide1200.json', null);
		game.load.atlas('characterSpritesheet', 'assets/img/characterSpritesheet.png', 'js/json/characterSprite.json');
		game.load.audio('jumpSound', ['assets/audio/jump.wav']);
		game.load.audio('deathFall', ['assets/audio/pitFall.wav']);
		game.load.audio('windNoise', ['assets/audio/windNoise.mp3']);
	},
	create: function() {
		console.log('MainMenu: create');
		//generate start screen
		var MainMenuText;
		//check to see if format is right if it fails
		MainMenuText = game.add.text(game.width/2, (game.height/2)-200, 
			'Use Left, Right, and Up to Move \n' +
			'Press Space to Begin!', 
			{fontSize: '32px', fill: '#000' });
		game.stage.backgroundColor = "#FACADE";
		MainMenuText.anchor.set(0.5);
		MainMenuText.align = 'center';
	},
	update: function(){
		//main menu logic
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			game.state.start('Cutscene', true, false, this.level); //move to Cutscene if spacebar is pressed
		}
	}
}
//Cutscene state
var Cutscene = function(game){};
Cutscene.prototype = {
	init: function(){
		//get level from variable
		this.level = currentLevel;
	},
	preload: function(){
		console.log('Cutscene: preload');
	},
	create: function(){
		console.log('Cutscene: create');

		/*windNoise = new Phaser.Sound(game, 'windNoise', 0.35, false);
		//set up volume if music sound is too much or little
		windNoise.volume = 0.35;
		windNoise.play();*/
		windNoise = game.add.audio('windNoise');
		windNoise.volume = 0.3;
		windNoise.play();

		cutsceneTime = 0;
		CutsceneText = game.add.text(game.width/2, (game.height/2)-200, 
			'Placeholder Cutscene Text\n',
			{fontSize: '50px', fill: '#000' });
		CutsceneText.anchor.set(0.5);
		CutsceneText.align = 'center';

		game.stage.backgroundColor = "#FACADE";
	},
	update: function(){
		cutsceneTime++; //increment cutscene time
		if(cutsceneTime > cutsceneLength){
			CutsceneText.text =
			'Placeholder Cutscene Text\n' +
			'Press Space to Continue';
		}
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && (cutsceneTime > cutsceneLength)){ 
		//space bar is pressed and cutscene time is enough
			cutsceneTime = 0;
			game.state.start('Play', true, false, this.level); //move to Play if spacebar is pressed
		}
	}
}
//Play state
var Play = function(game){};
Play.prototype = {
	init: function(){
		//get level from main menu
		this.level = currentLevel;
	},
	preload: function(){
		console.log('Play: preload');
		
	},
	create: function(){
		console.log('Play: create');
		//enable physics
		//obsts.debug = true;
		game.physics.startSystem(Phaser.Physics.P2JS);

		/*var worldBounds = new Phaser.Rectangle(0,0,1000,1500);
		customBounds = {left: null, right: null, top: null, bottom: null};
		createPreviewBounds(bounds.x, bounds.y, bounds.width, bounds.height);
		*/

		//put in blue background
		game.stage.backgroundColor = "#1D5986";

		//set up background
		game.add.sprite(0,0, 'caveBackground');

		//set up arena
		var platform = game.physics.p2.createCollisionGroup();
		var touchPlatform = game.physics.p2.createCollisionGroup();
		var collectable = game.physics.p2.createCollisionGroup();
		game.physics.p2.enable(platform); //enable physics for walls

		//game.physics.p2.updateBoundsCollisionGroup(); //toggle this on and off

		//put in secret walls
		var leftWall = game.add.sprite(-20, game.height/2, 'secretWalls');
		game.physics.p2.enable(leftWall); //enable physics
		leftWall.body.clearShapes();
		leftWall.physicsBodyType = Phaser.Physics.P2JS;
		leftWall.body.setRectangle(50, 1500);
		leftWall.body.setCollisionGroup(platform);
		leftWall.body.collides([touchPlatform]);
		leftWall.body.kinematic = true;

		var rightWall = game.add.sprite(game.width+20, game.height/2, 'secretWalls');
		game.physics.p2.enable(rightWall); //enable physics
		rightWall.body.clearShapes();
		rightWall.physicsBodyType = Phaser.Physics.P2JS;
		rightWall.body.setRectangle(50, 1500);
		rightWall.body.setCollisionGroup(platform);
		rightWall.body.collides([touchPlatform]);
		rightWall.body.kinematic = true;

		//platform.enableBody = true; 

		
		arena = new Arena(game, (game.width)/2, (game.height)/2, 'testArena');
		game.add.existing(arena);
		arena.enableBody = true;
		arena.physicsBodyType = Phaser.Physics.P2JS;
		arena.body.setCollisionGroup(platform);
		arena.body.collides([touchPlatform]);
		arena.body.immovable = true;
		//arena.enableBody = true;
		//game.physics.arcade.enable(arena, Phaser.Physics.ARCADE); //enable physics for walls
	
		//touchPlatform = game.add.group(); //items that have collision w walls
		//touchPlatform.enableBody = true;

		//control window
		var controlWindow = game.add.sprite(game.width/2, 300, 'controlWindow');
		controlWindow.anchor.set(0.5);
		controlWindow.alpha = 0.2;

		player = new Player(game, 100, 390, 'characterSpritesheet', 'Walk1');
		game.add.existing(player);
		player.enableBody = true; 
		player.body.setCollisionGroup(touchPlatform);
		player.body.collides([platform/*, collectable*/]/*, refreshJump, this*/);
		player.body.onBeginContact.add(refreshJump, this);


		//add player animations
		player.animations.add('moving', [6, 7, 8, 5], 10, true); 
		player.animations.add('still', [5], 10, true); 
		player.animations.add('jumping', [1, 1, 2, 3, 3, 3, 3, 3, 0], 12, false); //
		//player.animations.add('falling', [0], 10, true); //moving sprite is third on tempSpritesheet
		player.animations.add('landing', [4, 4, 4], 10, true) //

		//player.body.collideWorldBounds = true;
		function refreshJump(body, bodyB, shapeA, shapeB, equation){
			//if player collides with platform, do this
			//this is where landing animation should go, for only a few frames
			jumpOnce = 0;
			//player.animations.play('landing');
		}


		lowY = 200;
		highY = 1200;
		waterfallPlatform = new WheelPlatform(game, 1050, 1000, 'wheelPlatform');
		game.add.existing(waterfallPlatform);
		waterfallPlatform.enableBody = true;
		waterfallPlatform.physicsBodyType = Phaser.Physics.P2JS;
		waterfallPlatform.body.setCollisionGroup(platform); 
		waterfallPlatform.body.collides([touchPlatform]);
		upward = 0;

		testTimer = 0;
		jumpOnce = 1;
		jumpAnimOnce = 0;
		direction = 0;

		jumpNoise = game.add.audio('jumpSound');
		jumpNoise.volume = 0.5;
		deathFallNoise = game.add.audio('deathFall');

		function toNextLevel(body, bodyB, shapeA, shapeB, equation){
			endArrow.destroy();
			//increment level
			this.level = this.level+1;
			game.state.start('Cutscene', true, false, this.level); //move to Cutscene if spacebar is pressed
		}

		
		endArrow = new EndArrow(game, 1160, 110, 'betaArrow');
		game.add.existing(endArrow);
		endArrow.enableBody = true;
		endArrow.physicsBodyType = Phaser.Physics.P2JS;
		endArrow.body.setCollisionGroup(platform); //this line causes error
		//end level if player runs into arrow
		endArrow.body.collides([touchPlatform]/*, toNextLevel, this*/);
		endArrow.body.onBeginContact.add(toNextLevel, this);

		/*function contactTest(body, bodyB, shapeA, shapeB, equation){
			game.stage.backgroundColor = "#FACADE";
		}*/

		

		//endArrow.body.onBeginContact.add(toNextlevel, this);

		

	},
	update: function(){
		var playerVelocity = 200; //CHANGE PLAYER VELOCITY HERE
		//hit detection for player to platform
		//var hitWall = game.physics.arcade.collide(player, arena);
		//var hitWall = game.physics.arcade.overlap(arena, player);
		//var worldContact = game.physics.p2.createContactMaterial(player, arena);

		//end level if player runs into arrow
		//player.body.collides(endArrow, toNextLevel, this);

		//create keyboard
		this.cursors = game.input.keyboard.createCursorKeys();

		//reset player velocity
		player.body.velocity.x = 0; //start by reseting velocity to zero

		//player dies if they fall into a pit (CURRENTLY NOT WORKING)
		if(player.y > 1450){ //if they exceed y value too much (i.e fall out of world bounds)
			//game.state.start('Play', true, false, this.level); //move to Play if player dies
			//player.destroy();
			game.state.start('Play', true, false, this.level); //move to Play if player dies
			deathFallNoise.play(); //play death sound
		}
		//kill player command (CURRENTLY NOT WOKRING)

		//waterfall platform movement
		var platformSpeed = 130; //speed at which platform changes x

		//swap directions
		/*if(waterfallPlatform.y >= 600){ //upper limit
			upward = 1; //go down
		}else if(waterfallPlatform.y <= 900){ //lower limit
			upward = 0; //go up
		}else{
		}*/

		/*if(player.body.x >= 400){ //upper limit
			upward = 1; //go down
		}else if(player.body.x <= 900){ //lower limit
			upward = 0; //go up
		}*/

		testTimer++;
		if(testTimer == 300){
			upward = 1;
		}else if(testTimer == 600){
			upward = 0;
			testTimer = 0;
		}

		//general movement of platform
		if(upward == 0){
			waterfallPlatform.body.velocity.y = -1 * platformSpeed; //go upward
		}else if(upward == 1){
			waterfallPlatform.body.velocity.y = platformSpeed; //go downward
		}

		//jumping movement
		if(this.cursors.up.isDown){
			if(jumpOnce == 0){
				player.body.velocity.y = -250; //jump
				player.animations.play('jumping');
				jumpNoise.play(); //play jump sound
			}
			jumpOnce = 1
		}else{
			//jumpOnce = 0;
		}

		//horizontal movement for player
		if (this.cursors.left.isDown){ 	//if left key is pressed
			//move left
			player.body.velocity.x = -1 * playerVelocity; //move at negative playerVelocity speed
			
			//flip sprite
			if(direction == 0){ //if facing right
				player.scale.x *= -1; //reverse sritework
				direction = 1; //sprite direction is left
			}
		}else if(this.cursors.right.isDown){ //if right key is pressed
			//more right
			player.body.velocity.x = playerVelocity; //move at playerVelocity speed
			//player.animations.play('moving');
			//flip sprite
			if(direction == 1){ //if facing left
				player.scale.x *= -1; //reverse sritework
				direction = 0; //sprite direction is right
			}
		}else{
			//stay still
			//player.animations.play('still');
		}

		//animation control
		if(this.cursors.up.isPressed){ //upward movement
			if(jumpAnimOnce = 0){
				player.animations.play('jumping');
			}
			jumpAnimOnce = 1;
		}else {
			//horizontal movement
			if(this.cursors.left.isDown || this.cursors.right.isDown){
				player.animations.play('moving');
			}else{
				player.animations.play('still');
			}
			jumpAnimOnce = 0;
		}
		//debug, reset jump animation
		if(this.cursors.down.isDown){
			jumpOnce = 1;
		}

		//refresh jump function check
		/*if(jumpOnce == 0){
			game.stage.backgroundColor = "#FFFFCC";
		}else if(jumpOnce == 1){
			game.stage.backgroundColor = "#666600";
		}*/
		
			
	},
	render: function(){
		//game.debug.body(platform);
		//game.debug.body(touchPlatform);
		//game.debug.spriteInfo(player, 32, 32);
	}
}
var GameOver = function(game) {};
GameOver.prototype = {
	preload: function(){
		console.log('GameOver: preload');
	},
	create: function() {
		console.log('GameOver: create');
		var GameOverText;
		//check to see if format is right if something goes wrong
		GameOverText = game.add.text(16, 16, 
			'Game Over \n' +
			'Final Score: ' + this.score + "\n" +
			'Press Space to try again!', 
			{fontSize: '32px', fill: '#000' });
		game.stage.backgroundColor = "#FACADE";
	},
	update: function(){
		//GameOver logic
		//move to play if space is pressed
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			//pass this.score
			game.state.start('Play', true, false, this.score);
		}
	}
}
//add states to StateManager
game.state.add('MainMenu', MainMenu);
game.state.add('Cutscene', Cutscene);
game.state.add('Play', Play);
game.state.add('GameOver', GameOver);
//start at main menu
game.state.start('MainMenu');
