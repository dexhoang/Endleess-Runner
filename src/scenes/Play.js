class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    preload() {
        this.load.image('bunny', './assets/Bunny.png')
    }

    create() {
        //text configs
        let scoreConfig = {
            fontFamily: 'sans-serif',
            fontSize: '20px',
            align: 'left'
        }

        //create texts
        let score = this.add.text(widthCenter/8, heightCenter/10, 'Score:', scoreConfig).setOrigin(0.5)

        //define keys
        keyRESTART = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)

        //create sprites
        this.bunny = this.physics.add.sprite(widthCenter, heightCenter, 'bunny')
        //this.add.image(widthCenter, heightCenter, 'bunny')
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyRESTART)) {
            this.scene.start('menuScene')
        }

    }

}