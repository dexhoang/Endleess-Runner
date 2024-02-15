class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    preload() {
        //load images
        this.load.image('title', './assets/titleScreen.png')

        //load audio
        this.load.audio('titleMusic', './assets/titleMusic.mp3')
    }

    create() {
        //set title screen
        this.add.image(widthCenter, heightCenter, 'title')

        //create diff text configs
        let titleConfig = {
            fontFamily: 'math',
            fontSize: '52px',
            align: 'center'
        }
        let title3D = {
            fontFamily: 'math',
            fontSize: '52px',
            align: 'center',
            color: '#2F5B6F'
        }
        let title1Config = {
            fontFamily: 'math',
            fontSize: '25px',
            align: 'center',
            color: '#F5993B' 
        }
        let title13D = {
            fontFamily: 'math',
            fontSize: '25px',
            align: 'center',
            color: '#6B4823' 
        }
        let creditText = {
            fontFamily: 'math',
            fontSize: '16px',
            align: 'center',
        }

        //create title texts
        let titleEffect = this.add.text(widthCenter+3, heightCenter - 30, 'Carrot Heist', title3D).setOrigin(0.5)
        let title = this.add.text(widthCenter, heightCenter - 30, 'Carrot Heist', titleConfig).setOrigin(0.5)
        let title1Effect = this.add.text(widthCenter+1.5, heightCenter + 10, 'Press SPACE to start', title13D).setOrigin(0.5)
        let title1 = this.add.text(widthCenter, heightCenter + 10, 'Press SPACE to start', title1Config).setOrigin(0.5)
        let credit = this.add.text(widthCenter, game.config.height - 10, 'Created by: Dex', creditText).setOrigin(0.5)

        //define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        //background music
        //this.sound.play('titleMusic', {volume: 0.3})
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start('playScene')
        }
    }

}