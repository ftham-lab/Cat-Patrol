class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('borders', 'assets/border.png')
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('p1Rocket', 'assets/p1rocket.png');
        this.load.image('p2Rocket', 'assets/p2rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('foreground', 'assets/foreground.png');
        this.load.spritesheet('explosion', './assets/explosion.png',  
            {frameWidth: 64, 
            frameHeight: 32, 
            startFrame: 0, 
            endFrame: 9});
        this.load.spritesheet('smallexplosion', './assets/smallexplosion.png',
            {frameWidth: 64, 
            frameHeight: 32, 
            startFrame: 0, 
            endFrame: 9});
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
        this.load.audio(`sfx_background`, `./assets/dance_music.wav`);
        this.load.audio('laserboom', './assets/laserboom.wav');
        this.load.audio('smallboom', './assets/smallboom.wav');
        this.load.audio('medboom', './assets/medboom.wav');
        this.load.audio('music', 'assets/music.wav');
        this.load.image('FastSmallShip', 'assets/FastSmallShip.png');
    }

    create() {

        this.sound.add('sfx_background').play();

        // place tile sprites
        this.starfield = this.add.tileSprite(
            0,0,640,480, 'starfield'
        ).setOrigin(0,0);

        this.starfield2 = this.add.tileSprite(
            640,0,1280,480, 'starfield'
        ).setOrigin(0,0);

        // add rocket (p1)
        this.p1Rocket = new P1Rocket(
            this,
            game.config.width/2 - 20,
            game.config.height - borderUISize - borderPadding,
            'p1Rocket'
        );

        // add rocket (p2)
        this.p2Rocket = new P2Rocket(
            this,
            game.config.width/2 + 20,
            game.config.height - borderUISize - borderPadding,
            'p2Rocket'
        );

//fix the ship spacing
        this.ship1 = new Ship(this, 
            game.config.width + borderUISize*6, 
            borderUISize*4, 'spaceship', 
            0, 30).setOrigin(0, 0);

        this.ship2 = new Ship(this, 
            game.config.width + borderUISize*3, 
            borderUISize*5 + borderPadding*2, 'FastSmallShip', 
            0, 20).setOrigin(0,0);

        this.ship3 = new Ship(this, 
            game.config.width, borderUISize*6 + borderPadding*4, 
            'spaceship', 0, 10).setOrigin(0,0);

        this.ship4 = new fastSmallShip(this, 
            game.config.width + borderUISize*3, 
            borderUISize*5 + borderPadding*6, 'FastSmallShip', 
            0, 50).setOrigin(0,0);

        //foreground
        this.foreground = this.add.tileSprite(
            0, 0, 640, 480,'foreground'
            ).setOrigin(0,0);
        
            // green UI background
        this.add.rectangle(0,
            borderUISize + borderPadding,
            game.config.width,
            borderUISize * 2,
            0x00FF00,
            ).setOrigin(0,0);

        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);

        //borders ui
        this.borders = this.add.tileSprite(
            0, 0, 640, 480, 'borders'
            ).setOrigin(0,0);

        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);      

        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });
        
        this.anims.create({
            key: 'smallexplode',
            frames: this.anims.generateFrameNumbers('smallexplosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        // initialize score
        this.p1Score = 0;

         // display score
            let p1scoreConfig = {
                fontFamily: 'Courier',
                fontSize: '28px',
                backgroundColor: '#F3B141',
                color: '#843605',
                align: 'right',
                padding: {
                top: 5,
                bottom: 5,
                },
                fixedWidth: 100
            }
            this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, p1scoreConfig);
        
        this.p2Score = 0;

            // display score
               let p2scoreConfig = {
                   fontFamily: 'Courier',
                   fontSize: '28px',
                   backgroundColor: '#F3B141',
                   color: '#843605',
                   align: 'right',
                   padding: {
                   top: 5,
                   bottom: 5,
                   },
                   fixedWidth: 100
               }
               this.scoreRight = this.add.text(borderUISize + borderPadding*103.5, borderUISize + borderPadding*2, this.p2Score, p2scoreConfig);

               let textDisplay = {
                fontFamily: 'Courier',
                fontSize: '28px',
                backgroundColor: '#F3B141',
                color: '#843605',
                align: 'right',
                padding: {
                  top: 5,
                  bottom: 5,
                },
                fixedWidth: 100
            }
    
            this.fireUI = this.add.text(borderUISize + borderPadding*52, borderUISize + borderPadding*2, 'Can You Survive?', textDisplay);
    
            textDisplay.fixedWidth = 0;
        // GAME OVER flag
        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            if (this.p1Score > this.p2Score) {
                this.add.text(game.config.width/2, game.config.height/2, 'Player One Wins!', textDisplay).setOrigin(0.5);
            } else if (this.p1Score < this.p2Score) {
                this.add.text(game.config.width/2, game.config.height/2, 'Player Two Wins!', textDisplay).setOrigin(0.5);
            } else {
                this.add.text(game.config.width/2, game.config.height/2, 'Draw!', textDisplay).setOrigin(0.5);
            };
            this.add.text(game.config.width/2, game.config.height/2 + 64, '[R]estart or 🢀 for Menu', textDisplay).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
    }

    update() {
          // check key input for restart
         if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
        this.scene.restart();
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
}
        this.starfield.tilePositionX -= 4;
        this.starfield2.tilePositionX -= 4;
        if (!this.gameOver) {
        this.p1Rocket.update();
        this.p2Rocket.update();
        this.ship1.update();
        this.ship2.update();
        this.ship3.update();
        this.ship4.update();
    }
        
    if (this.checkCollision(this.p1Rocket, this.ship4)) {
        this.p1Rocket.reset();
        this.shipExplode(this.ship4);
        this.p1Score += this.ship4.points;
        this.scoreLeft.text = this.p1Score;
        
        return true;
        
    } 

    if (this.checkCollision(this.p1Rocket, this.ship3)) {
        this.p1Rocket.reset();
        this.shipExplode(this.ship3);
        this.p1Score += this.ship3.points;
        this.scoreLeft.text = this.p1Score;
        
        return true;
        
    } 
    if (this.checkCollision(this.p1Rocket, this.ship2)) {
        this.p1Rocket.reset();
        this.shipExplode(this.ship2);
        this.p1Score += this.ship2.points;
        this.scoreLeft.text = this.p1Score;
   
        return true;
        
    } 
    if (this.checkCollision(this.p1Rocket, this.ship1)) {
        this.p1Rocket.reset();
        this.shipExplode(this.ship1);
        this.p1Score += this.ship1.points;
        this.scoreLeft.text = this.p1Score;
    
        return true;
    }

    if (this.checkCollision(this.p2Rocket, this.ship4)) {
        this.p2Rocket.reset();
        this.shipExplode(this.ship4);
        this.p2Score += this.ship4.points;
        this.scoreRight.text = this.p2Score;
        
        return true;    
    } 

    if (this.checkCollision(this.p2Rocket, this.ship3)) {
        this.p2Rocket.reset();
        this.shipExplode(this.ship3);
        this.p2Score += this.ship3.points;
        this.scoreRight.text = this.p2Score;
        
        return true;  
    }

    if (this.checkCollision(this.p2Rocket, this.ship2)) {
        this.p2Rocket.reset();
        this.shipExplode(this.ship2);
        this.p2Score += this.ship2.points;
        this.scoreRight.text = this.p2Score;
   
        return true;    
    } 

    if (this.checkCollision(this.p2Rocket, this.ship1)) {
        this.p2Rocket.reset();
        this.shipExplode(this.ship1);
        this.p2Score += this.ship1.points;
        this.scoreRight.text = this.p2Score;

        return true;
    }

    if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
        this.scene.start("menuScene");
    }
    
}
checkCollision(rocket, ship) {
    if (rocket.x + rocket.width > ship.x && 
        rocket.x < ship.x + ship.width && 
        rocket.y + rocket. height > ship.y && 
        rocket.y < ship.y + ship.height) {
        ship.alpha = 0;
        rocket.reset();
        return true;
    } else {
        return false;
    }
}
    
