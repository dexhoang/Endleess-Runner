//Name: Dexter Hoang
//Title: Karat Runner
//Hours Spent:

let config = {
    parent: 'game',
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    autoCenter: true,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config)

//reverse keyboard binds
let keySPACE, keyRESTART

//global variables
let heightCenter = game.config.height/2
let widthCenter = game.config.width/2
let gameHeight = game.config.height
let gameWidth = game.config.width
let highscore