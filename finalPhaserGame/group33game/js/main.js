//Main Project
"use strict"; //use strict

var game = new Phaser.Game(1000, 1320, Phaser.AUTO);

//declare variables
var player;
//var platform; //group for platformable objects (bridges, clouds, background)
//var touchPlatform; //group for objects that have collission with objects (player)
var arena;
var endArrow;
var CutsceneText;
var cutsceneTime; //timer for cutscenes
var cutsceneLength = 50; //minimum time a cutscene can last

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
		game.load.physics('stageHitbox', 'js/json/betaStage.json', null);
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

		//put in blue background
		game.stage.backgroundColor = "#89CFF0";
		//set up arena
		var platform = game.physics.p2.createCollisionGroup();
		var touchPlatform = game.physics.p2.createCollisionGroup();

		//game.physics.p2.updateBoundsCollisionGroup(); //toggle this on and off

		//platform.enableBody = true; 
		game.physics.p2.enable(platform); //enable physics for walls
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

		player = new Player(game, 100, 390, 'tempSpriteheet', 'still');
		game.add.existing(player);
		player.enableBody = true; 
		player.body.setCollisionGroup(touchPlatform);
		player.body.collides([platform]);
		//player.body.collideWorldBounds = true;
		this.waterfallPlatform = new WheelPlatform(game, 860, 1200, 'wheelPlatform', 200, 1200);
		game.add.existing(this.waterfallPlatform);
		this.waterfallPlatform.enableBody = true;
		this.waterfallPlatform.physicsBodyType = Phaser.Physics.P2JS;
		//this.waterfallPlatform.body.setCollisionGroup(platform); this line causes error
		this.waterfallPlatform.body.collides([touchPlatform]);

		endArrow = new EndArrow(game, 960, 230, 'betaArrow');
		game.add.existing(endArrow);
		endArrow.enableBody = true;
		endArrow.physicsBodyType = Phaser.Physics.P2JS;
		endArrow.body.setCollisionGroup(platform);
		//end level if player runs into arrow
		endArrow.body.collides(player, toNextLevel, this);
		function toNextLevel(endArrow, game){
			endArrow.destroy();
			//increment level
			this.level = this.level+1;
			game.state.start('Cutscene', true, false, this.level); //move to Cutscene if spacebar is pressed
		}

	},
	update: function(){
		//hit detection for player to platform
		//var hitWall = game.physics.arcade.collide(player, arena);
		//var hitWall = game.physics.arcade.overlap(arena, player);
		//var worldContact = game.physics.p2.createContactMaterial(player, arena);

		//end level if player runs into arrow
		//player.body.collides(endArrow, toNextLevel, this);

		//player dies if they fall into a pit (CURRENTLY NOT WORKING)
		if(player.y > 1450){ //if they exceed y value too much (i.e fall out of world bounds)
			//game.state.start('Play', true, false, this.level); //move to Play if player dies
			player.destroy();
			game.state.start('Play', true, false, this.level); //move to Play if player dies
		}
		//kill player command (CURRENTLY NOT WOKRING)
		
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
