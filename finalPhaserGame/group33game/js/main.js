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
var waterfallCurrentY;
var waterfallCurrentUpward;
var switchPool;
var waterfall;
var doormat;
var jumpTimer = 0;
var defaultJumpVelocity = -180;
var jumpVelocity = defaultJumpVelocity;
var followJump = false;
var fadeEffect;
var CreditsText;
var rippleBackground;
var cutsceneBackground;
var playerInHouse = false;
var CutsceneText;
var cutsceneTime; //timer for cutscenes
var cutsceneLength = 250; //minimum time a cutscene can last
var upward = 0; //movement of the waterfall platform
var lowY; //lowest y point of the waterfall platform in the stage
var highY; //highest y point of the waterfall platform in the stage
var direction = 1; //1 for left, 0 for right
var jumpAnimOnce = 0;
var jumpOnce = true;
var testTimer = 0;
var jumpNoise;
var deathFallNoise;
var freezeSound;
var breakSound;
var breakNoiseOnce = false;
var chimneyNoise;
var thawSound;
var winSound;
var deathX;
var deathY;
var hasDied = false;
var winAnim = false;
var winAnimTimer = 0;
var cameraScroll;
var altEndTitle = false;
var goodEndTitle = false;
var cutsceneShade = 0;
var shadeEffect;

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
var cloud1CurrentY;
var cloud1CurrentUpward;
var cloud2CurrentY;
var cloud2CurrentUpward;
var cloudHCurrentX;
var cloud1Range; //vertical cloud
var cloud1Start;
var cloud1Upward = 0;
var cloud2Range; //vertical cloud 2
var cloud2Start;
var cloud2Upward = 0;
//var cloudHRange; //horizontal cloud
//var cloudHUpward = 0;
var windNoise;
var playerInPool = false;
var waterFrozen = false;
var playClick = false;
var creditsClick = false;
var platformSpeed = 0;
var downPress = false;


///game's script
//|                                    					    | text size
var BufferText1 = 'Petals are time’s flow given form. \n' + '\n' +

'They flow through the wind as freely \n' + 'as nature allows them to. \n' + '\n' +

'The blue sky, the high mountains, \n' + 'they are still young as they explore earth’s beauty… \n' + '\n';

var BufferText2 = 'The winds that carry the petals \n' + 'offer them a new place to live. \n' + '\n' +

'Some ride through clouds, \n' +
'some journey through the streams, \n' + 
'and some reach heights previously unreachable. \n' + '\n' +

 'Could this place be the one to call home? \n' + '\n';


var BufferText3 = 'Not all of the world is as kind, however. \n' + '\n' +

'Danger slowly festers around every corner. \n' + '\n' +

'Trust not the clouds that lie in wait to prey \n' +
'on the unwary, and return home for rest… \n' + '\n';


var BufferText4 = 'As the world withers away, \n' +
'it may be harder to find where home is. \n' + '\n' +

'Yet, it is not an impossibility. \n' + '\n' +

'Stop to reflect on a solution, \n' + 
'and surely you will triumph forward. \n' + '\n';


var BufferText5 = 'Solace. \n' + '\n' + 

'After enduring several hardships, \n' +
'stone plants itself in protection of the petals. \n' + '\n' +

'No danger in sight, perhaps now they \n' +
'may peacefully rest in their new sanctuary... \n' + '\n';

var BufferText6 = 'Quiet as it may be, \n' +
'their sanctuary is not impenetrable. \n' + '\n' +

'Even now, time makes way \n' +
'for brand new danger. \n' + '\n' +

'The dilemma arrives what to follow: \n' +
'silence of peace, or winds of progress? \n' + '\n';


var BufferText7 = 'Is their sanctuary truly a shelter...? \n' + '\n' + 

'Doubt, Fear, Worry... \n' +
'they all burrow into the harmony of peace. \n' + '\n' +

'The decision is made, and the petals \n' +
'choose to flow with the progressing winds. \n' + '\n';

var BufferText8 = 'Time slowly makes its reach over nature, \n' +
'acting with cruelty and brutality. \n' + '\n' +

'The sanctuary has become undone, \n' + 
'catching ablaze its own complacency. \n' + '\n' +

'The petals have no choice but continue forward… \n' + '\n';

var BufferText9 = 'The petals return to find their world left in ruin. \n' + '\n' +

'Though there is nostalgia for victories of the past, \n' + 
'there is only one way left standing to follow, upwards. \n' + '\n' +

'Hope shines through as the cycle of time \n' + 
'approaches the tip of its tail. \n' + '\n';

var BufferText10 = 'Peace returns as time catches up to previous danger, \n' +
'but the petals are not immune its universal pull either. \n' + '\n' +

