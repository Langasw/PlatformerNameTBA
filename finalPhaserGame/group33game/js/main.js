//Main Project
"use strict"; //use strict

var game = new Phaser.Game(1200, 1320, Phaser.AUTO);

//DECLARE GLOBAL VARIABLES

var player; //Player Sprite
var currentLevel = 0; //Level Variable
var arena; //Arena Sprite
var endArrow; //Ending Petal Sprite
var waterfallPlatform; //Waterfall Platform Sprite
var waterfallCurrentY; //tracker for Waterfall Platform Y Position between states
var waterfallCurrentUpward; //tracker for Waterfall Platform's Veritcal Direction between states
var switchPool; //Cave's Pool switch Sprite
var offPlatform = 0; //timer for how long a player has been off a platform (for animations)
var waterfall; //Waterfall Sprite
var doormat; //Sprite for house's doormat/hitbox for house chimney trick
var wheel; //cosmetic sprite for the wheel on the Waterfall Platform
var jumpTimer = 0; //timer for how long the minimum jump lasts
var jumpHitbox; //Sprite for the Hitbox of the player's feet/jump refresh
var upWait = 0; //timer for how long until player can press Up.
var defaultJumpVelocity = -180; //upward velocity of the minimum possible jump
var jumpVelocity = defaultJumpVelocity; //dynamic velocity of jumping variable
var followJump = false; //boolean for if the player is in the follow up part of the jump or not
var fadeEffect; //sprite for the fade to black screen
var CreditsText; //sprite for the text in the credits
var SubtitleText; //sprite for subtitle text in credit
var CreditsState = 0; //variable that keeps track which screen the credits are in
var expandedCredits; //sprite for expanded text in credits
var rippleBackground; //parallax background for the credits
var CutsceneText; //sprite for text in cutscenes
var cutsceneBackground; //parallax background of the cutscenes
var cutsceneTime; //timer for cutscenes
var cutsceneLength = 250; //minimum time a cutscene can last
var upward = 0; //movement of the waterfall platform
var lowY; //lowest y point of the waterfall platform in the stage
var highY; //highest y point of the waterfall platform in the stage
var direction = 1; //1 for left, 0 for right
var jumpAnimOnce = 0; //boolean for if the jump animation is active or not
var jumpOnce = false; //boolean for to make sure jumping happens only once on press
var playerInHouse = false; //boolean for if the player is in the house or not
var deathX; //x position where the player last died
var deathY; //y position where the player last died
var hasDied = false; //boolean for if the play state is coming after a player death
var winAnim = false; //boolean to start the win animation
var winAnimTimer = 0; //timer for how long the win animation should last
var cameraScroll; //variable that gives dynamic motion to the camera movement in the good end
var altEndTitle = false; //boolean for if the title is for the alternate end or not
var goodEndTitle = false; //boolean for if the title is for the good end or not
var cutsceneShade = 0; //level of darkness that should be applied to each cutscene
var shadeEffect; //sprite for the shade effect applied to cutscenes over time
var gameSky; //parallax scrolling background for the sky
var playerInPool = false; //boolean for if the player is in the pool or not
var waterFrozen = false; //boolean for if the water is frozen or not
var playClick = false; //boolean for if the play button was clicked or not
var creditsClick = false; //boolean for if the credits button was clicked or not
var platformSpeed = 0; //how fast the waterfall platform goes
var downPress = false; //was down pressed or not

var windNoise; //variable for ambient wind noise
var jumpNoise; //variable for jumping sound effect
var deathFallNoise; //variable for death sound effect
var freezeSound; //variable for freeze sound effect
var thawSound;//variable for the thawing sound
var breakSound; //variable for alternate ending death sound effect
var breakNoiseOnce = false; //variable to ensure the break noise happens only once
var burnNoise; //variable for burning sound effect
var level9wind; //variable for the level 9 theme
var chimneyNoise; //variable for the noise when the player pops from a chimney
var winSound; //variable for the victory sound effect

///CLOUD FUNCTIONS (because theres a lot of them)
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




