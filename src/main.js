//Name: Dexter Hoang
//Title: Carrot Heist
//Hours Spent: 40
//Creative Tilt: In my game, I wanted it to be a cute art style so I put alot of effort in my title and game over screen.
//I really wanted it to be bunny themed so I had grassy platforms, and the score is determined by how many carrots you pick up.
//I also added an extra fun thing where if the player's score reaches 200, the carrots will turn into golden carrots and be worth more points!
// I also wanted to add an RNG type of generation for the carrots so thats why some of the carrots my be moving in place that don't make sense at all.

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