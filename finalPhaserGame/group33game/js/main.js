//Main Project
"use strict"; //use strict
//update THIS phaser !

var game = new Phaser.Game(1200, 1320, Phaser.AUTO);

//declare variables
var player;
//var platform; //group for platformable objects (bridges, clouds, background)
//var touchPlatform; //group for objects that have collission with objects (player)
var currentLevel = 1;
var arena;
var endArrow;
var waterfallPlatform;
var switchPool;
var waterfall;
var CutsceneText;
var cutsceneTime; //timer for cutscenes
var cutsceneLength = 50; //minimum time a cutscene can last
var upward = 0; //movement of the waterfall platform
var lowY; //lowest y point of the waterfall platform in the stage
var highY; //highest y point of the waterfall platform in the stage
var direction = 1; //1 for left, 0 for right
var jumpAnimOnce = 0;
var jumpOnce = true;
var testTimer = 0;
var jumpNoise;
var deathFallNoise;

///CLOUD FUNCTIONS
var cloud1;
var cloud1Speed = 100;
var cloud2;
var cloud2Speed = 100;
var cloudH;
var cloudHSpeed = 200;
var cloud1Exist = false;
var cloud2Exist = false;
var cloudHExist = false;
var cloud1Range; //vertical cloud
var cloud1Start;
var cloud1Upward = 0;
var cloud2Range; //vertical cloud 2
var cloud2Start;
var cloud2Upward = 0;
//var cloudHRange; //horizontal cloud
//var cloudHUpward = 0;
var windNoise;
var playerInPool;
var waterFrozen = false;
var playClick = false;
var creditsClick = false;
var platformSpeed = 0;
var downPress = false;

//Main Menu state
var MainMenu = function(game) {};
MainMenu.prototype = {
	preload: function(){
		console.log('MainMenu: preload');
		// preload assets

		//title screen assets
		game.load.image('titleImage', 'assets/img/TitleBackground.png');
		game.load.image('titleName', 'assets/img/Title.png');
		game.load.image('Petal3', 'assets/img/Petal3.png');
		game.load.image('Petal2', 'assets/img/Petal2.png');
		game.load.image('Blossom', 'assets/img/Petal1.png');
		game.load.image('PlayButton', 'assets/img/PlayButton.png');
		game.load.image('CreditButton', 'assets/img/CreditButton.png');
		game.load.image('Select', 'assets/img/SelectIcon.png');
		//----

		game.load.image('tempPlayer', 'assets/img/placeholderSprite.png');
		game.load.image('testArena', 'assets/img/testArenaWide.png');
		game.load.image('testRuins', 'assets/img/testRuins.png');
		game.load.image('testFinal', 'assets/img/testFinal.png');
		game.load.atlas('waterfallGraphics', 'assets/img/waterfallStates.png', 'js/json/waterfallGraphics.json');
		game.load.atlas('tempSpriteheet', 'assets/img/betaSpriteAtlas.png', 'js/json/betaSpriteAtlas.json');
		game.load.image('collideTest', 'assets/img/testSprite.png');
		game.load.image('wheelPlatform', 'assets/img/betaWheelPlatform.png');
		game.load.image('betaArrow', 'assets/img/betaArrow.png');
		game.load.image('endPetal', 'assets/img/endPetal.png');
		game.load.image('controlWindow', 'assets/img/controlWindow.png');
		game.load.image('secretWalls', 'assets/img/secretWalls.png');
		game.load.image('caveBackground', 'assets/img/betaCaveBGWide.png');
		game.load.image('Bridge1', 'assets/img/Bridge1.png');
		game.load.image('Bridge2', 'assets/img/Bridge2.png');
		game.load.image('Bridge3', 'assets/img/Bridge3.png');
		game.load.image('Cloud', 'assets/img/betaCloud.png');
		game.load.image('deathCloudA', 'assets/img/FireLevel3.png');
		game.load.image('deathCloudB', 'assets/img/FireLevel4A.png');
		game.load.image('deathCloudC', 'assets/img/FireLevel4B.png');
		game.load.image('deathCloudD', 'assets/img/FireLevel8.png');
		game.load.image('deathHouse', 'assets/img/FireHouse.png');
		game.load.image('house1', 'assets/img/house1.png');
		game.load.image('house2', 'assets/img/house2.png');
		game.load.image('house3', 'assets/img/house3.png');
		game.load.image('houseFinal', 'assets/img/houseFinal.png');
		game.load.physics('stageHitboxWide', 'js/json/stageWide1200.json', null);
		game.load.physics('ruinsHitbox', 'js/json/level9Hitbox.json', null);
		game.load.atlas('poolSwitch', 'assets/img/switchPool.png', 'js/json/switchPool.json');
		game.load.physics('housePhysics', 'js/json/houseHitbox.json', null);
		game.load.atlas('characterSpritesheet', 'assets/img/characterSpritesheet.png', 'js/json/characterSprite.json');
		game.load.audio('jumpSound', ['assets/audio/jump.wav']);
		game.load.audio('deathFall', ['assets/audio/pitFall.wav']);
		game.load.audio('windNoise', ['assets/audio/windNoise.mp3']);
	},
	create: function() {
		console.log('MainMenu: create');

		//adds the background image to the title screen
		this.add.image(0,0,'titleImage');

		//creates the petal falling animation and wrap
		for (var j =0; j < 40; j++){
			this.petalOne = new Title(game, 'Petal2');
			game.add.existing(this.petalOne);

			this.petalTwo = new Title(game, 'Petal3');
			game.add.existing(this.petalTwo);

			//this.Blossom = new Title(game, 'Blossom');
			//game.add.existing(this.Blossom);
		}

		//adds the title, play and credit icons
		this.add.image(200,350, 'titleName');

		//allows the user to click on the play button
		var ButtonPlay = this.add.image(525,925, 'PlayButton');
		ButtonPlay.inputEnabled = true;
		ButtonPlay.events.onInputDown.add(playButtonClicked, this);
		var ButtonCredits = this.add.image(500,1050, 'CreditButton');
		ButtonCredits.inputEnabled = true;
		ButtonCredits.events.onInputDown.add(creditsButtonClicked, this);

		
		//generate start screen
		var MainMenuText;
		//check to see if format is right if it fails
		/*MainMenuText = game.add.text(game.width/2, (game.height/2)-200, 
			'Use Left, Right, and Up to Move \n' +
			'Press Space to Begin!', 
			{fontSize: '32px', fill: '#000' });
		game.stage.backgroundColor = "#FACADE";
		MainMenuText.anchor.set(0.5);
		MainMenuText.align = 'center';*/
	},
	update: function(){
		//main menu logic
		//changes state when the play button is clicked
		if(playClick== true){
			playClick = false;
			game.state.start('Cutscene', true, false, this.level); //move to Cutscene if spacebar is pressed
		}
		if(creditsClick == true){
			creditsClick = false;
			game.state.start('Credits', true, false, this.level); //move to Cutscene if spacebar is pressed
		}

	}
}

