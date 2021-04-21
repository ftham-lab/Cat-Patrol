class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio & menu border
        this.load.audio('sfx_select', 'assets/blip_select12.wav');
        this.load.audio('sfx_explosion', 'assets/explosion38.wav');
        this.load.audio('sfx_rocket', 'assets/rocket_shot.wav');
        this.load.audio('music', 'assets/music.wav');
        this.load.image('title_menu', 'assets/border.png')
    }

     create() {
      this.background = this.add.tileSprite(
            0, 0, 640, 480, 'title_menu'
            ).setOrigin(0,0); // place background

            let menuConfig = {
                fontFamily: 'Copperplate',
                fontSize: '28px',
                backgroundColor: '#eb7380',
                color: '#843605',
                align: 'right',
                padding: {
                    top: 5,
                    bottom: 5,
                },
                fixedWidth: 0
            }
    
        //show menu text
        this.add.text(game.config.width/2, game.config.height/3, 'Rocket Patrol', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#b689d5';
        menuConfig.color = '#260c6e';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize*2 + borderPadding*2, 'Press 🢀 For Novice Or 🢂 For Expert', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Use Arrows To Move And F To Fire' , menuConfig).setOrigin(0.5);
      
        //Add music
      if (!this.music) {
          this.music = this.sound.add('music', {loop: true});
          this.music.play();
      }
        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {

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
          this.scene.start('playScene');    
        }
    } 
}
