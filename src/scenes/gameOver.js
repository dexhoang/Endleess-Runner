class GameOver extends Phaser.Scene {
    constructor() {
        super("overScene")
    }

    preload() {
        this.load.image('gameOver', './assets/gameOver.png')
        this.load.audio('button', './assets/buttonSound.wav')
    }

    create() {
        //define keys
        keyRESTART = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)

        //add gameover screen
        this.add.image(widthCenter, heightCenter, 'gameOver')

        //add sounds
        this.button = this.sound.add('button')

        //configs for text
        let titleConfig = {
            fontFamily: 'math',
            fontSize: '52px',
            align: 'center',
            color: '#CF4700'
        }
        let title3D = {
            fontFamily: 'math',
            fontSize: '52px',
            align: 'center',
            color: '#7A2A00'
        }
        let title1Config = {
            fontFamily: 'math',
            fontSize: '25px',
            align: 'center',
            color: '#7A2A00' 
        }
        let title13D = {
            fontFamily: 'math',
            fontSize: '25px',
            align: 'center',
            color: '#7A2A00' 
        }

        //create title texts
        let titleEffect = this.add.text(widthCenter+3, heightCenter - 30, 'GAME OVER', title3D).setOrigin(0.5)
        let title = this.add.text(widthCenter, heightCenter - 30, 'GAME OVER', titleConfig).setOrigin(0.5)
        let title1Effect = this.add.text(widthCenter+1.5, heightCenter + 10, 'Press R to restart', title13D).setOrigin(0.5)
        let title1 = this.add.text(widthCenter, heightCenter + 10, 'Press R to restart', title1Config).setOrigin(0.5)

    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyRESTART)) {
            this.button.play()
            this.scene.start('playScene')
        }
    }
}