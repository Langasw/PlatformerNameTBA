//Main Project
"use strict"; //use strict

var game = new Phaser.Game(1000, 1320, Phaser.AUTO);

//declare variables
var player;
//var platform; //group for platformable objects (bridges, clouds, background)
//var touchPlatform; //group for objects that have collission with objects (player)
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
var jumpOnce;
var testTimer = 0;

//Main Menu state
var MainMenu = function(game) {};
MainMenu.prototype = {
	init: function(){
		this.level = 1;
	},
	preload: function(){
		console.log('MainMenu: preload');
		// preload assets
		game.load.image('tempPlayer', 'assets/img/placeholderSprite.png');
		game.load.image('testArena', 'assets/img/testArena.png');
		game.load.atlas('tempSpriteheet', 'assets/img/betaSpriteAtlas.png', 'js/json/betaSpriteAtlas.json');
		game.load.image('collideTest', 'assets/img/testSprite.png');
		game.load.image('wheelPlatform', 'assets/img/betaWheelPlatform.png');
		game.load.image('betaArrow', 'assets/img/betaArrow.png');
		game.load.image('controlWindow', 'assets/img/controlWindow.png');
		game.load.image('secretWalls', 'assets/img/secretWalls.png');
		game.load.physics('stageHitbox', 'js/json/betaStage.json', null);
		game.load.atlas('characterSpritesheet', 'assets/img/characterSpritesheet.png', 'js/json/characterSprite.json');
	},
	create: function() {
		console.log('MainMenu: create');
		//generate start screen
		var MainMenuText;
		//check to see if format is right if it fails
		MainMenuText = game.add.text(16, 16, 
			'Use Left, Right, and Up to Move \n' +
			'Press Space to Begin!', 
			{fontSize: '32px', fill: '#000' });
		game.stage.backgroundColor = "#FACADE";
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
	init: function(sc){
		//get level from Play state
		this.level = sc;
	},
	preload: function(){
		console.log('Cutscene: preload');
	},
	create: function(){
		console.log('Cutscene: create');
		cutsceneTime = 0;
		CutsceneText = game.add.text(16, 16, 
			'Placeholder Cutscene Text \n',
			{fontSize: '32px', fill: '#000' });
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
	init: function(sc){
		//get level from main menu
		this.level = sc;
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
		game.stage.backgroundColor = "#89CFF0";



		//set up arena
		var platform = game.physics.p2.createCollisionGroup();
		var touchPlatform = game.physics.p2.createCollisionGroup();
		game.physics.p2.enable(platform); //enable physics for walls

		//game.physics.p2.updateBoundsCollisionGroup(); //toggle this on and off

		//put in secret walls
		/*var leftWall = game.add.sprite(40, game.height/2, 'secretWalls');
		game.physics.p2.enable(leftWall); //enable physics
		leftWall.body.clearShapes();
		leftWall.physicsBodyType = Phaser.Physics.P2JS;
		leftWall.body.setRectangle(3, 150);
		leftWall.body.setCollisionGroup(platform);
		leftWall.body.collides([touchPlatform]);
		leftWall.body.immovable = true;*/

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
		player.body.collides([platform], refreshJump, this);

		function refreshJump(player, jumpOnce){
			jumpOnce = 0;
		}

		//add player animations
		player.animations.add('moving', [6, 7, 8, 5], 10, true); 
		player.animations.add('still', [5], 10, true); 
		player.animations.add('jumping', [1, 2, 3], 10, true); //
		player.animations.add('falling', [0], 10, true); //moving sprite is third on tempSpritesheet
		player.animations.add('landing', [4], 10, true) //

		//player.body.collideWorldBounds = true;

		lowY = 200;
		highY = 1200;
		waterfallPlatform = new WheelPlatform(game, 850, 1000, 'wheelPlatform');
		game.add.existing(waterfallPlatform);
		waterfallPlatform.enableBody = true;
		waterfallPlatform.physicsBodyType = Phaser.Physics.P2JS;
		waterfallPlatform.body.setCollisionGroup(platform); 
		waterfallPlatform.body.collides([touchPlatform]);
		upward = 0;

		testTimer = 0;
		jumpOnce = 0;
		direction = 0;

		endArrow = new EndArrow(game, 930, 230, 'betaArrow');
		game.add.existing(endArrow);
		endArrow.enableBody = true;
		endArrow.physicsBodyType = Phaser.Physics.P2JS;
		endArrow.body.setCollisionGroup(platform); //this line causes error
		//end level if player runs into arrow
		endArrow.body.collides([touchPlatform], toNextLevel, this);

		function toNextLevel(endArrow, player,game){
			endArrow.destroy();
			//increment level
			this.level = this.level+1;
			game.state.start('Cutscene', true, false, this.level); //move to Cutscene if spacebar is pressed
		}

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
		}
		//kill player command (CURRENTLY NOT WOKRING)

		//waterfall platform movement
		var platformSpeed = 118; //speed at which platform changes x

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

		//horizontal movement for player
		if (this.cursors.left.isDown){ 	//if left key is pressed
			//move left
			player.body.velocity.x = -1 * playerVelocity; //move at negative playerVelocity speed
			player.animations.play('moving');
			//flip sprite
			if(direction == 0){ //if facing right
				player.scale.x *= -1; //reverse sritework
				direction = 1; //sprite direction is left
			}
		}else if(this.cursors.right.isDown){ //if right key is pressed
			//more right
			player.body.velocity.x = playerVelocity; //move at playerVelocity speed
			player.animations.play('moving');
			//flip sprite
			if(direction == 1){ //if facing left
				player.scale.x *= -1; //reverse sritework
				direction = 0; //sprite direction is right
			}
		}else{
			//stay still
			player.animations.play('still');
		}

		//jumping movement
		if(this.cursors.up.isDown){
			if(jumpOnce == 0){
				player.body.velocity.y = -250; //jump
			}
			jumpOnce = 1
		}else{
			//jumpOnce = 0;
		}
			
	},
	render: function(){
		//game.debug.body(platform);
		//game.debug.body(touchPlatform);
		game.debug.body(arena);
		game.debug.body(player);
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