///game's script (in order of cutscene)
//Search BufferText[Level#] for each the text that corresponds to each level
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
		// preload the game's assets

		//title screen assets
		game.load.image('titleImage', 'assets/img/TitleBackgroundEdit.png'); //main background
		game.load.image('titleImage2', 'assets/img/TitleBackgroundAltEnd.png'); //alt end background
		game.load.image('titleName', 'assets/img/TitleEdit.png'); //title name
		game.load.image('Petal3', 'assets/img/Petal3.png'); //petal asset 1
		game.load.image('Petal2', 'assets/img/Petal2.png'); //petal asset 2
		game.load.image('Blossom', 'assets/img/Petal1.png'); //petal blossom
		game.load.image('PlayButton', 'assets/img/PlayButton.png'); //play button
		game.load.image('PlayShadow', 'assets/img/PlayShadow.png'); //play button's shadow
		game.load.image('CreditButton', 'assets/img/CreditButton.png'); //credits button
		game.load.image('Select', 'assets/img/SelectIcon.png'); //select icon
		//----
		game.load.image('rippleBackground', 'assets/img/rippleBackground.png'); //cutscene's ripple bg
		game.load.image('Sky1', 'assets/img/Sky1.png'); //bg for levels 1 and 10
		game.load.image('Sky2', 'assets/img/Sky2.png'); //bg for levels 2 and 9
		game.load.image('Sky3', 'assets/img/Sky3.png'); //bg for levels 3 and 8
		game.load.image('Sky4', 'assets/img/Sky4.png'); //bg for levels 4 and 7
		game.load.image('Sky5', 'assets/img/Sky5.png'); //bg for levels 5 and 6
		game.load.image('rippleFilter', 'assets/img/rippleFilter.png'); //darkening filer for cutscenes
		game.load.image('creditsBackground', 'assets/img/creditsPage.png'); //background for credits page
		game.load.image('extendedCredits', 'assets/img/extendedCredits.png') //sprite for extended credits text
		game.load.image('testArena', 'assets/img/mainArena2.png'); //arena for levels 1-8
		game.load.image('testRuins', 'assets/img/testRuinsF.png'); //arena for level 9
		game.load.image('testFinal', 'assets/img/finalArena.png'); //arena for level 10
		game.load.atlas('waterfallGraphics', 'assets/img/WaterfallFlow.png', 'js/json/WaterfallFlow.json'); //animated waterfall sprite
		game.load.atlas('waterfallFrozen', 'assets/img/WaterfallFrozen.png', 'js/json/WaterfallFlow.json'); //frames for frozen waterfall
		game.load.image('wheelPlatform', 'assets/img/WheelPlatform.png'); //sprite for platform of wheel platform
		game.load.image('wheel', 'assets/img/WheelPart.png'); //sprite for wheel of wheel platform
		game.load.image('endPetal', 'assets/img/endPetal.png'); //sprite for victory end petal
		game.load.image('seed', 'assets/img/FlowerBud.png'); //sprite for flower seed
		game.load.image('sprout', 'assets/img/FlowerYouth.png'); //sprite for flower bud
		game.load.atlas('flowers', 'assets/img/flowers.png', 'js/json/flowers.json'); //animated sprite for flowers
		game.load.image('endParticle', 'assets/img/endParticle.png'); //particle effect petals that spawn when player wins
		game.load.image('smokeCloud', 'assets/img/chimneySmoke.png'); //particle effect for player jumping out of chimney
		game.load.image('deathPetal', 'assets/img/deathPetal.png'); //particle effect for petals in death animation
		game.load.image('controlWindow', 'assets/img/controlWindow.png'); //control window sprite
		game.load.image('FadeEffect', 'assets/img/FadeEffect.png'); //sprite for fade to black effect
		game.load.image('secretWalls', 'assets/img/secretWalls.png'); //sprite for hidden bound walls
		game.load.image('caveBackground', 'assets/img/caveBackground.png'); //background elements of the level 9 cave
		game.load.image('mainBackground', 'assets/img/mainBackground.png'); //background elements for the level 1-8 arena
		game.load.image('Bridge1', 'assets/img/BridgeA.png'); //sprite for leftmost bridge
		game.load.image('Bridge2', 'assets/img/BridgeB.png'); //sprite for bridge in cave
		game.load.image('Bridge3', 'assets/img/BridgeC.png'); //sprite for l-shaped bridge
		game.load.image('Cloud', 'assets/img/Cloud.png'); //sprite for cloud platform
		game.load.atlas('deathCloudLongA', 'assets/img/FlameLongA.png', 'js/json/FlameLongA.json'); //sprite for long death clouds
		game.load.atlas('deathCloudLongB', 'assets/img/FlameLongB.png', 'js/json/FlameLongB.json'); //sprite for longer death clouds
		game.load.atlas('deathCloudWideA', 'assets/img/FlameWideA.png', 'js/json/FlameWideA.json'); //sprite for wide death clouds
		game.load.atlas('deathCloudWideB', 'assets/img/FlameWideB.png', 'js/json/FlameWideB.json'); //sprite for not as wide death clouds
		game.load.image('deathHouse', 'assets/img/FireHouse.png'); //sprite for house on fire's hitbox
		game.load.image('jumpHitbox', 'assets/img/jumpHitbox.png'); //sprite for the hitbox of the player
		game.load.image('house1', 'assets/img/house1B.png'); //sprite for first stage of house
		game.load.image('house2', 'assets/img/house2B.png'); //sprite for second stage of house
		game.load.image('house3', 'assets/img/house3B.png'); //sprite for third stage of house
		game.load.image('houseFinal', 'assets/img/houseFinalB.png'); //sprite for final stage of house
		game.load.atlas('houseBurning', 'assets/img/houseBurn.png', 'js/json/HouseBurn.json'); //animation for the house on fire burning
		game.load.image('doormat', 'assets/img/doormat.png'); //sprite for the doormat in front of house
		game.load.physics('mainStageCollide', 'js/json/MainArenaCollide3.json', null); //hitbox for level 1-8 arena
		game.load.physics('ruinsHitbox', 'js/json/level9Hitbox2.json', null); //hitbox for level 9 arena
		game.load.physics('finalHitbox', 'js/json/level10Hitbox.json', null); //hitbox for level 10 arena
		game.load.atlas('poolSwitch', 'assets/img/switchAnimation.png', 'js/json/switchAnimation.json'); //animation for pool switch
		game.load.physics('housePhysics', 'js/json/houseHitbox.json', null); //hitbox for the house
		game.load.atlas('characterSpritesheet', 'assets/img/characterSpritesheet.png', 'js/json/characterSprite.json'); //spritesheet for the character player

		//------Audio Files
		game.load.audio('jumpSound', ['assets/audio/jump.wav']); //jump sound
		game.load.audio('deathFall', ['assets/audio/hit.wav']); //death sound
		game.load.audio('freezeSound', ['assets/audio/freezeSound.wav']); //freeze sound
		game.load.audio('thawSound', ['assets/audio/thawSound.wav']); //thaw sound
		game.load.audio('winSound', ['assets/audio/winLevel.wav']); //victory sound
		game.load.audio('chimneyNoise', ['assets/audio/chimneyNoise.wav']); //chimney jump sound
		game.load.audio('windNoise', ['assets/audio/windNoise2.wav']); //wind bg noise
		game.load.audio('break', ['assets/audio/break2.wav']); //alt end death noise
		game.load.audio('burnNoise', ['assets/audio/burning.wav']); //burning noise
		game.load.audio('level9Wind', ['assets/audio/creepyWind.wav']); //level 9 wind

	},
	create: function() {
		console.log('MainMenu: create');
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		cutsceneShade = 0; //reset cutscene shade

		//destroy all background noise
		if(this.level < 9){
			windNoise.destroy();
		}
		if(this.level == 9){
			burnNoise.destroy();
		}
		if(this.level == 10){
			creepyWind.destroy();
		}

		if(altEndTitle == false){
			//adds the background image to the title screen
			this.add.image(0,0,'titleImage');

			//creates the petal falling animation and wrap
			for (var j =0; j < 40; j++){
				if(goodEndTitle){ //good end animation
					this.petalOne = new Title(game, 'endParticle');
					game.add.existing(this.petalOne);

				}else{ //normal title animation
					this.petalOne = new Title(game, 'Petal2');
					game.add.existing(this.petalOne);

					this.petalTwo = new Title(game, 'Petal3');
					game.add.existing(this.petalTwo);
				}
			
			}

			//adds the title, play and credit icons
			this.add.image(200,350, 'titleName');

			//allows the user to click on the play button
			var ButtonPlay = this.add.image(525,925, 'PlayButton');
			ButtonPlay.inputEnabled = true;
			ButtonPlay.events.onInputDown.add(playButtonClicked, this);
			
		}else{ //alternate ending
			this.add.image(0,0,'titleImage2');
			this.add.image(200,350, 'titleName');
			this.add.image(525, 925, 'PlayShadow');
		}

		//add credits button
		var ButtonCredits = this.add.image(500,1050, 'CreditButton');
		ButtonCredits.inputEnabled = true;
		ButtonCredits.events.onInputDown.add(creditsButtonClicked, this);

		
		//generate start screen
		var MainMenuText;
	},
	update: function(){
		//main menu logic
		//changes state to play when the play button is clicked
		if(playClick== true){
			playClick = false;
			game.state.start('Cutscene', true, false, this.level); //move to Cutscene if spacebar is pressed
		}
		//change state to credits if this button is clicked
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
		//increment level
		currentLevel++;
		this.level = currentLevel;
	},
	preload: function(){
		console.log('Cutscene: preload');
	},
	create: function(){
		console.log('Cutscene: create');

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
				cameraScroll = 0; //reset camera scrolling
			}else{ //reset back to main menu
				currentLevel = 0; //reset level to zero (not one, bc of incrementation)
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
		game.physics.startSystem(Phaser.Physics.P2JS);

		//bg noise
		if(this.level <= 7 && !hasDied){
			windNoise = new Phaser.Sound(game, 'windNoise', 0.1, true);
			windNoise.fadeIn(3000, true);
		}else if(this.level == 8 && !hasDied){
			windNoise = new Phaser.Sound(game, 'windNoise', 0.1, true);
			windNoise.fadeIn(3000, true);
			burnNoise = new Phaser.Sound(game, 'burnNoise', 1.2, true);
			burnNoise.fadeIn(3000, true);
		}else if(this.level == 9 && !hasDied){
			level9wind = new Phaser.Sound(game, 'level9Wind', 0.1, true);
			level9wind.fadeIn(3000, true);
			level9wind.volume = 0.15;
		}
		
		game.physics.p2.setImpactEvents(true);
		winAnim = false;

		//put in sunset backgrounds
		if(this.level == 1 || this.level == 10){ //levels 1 and 10
			gameSky = game.add.tileSprite(0, 0, 1250, 1330, 'Sky1');
			gameSky.fixedToCamera = true;
		}else if(this.level == 2 || this.level == 9){//level 2 and 9
			gameSky = game.add.tileSprite(0, 0, 1250, 1330, 'Sky2');
		}else if(this.level == 3 || this.level == 8){ //levels 1 and 10
			gameSky = game.add.tileSprite(0, 0, 1250, 1330, 'Sky3');
		}else if(this.level == 4 || this.level == 7){//level 2 and 9
			gameSky = game.add.tileSprite(0, 0, 1250, 1330, 'Sky4');
		}else if(this.level == 5 || this.level == 6){ //levels 1 and 10
			gameSky = game.add.tileSprite(0, 0, 1250, 1330, 'Sky5');
		}

		//set up base variables
		var playerStartY = 420;
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
		breakSound.volume = 0.9;

		//set up collision groups
		var platform = game.physics.p2.createCollisionGroup();
		var touchPlatform = game.physics.p2.createCollisionGroup();
		var cloud = game.physics.p2.createCollisionGroup();
		var touchCloud = game.physics.p2.createCollisionGroup();

		
		game.physics.p2.enable(platform); //enable physics for walls
		game.physics.p2.enable(cloud);

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
			game.add.sprite(0,0, 'mainBackground');
			waterfall = game.add.sprite(1075, 155, 'waterfallGraphics', 'WaterfallA');
			waterfall.animations.add('flow', [0,1,2], 7, true);
			waterfall.animations.play('flow');

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
			house.body.loadPolygon('housePhysics', 'normalHitbox');
			house.body.setCollisionGroup(platform);
			house.body.collides([touchPlatform]);
			house.body.kinematic = true;

		}else if(this.level == 8){ //level 8
			//load house on fire
			var deathHouse = game.add.sprite(600, 450, 'houseBurning', 0);
			deathHouse.enableBody = true;
			game.physics.p2.enable(deathHouse);
			deathHouse.physicsBodyType = Phaser.Physics.P2JS;
			deathHouse.body.clearShapes();
			deathHouse.body.loadPolygon('housePhysics', 'fireHitbox');
			deathHouse.body.setCollisionGroup(platform);
			deathHouse.body.collides([touchPlatform]);
			deathHouse.body.kinematic = true;
			deathHouse.body.onBeginContact.add(killPlayer, this);
			deathHouse.animations.add('normal', [0,1,2,3,1], 10, true);
			deathHouse.animations.play('normal');
		}

		//create bridges
		if(this.level > 0 && this.level <= 3){ //if between levels 1 and 3, create bridge 1
			var bridge1 = game.add.sprite(265, 725, 'Bridge1'); //leftmost bridge
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
			var bridge3 = game.add.sprite(545, 1085, 'Bridge3'); //bottom cave bridge
			game.physics.p2.enable([bridge2, bridge3]);
			bridge2.physicsBodyType = Phaser.Physics.P2JS;
			bridge3.physicsBodyType = Phaser.Physics.P2JS;

			bridge2.body.clearShapes();
			bridge2.body.addRectangle(100, 17, 0, 40);//__, y offset is 40
			bridge2.body.addRectangle(20, 87, 40, 0); // |, x offset is 30

			bridge3.body.clearShapes();
			bridge3.body.setRectangle(160, 25);

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
			arena.body.loadPolygon('mainStageCollide', 'leftLedge');
			arena.body.loadPolygon('mainStageCollide', 'housePlatform');
			arena.body.loadPolygon('mainStageCollide', 'leftCave');
			arena.body.loadPolygon('mainStageCollide', 'rightCave');
			arena.body.loadPolygon('mainStageCollide', 'waterfallLedge');
			arena.body.loadPolygon('mainStageCollide', 'gardenLedge');
			arena.body.setCollisionGroup(platform); //change to platform
			arena.body.collides([touchPlatform]);
			arena.body.immovable = true;
			
		}else if(this.level == 9){
			//ruined arena
			arena = new Arena(game, (game.width)/2, (game.height)/2+250, 'testRuins', this.level);
			game.add.existing(arena);
			arena.enableBody = true;
			arena.physicsBodyType = Phaser.Physics.P2JS;
			arena.body.loadPolygon('ruinsHitbox', 'garden');
			arena.body.loadPolygon('ruinsHitbox', 'ruinsHitbox');
			arena.body.setCollisionGroup(platform);
			arena.body.collides([touchPlatform]);
			arena.body.immovable = true;

		}else if(this.level == 10){
			//final arena
			arena = new Arena(game, 900, (game.height)/2, 'testFinal', this.level);
			game.add.existing(arena);
			arena.enableBody = true;
			arena.physicsBodyType = Phaser.Physics.P2JS;
			arena.body.loadPolygon('finalHitbox', 'stage10Ledge');
			arena.body.loadPolygon('finalHitbox', 'stage10Cliff');
			arena.body.loadPolygon('finalHitbox', 'stage10cave');
			arena.body.setCollisionGroup(platform);
			arena.body.collides([touchPlatform]);
			arena.body.immovable = true;

		}else if(this.level == 11){
			//this is the ending
		}

		platformSpeed = 120;

		//set up flowers
		if(this.level <= 3){
			game.add.sprite(100, 260-10, 'seed');
			game.add.sprite(160, 260, 'seed');
			game.add.sprite(220, 260-5, 'seed');

		}else if(this.level == 4 || this.level == 5 || this.level == 10){
			game.add.sprite(100, 228-10, 'sprout');
			game.add.sprite(160, 228, 'sprout');
			game.add.sprite(220, 228-5, 'sprout');

		}else if(this.level == 6 || this.level == 7 || this.level == 8){
			var flowers1 = game.add.sprite(80, 195-10, 'flowers', 0);
			var flowers2 = game.add.sprite(140, 195, 'flowers', 0);
			var flowers3 = game.add.sprite(200, 195-5, 'flowers', 0);
			flowers1.animations.add('bounce', [0,1,2,3], 3, true);
			flowers2.animations.add('bounce', [0,1,2,3], 3, true);
			flowers3.animations.add('bounce', [0,1,2,3], 3, true);
			flowers1.animations.play('bounce');
			flowers2.animations.play('bounce');
			flowers3.animations.play('bounce');

		}else if(this.level == 9){
			game.add.sprite(100, 510-15, 'seed');
			game.add.sprite(160, 510, 'seed');
			game.add.sprite(220, 510-2, 'seed');
		}


		//LEVEL SPECIFIC TOOLS (Clouds and Waterfall Platform Specifics)

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
			cloud1Start = 345;
			cloud1Range = 240;
			cloud1Speed = 150;

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

			var deathCloud1 = game.add.sprite(775, 580, 'deathCloudLongA', 0);
			deathCloud1.animations.add('normal', [0,0,0,1,2,3,4,4,3,2,1], 15, true);
			deathCloud1.enableBody = true;
			game.physics.p2.enable(deathCloud1);
			deathCloud1.physicsBodyType = Phaser.Physics.P2JS;
			deathCloud1.body.clearShapes();
			deathCloud1.body.setRectangle(40, 175);
			deathCloud1.body.setCollisionGroup(platform);
			deathCloud1.body.collides([touchPlatform]);
			deathCloud1.body.kinematic = true;
			deathCloud1.body.onBeginContact.add(killPlayer, this);

			var deathCloud2 = game.add.sprite(750, 960, 'deathCloudLongA', 0);
			deathCloud2.animations.add('normal', [0,0,0,1,2,3,4,4,3,2,1], 15, true);
			deathCloud2.enableBody = true;
			game.physics.p2.enable(deathCloud2);
			deathCloud2.physicsBodyType = Phaser.Physics.P2JS;
			deathCloud2.body.clearShapes();
			deathCloud2.body.setRectangle(40, 180);
			deathCloud2.body.setCollisionGroup(platform);
			deathCloud2.body.collides([touchPlatform]);
			deathCloud2.body.kinematic = true;
			deathCloud2.body.onBeginContact.add(killPlayer, this);

			deathCloud1.play('normal');
			deathCloud2.play('normal');

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
			cloud1Speed = 160;

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


			var deathCloud1 = game.add.sprite(1030, 705, 'deathCloudWideA', 0);
			deathCloud1.animations.add('normal', [0,0,0,1,2,3,4,4,3,2,1], 15, true);
			deathCloud1.enableBody = true;
			game.physics.p2.enable(deathCloud1);
			deathCloud1.physicsBodyType = Phaser.Physics.P2JS;
			deathCloud1.body.clearShapes();
			deathCloud1.body.setRectangle(160, 40);
			deathCloud1.body.setCollisionGroup(platform);
			deathCloud1.body.collides([touchPlatform]);
			deathCloud1.body.kinematic = true;
			deathCloud1.body.onBeginContact.add(killPlayer, this);

			var deathCloud2 = game.add.sprite(830, 250, 'deathCloudLongB', 0);
			deathCloud2.animations.add('normal', [0,0,1,2,2,3,4,4,4,3,3,2,1], 15, true);
			deathCloud2.enableBody = true;
			game.physics.p2.enable(deathCloud2);
			deathCloud2.physicsBodyType = Phaser.Physics.P2JS;
			deathCloud2.body.clearShapes();
			deathCloud2.body.setRectangle(50, 430);
			deathCloud2.body.setCollisionGroup(platform);
			deathCloud2.body.collides([touchPlatform]);
			deathCloud2.body.kinematic = true;
			deathCloud2.body.onBeginContact.add(killPlayer, this);

			deathCloud1.play('normal');
			deathCloud2.play('normal');

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

			var deathCloud2 = game.add.sprite(380, 460, 'deathCloudLongB', 0);
			deathCloud2.animations.add('normal', [0,0,1,2,2,3,4,4,4,3,3,2,1], 15, true);
			deathCloud2.enableBody = true;
			game.physics.p2.enable(deathCloud2);
			deathCloud2.physicsBodyType = Phaser.Physics.P2JS;
			deathCloud2.body.clearShapes();
			deathCloud2.body.setRectangle(50, 430);
			deathCloud2.body.setCollisionGroup(platform);
			deathCloud2.body.collides([touchPlatform]);
			deathCloud2.body.kinematic = true;
			deathCloud2.body.onBeginContact.add(killPlayer, this);

			deathCloud2.animations.play('normal');

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
			cloud1.body.setRectangle(140, 40);
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

			var deathCloud1 = game.add.sprite(1020, 705, 'deathCloudWideA');
			deathCloud1.animations.add('normal', [0,0,0,1,2,3,4,3,2,1], 15, true);
			deathCloud1.enableBody = true;
			game.physics.p2.enable(deathCloud1);
			deathCloud1.physicsBodyType = Phaser.Physics.P2JS;
			deathCloud1.body.clearShapes();
			deathCloud1.body.setRectangle(160, 40);
			deathCloud1.body.setCollisionGroup(platform);
			deathCloud1.body.collides([touchPlatform]);
			deathCloud1.body.kinematic = true;
			deathCloud1.body.onBeginContact.add(killPlayer, this);

			var deathCloud2 = game.add.sprite(565, 110, 'deathCloudWideA'); //change this later to be on top of the chimney
			deathCloud2.animations.add('normal', [0,0,0,1,2,3,4,3,2,1], 15, true);
			deathCloud2.enableBody = true;
			game.physics.p2.enable(deathCloud2);
			deathCloud2.physicsBodyType = Phaser.Physics.P2JS;
			deathCloud2.body.clearShapes();
			deathCloud2.body.setRectangle(160, 40);
			deathCloud2.body.setCollisionGroup(platform);
			deathCloud2.body.collides([touchPlatform]);
			deathCloud2.body.kinematic = true;
			deathCloud2.body.onBeginContact.add(killPlayer, this);

			deathCloud1.animations.play('normal');
			deathCloud2.animations.play('normal');

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
			cloud1Range = 190;
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

			var deathCloud1 = game.add.sprite(1043, 625, 'deathCloudWideB', 0);
			deathCloud1.animations.add('normal', [0,0,0,1,2,3,4,4,2,1], 15, true);
			deathCloud1.enableBody = true;
			game.physics.p2.enable(deathCloud1);
			deathCloud1.physicsBodyType = Phaser.Physics.P2JS;
			deathCloud1.body.clearShapes();
			deathCloud1.body.setRectangle(140, 40);
			deathCloud1.body.setCollisionGroup(platform);
			deathCloud1.body.collides([touchPlatform]);
			deathCloud1.body.kinematic = true;
			deathCloud1.body.onBeginContact.add(killPlayer, this);

			deathCloud1.play('normal');

			//set waterfall platform prefabs
			platformSpeed = 150;
			lowY = 280;
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

		jumpHitbox = game.add.sprite(100, playerStartY, 'jumpHitbox');
		jumpHitbox.alpha = 0;
		jumpHitbox.enableBody = true; 
		jumpHitbox.anchor.set(0.5); //anchor at center
		game.physics.p2.enable(jumpHitbox); //enable physics
		jumpHitbox.body.setZeroDamping();
		jumpHitbox.body.fixedRotation = true;
		//jumpHitbox.body.kinematic = true;
		jumpHitbox.body.setCollisionGroup(touchPlatform);
		jumpHitbox.body.gravity = 0;
		jumpHitbox.body.collides([platform/*, collectable*/], /*refreshJump, this*/);
		jumpHitbox.body.onBeginContact.add(refreshJump, this);
		jumpHitbox.body.onEndContact.add(deleteJump, this);


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

		wheel = game.add.sprite(1095, waterfallY, 'wheel');
		wheel.anchor.set(0.5);
		
		switchPool = game.add.sprite(705, 1082, 'poolSwitch', 0);
		switchPool.animations.add('normal', [0,0,1,2,2,1], 8, true);
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
		switchPool.play('normal');

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
			wheel.kill();
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
			jumpOnce = true;
			offPlatform = 0;
			//onPlatform = true;
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
			//onPlatform = false;
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

		jumpOnce = true;
		jumpAnimOnce = 0;
		direction = 0;

		if(hasDied == true){
			deathFallNoise.play();
			var deathSpot = game.add.emitter(deathX, deathY, 80);
			deathSpot.makeParticles('deathPetal');
			deathSpot.setYSpeed(-70, 380);
			deathSpot.start(true, 5000, 0, 60);
		}

		function toNextLevel(body, bodyB, shapeA, shapeB, equation){
			endArrow.kill();
			console.log(this.level);
			if(this.level <= 7){
				windNoise.fadeOut(2600);
			}else if(this.level == 8){
				windNoise.fadeOut(2600);
				burnNoise.fadeOut(2600);
			}else if(this.level == 9){
				level9wind.fadeOut(2600);
			}
			hasDied = false;
			player.kill();
			winSound.play();
			var winSpot = game.add.emitter(endArrow.body.x, endArrow.body.y);
			winSpot.makeParticles('endParticle');
			winSpot.setXSpeed(-350, -200);
			if(this.level < 10){
				winSpot.gravity = new Phaser.Point(-200, 30);
			}else{
				winSpot.gravity = new Phaser.Point(1000, -300);
				winSpot.setAlpha(0.55, 0.7, 200);
			}
			
			winSpot.start(false, 5000, 10, 230);
			winAnim = true;
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

		upWait = 0;

	},
	update: function(){
		//console.log(jumpTimer);
		var playerVelocity = 200; //CHANGE PLAYER VELOCITY HERE
		//create keyboard
		this.cursors = game.input.keyboard.createCursorKeys();
		gameSky.tilePosition.x += 1.3;
		//gameSky.tilePosition.y -= 0.3;

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
			wheel.angle += platformSpeed/100;
			//wheel.body.velocity.y = -1 * platformSpeed; //go upward
		}else if(waterFrozen == false && upward == 1){
			waterfallPlatform.body.velocity.y = platformSpeed; //go downward
			wheel.angle -= platformSpeed/100;
			//wheel.body.velocity.y = platformSpeed; //go upward
		}else if(waterFrozen == true){
			waterfallPlatform.body.velocity.y = 0;
			//wheel.body.velocity.y = 0; //go upward
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
		if(this.cursors.up.isDown  && upWait >= 40){
			if(jumpOnce == true){
				player.body.velocity.y = defaultJumpVelocity;
				jumpNoise.play(); //play jump sound
				followJump = true;
			}
			if(jumpTimer < 15 && followJump){
				player.body.velocity.y = jumpVelocity; //jump
			}
			jumpVelocity -= 12;
			jumpTimer++;
			
			//jumpOnce = false;
		}else{
			//jumpOnce = 0;
		}

		if(jumpOnce == false){
			offPlatform++;
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

		//jumphitbox
		jumpHitbox.body.x = player.body.x;
		jumpHitbox.body.y = player.body.y+50;
		jumpHitbox.body.velocity.y = 0;

		//animation control
		if(this.cursors.up.isDown && followJump == true && jumpOnce == false){ //upward movement
			//player.animations.play('jumping');
			if(jumpAnimOnce == 0){
				player.animations.play('jumping');
			}

			jumpAnimOnce = 1;
		}else if(jumpOnce == false && offPlatform > 10){
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
		//waterfall.animations.play('flow');
		if(this.cursors.down.isDown && playerInPool){ //if player is in pool when Down is pressed
			//console.log(downPress);
			if(waterFrozen == false && downPress == false){
				waterFrozen = true;
				//waterfall.frame = 1;
				switchPool.frame = 0;
				freezeSound.play();
				var frame = waterfall.frame;
				var frameP = switchPool.frame;
				waterfall.animations.stop(true, true);
				switchPool.animations.stop(true, true);
				if(frame == 0){
					waterfall.frame = 3;
				}else if(frame == 1){
					waterfall.frame = 4;
				}else if(frame == 2){
					waterfall.frame = 5;
				}
				if(frameP == 0){
					switchPool.frame = 3;
				}else if(frameP == 1){
					switchPool.frame = 4;
				}else if(frameP == 2){
					switchPool.frame = 5;
				}
				downPress = true;
			}else if(waterFrozen == true && downPress == false){
				waterFrozen = false;
				waterfall.frame = 0;
				switchPool.frame = 1;
				thawSound.play();
				waterfall.animations.play('flow');
				switchPool.animations.play('normal');
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
		wheel.y = waterfallPlatform.body.y;
		/*if(upWait < 20){
			upWait++;
		}*/
		upWait++;
			
	}
}

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
		
		SubtitleText;

		let textStyle2 = {
			font: 'Optima',
			fontSize: 48,
			fill: '#000',
			wordWrap: false,
			wrapWidth: 1000
		}
		

		CreditsText = game.add.text(game.width/2, game.height/2-250, 
			'Placeholder',
			textStyle);
		CreditsText.anchor.set(0.5);
		CreditsText.alpha = 0;
		CreditsText.align = 'center';


		game.stage.backgroundColor = "#CAE7EF";

		SubtitleText = game.add.text(game.width/2, game.height/2+280, 
			'Placeholder', 
			textStyle2);
		SubtitleText.anchor.set(0.5);
		SubtitleText.alpha = 0;
		SubtitleText.align = 'center';

		game.stage.backgroundColor = "#CAE7EF";

		if(CreditsState == 0){
			CreditsText.text =
			'CREDITS \n' + "\n" + 
			'Core Artist: Kristofer Torres' + "\n" +
			'Core Programmer: Matthew Loebach' + "\n" +
			'Secondary Artist: William Wintze' + "\n" + "\n";
			SubtitleText.text = 
			'Press Left For a More In-Depth Breakdown' + "\n" +
			'Press Right For Sound Effect Credits' + "\n" + "\n" +
			'Press Space to Exit' + "\n";
		}else if(CreditsState == 1){
			CreditsText.text =
			'EXPANDED CREDITS \n';
			CreditsText.y = 140;
			SubtitleText.text = 
			'Press Up to Return to Main Credits' + "\n" +
			'Press Right For Sound Effect Credits' + "\n" +
			'Press Space to Exit' + "\n";
			SubtitleText.y = 1240;
			expandedCredits = game.add.sprite(0, -25, 'extendedCredits');
		}else if(CreditsState == 2){
			CreditsText.text =
			'SOUND CREDITS \n';
			CreditsText.y = 180;
			SubtitleText.text = 
			'Jump, Victory, Freeze, Thaw, Chimney Sounds:' + "\n" +
			'The Essential Retro Video Game Sound Effects Collection'  + "\n" +
			'[512 Sounds] by Juhani Junkala'+ "\n" +
			"\n" +
			'Wind: Heavy Rain Wind on soundbible.com' + "\n" +
			'by Daniel Simion' + "\n" +
			"\n" +
			'Burning: Fireplace burning on freesound.com' + "\n" +
			'by giddster' + "\n" +
			"\n" +
			'Death: leaves 1 on freesound.com' + "\n" +
			'by adejabor' + "\n" +
			"\n" +
			'Wind: Ambience, Creepy Wind, A on freesound.com' + "\n" +
			'by Inspector J' + "\n" +
			"\n" +
			'Press Left For a More In-Depth Breakdown' + "\n" +
			'Press Up to Return to Main Credits' + "\n" + "\n" +
			'Press Space to Exit' + "\n";
			SubtitleText.y = 750;
			SubtitleText.fontSize = 40;

		}
	},
	update: function(){
		//cutsceneBackground.tilePosition.y += 1;
		cutsceneBackground.tilePosition.x -= 4;
		if(CreditsText.alpha < 1){
			CreditsText.alpha += 0.02;
		}
		if(SubtitleText.alpha < 1){
			SubtitleText.alpha += 0.02;
		}
		if(CreditsState == 1 && SubtitleText.alpha < 1){
			expandedCredits.alpha += 0.02;
		}
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			//pass this.score
			game.state.start('MainMenu', true, false, this.score);
			CreditsState = 0;
		}
		if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT) && CreditsState != 1){
			//pass this.score
			game.state.start('Credits', true, false, this.score);
			CreditsState = 1;
		}
		if(game.input.keyboard.isDown(Phaser.Keyboard.UP) && CreditsState != 0){
			//pass this.score
			game.state.start('Credits', true, false, this.score);
			CreditsState = 0;
		}
		if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) && CreditsState != 2){
			//pass this.score
			game.state.start('Credits', true, false, this.score);
			CreditsState = 2;
		}
	}
}


//add states to StateManager
game.state.add('MainMenu', MainMenu);
game.state.add('Cutscene', Cutscene);
game.state.add('Play', Play);
game.state.add('Credits', Credits);

//start at main menu
game.state.start('MainMenu');
