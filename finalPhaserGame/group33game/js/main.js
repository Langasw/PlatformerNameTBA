//Main Project
//part 1
//
//be strict
"use strict";

var game = new Phaser.Game(1000, 1320, Phaser.AUTO);

//declare variables
var player;
var walls;
var touchWalls;
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
		//check to see if format is right if it fails
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
		game.physics.startSystem(Phaser.Physics.ARCADE);
		//put in blue background
		game.stage.backgroundColor = "#89CFF0";
		//set up arena
		walls = game.add.group();
		game.physics.arcade.enable(walls, Phaser.Physics.ARCADE); //enable physics for walls
		touchWalls = game.add.group(); //items that have collision w walls
		walls.enableBody = true;
		var arena = walls.create(0,0, 'testArena');
		player = new Player(game, 30, 370, 'tempSpriteheet', 'still');
		game.add.existing(player);
		touchWalls.add(player);
		arena.body.immovable = true;

	},
	update: function(){
		//hit detection for player to platform
		var hitWall = game.physics.arcade.collide(player, walls);

		//player dies if they fall into a pit
		if(player.y < 1420){ //if they exceed y value too much (i.e fall out of world bounds)
			//game.state.start('Play', true, false, this.level); //move to Play if player dies
			killPlayer;
		}

		//kill player command
		function killPlayer(){
			player.destroy();
			game.state.start('Cutscene', true, false, this.level); //move to Play if player dies
		}
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