'They reflect on their journey one last time, \n' + 
'this cycle of peace and corruption, \n' + 
'life, death, and rebirth, \n' + 
'destruction and reconstruction... \n' + '\n' +

'They follow their own wind, making one final leap....\n' + '\n';

var BufferTextEnd = 'You guide the petals towards their final memories. \n' + '\n' +
'They can finally rest with nature, \n' + '\n' +
'as the cycle begins once more in full bloom. \n' + '\n';


var BufferTextAlt = '….As you wish. \n' + '\n' +

'This cycle...this cycle of \n' +
'endless destruction and rebirth… \n' + '\n' +

'By your command, it is finished. \n' + '\n';



//Main Menu state
var MainMenu = function(game) {};
MainMenu.prototype = {
	preload: function(){
		console.log('MainMenu: preload');
		// preload assets

		//title screen assets
		game.load.image('titleImage', 'assets/img/TitleBackgroundEdit.png');
		game.load.image('titleImage2', 'assets/img/TitleBackgroundAltEnd.png');
		game.load.image('titleName', 'assets/img/TitleEdit.png');
		game.load.image('Petal3', 'assets/img/Petal3.png');
		game.load.image('Petal2', 'assets/img/Petal2.png');
		game.load.image('Blossom', 'assets/img/Petal1.png');
		game.load.image('PlayButton', 'assets/img/PlayButton.png');
		game.load.image('PlayShadow', 'assets/img/PlayShadow.png');
		game.load.image('CreditButton', 'assets/img/CreditButton.png');
		game.load.image('Select', 'assets/img/SelectIcon.png');
		//----
		game.load.image('rippleBackground', 'assets/img/rippleBackground.png');
		game.load.image('rippleFilter', 'assets/img/rippleFilter.png');
		game.load.image('creditsBackground', 'assets/img/creditsPage.png');
		game.load.image('tempPlayer', 'assets/img/placeholderSprite.png');
		game.load.image('testArena', 'assets/img/testArenaWide.png');
		game.load.image('testRuins', 'assets/img/testRuins.png');
		game.load.image('testFinal', 'assets/img/textFinalEnd.png');
		game.load.atlas('waterfallGraphics', 'assets/img/waterfallStates.png', 'js/json/waterfallGraphics.json');
		game.load.atlas('tempSpriteheet', 'assets/img/betaSpriteAtlas.png', 'js/json/betaSpriteAtlas.json');
		game.load.image('collideTest', 'assets/img/testSprite.png');
		game.load.image('wheelPlatform', 'assets/img/betaWheelPlatform.png');
		game.load.image('betaArrow', 'assets/img/betaArrow.png');
		game.load.image('endPetal', 'assets/img/endPetal.png');
		game.load.image('endParticle', 'assets/img/endParticle.png');
		game.load.image('smokeCloud', 'assets/img/chimneySmoke.png');
		game.load.image('deathPetal', 'assets/img/deathPetal.png');
		game.load.image('controlWindow', 'assets/img/controlWindow.png');
		game.load.image('FadeEffect', 'assets/img/FadeEffect.png');
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
		game.load.image('doormat', 'assets/img/doormat.png');
		game.load.physics('stageHitboxWide', 'js/json/stageWide1200.json', null);
		game.load.physics('ruinsHitbox', 'js/json/level9Hitbox2.json', null);
		game.load.physics('finalHitbox', 'js/json/level10Hitbox.json', null);
		game.load.atlas('poolSwitch', 'assets/img/switchPool.png', 'js/json/switchPool.json');
		game.load.physics('housePhysics', 'js/json/houseHitbox.json', null);
		game.load.atlas('characterSpritesheet', 'assets/img/characterSpritesheet.png', 'js/json/characterSprite.json');

		//------
		game.load.audio('jumpSound', ['assets/audio/jump.wav']);
		game.load.audio('deathFall', ['assets/audio/pitFall.wav']);
		game.load.audio('freezeSound', ['assets/audio/freezeSound.wav']);
		game.load.audio('thawSound', ['assets/audio/thawSound.wav']);
		game.load.audio('winSound', ['assets/audio/winLevel.wav']);
		game.load.audio('chimneyNoise', ['assets/audio/chimneyNoise.wav']);
		game.load.audio('windNoise', ['assets/audio/windNoise.mp3']);
		game.load.audio('break', ['assets/audio/break.wav'])

	},
	create: function() {
		console.log('MainMenu: create');
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		cutsceneShade = 0;

		if(altEndTitle == false){
			//adds the background image to the title screen
			this.add.image(0,0,'titleImage');

			//creates the petal falling animation and wrap
			for (var j =0; j < 40; j++){
				if(goodEndTitle){
					this.petalOne = new Title(game, 'endParticle');
					game.add.existing(this.petalOne);

					/*this.petalTwo = new Title(game, 'endParticle');
					game.add.existing(this.petalTwo);*/
				}else{
					this.petalOne = new Title(game, 'Petal2');
					game.add.existing(this.petalOne);

					this.petalTwo = new Title(game, 'Petal3');
					game.add.existing(this.petalTwo);
				}
			
				//this.Blossom = new Title(game, 'Blossom');
				//game.add.existing(this.Blossom);
			}

			//adds the title, play and credit icons
			this.add.image(200,350, 'titleName');

			//allows the user to click on the play button
			var ButtonPlay = this.add.image(525,925, 'PlayButton');
			ButtonPlay.inputEnabled = true;
			ButtonPlay.events.onInputDown.add(playButtonClicked, this);
			
		}else{
			this.add.image(0,0,'titleImage2');
			this.add.image(200,350, 'titleName');
			this.add.image(525, 925, 'PlayShadow');
		}

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

		/*windNoise = new Phaser.Sound(game, 'windNoise', 0.1, true);
		windNoise.volume = 0.1;
		windNoise.play();*/

		cutsceneTime = 0;
		

		

		//set background colors
		if(this.level == 1 || this.level == 2){
			game.stage.backgroundColor = "#fff9c2";
		}else if(this.level == 3 || this.level == 4){
			game.stage.backgroundColor = "#fde7b1";

		}else if(this.level == 5 || this.level == 6){
			game.stage.backgroundColor = "#ffd5b3";

		}else if(this.level == 7|| this.level == 8){
			game.stage.backgroundColor = "#ffb69e";

		}else if(this.level == 9 || this.level == 10){
			game.stage.backgroundColor = "#ffa791";
		}

		rippleBackground = game.add.tileSprite(0, 0, 1200, 1320, 'rippleBackground');

		let textStyle = {
			font: 'Optima',
			fontSize: 50,
			fill: '#000',
			wordWrap: false,
			wrapWidth: 1000
		}
		CutsceneText = game.add.text(game.width/2, (game.height/2)-100, 
			'Placeholder Cutscene Text\n', textStyle);
		CutsceneText.anchor.set(0.5);
		CutsceneText.alpha = 0;
		CutsceneText.align = 'center';

		//game.stage.backgroundColor = "#FACADE";
		//take cutscene text
		if(this.level == 1){
			CutsceneText.text = BufferText1;
		}else if(this.level == 2){
			CutsceneText.text = BufferText2;
		}else if(this.level == 3){
			CutsceneText.text = BufferText3;
		}else if(this.level == 4){
			CutsceneText.text = BufferText4;
		}else if(this.level == 5){
			CutsceneText.text = BufferText5;
		}else if(this.level == 6){
			CutsceneText.text = BufferText6;
		}else if(this.level == 7){
			CutsceneText.text = BufferText7;
		}else if(this.level == 8){
			CutsceneText.text = BufferText8;
		}else if(this.level == 9){
			CutsceneText.text = BufferText9;
		}else if(this.level == 10){
			CutsceneText.text = BufferText10;
		}else if(this.level == 11){
			CutsceneText.text = BufferTextEnd;
		}else if(this.level == 12){
			CutsceneText.text = BufferTextAlt;
		}
		shadeEffect = game.add.sprite(0, 0, 'rippleFilter');
		shadeEffect.alpha = cutsceneShade;
		cutsceneShade += 0.05;
		fadeEffect = game.add.sprite(0, 0, 'FadeEffect');
		cameraScroll = 0;
	},
	update: function(){
		rippleBackground.tilePosition.y += 4;
		cutsceneTime++; //increment cutscene time
		fadeEffect.alpha -= cameraScroll;
		if(CutsceneText.alpha < 1){
			CutsceneText.alpha += 0.02;
		}
		cameraScroll += 0.005;
		if(cutsceneTime == cutsceneLength){
			CutsceneText.text =
			CutsceneText.text +
			'Press Space to Continue';
		}
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && (cutsceneTime > cutsceneLength) && this.cache.isSoundDecoded('windNoise')){ 
		//space bar is pressed and cutscene time is enough
			cutsceneTime = 0;
			if(this.level <= 10){ //if the game is in a standard level #
				game.state.start('Play', true, false, this.level); //move to Play if spacebar is pressed
				cameraScroll = 0;
				//wait for mp3 to decode
				/*if(this.cache.isSoundDecoded('windNoise')){
					game.state.start('Play', true, false, this.level); //move to Play if spacebar is pressed
				}*/
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

		//play bg noise
		if(this.level == 1){
			windNoise = new Phaser.Sound(game, 'windNoise', 0.1, true);
			windNoise.volume = 0.15;
			windNoise.play();
		}
		
		game.physics.p2.setImpactEvents(true);
		winAnim = false;
		//put in sunset backgrounds

		if(this.level == 1 || this.level == 10){ //levels 1 and 10
			game.stage.backgroundColor = "#A497B9";
		}else if(this.level == 2 || this.level == 9){//level 2 and 9
			game.stage.backgroundColor = "#C89EC9";
		}else if(this.level == 3 || this.level == 8){ //levels 1 and 10
			game.stage.backgroundColor = "#E2AABD";
		}else if(this.level == 4 || this.level == 7){//level 2 and 9
			game.stage.backgroundColor = "#F1BCB3";
		}else if(this.level == 5 || this.level == 6){ //levels 1 and 10
			game.stage.backgroundColor = "#EFCDC7";
		}
		
		//game.stage.backgroundColor = "#da9986";

		//create cloud group
		/*var cloudVertical = game.add.group();
		var cloudHorizontal = game.add.group();*/

		//set up base variables
		var playerStartY = 390;
		var arrowStartY = 90;

		game.world.setBounds(0, 0, 3000, 1320);

		//load all sound effects
		jumpNoise = game.add.audio('jumpSound');
		jumpNoise.volume = 0.5;
		deathFallNoise = game.add.audio('deathFall');
		freezeSound = game.add.audio('freezeSound');
		freezeSound.volume = 0.5;
		thawSound = game.add.audio('thawSound');
		thawSound.volume = 0.5;
		chimneyNoise = game.add.audio('chimneyNoise');
		chimneyNoise.volume = 0.5;
		winSound = game.add.audio('winSound');
		winSound.volume = 0.5;
		breakSound = game.add.audio('break');
		breakSound.volume = 0.5;

		//set up collision groups
		var platform = game.physics.p2.createCollisionGroup();
		var touchPlatform = game.physics.p2.createCollisionGroup();
		
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
		rightWall.fixedToCamera = true;
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
			bridge3.body.setRectangle(170, 25);

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

			arena = new Arena(game, 900, (game.height)/2, 'testFinal', this.level);
			game.add.existing(arena);
			arena.enableBody = true;
			//arena.anchor.set(0);
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

			var cloud1Y;
			if(hasDied == false){
				cloud1Y = cloud1Start;
			}else{
				cloud1Y = cloud1CurrentY;
			}

			cloud1 = game.add.sprite(800, cloud1Y, 'Cloud');
			cloud1.enableBody = true;
			game.physics.p2.enable(cloud1);
			cloud1.physicsBodyType = Phaser.Physics.P2JS;
			cloud1.body.clearShapes();
			cloud1.body.setRectangle(140, 40);
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

			var cloud1Y;
			if(hasDied == false){
				cloud1Y = cloud1Start;
			}else{
				cloud1Y = cloud1CurrentY;
			}

			cloud1 = game.add.sprite(430, cloud1Y, 'Cloud');
			cloud1.enableBody = true;
			game.physics.p2.enable(cloud1);
			cloud1.physicsBodyType = Phaser.Physics.P2JS;
			cloud1.body.clearShapes();
			cloud1.body.setRectangle(140, 40);
			cloud1.anchor.set(0.5);
			cloud1.body.setCollisionGroup(platform);
			cloud1.body.collides([touchPlatform]);
			cloud1.body.kinematic = true;

			var cloudHX;
			if(hasDied == false){
				cloudHX = 30;
			}else{
				cloudHX = cloudHCurrentX;
			}

			cloudH = game.add.sprite(cloudHX, 180, 'Cloud');
			cloudH.enableBody = true;
			game.physics.p2.enable(cloudH);
			cloudH.physicsBodyType = Phaser.Physics.P2JS;
			cloudH.body.clearShapes();
			cloudH.body.setRectangle(140, 40);
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
			cloud1Start = 320;
			cloud1Range = 190;

			var cloud1Y;
			if(hasDied == false){
				cloud1Y = cloud1Start;
			}else{
				cloud1Y = cloud1CurrentY;
			}

			cloud1 = game.add.sprite(930, cloud1Y, 'Cloud');
			cloud1.enableBody = true;
			game.physics.p2.enable(cloud1);
			cloud1.physicsBodyType = Phaser.Physics.P2JS;
			cloud1.body.clearShapes();
			cloud1.body.setRectangle(140, 40);
			cloud1.anchor.set(0.5);
			cloud1.body.setCollisionGroup(platform);
			cloud1.body.collides([touchPlatform]);
			cloud1.body.kinematic = true;

			//create cloud platform 2
			cloud2Start = 820;
			cloud2Range = 200;

			var cloud2Y;
			if(hasDied == false){
				cloud2Y = cloud2Start;
			}else{
				cloud2Y = cloud2CurrentY;
			}

			cloud2 = game.add.sprite(260, cloud2Y, 'Cloud');
			cloud2.enableBody = true;
			game.physics.p2.enable(cloud2);
			cloud2.physicsBodyType = Phaser.Physics.P2JS;
			cloud2.body.clearShapes();
			cloud2.body.setRectangle(140, 40);
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

			var cloudHX;
			if(hasDied == false){
				cloudHX = 500;
			}else{
				cloudHX = cloudHCurrentX;
			}

			cloudH = game.add.sprite(cloudHX, 120, 'Cloud');
			cloudH.enableBody = true;
			game.physics.p2.enable(cloudH);
			cloudH.physicsBodyType = Phaser.Physics.P2JS;
			cloudH.body.clearShapes();
			cloudH.body.setRectangle(140, 40);
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
			cloud1Range = 180;

			var cloud1Y;
			if(hasDied == false){
				cloud1Y = cloud1Start;
			}else{
				cloud1Y = cloud1CurrentY;
			}

			cloud1 = game.add.sprite(810, cloud1Y, 'Cloud');
			cloud1.enableBody = true;
			game.physics.p2.enable(cloud1);
			cloud1.physicsBodyType = Phaser.Physics.P2JS;
			cloud1.body.clearShapes();
			cloud1.body.setRectangle(140, 40);
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
			cloud1Start = 380;
			cloud1Range = 150;
			cloud1Speed = 150;
			cloud2Speed = 150;

			var cloud1Y;
			if(hasDied == false){
				cloud1Y = cloud1Start;
			}else{
				cloud1Y = cloud1CurrentY;
			}

			cloud1 = game.add.sprite(930, cloud1Y, 'Cloud');
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

			var cloud2Y;
			if(hasDied == false){
				cloud2Y = cloud2Start;
			}else{
				cloud2Y = cloud2CurrentY;
			}

			cloud2 = game.add.sprite(260, cloud2Y, 'Cloud');
			cloud2.enableBody = true;
			game.physics.p2.enable(cloud2);
			cloud2.physicsBodyType = Phaser.Physics.P2JS;
			cloud2.body.clearShapes();
			cloud2.body.setRectangle(140, 40);
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

			var deathCloud2 = game.add.sprite(565, 110, 'deathCloudB'); //change this later to be on top of the chimney
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
			cloud1Speed = 130;

			var cloud1Y;
			if(hasDied == false){
				cloud1Y = cloud1Start;
			}else{
				cloud1Y = cloud1CurrentY;
			}

			cloud1 = game.add.sprite(930, cloud1Y, 'Cloud');
			cloud1.enableBody = true;
			game.physics.p2.enable(cloud1);
			cloud1.physicsBodyType = Phaser.Physics.P2JS;
			cloud1.body.clearShapes();
			cloud1.body.setRectangle(140, 40);
			cloud1.anchor.set(0.5);
			cloud1.body.setCollisionGroup(platform);
			cloud1.body.collides([touchPlatform]);
			cloud1.body.kinematic = true;

			var deathCloud1 = game.add.sprite(1043, 545, 'deathCloudD');
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
			platformSpeed = 140;
			lowY = 320;
			highY = 1150;
			
		}else if(this.level == 9){
			cloud1Exist = false;
			cloud2Exist = false;
			cloudHExist = false;
			playerStartY = playerStartY + 250;
			arrowStartY = arrowStartY + 250;
		}else if(this.level == 10){
			cloud1Exist = true;
			cloud2Exist = false;
			cloudHExist = false;
			arrowStartY = arrowStartY + 70;

			//create cloud platform 1
			cloud1Start = 580;
			cloud1Range = 65;
			cloud1Speed = 60;

			cloud1 = game.add.sprite(760, cloud1Start, 'Cloud');
			cloud1.enableBody = true;
			game.physics.p2.enable(cloud1);
			cloud1.physicsBodyType = Phaser.Physics.P2JS;
			cloud1.body.clearShapes();
			cloud1.body.setRectangle(140, 40);
			cloud1.anchor.set(0.5);
			cloud1.body.setCollisionGroup(platform);
			cloud1.body.collides([touchPlatform]);
			cloud1.body.kinematic = true;

		}

		

		//create player
		player = new Player(game, 100, playerStartY, 'characterSpritesheet', 'Walk1');
		game.add.existing(player);
		player.enableBody = true; 
		player.body.setCollisionGroup(touchPlatform);
		player.body.collides([platform/*, collectable*/], /*refreshJump, this*/);
		player.body.onBeginContact.add(refreshJump, this);
		player.body.onEndContact.add(deleteJump, this);

		//create waterfall platform
		var waterfallY;
		if(hasDied == false){
			waterfallY = (lowY+highY)/2
		}else{
			waterfallY = waterfallCurrentY;
		}
		waterfallCurrentY;
		waterfallPlatform = new WheelPlatform(game, 1050, waterfallY, 'wheelPlatform', 600, 900, 180); //game, x, y, image key, lowest y, highest y, speed
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
		switchPool.body.setRectangle(80, 30);
		switchPool.anchor.set(0.5, 1);
		switchPool.body.kinematic = true;
		switchPool.body.setCollisionGroup(platform); 
		switchPool.body.collides([touchPlatform],/* inPool, this*/);
		switchPool.body.onBeginContact.add(inPool, this);
		switchPool.body.onEndContact.add(outPool, this);

		waterFrozen = false;

		doormat = game.add.sprite(602, 695, 'doormat');
		doormat.enableBody = true;
		game.physics.p2.enable(doormat);
		doormat.physicsBodyType = Phaser.Physics.P2JS;
		doormat.body.clearShapes();
		doormat.body.setRectangle(60*1.3, 7*1.3);
		doormat.anchor.set(0.5, 0.5);
		doormat.scale.set(1.3);
		doormat.body.kinematic = true;
		doormat.body.setCollisionGroup(platform); 
		doormat.body.collides([touchPlatform],/* inPool, this*/);
		doormat.body.onBeginContact.add(inDoor, this);
		doormat.body.onEndContact.add(outDoor, this);


		//kill waterfall platform levels 9-10
		if(this.level >= 9){ //level 9 or 10
			waterfallPlatform.kill();
			switchPool.kill();
			doormat.kill();
		}
		if(this.level <= 4){
			doormat.kill();
		}

		//negative priority playerInPool false
		//switch behavior
		function inPool(body, bodyB/*, shapeA, shapeB, equation*/){
			//console.log('in the pool');
			playerInPool = true;
		}
		function outPool(body, bodyB/*, shapeA, shapeB, equation*/){
			//console.log('in the pool');
			playerInPool = false;
		}
		function inDoor(body, bodyB/*, shapeA, shapeB, equation*/){
			//console.log('in the pool');
			playerInHouse = true;
		}
		function outDoor(body, bodyB/*, shapeA, shapeB, equation*/){
			//console.log('in the pool');
			playerInHouse = false;
		}

		//add player animations
		player.animations.add('moving', [6, 7, 8, 5], 10, true); 
		player.animations.add('still', [5], 10, true); 
		player.animations.add('jumping', [1, 1, 2, 2, 3, 3, 3, 3, 3, 3, 0], 24, false); //
		player.animations.add('falling', [0], 10, true); //moving sprite is third on tempSpritesheet
		player.animations.add('landing', [4, 4, 4], 10, true); //
		player.scale.set(0.8);

		//player.body.collideWorldBounds = true;
		function refreshJump(body, bodyB/*, shapeA, shapeB, equation*/){
			//if player collides with platform, do this
			//this is where landing animation should go, for only a few frames
			//console.log('refreshing');
			jumpOnce = true;
			jumpVelocity = defaultJumpVelocity;
			jumpTimer = 0;
			followJump = false;
			//player.animations.play('landing');
		}

		function deleteJump(body, bodyB/*, shapeA, shapeB, equation*/){
			//if player collides with platform, do this
			//this is where landing animation should go, for only a few frames
			//console.log('refreshing');
			jumpOnce = false;
			//player.animations.play('landing');
		}

		if(hasDied == false){
			upward = 0;
			cloud1Upward = 0;
			cloud2Upward = 0;
		}else{
			upward = waterfallCurrentUpward;
			cloud1Upward = cloud1CurrentUpward;
			cloud2Upward = cloud2CurrentUpward;
		}

		testTimer = 0;
		jumpOnce = true;
		jumpAnimOnce = 0;
		direction = 0;

		if(hasDied == true){
			//console.log(deathX);
			deathFallNoise.play();
			var deathSpot = game.add.emitter(deathX, deathY, 50);
			deathSpot.makeParticles('deathPetal');
			//deathSpot.setAngle(1,2);
			//deathSpot.setAngle(280, 330);
			//deathSpot.setXSpeed(-90, -20);
			//deathSpot.setYSpeed(-35 , 50);
			deathSpot.start(true, 5000, 0, 60);
		}

		function toNextLevel(body, bodyB, shapeA, shapeB, equation){
			endArrow.kill();
			hasDied = false;
			//increment level
			//this.level = this.level+1;
			currentLevel++;
			player.kill();
			winSound.play();
			var winSpot = game.add.emitter(endArrow.body.x, endArrow.body.y);
			winSpot.makeParticles('endParticle');
			//deathSpot.setAngle(1,2);
			//deathSpot.setAngle(280, 330);
			winSpot.setXSpeed(-350, -200);
			if(this.level < 10){
				winSpot.gravity = new Phaser.Point(-200, 30);
			}else{
				winSpot.gravity = new Phaser.Point(1000, -300);
				winSpot.setAlpha(0.55, 0.7, 200);
			}
			
			//winSpot.setYSpeed(0, 0);
			winSpot.start(false, 5000, 10, 230);
			winAnim = true;
			//game.state.start('Cutscene', true, false, this.level); //move to Cutscene if spacebar is pressed
		}

		function killPlayer(body, bodyB, shapeA, shapeB, equation){
			deathX = player.body.x;
			deathY = player.body.y;
			hasDied = true;
			game.state.start('Play', true, false, this.level); //move to Play if player dies
			
		}

		
		endArrow = new EndArrow(game, 1160, arrowStartY, 'endPetal');
		game.add.existing(endArrow);
		endArrow.enableBody = true;
		endArrow.physicsBodyType = Phaser.Physics.P2JS;
		endArrow.body.setCollisionGroup(platform); //this line causes error
		//end level if player runs into arrow
		endArrow.body.collides([touchPlatform]/*, toNextLevel, this*/);
		endArrow.body.onBeginContact.add(toNextLevel, this);

		var arrowBounce = game.add.tween(endArrow);
		arrowBounce.to({y: game.world.height-endArrow.height}, 2000, Phaser.Easing.Bounce.In, true);
		arrowBounce.start();
		

		//endArrow.body.onBeginContact.add(toNextlevel, this);
		fadeEffect = game.add.sprite(0, 0, 'FadeEffect');
		fadeEffect.fixedToCamera = true;
		fadeEffect.alpha = 0;

		

	},
	update: function(){
		//console.log(jumpAnimOnce);
		var playerVelocity = 200; //CHANGE PLAYER VELOCITY HERE
		//create keyboard
		this.cursors = game.input.keyboard.createCursorKeys();

		//reset player velocity
		player.body.velocity.x = 0; //start by reseting velocity to zero

		//player dies if they fall into a pit 
		if(player.y > 1450){ //if they exceed y value too much (i.e fall out of world bounds)
			if(this.level == 10){ //if they die in the last level
				currentLevel = 12;
				altEndTitle = true;
				if(breakNoiseOnce == false){
					breakSound.play();
					breakNoiseOnce = true;
				}
				if(fadeEffect.alpha < 1 && winAnimTimer > 60){
					fadeEffect.alpha = fadeEffect.alpha+(0.006);
				}
				winAnimTimer++;
				if(winAnimTimer == 240){
					game.state.start('Cutscene', true, false, this.level); //move to alternate ending
					winAnimTimer = 0;
					breakNoiseOnce = false;
				}
			}else{
				//killPlayer()
				deathX = player.body.x;
				deathY = 1325;
				hasDied = true;
				game.state.start('Play', true, false, this.level); //move to Play if player dies
			}
		}


		//general movement of platform
		waterfallCurrentY = waterfallPlatform.body.y;
		waterfallCurrentUpward = upward;
		if(waterFrozen == false && upward == 0){
			waterfallPlatform.body.velocity.y = -1 * platformSpeed; //go upward
		}else if(waterFrozen == false && upward == 1){
			waterfallPlatform.body.velocity.y = platformSpeed; //go downward
		}else if(waterFrozen == true){
			waterfallPlatform.body.velocity.y = 0;
		}

		//general movement of cloud 1
		if(cloud1Exist){
			cloud1CurrentY = cloud1.body.y;
			cloud1CurrentUpward = cloud1Upward;
		}
		if(cloud1Exist && cloud1Upward == 0){
			cloud1.body.velocity.y = -1 * cloud1Speed; //go upward
		}else if(cloud1Exist && cloud1Upward == 1){
			cloud1.body.velocity.y = cloud1Speed; //go downward
		}

		//general movement of cloud 2
		if(cloud2Exist){
			cloud2CurrentY = cloud2.body.y;
			cloud2CurrentUpward = cloud2Upward;
		}
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
		if(cloudHExist){
			cloudHCurrentX = cloudH.body.x;
		}
		if(cloudHExist && cloudH.body.x > game.width + 100){
			cloudH.body.x = -100;
		}


		//jumping movement
		if(this.cursors.up.isDown){
			if(jumpOnce == true){
				player.body.velocity.y = defaultJumpVelocity;
				jumpNoise.play(); //play jump sound
				followJump = true;
			}
			if(jumpTimer < 15 && followJump){
				player.body.velocity.y = jumpVelocity; //jump
			}
			jumpVelocity -= 10;
			jumpTimer++;
			
			//jumpOnce = false;
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
		if(this.cursors.up.isDown && followJump == true && jumpOnce == false){ //upward movement
			//player.animations.play('jumping');
			if(jumpAnimOnce == 0){
				player.animations.play('jumping');
			}

			jumpAnimOnce = 1;
		}else if(jumpOnce == false){
			player.animations.play('falling');
		}else{
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
		
		if(this.cursors.down.isDown && playerInPool){ //if player is in pool when Down is pressed
			//console.log(downPress);
			if(waterFrozen == false && downPress == false){
				waterFrozen = true;
				waterfall.frame = 1;
				switchPool.frame = 0;
				freezeSound.play();
				downPress = true;
			}else if(waterFrozen == true && downPress == false){
				waterFrozen = false;
				waterfall.frame = 0;
				switchPool.frame = 1;
				thawSound.play();
				downPress = true;
			}
		}else{
			downPress = false;
		}

		if(this.cursors.down.isDown && playerInHouse){ //if player is in house when Down is pressed
			//console.log(downPress);
			//if(downPress == false){
				player.body.velocity.y = -250;
				player.body.x = 570;
				chimneyNoise.play(); //play jump sound
				player.body.y = 150;

				var chimneySpot = game.add.emitter(565, 190);
				chimneySpot.makeParticles('smokeCloud');
				chimneySpot.setYSpeed(-350, -200);
				chimneySpot.gravity = new Phaser.Point(400, -80);

				//winSpot.setYSpeed(0, 0);
				chimneySpot.setAlpha(0.8, 0.8);
				chimneySpot.start(true, 2000, 10, 4);
				//downPress = true;
			//}
		}else{
			//downPress = false;
		}

		if(winAnim == true){
			winAnimTimer++;
			
			if(fadeEffect.alpha < 1){
				fadeEffect.alpha = fadeEffect.alpha+(0.006);
			}
			if(this.level > 9){
				game.camera.x = game.camera.x+cameraScroll;
				cameraScroll = cameraScroll + 0.08;
			}
			if(winAnimTimer == 240){
				game.state.start('Cutscene', true, false, this.level); //move to Cutscene if spacebar is pressed
				winAnimTimer = 0;
				cameraScroll = 0;
				goodEndTitle = true;

			}	
		}
		//refresh jump function check
		/*if(jumpOnce == 0){
			game.stage.backgroundColor = "#FFFFCC";
		}else if(jumpOnce == 1){
			game.stage.backgroundColor = "#666600";
		}*/
		
			
	},
	render: function(){
		 //game.debug.cameraInfo(game.camera, 32, 32);

		//game.debug.body(platform);
		//game.debug.body(touchPlatform);
		//game.debug.spriteInfo(player, 32, 32);
	}
}

/*var deathAnimation = function(game) {};
deathAnimation.prototype = {
	preload: function(){
		console.log('deathAnimation: preload');
	},
	create: function(){
		console.log('deathAnimation: create');
		deathFallNoise.play(); //play death sound

	},
	update: function(){
		game.state.start('Play', true, false, this.level); //move to Play if player dies
	}
}

var winAnimation = function(game) {};
winAnimation.prototype = {
	preload: function(){
		console.log('winAnimation: preload');
	},
	create: function(){
		console.log('winAnimation: craete');
	},
	update: function(){

	}
}*/

var Credits = function(game) {};
Credits.prototype = {
	preload: function(){
		console.log('Credits: preload');
	},
	create: function(){
		console.log('Credits: create');

		cutsceneBackground = game.add.tileSprite(0, 0, 1200, 1320, 'creditsBackground');

		CreditsText;
		//check to see if format is right if something goes wrong
		let textStyle = {
			font: 'Optima',
			fontSize: 70,
			fill: '#000',
			wordWrap: false,
			wrapWidth: 1000
		}
		
		

		CreditsText = game.add.text(game.width/2, game.height/2-120, 
			'CREDITS \n' + "\n" + 
			'Main Artist: Kristofer Torres' + "\n" +
			'Character Design: Kristofer Torres' + "\n" +
			'Main Programmer: Matthew Loebach' + "\n" +
			'Level Designer: Matthew Loebach' + "\n" +
			'Story: William Hintze' + "\n" + "\n" +
			'Press Space to Exit' + "\n", 
			textStyle);
		CreditsText.anchor.set(0.5);
		CreditsText.alpha = 0;
		CreditsText.align = 'center';

		game.stage.backgroundColor = "#CAE7EF";
	},
	update: function(){
		//cutsceneBackground.tilePosition.y += 1;
		cutsceneBackground.tilePosition.x -= 4;
		if(CreditsText.alpha < 1){
			CreditsText.alpha += 0.02;
		}
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
/*game.state.add('deathAnimation', deathAnimation);
game.state.add('winAnimation', winAnimation);*/
//start at main menu
game.state.start('MainMenu');
