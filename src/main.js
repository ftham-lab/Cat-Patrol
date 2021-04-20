let config = {
    type: Phaser.CANVAS,
    width: 1280,
    height: 480,
    scene: [Menu, Play],
}

let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

let keyLEFT, keyRIGHT, keyF, keyR, keyW, keyA, keyD, keyUP, keyDOWN;