//function is used for any situation when the play button is clicked
function playButtonClicked(){
	playClick = true;
}
function creditsButtonClicked(){
	creditsClick = true;
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

		windNoise = game.add.audio('windNoise');
		windNoise.volume = 0.2;
		windNoise.play();

		cutsceneTime = 0;
		CutsceneText = game.add.text(game.width/2, (game.height/2)-200, 
			'Placeholder Cutscene Text\n',
			{fontSize: '50px', fill: '#000' });
		CutsceneText.anchor.set(0.5);
		CutsceneText.align = 'center';
		game.stage.backgroundColor = "#FACADE";
		//take cutscene text
		if(this.level == 1){
			CutsceneText.text = 'Level 1 Placeholder Text\n';
		}else if(this.level == 2){
			CutsceneText.text = 'Level 2 Placeholder Text\n';
		}else if(this.level == 3){
			CutsceneText.text = 'Level 3 Placeholder Text\n';
		}else if(this.level == 4){
			CutsceneText.text = 'Level 4 Placeholder Text\n';
		}else if(this.level == 5){
			CutsceneText.text = 'Level 5 Placeholder Text\n';
		}else if(this.level == 6){
			CutsceneText.text = 'Level 6 Placeholder Text\n';
		}else if(this.level == 7){
			CutsceneText.text = 'Level 7 Placeholder Text\n';
		}else if(this.level == 8){
			CutsceneText.text = 'Level 8 Placeholder Text\n';
		}else if(this.level == 9){
			CutsceneText.text = 'Level 9 Placeholder Text\n';
		}else if(this.level == 10){
			CutsceneText.text = 'Level 10 Placeholder Text\n';
		}else if(this.level == 11){
			CutsceneText.text = 'Ending Placeholder Text\n';
		}else if(this.level == 12){
			CutsceneText.text = 'Alternate Ending Placeholder Text\n';
		}
	},
	update: function(){
		cutsceneTime++; //increment cutscene time
		if(cutsceneTime == cutsceneLength){
			CutsceneText.text =
			CutsceneText.text +
			'Press Space to Continue';
		}
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && (cutsceneTime > cutsceneLength)){ 
		//space bar is pressed and cutscene time is enough
			cutsceneTime = 0;
			if(this.level <= 10){ //if the game is in a standard level #
				game.state.start('Play', true, false, this.level); //move to Play if spacebar is pressed
			}else{
				currentLevel = 1;
				windNoise.destroy();
				game.state.start('MainMenu', true, false, this.level);
			}
			
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

		//put in blue background
		game.stage.backgroundColor = "#da9986";

		//create cloud group
		/*var cloudVertical = game.add.group();
		var cloudHorizontal = game.add.group();*/

		//set up base variables
		var playerStartY = 390;
		var arrowStartY = 90;

		//load all sound effects
		jumpNoise = game.add.audio('jumpSound');
		jumpNoise.volume = 0.5;
		deathFallNoise = game.add.audio('deathFall');

		//set up collision groups
		var platform = game.physics.p2.createCollisionGroup();
		var touchPlatform = game.physics.p2.createCollisionGroup();
		var collectable = game.physics.p2.createCollisionGroup();
		var deathTouch = game.physics.p2.createCollisionGroup();
		game.physics.p2.enable(platform); //enable physics for walls

		//put in secret walls (bounds for left and right sides_)
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

		//set up the proper backgrounds
		if(this.level > 0 && this.level <= 8){ //between 1-8
			//put in arena 1 BG
			game.add.sprite(0,0, 'caveBackground');
			waterfall = game.add.sprite(1057, 140, 'waterfallGraphics', 'waterfall');

		}else if(this.level == 9){
			//ruined arena
			game.add.sprite(0, 250, 'caveBackground');

		}else if(this.level == 10){
			//final arena
		}else if(this.level == 11){
			//this is the ending
		}else if(this.level == 12){
			//this is the alternate ending
		}

		//set up houses
		if(this.level == 2 ){ //level 2
			//load house 1 background image
			var house = game.add.sprite(600, 450, 'house1');
			house.anchor.set(0.5);

		}else if(this.level == 3){ //level 3
			var house = game.add.sprite(600, 450, 'house2');
			house.anchor.set(0.5);

		}else if(this.level == 4){ //level 4
			var house = game.add.sprite(600, 450, 'house3');
			house.anchor.set(0.5);


		}else if(this.level >= 5 && this.level <= 7){ //level 5-7
			var house = game.add.sprite(600, 450, 'houseFinal');
			house.enableBody = true;
			game.physics.p2.enable(house);
			house.physicsBodyType = Phaser.Physics.P2JS;
			house.body.clearShapes();
			//house.body.loadPolygon('houseHitbox', 'houseHitbox');
			house.body.loadPolygon('housePhysics', 'normalHitbox');
			house.body.setCollisionGroup(platform);
			house.body.collides([touchPlatform]);
			house.body.kinematic = true;

		}else if(this.level == 8){ //level 8
			//load house on fire
			var deathHouse = game.add.sprite(600, 450, 'deathHouse');
			deathHouse.enableBody = true;
			game.physics.p2.enable(deathHouse);
			deathHouse.physicsBodyType = Phaser.Physics.P2JS;
			deathHouse.body.clearShapes();
			//deathHouse.body.loadPolygon('houseHitbox', 'fireHitbox');
			deathHouse.body.loadPolygon('housePhysics', 'fireHitbox');
			deathHouse.body.setCollisionGroup(platform);
			deathHouse.body.collides([touchPlatform]);
			deathHouse.body.kinematic = true;
			deathHouse.body.onBeginContact.add(killPlayer, this);
		}

		//create bridges
		if(this.level > 0 && this.level <= 3){ //if between levels 1 and 3, create bridge 1
			var bridge1 = game.add.sprite(260, 735, 'Bridge1'); //leftmost bridge
			game.physics.p2.enable(bridge1);
			bridge1.physicsBodyType = Phaser.Physics.P2JS;
			bridge1.body.clearShapes();
			bridge1.body.setRectangle(230, 30);
			bridge1.body.setCollisionGroup(platform);
			bridge1.body.collides([touchPlatform]);
			bridge1.body.kinematic = true;
		}
		if(this.level > 0 && this.level <= 5){ //if between levels 1 and 3, also create bridges 2+3
			//create bridges
			var bridge2 = game.add.sprite(870, 690, 'Bridge2'); //rightmost L-shape bridge
			var bridge3 = game.add.sprite(580, 1090, 'Bridge1'); //bottom cave bridge
			game.physics.p2.enable([bridge2, bridge3]);
			bridge2.physicsBodyType = Phaser.Physics.P2JS;
			bridge3.physicsBodyType = Phaser.Physics.P2JS;

			bridge2.body.clearShapes();
			bridge2.body.addRectangle(100, 17, 0, 40);//__, y offset is 40
			bridge2.body.addRectangle(20, 87, 30, 0); // |, x offset is 30

			bridge3.body.clearShapes();
			bridge3.body.setRectangle(150, 25);

			bridge2.body.setCollisionGroup(platform);
			bridge2.body.collides([touchPlatform]);
			bridge3.body.setCollisionGroup(platform);
			bridge3.body.collides([touchPlatform]);
			
			bridge2.body.kinematic = true;
			bridge3.body.kinematic = true;
		}

		//ARENAS

		//level 1-8 arena setup
		if(this.level > 0 && this.level <= 8){ //between 1-8
			//put in arena
			arena = new Arena(game, (game.width)/2, (game.height)/2, 'testArena', this.level);
			game.add.existing(arena);
			arena.enableBody = true;
			arena.physicsBodyType = Phaser.Physics.P2JS;
			arena.body.setCollisionGroup(platform);
			arena.body.collides([touchPlatform]);
			arena.body.immovable = true;
			
			//put waterfall platform switch creation HERE


			//game.physics.p2.updateBoundsCollisionGroup(); //toggle this on and off
		}else if(this.level == 9){
			//ruined arena

			arena = new Arena(game, (game.width)/2, (game.height)/2+250, 'testRuins', this.level);
			game.add.existing(arena);
			arena.enableBody = true;
			arena.physicsBodyType = Phaser.Physics.P2JS;
			arena.body.setCollisionGroup(platform);
			arena.body.collides([touchPlatform]);
			arena.body.immovable = true;

		}else if(this.level == 10){
			//final arena

			arena = new Arena(game, (game.width)/2, (game.height)/2, 'testFinal', this.level);
			game.add.existing(arena);
			arena.enableBody = true;
			arena.physicsBodyType = Phaser.Physics.P2JS;
			arena.body.setCollisionGroup(platform);
			arena.body.collides([touchPlatform]);
			arena.body.immovable = true;

		}else if(this.level == 11){
			//this is the ending
		}

		
		platformSpeed = 120;

		//LEVEL SPECIFIC TOOLS


		if(this.level == 1){ //control window and waterfall y values
			cloud1Exist = false;
			cloud2Exist = false;
			cloudHExist = false;

			//control window
			var controlWindow = game.add.sprite(game.width/2, 300, 'controlWindow');
			controlWindow.anchor.set(0.5);
			controlWindow.alpha = 0.2;

			//set waterfall platform prefabs
			platformSpeed = 136;
			lowY = 320;
			highY = 900;

		}else if(this.level == 2){//house 1, a updown cloud, and waterfall y values
			cloud1Exist = true;
			cloud2Exist = false;
			cloudHExist = false;

			//create cloud platform
			cloud1Start = 445;
			cloud1Range = 180;

			cloud1 = game.add.sprite(800, cloud1Start, 'Cloud');
			cloud1.enableBody = true;
			game.physics.p2.enable(cloud1);
			cloud1.physicsBodyType = Phaser.Physics.P2JS;
			cloud1.body.clearShapes();
			cloud1.body.setRectangle(140, 3);
			cloud1.anchor.set(0.5);
			cloud1.body.setCollisionGroup(platform);
			cloud1.body.collides([touchPlatform]);
			cloud1.body.kinematic = true;

			//set waterfall platform prefabs
			platformSpeed = 112;
			lowY = 320;
			highY = 460;

		}else if(this.level == 3){//house 2, updown cloud, horizontal cloud, two death clouds, and waterfall y values
			cloud1Exist = true;
			cloud2Exist = false;
			cloudHExist = true;

			//create cloud platform
			cloud1Start = 420;
			cloud1Range = 220;

			cloud1 = game.add.sprite(430, cloud1Start, 'Cloud');
			cloud1.enableBody = true;
			game.physics.p2.enable(cloud1);
			cloud1.physicsBodyType = Phaser.Physics.P2JS;
			cloud1.body.clearShapes();
			cloud1.body.setRectangle(140, 3);
			cloud1.anchor.set(0.5);
			cloud1.body.setCollisionGroup(platform);
			cloud1.body.collides([touchPlatform]);
			cloud1.body.kinematic = true;

			cloudH = game.add.sprite(30, 180, 'Cloud');
			cloudH.enableBody = true;
			game.physics.p2.enable(cloudH);
			cloudH.physicsBodyType = Phaser.Physics.P2JS;
			cloudH.body.clearShapes();
			cloudH.body.setRectangle(140, 3);
			cloudH.anchor.set(0.5);
			cloudH.body.setCollisionGroup(platform);
			cloudH.body.collides([touchPlatform]);
			cloudH.body.kinematic = true;
			cloudH.body.velocity.x = 170;

			var deathCloud1 = game.add.sprite(775, 580, 'deathCloudA');
			deathCloud1.enableBody = true;
			game.physics.p2.enable(deathCloud1);
			deathCloud1.physicsBodyType = Phaser.Physics.P2JS;
			deathCloud1.body.clearShapes();
			deathCloud1.body.setRectangle(40, 175);
			deathCloud1.body.setCollisionGroup(platform);
			deathCloud1.body.collides([touchPlatform]);
			deathCloud1.body.kinematic = true;
			deathCloud1.body.onBeginContact.add(killPlayer, this);

			var deathCloud2 = game.add.sprite(750, 960, 'deathCloudA');
			deathCloud2.enableBody = true;
			game.physics.p2.enable(deathCloud2);
			deathCloud2.physicsBodyType = Phaser.Physics.P2JS;
			deathCloud2.body.clearShapes();
			deathCloud2.body.setRectangle(40, 180);
			deathCloud2.body.setCollisionGroup(platform);
			deathCloud2.body.collides([touchPlatform]);
			deathCloud2.body.kinematic = true;
			deathCloud2.body.onBeginContact.add(killPlayer, this);

			//set waterfall platform prefabs
			platformSpeed = 80;
			lowY = 820;
			highY = 1000;

		}else if(this.level == 4){//house 3, two vertical clouds, two death clouds, and waterfall y values
			cloud1Exist = true;
			cloud2Exist = true;
			cloudHExist = false;

			//create cloud platform 1
			cloud1Start = 340;
			cloud1Range = 150;

			cloud1 = game.add.sprite(930, cloud1Start, 'Cloud');
			cloud1.enableBody = true;
			game.physics.p2.enable(cloud1);
			cloud1.physicsBodyType = Phaser.Physics.P2JS;
			cloud1.body.clearShapes();
			cloud1.body.setRectangle(140, 3);
			cloud1.anchor.set(0.5);
			cloud1.body.setCollisionGroup(platform);
			cloud1.body.collides([touchPlatform]);
			cloud1.body.kinematic = true;

			//create cloud platform 2
			cloud2Start = 820;
			cloud2Range = 200;

			cloud2 = game.add.sprite(260, cloud2Start, 'Cloud');
			cloud2.enableBody = true;
			game.physics.p2.enable(cloud2);
			cloud2.physicsBodyType = Phaser.Physics.P2JS;
			cloud2.body.clearShapes();
			cloud2.body.setRectangle(140, 3);
			cloud2.anchor.set(0.5);
			cloud2.body.setCollisionGroup(platform);
			cloud2.body.collides([touchPlatform]);
			cloud2.body.kinematic = true;


			var deathCloud1 = game.add.sprite(1030, 705, 'deathCloudB');
			deathCloud1.enableBody = true;
			game.physics.p2.enable(deathCloud1);
			deathCloud1.physicsBodyType = Phaser.Physics.P2JS;
			deathCloud1.body.clearShapes();
			deathCloud1.body.setRectangle(160, 40);
			deathCloud1.body.setCollisionGroup(platform);
			deathCloud1.body.collides([touchPlatform]);
			deathCloud1.body.kinematic = true;
			deathCloud1.body.onBeginContact.add(killPlayer, this);

			var deathCloud2 = game.add.sprite(830, 250, 'deathCloudC');
			deathCloud2.enableBody = true;
			game.physics.p2.enable(deathCloud2);
			deathCloud2.physicsBodyType = Phaser.Physics.P2JS;
			deathCloud2.body.clearShapes();
			deathCloud2.body.setRectangle(50, 430);
			deathCloud2.body.setCollisionGroup(platform);
			deathCloud2.body.collides([touchPlatform]);
			deathCloud2.body.kinematic = true;
			deathCloud2.body.onBeginContact.add(killPlayer, this);

			//set waterfall platform prefabs
			platformSpeed = 210;
			lowY = 520;
			highY = 920;

		}else if(this.level == 5){//main house, horizontal cloud, and waterfall y values
			cloud1Exist = false;
			cloud2Exist = false;
			cloudHExist = true;
			
			//true values (REIMPLEMENT THESE AFTER DOOR IS ADDED)
			lowY = 1020;
			highY = 1200;
			platformSpeed = 50;

			//test values (REMOVE THESE AFTER DOOR IS IMPLEMENTED)
			lowY = 320;
			highY = 800;
			platformSpeed = 160;

			cloudH = game.add.sprite(500, 160, 'Cloud');
			cloudH.enableBody = true;
			game.physics.p2.enable(cloudH);
			cloudH.physicsBodyType = Phaser.Physics.P2JS;
			cloudH.body.clearShapes();
			cloudH.body.setRectangle(140, 3);
			cloudH.anchor.set(0.5);
			cloudH.body.setCollisionGroup(platform);
			cloudH.body.collides([touchPlatform]);
			cloudH.body.kinematic = true;
			cloudH.body.velocity.x = 150;


		}else if(this.level == 6){//main house, horizontal cloud, smoke, and waterfall y values
			cloud1Exist = true;
			cloud2Exist = false;
			cloudHExist = false;

			//create cloud platform
			cloud1Start = 280;
			cloud1Range = 160;

			cloud1 = game.add.sprite(810, cloud1Start, 'Cloud');
			cloud1.enableBody = true;
			game.physics.p2.enable(cloud1);
			cloud1.physicsBodyType = Phaser.Physics.P2JS;
			cloud1.body.clearShapes();
			cloud1.body.setRectangle(140, 3);
			cloud1.anchor.set(0.5);
			cloud1.body.setCollisionGroup(platform);
			cloud1.body.collides([touchPlatform]);
			cloud1.body.kinematic = true;

			var deathCloud2 = game.add.sprite(380, 460, 'deathCloudC');
			deathCloud2.enableBody = true;
			game.physics.p2.enable(deathCloud2);
			deathCloud2.physicsBodyType = Phaser.Physics.P2JS;
			deathCloud2.body.clearShapes();
			deathCloud2.body.setRectangle(50, 430);
			deathCloud2.body.setCollisionGroup(platform);
			deathCloud2.body.collides([touchPlatform]);
			deathCloud2.body.kinematic = true;
			deathCloud2.body.onBeginContact.add(killPlayer, this);

			//set waterfall platform prefabs
			platformSpeed = 150;
			lowY = 500;
			highY = 1200;

		}else if(this.level == 7){//main house, two verical clouds, smoke, and waterfall y values
			cloud1Exist = true;
			cloud2Exist = true;
			cloudHExist = false;

			//create cloud platform 1
			cloud1Start = 340;
			cloud1Range = 150;

			cloud1 = game.add.sprite(930, cloud1Start, 'Cloud');
			cloud1.enableBody = true;
			game.physics.p2.enable(cloud1);
			cloud1.physicsBodyType = Phaser.Physics.P2JS;
			cloud1.body.clearShapes();
			cloud1.body.setRectangle(140, 3);
			cloud1.anchor.set(0.5);
			cloud1.body.setCollisionGroup(platform);
			cloud1.body.collides([touchPlatform]);
			cloud1.body.kinematic = true;

			//create cloud platform 2
			cloud2Start = 820;
			cloud2Range = 280;

			cloud2 = game.add.sprite(260, cloud2Start, 'Cloud');
			cloud2.enableBody = true;
			game.physics.p2.enable(cloud2);
			cloud2.physicsBodyType = Phaser.Physics.P2JS;
			cloud2.body.clearShapes();
			cloud2.body.setRectangle(140, 3);
			cloud2.anchor.set(0.5);
			cloud2.body.setCollisionGroup(platform);
			cloud2.body.collides([touchPlatform]);
			cloud2.body.kinematic = true;

			var deathCloud1 = game.add.sprite(1020, 705, 'deathCloudB');
			deathCloud1.enableBody = true;
			game.physics.p2.enable(deathCloud1);
			deathCloud1.physicsBodyType = Phaser.Physics.P2JS;
			deathCloud1.body.clearShapes();
			deathCloud1.body.setRectangle(160, 40);
			deathCloud1.body.setCollisionGroup(platform);
			deathCloud1.body.collides([touchPlatform]);
			deathCloud1.body.kinematic = true;
			deathCloud1.body.onBeginContact.add(killPlayer, this);

			var deathCloud2 = game.add.sprite(570, 150, 'deathCloudB'); //change this later to be on top of the chimney
			deathCloud2.enableBody = true;
			game.physics.p2.enable(deathCloud2);
			deathCloud2.physicsBodyType = Phaser.Physics.P2JS;
			deathCloud2.body.clearShapes();
			deathCloud2.body.setRectangle(160, 40);
			deathCloud2.body.setCollisionGroup(platform);
			deathCloud2.body.collides([touchPlatform]);
			deathCloud2.body.kinematic = true;
			deathCloud2.body.onBeginContact.add(killPlayer, this);

			//set waterfall platform prefabs
			platformSpeed = 390;
			lowY = 625;
			highY = 1200;

		}else if(this.level == 8){//burning house, horizontal cloud, smoke, and waterfall y values
			cloud1Exist = true;
			cloud2Exist = false;
			cloudHExist = false;

			//create cloud platform 1
			cloud1Start = 700;
			cloud1Range = 170;
			cloud1Speed = 150;

			cloud1 = game.add.sprite(930, cloud1Start, 'Cloud');
			cloud1.enableBody = true;
			game.physics.p2.enable(cloud1);
			cloud1.physicsBodyType = Phaser.Physics.P2JS;
			cloud1.body.clearShapes();
			cloud1.body.setRectangle(140, 3);
			cloud1.anchor.set(0.5);
			cloud1.body.setCollisionGroup(platform);
			cloud1.body.collides([touchPlatform]);
			cloud1.body.kinematic = true;

			var deathCloud1 = game.add.sprite(1043, 625, 'deathCloudD');
			deathCloud1.enableBody = true;
			game.physics.p2.enable(deathCloud1);
			deathCloud1.physicsBodyType = Phaser.Physics.P2JS;
			deathCloud1.body.clearShapes();
			deathCloud1.body.setRectangle(140, 40);
			deathCloud1.body.setCollisionGroup(platform);
			deathCloud1.body.collides([touchPlatform]);
			deathCloud1.body.kinematic = true;
			deathCloud1.body.onBeginContact.add(killPlayer, this);

			//set waterfall platform prefabs
			platformSpeed = 90;
			lowY = 320;
			highY = 1150;
			
		}else if(this.level == 9){
			cloud1Exist = false;
			cloud2Exist = false;
			cloudHExist = false;
			playerStartY = playerStartY + 250;
			arrowStartY = arrowStartY + 250;
		}else if(this.level == 10){
			cloud1Exist = false;
			cloud2Exist = false;
			cloudHExist = false;
			arrowStartY = arrowStartY + 20;
		}

		

		//create player
		player = new Player(game, 100, playerStartY, 'characterSpritesheet', 'Walk1');
		game.add.existing(player);
		player.enableBody = true; 
		player.body.setCollisionGroup(touchPlatform);
		player.body.collides([platform/*, collectable*/]/*, refreshJump, this*/);
		player.body.onBeginContact.add(refreshJump, this);

		//create waterfall platform
		waterfallPlatform = new WheelPlatform(game, 1050, (lowY+highY)/2, 'wheelPlatform', 600, 900, 180); //game, x, y, image key, lowest y, highest y, speed
		game.add.existing(waterfallPlatform);
		waterfallPlatform.enableBody = true;
		waterfallPlatform.physicsBodyType = Phaser.Physics.P2JS;
		waterfallPlatform.body.setCollisionGroup(platform); 
		waterfallPlatform.body.collides([touchPlatform]);
		
		switchPool = game.add.sprite(705, 1080, 'poolSwitch', 'waterPool');
		switchPool.enableBody = true;
		game.physics.p2.enable(switchPool); //enable physics
		switchPool.physicsBodyType = Phaser.Physics.P2JS;
		switchPool.body.clearShapes();
		switchPool.body.setRectangle(101, 30);
		switchPool.anchor.set(0.5, 1);
		switchPool.body.kinematic = true;
		switchPool.body.setCollisionGroup(platform); 
		playerInPool = switchPool.body.collides([touchPlatform]);
		switchPool.body.onBeginContact.add(inPool, this);

		waterFrozen = false;

		//kill waterfall platform levels 9-10
		if(this.level >= 9){ //level 9 or 10
			waterfallPlatform.kill();
		} 

		//switch behavior
		function inPool(body, bodyB, shapeA, shapeB, equation){
			console.log('in the pool');
		}

		//add player animations
		player.animations.add('moving', [6, 7, 8, 5], 10, true); 
		player.animations.add('still', [5], 10, true); 
		player.animations.add('jumping', [1, 1, 2, 3, 3, 3, 3, 3, 0], 12, false); //
		//player.animations.add('falling', [0], 10, true); //moving sprite is third on tempSpritesheet
		player.animations.add('landing', [4, 4, 4], 10, true); //
		player.scale.set(0.8);

		//player.body.collideWorldBounds = true;
		function refreshJump(body, bodyB, shapeA, shapeB, equation){
			//if player collides with platform, do this
			//this is where landing animation should go, for only a few frames
			jumpOnce = true;
			//player.animations.play('landing');
		}


		upward = 0;

		testTimer = 0;
		jumpOnce = true;
		jumpAnimOnce = 0;
		direction = 0;

		function toNextLevel(body, bodyB, shapeA, shapeB, equation){
			endArrow.destroy();
			//increment level
			//this.level = this.level+1;
			currentLevel++;
			game.state.start('Cutscene', true, false, this.level); //move to Cutscene if spacebar is pressed
		}

		function killPlayer(body, bodyB, shapeA, shapeB, equation){
			
			game.state.start('Play', true, false, this.level); //move to Play if player dies
			deathFallNoise.play(); //play death sound
		}

		
		endArrow = new EndArrow(game, 1160, arrowStartY, 'endPetal');
		game.add.existing(endArrow);
		endArrow.enableBody = true;
		endArrow.physicsBodyType = Phaser.Physics.P2JS;
		endArrow.body.setCollisionGroup(platform); //this line causes error
		//end level if player runs into arrow
		endArrow.body.collides([touchPlatform]/*, toNextLevel, this*/);
		endArrow.body.onBeginContact.add(toNextLevel, this);
		

		//endArrow.body.onBeginContact.add(toNextlevel, this);

		

	},
	update: function(){
		//console.log(jumpOnce);
		var playerVelocity = 200; //CHANGE PLAYER VELOCITY HERE
		//create keyboard
		this.cursors = game.input.keyboard.createCursorKeys();

		//reset player velocity
		player.body.velocity.x = 0; //start by reseting velocity to zero

		//player dies if they fall into a pit (CURRENTLY NOT WORKING)
		if(player.y > 1450){ //if they exceed y value too much (i.e fall out of world bounds)
			if(this.level == 10){ //if they die in the last level
				currentLevel = 12;
				game.state.start('Cutscene', true, false, this.level); //move to alternate ending
			}else{
				game.state.start('Play', true, false, this.level); //move to Play if player dies
				deathFallNoise.play(); //play death sound
			}
		}


		//general movement of platform
		if(waterFrozen == false && upward == 0){
			waterfallPlatform.body.velocity.y = -1 * platformSpeed; //go upward
		}else if(waterFrozen == false && upward == 1){
			waterfallPlatform.body.velocity.y = platformSpeed; //go downward
		}else if(waterFrozen == true){
			waterfallPlatform.body.velocity.y = 0;
		}

		//general movement of cloud 1
		if(cloud1Exist && cloud1Upward == 0){
			cloud1.body.velocity.y = -1 * cloud1Speed; //go upward
		}else if(cloud1Exist && cloud1Upward == 1){
			cloud1.body.velocity.y = cloud1Speed; //go downward
		}

		//general movement of cloud 2
		if(cloud2Exist && cloud2Upward == 0){
			cloud2.body.velocity.y = -1 * cloud2Speed; //go upward
		}else if(cloud2Exist && cloud2Upward == 1){
			cloud2.body.velocity.y = cloud2Speed; //go downward
		}
	
		//swap directions
		if(waterfallPlatform.y > highY){ //upper limit
			upward = 0; //go up
		}else if(waterfallPlatform.y < lowY){ //lower limit
			upward = 1; //go down
		}else{
		}

		//swap directions
		if(cloud1Exist && cloud1.body.y > cloud1Start + cloud1Range){ //upper limit
			cloud1Upward = 0; //go up
		}else if(cloud1Exist && cloud1.body.y < cloud1Start - cloud1Range){ //lower limit
			cloud1Upward = 1; //go down
		}else{
		}

		//swap directions
		if(cloud2Exist && cloud2.body.y > cloud2Start + cloud2Range){ //upper limit
			cloud2Upward = 0; //go up
		}else if(cloud2Exist && cloud2.body.y < cloud2Start - cloud2Range){ //lower limit
			cloud2Upward = 1; //go down
		}else{
		}

		//cloud H wrap
		if(cloudHExist && cloudH.body.x > game.width + 100){
			cloudH.body.x = -100;
		}


		//jumping movement
		if(this.cursors.up.isDown){
			if(jumpOnce == true){
				player.body.velocity.y = -250; //jump
				//player.animations.play('jumping');
				jumpNoise.play(); //play jump sound
			}
			jumpOnce = false;
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
			if(jumpAnimOnce == 0){
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
		/*if(this.cursors.down.isDown){
			jumpOnce = 0;
			jumpAnimOnce = 0;
		}*/

		if(this.cursors.down.isDown /*&& playerInPool*/){ //if player is in pool when Down is pressed
			//console.log(downPress);
			if(waterFrozen == false && downPress == false){
				waterFrozen = true;
				waterfall.frame = 1;
				switchPool.frame = 0;
				downPress = true;
			}else if(waterFrozen == true && downPress == false){
				waterFrozen = false;
				waterfall.frame = 0;
				switchPool.frame = 1;
				downPress = true;
			}
		}else{
			downPress = false;
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

var Credits = function(game) {};
Credits.prototype = {
	preload: function(){
		console.log('Credits: preload');
	},
	create: function(){
		console.log('Credits: create');
		var CreditsText;
		//check to see if format is right if something goes wrong
		CreditsText = game.add.text(16, 16, 
			'CREDITS \n' +
			'Role: Kristofer Torres' + "\n" +
			'Role: Matthew Loebach' + "\n" +
			'Role: William Hintze' + "\n" +
			'Press Space to Exit' + "\n" +
			'this wont be what it looks like in the final game', 
			{fontSize: '32px', fill: '#000' });
		game.stage.backgroundColor = "#FACADE";
	},
	update: function(){
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			//pass this.score
			game.state.start('MainMenu', true, false, this.score);
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
game.state.add('Credits', Credits);
game.state.add('GameOver', GameOver);
//start at main menu
game.state.start('MainMenu');
