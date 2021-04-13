class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot');
    }
    
     create() {
        this.add.text(210,20, "Rocket Patrol Play");
        this.add.text(120,220, "Use <-->arrow to move & F to fire");
        this.add.text(250,250, "Shoot to start!");
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keyF)) {
            this.scene.start('playScene');
         }
    }
}
