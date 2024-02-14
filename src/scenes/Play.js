class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    init() {
        //velocity
        this.MAX_VELOCITY = 225
        this.JUMP_VELOCITY = -1000
        this.physics.world.gravity.y = 3000
    }

    preload() {
        this.load.image('bunny', './assets/Bunny.png')
        this.load.image('sky', './assets/Sky.png')
        this.load.image('clouds', './assets/cloudLayer.png')
        this.load.image('carrot', './assets/normalCarrot.png')
        this.load.image('goldCarrot', './assets/goldCarrot.png')
        this.load.image('grass', './assets/grassBlock.png')
        this.load.image('grassEffect', './assets/grassEffect.png')
        this.load.image('grassTile', './assets/grassTile.png')
        this.load.image('grasseffectTile', './assets/grasseffectTile.png')
    }

    create() {
        //text configs
        let scoreConfig = {
            fontFamily: 'sans-serif',
            fontSize: '20px',
            align: 'left',
            color: '#000000'
        }

        //add tile sprites
        this.sky = this.add.tileSprite(0, 0, gameWidth, gameHeight, 'sky').setOrigin(0)
        this.clouds = this.add.tileSprite(0, -50, gameWidth, gameHeight, 'clouds').setOrigin(0)
        this.grassEffect = this.add.tileSprite(0, 444, gameWidth, gameHeight -36, 'grasseffectTile').setOrigin(0)

        //create texts
        let score = this.add.text(widthCenter/8, heightCenter/10, 'SCORE:', scoreConfig).setOrigin(0.5)

        //define keys
        keyRESTART = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        keyJUMP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        //create sprites
        this.bunny = this.physics.add.sprite(widthCenter, heightCenter, 'bunny')
        this.carrot = this.physics.add.sprite(widthCenter/2, heightCenter/2, 'carrot')
        this.goldCarrot = this.physics.add.sprite(widthCenter/4, heightCenter/4, 'goldCarrot')
        this.grass = this.physics.add.sprite(widthCenter -20, heightCenter -20, 'grass')

        //create ground platforms
        this.ground = this.add.group()
        for (let i = 0; i < game.config.width; i += 32) {
            let groundTile = this.physics.add.sprite(i, gameHeight - 32, 'grass').setOrigin(0)
            groundTile.body.immovable = true
            groundTile.body.allowGravity = false
            this.ground.add(groundTile)
        }
        this.groundScroll = this.add.tileSprite(0, 448, gameWidth, gameHeight - 32, 'grassTile').setOrigin(0)

        // this.groundScroll = this.add.tileSprite(0, 0, gameWidth, gameHeight - 32, 'grassTile')
        
        //create collisions
        this.bunny.setCollideWorldBounds(true)
        this.grass.setCollideWorldBounds(true)
        this.carrot.setCollideWorldBounds(true)
        this.goldCarrot.setCollideWorldBounds(true)

        this.physics.add.collider(this.bunny, this.carrot)
        this.physics.add.collider(this.bunny, this.grass)
        this.physics.add.collider(this.bunny, this.ground)
        this.physics.add.collider(this.bunny, this.goldCarrot)
        this.physics.add.collider(this.carrot, this.goldCarrot)

        

        this.carrot.setBounce(0.5)
        this.goldCarrot.setBounce(0.5)

        this.physics.world.wrap(this.carrot, this.carrot.width)
        this.physics.world.wrap(this.goldCarrot, this.goldCarrot.width)


        //adjust hitbox
        this.carrot.setSize(this.width /2, this.height / 2)

        //create cursors
        this.cursors = this.input.keyboard.createCursorKeys()
        
    }

    update() {
        //create sprite movement
        if(Phaser.Input.Keyboard.JustDown(keyRESTART)) {
            this.scene.start('menuScene')
        }


        //moving
        if(this.cursors.left.isDown) {
            this.bunny.setVelocityX(-this.MAX_VELOCITY)
            this.bunny.setFlip(true, false)
            console.log('hello')
        } else if(this.cursors.right.isDown) {
            this.bunny.setVelocityX(this.MAX_VELOCITY)
            this.bunny.resetFlip()
        } else {
            this.bunny.body.velocity.x = 0
        }

        //jumping
        if (Phaser.Input.Keyboard.JustDown(keyJUMP)){
            this.bunny.setVelocityY(this.JUMP_VELOCITY)
        }

        //move tile sprties
        this.clouds.tilePositionX += 3
        this.groundScroll.tilePositionX += 3
        this.grassEffect.tilePositionX += 3

    }

}