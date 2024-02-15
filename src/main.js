//Name: Dexter Hoang
//Title: Carrot Heist
//Hours Spent:

'use strict'

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
    render: {
        pixelArt: true
    },
    scene: [ Menu, Play , GameOver ]
}

let game = new Phaser.Game(config)

//reverse keyboard binds
let keySPACE, keyRESTART, keyJUMP

//global variables
let heightCenter = game.config.height/2
let widthCenter = game.config.width/2
let gameHeight = game.config.height
let gameWidth = game.config.width
let game1

// global game options
let gameOptions = {
    platformStartSpeed: 350,
    spawnRange: [100, 350],
    platformSizeRange: [50, 250],
    playerGravity: 900,
    jumpForce: 400,
    playerStartPosition: 200,
    jumps: 2
}