shipExplode(ship) {
    // temporarily hide ship
    ship.alpha = 0;
    // create explosion sprite at ship's position
    let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
    boom.anims.play('explode');             // play explode animation
    boom.on('animationcomplete', () => {    // callback after anim completes
        ship.reset();                         // reset ship position
        ship.alpha = 1;                       // make ship visible again
        boom.destroy();                       // remove explosion sprite
        // score add and repaint
        this.p1Score += ship.points;
        this.p2Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        this.scoreRight.text = this.p2Score;   
        //this.game.settings.gameTimer += ship.seconds;
        //this.timeRight.text = this.game.settings.gameTimer / 1000;
        
        let value = Phaser.Math.Between(1, 4);
        if(value == 1) {
            this.sound.play('sfx_explosion');
        }
        else if(value == 2) {
            this.sound.play('laserboom');
        }
        else if(value == 3) {
            this.sound.play('smallboom');
        }
        else if(value == 4) {
            this.sound.play('medboom');
        }
        
    });       
}

smallshipExplode(ship) {
    // temporarily hide ship
    ship.alpha = 0;
    // create explosion sprite at ship's position
    let boom = this.add.sprite(ship.x, ship.y, 'smallexplosion').setOrigin(0, 0);
    boom.anims.play('smallexplode');             // play explode animation
    boom.on('animationcomplete', () => {    // callback after anim completes
        ship.reset();                         // reset ship position
        ship.alpha = 1;                       // make ship visible again
        boom.destroy();                       // remove explosion sprite
        // score add and repaint
        this.p1Score += ship.points;
        this.p2Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        this.scoreRight.text = this.p2Score;  
        //this.game.settings.gameTimer += ship.seconds;
        //this.timeRight.text = this.game.settings.gameTimer / 1000;
        
        let value = Phaser.Math.Between(1, 4);
        if(value == 1) {
            this.sound.play('sfx_explosion');
        }
        else if(value == 2) {
            this.sound.play('laserboom');
        }
        else if(value == 3) {
            this.sound.play('smallboom');
        }
        else if(value == 4) {
            this.sound.play('medboom');
        }
    });       
}

}
