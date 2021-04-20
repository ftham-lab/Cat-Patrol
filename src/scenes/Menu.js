class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
        this.load.audio('laserboom', './assets/laserboom.wav');
        this.load.audio('smallboom', './assets/smallboom.wav');
        this.load.audio('medboom', './assets/medboom.wav');
        this.load.audio('music', 'assets/music.wav');
        this.load.image('menu_ship', 'assets/spaceship.png');
        this.load.image('menu_shipTwo', 'assets/FastSmallShip.png');
        this.load.image('p1Rocket', 'assets/p1Rocket.png');
        this.load.image('p2Rocket', 'assets/p2Rocket.png');
    }
     create() {
        // menu text configuration 
        this.ship1 = this.add.sprite(
          130,
          50,
          'menu_ship').setOrigin(0.5);
      this.ship2 = this.add.sprite(
          240,
          50,
          'menu_ship').setOrigin(0.5);
      this.ship3 = this.add.sprite(
          185,
          100,
          'menu_ship').setOrigin(0.5);
      
      this.ship1 = this.add.sprite(
          1030,
          50,
          'menu_shipTwo').setOrigin(0.5);
      this.ship2 = this.add.sprite(
          1140,
          50,
          'menu_shipTwo').setOrigin(0.5);
      this.ship3 = this.add.sprite(
          1085,
          100,
          'menu_shipTwo').setOrigin(0.5);
      
      this.p1Rocket = this.add.sprite(
          185,
          300,
          'p1Rocket').setOrigin(0.5);

      this.p2Rocket = this.add.sprite(
          1085,
          300,
          'p2Rocket').setOrigin(0.5);

      let menuConfig = {
          fontFamily: 'Helvetica',
          fontSize: '28px',
          backgroundColor: '#003399',
          color: '#843605',
          align: 'right',
          padding: {
            top: 5,
            bottom: 5,
          },
          fixedWidth: 0
      }

      let titleConfig = {
          fontFamily: 'Copperplate',
          fontSize: '56px',
          backgroundColor: 'black',
          color: 'white',
          align: 'center',
          padding: {
            top: 5,
            bottom: 5,
          },
          fixedWidth: 0
      }

      this.add.text(
          game.config.width/2, 
          game.config.height/2 - borderUISize*4 - borderPadding*4, 
          'ROCKET PATROL', 
          titleConfig).setOrigin(0.5);
      
      menuConfig.backgroundColor = "#de8e7c";
      menuConfig.color = "white";

      this.add.text(
          game.config.width/2 - 305, 
          game.config.height/2 - 20,
          ' A And D To Move & W To Fire ', 
          menuConfig).setOrigin(0.5);

      this.add.text(
          game.config.width/2 - 490, 
          game.config.height/2 - 64,
          'Player One: ', 
          menuConfig).setOrigin(0.5);

      menuConfig.backgroundColor = "#9da1cc";

      this.add.text(
          game.config.width/2 + 316, 
          game.config.height/2 - 20,
          ' 🢀 🢂 Arrows to Move & 🢁 Arrow to Fire ', 
          menuConfig).setOrigin(0.5);

      this.add.text(
          game.config.width/2 + 492, 
          game.config.height/2 - 64,
          'Player Two: ', 
          menuConfig).setOrigin(0.5);
      
      menuConfig.backgroundColor = '#7cdea5';
      menuConfig.color = 'white';
      
      this.add.text(
          game.config.width/2, 
          game.config.height/2 + borderUISize*2 + borderPadding*2, 
          ' Press 🢀 For Novice Or 🢂 For Expert ', 
          menuConfig).setOrigin(0.5);
      
      this.add.text(
          game.config.width/2, 
          game.config.height/2 + borderUISize*2 + 64, 
          ' The Highest Score Wins! ', 
          menuConfig).setOrigin(0.5);
      
      if (!this.music) {
          this.music = this.sound.add('music', {loop: true});
          this.music.play();
      }
        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        this.ship1.spritePositionY -= 4;
        this.ship1.spritePositionY += 4;

        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // easy mode
          game.settings = {
            spaceshipSpeed: 3,
            gameTimer: 60000    
          }
          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // hard mode
          game.settings = {
            spaceshipSpeed: 4,
            gameTimer: 45000    
          }
          this.sound.play('sfx_select');
          this.inMenu =false;
          this.scene.start('playScene');    
        }
      }
    
}


// Music dance_music is royalty free from https://freesound.org/people/josefpres/sounds/567487/
// Music music is royalty free from https://freesound.org/people/klankbeeld/sounds/567984/
// Music blip_select12 is royalty free https://freesound.org/people/Eponn/sounds/531510/
// Music explosion38 is royalty free https://freesound.org/people/bmlake/sounds/251619/
// Music rocket_shot is royalty free https://freesound.org/people/Crinkem/sounds/492027/
// Music laserboom is royalty free https://freesound.org/people/Bird_man/sounds/275154/
// Music smallboom is royalty free https://freesound.org/people/ProjectsU012/sounds/341626/
// Music medboom is royalty free https://freesound.org/people/JohanDeecke/sounds/369529/
// Create a new title screen (e.g., new artwork, typography, layout) (10)
// Create a new spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (20)
// Implement a simultaneous two-player mode (30)
// Redesign the game's artwork, UI, and sound to change its theme/aesthetic (to something other than sci-fi) (60)
// Add your own (copyright-free) background music to the Play scene (5)
