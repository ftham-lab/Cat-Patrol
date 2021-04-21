class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('background', 'assets/background.png');
        this.load.image('borders', 'assets/border.png');
        this.load.image('player', 'assets/player.png');
        this.load.image('spaceship', 'assets/spaceship.png');
        this.load.audio('sfx_explosion', 'assets/explosion38.wav');
        this.load.audio('sfx_rocket', 'assets/rocket_shot.wav');
        this.load.audio('sfx_background', 'assets/dance_music.wav');
        this.load.audio('music', 'assets/music.wav');
        this.load.spritesheet('explosion', 'assets/explosion.png',  
            {frameWidth: 64, 
            frameHeight: 32, 
            startFrame: 0, 
            endFrame: 9});
    } // load images audio and spritesheet

    create() {
        //Add background music
        if (!this.music) {
            this.music = this.sound.add('sfx_background', {loop: true});
            this.music.play()};

        // place tile sprites
        this.background = this.add.tileSprite(
            0, 0, 640, 480, 'background'
        ).setOrigin(0,0);

        // add player (p1player)
        this.p1player = new Player(
            this,
            game.config.width / 2,
            game.config.height - borderUISize - borderPadding * 3.5,
            'player'
        ).setOrigin(0, 0.5);

        //fix the ship spacing and add ships
        this.ship1 = new Ship(this, Math.floor((Math.random() * (640-borderPadding*2) + 1)), borderUISize*4,'spaceship', 0, 30, this.flip()).setOrigin(0,0); //highest ship has highest pts
        this.ship2 = new Ship(this, Math.floor((Math.random() * (640-borderPadding*2))), borderUISize*6 + borderPadding*3 ,'spaceship', 0, 20, this.flip()).setOrigin(0,0);
        this.ship3 = new Ship(this, Math.floor((Math.random() * (640-borderPadding*2))), borderUISize*8 + borderPadding*4,'spaceship', 0, 10, this.flip()).setOrigin(0,0);
        
        // green UI background
        this.add.rectangle(0, borderPadding, game.config.width, borderUISize * 2, 0x0e8499).setOrigin(0,0);

        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0x0e8499).setOrigin(0 ,0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0x0e8499).setOrigin(0 ,0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0x0e8499).setOrigin(0 ,0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0x0e8499).setOrigin(0 ,0);
        
        //define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);    

        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        // initialize score
        this.p1Score = 0;

         // display score
            this.scoreConfig = {
                fontFamily: 'Helvetica',
                fontSize: '25px',
                backgroundColor: '#0e8499',
                color: '#843605',
                align: 'center',
                padding: {
                top: 5,
                bottom: 5,
                },
                fixedWidth: 200
            }
            this.scoreLeft = this.add.text(borderPadding + borderUISize, borderUISize, 'Score: '+ this.p1Score, this.scoreConfig);
            this.scoreConfig.fixedWidth = 0;
            
        // GAME OVER flag
        this.gameOver = false;

        // 60-second play clock
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', this.scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press [R]estart Or 🢀 For Menu', this.scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);

        //display time
        let timeConfig = {
            fontFamily: 'Helvetica',
            fontSize: '25px',
            backgroundColor: '#0e8499',
            color: '#843605',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 200
            }
            this.timeLeft = this.add.text(game.config.width - (200 + borderUISize + borderPadding), borderUISize, 'Time Left: ' + Math.round(this.clock.getRemainingSeconds()), timeConfig);
    }

    update() {
          // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
        this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        this.background.tilePositionX -= starSpeed;
        if (!this.gameOver) {
        this.p1player.update();
        this.ship1.update();
        this.ship2.update();
        this.ship3.update();
    }
        
    // check collisions
    if(this.checkCollision(this.p1player, this.ship3)) {
        this.p1player.reset();
        this.shipExplode(this.ship3);
        let timeRemaining = this.clock.getRemaining();
            this.time.removeAllEvents();
            this.createTime(timeRemaining, 5000);
    }
    if (this.checkCollision(this.p1player, this.ship2)) {
        this.p1player.reset();
        this.shipExplode(this.ship2);
        let timeRemaining = this.clock.getRemaining();
            this.time.removeAllEvents();
            this.createTime(timeRemaining, 5000);
    }
    if (this.checkCollision(this.p1player, this.ship1)) {
        this.p1player.reset();
        this.shipExplode(this.ship1);
        let timeRemaining = this.clock.getRemaining();
            this.time.removeAllEvents();
            this.createTime(timeRemaining, 5000);
    }
    this.timeLeft.text = 'Time Left: ' + Math.round(this.clock.getRemainingSeconds());   
}

checkCollision(player, ship) {
    if (player.x + ship.width > ship.x && 
        player.x < ship.x + ship.width && 
        player.y + ship. height > ship.y && 
        player.y < ship.y + ship.height) {
        ship.alpha = 0;
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
    });  
     // score add and repaint
     this.p1Score += ship.points;
     this.scoreLeft.text = `Score: ` + this.p1Score;
     this.sound.play('sfx_explosion');        
}


    createTime(timeLeft, timeAdd){ 
        //display timer
        
        this.clock = this.time.delayedCall(timeLeft + timeAdd, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', this.scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press [R]estart or 🢀 for Menu', this.scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);

    }

    flip() {
        let direction = Math.round(Math.random());
        return(direction);   
    
    }
}