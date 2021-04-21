let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    backgroundColor: '#FFFFFF',
    scene: [Menu, Play],
}

let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
let starSpeed = 4;

let keyLEFT, keyRIGHT, keyF, keyR;

// Felix Tham - Time: More than 15 hrs - Date: 04/21/2021
// Cat Patrol
// Music dance_music is royalty free from https://freesound.org/people/josefpres/sounds/567487/
// Music music is royalty free from https://freesound.org/people/klankbeeld/sounds/567984/
// Music blip_select12 is royalty free https://freesound.org/people/Eponn/sounds/531510/
// Music explosion38 is royalty free https://freesound.org/people/junggle/sounds/30341/
// Music rocket_shot is royalty free https://freesound.org/people/Crinkem/sounds/492027/
// Create a new title screen (e.g., new artwork, typography, layout) (10)
// Add Time for Hits (20)
// Add Display Time (10)
// Redesign the game's artwork, UI, and sound to change its theme/aesthetic (to something other than sci-fi) (60)
// Add your own (copyright-free) background music to the Play scene (5)
// Add music to the new title screen (10)
// Code based from Prof. Nathan Altice
// Help from Prof. Adam Smith and other TAs like Jared, also help from discord chat students
// Total (10) + (20) + (10) + (60) + (5)  + (10) = 115
