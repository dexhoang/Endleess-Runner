class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    init() {
        //velocity
        this.MAX_VELOCITY = 225
        this.JUMP_VELOCITY = -700
        this.JUMPS = 2
        this.score = 0
    }

    preload() {
        //load images
        //this.load.image('bunny', './assets/Bunny.png')
        this.load.image('sky', './assets/Sky.png')
        this.load.image('clouds', './assets/cloudLayer.png')
        this.load.image('carrot', './assets/normalCarrot.png')
        this.load.image('goldCarrot', './assets/goldCarrot.png')
        this.load.image('grass', './assets/grassBlock.png')
        this.load.image('grassTile', './assets/grassTile.png')
        this.load.image('bearTrap', './assets/bearTrap.png')
        this.load.image('platform', './assets/grassPlatform.png')

        //load spritesheet
        this.load.spritesheet('bunnyJump', './assets/bunnyJump.png', {
            frameWidth: 32
        })

    }

    create() {
        //create background
        this.sky = this.add.tileSprite(0, 0, gameWidth, gameHeight, 'sky').setOrigin(0)
        this.clouds = this.add.tileSprite(0, -50, gameWidth, gameHeight, 'clouds').setOrigin(0)

        //define keys
        keyRESTART = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        keyJUMP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        //text config for score text
        let scoreConfig = {
            fontFamily: 'sans-serif',
            fontSize: '50px',
            align: 'left',
            color: '#FFFFFF'
        }

        //add player
        this.bunny = this.physics.add.sprite(widthCenter/2, heightCenter/2, 'bunny').setScale(1.25, 1.25)
        this.bunny.body.setGravityY(3000)
        this.bunny.body.setCollideWorldBounds(true)
        this.bunny.body.setFriction(0)
        

        //create player animation
        this.anims.create({
            key: 'jump',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('bunnyJump', {
                start: 0, 
                end: 2
            })
        })

        // this.carrot = this.physics.add.sprite(widthCenter, heightCenter, 'carrot')
        // this.goldCarrot = this.physics.add.sprite(widthCenter + 150, heightCenter, 'goldCarrot')

        //create starting platform
        // this.grassGround = this.add.group()
        // for (let i = 0; i < game.config.width; i += 32) {
        //     let groundTile = this.physics.add.sprite(i, gameHeight - 32, 'grass').setOrigin(0)
        //     groundTile.setImmovable(true)
        //     groundTile.body.allowGravity = false
        //     groundTile.body.setVelocityX(-100)
        //     this.grassGround.add(groundTile)
        // }

        this.startPlatform = this.physics.add.sprite(0, gameHeight - 32, 'grassTile').setOrigin(0)
        this.startPlatform.setImmovable(true)
        this.startPlatform.body.setAllowGravity(false)
        this.startPlatform.setVelocityX(-100)

        //create floating platforms
        var platforms = this.physics.add.group()

        function createPlatform(x, y) {
            var platform = platforms.create(x, y, 'platform')
            platform.scaleX = 2
            platform.setOrigin(0.5, 0.5)
            platform.setImmovable(true)
            platform.body.allowGravity = false
            return platform
        }

        function spawnPlatforms() {
            var randomY = Phaser.Math.Between(180, 400)
            var platform = createPlatform(config.width + 100, randomY)
    
            // Set velocity to move the platform to the left
            platform.setVelocityX(-250) // Adjust the velocity as needed
    
            // Adjust the interval to control spawning frequency
            this.time.addEvent({ delay: 1000, callback: spawnPlatforms, callbackScope: this })
        }

        spawnPlatforms.call(this)

        //spawn random carrots
        var carrots = this.physics.add.group()

        function createCarrots(x, y) {
            var luck = Phaser.Math.Between(0, 10)
            if (luck == 1) {
                var carrot = carrots.create(x, y, 'goldCarrot')
            } else {
                var carrot = carrots.create(x, y, 'carrot')
            }
            carrot.setOrigin(0.5, 0.5)
            carrot.body.allowGravity = false
            return carrot
        }

        function spawnCarrots() {
            var randomY = Phaser.Math.Between(225, 425)
            var carrot = createCarrots(config.width + 100, randomY)

            carrot.setVelocityX(-300) // Adjust the velocity as needed
    
            // Adjust the interval to control spawning frequency
            this.time.addEvent({ delay: 1000, callback: spawnCarrots, callbackScope: this })
        }

        spawnCarrots.call(this)

        //spawn golden carrots
        // var goldCarrots = this.physics.add.group()

        // function creategoldCarrots(x, y) {
        //     var goldcarrot = goldCarrots.create(x, y, 'goldCarrot')
        //     goldcarrot.setOrigin(0.5, 0.5)
        //     goldcarrot.body.allowGravity = false
        //     return goldcarrot
        // }

        // function spawngoldCarrots() {
        //     var randomY = Phaser.Math.Between(200, 400)
        //     var goldcarrot = creategoldCarrots(config.width + 100, randomY)

        //     goldcarrot.setVelocityX(-300) // Adjust the velocity as needed
    
        //     // Adjust the interval to control spawning frequency
        //     this.time.addEvent({ delay: 3000, callback: spawngoldCarrots, callbackScope: this })
        // }

        // spawngoldCarrots.call(this)

        //create collisions
        this.physics.add.collider(this.bunny, this.startPlatform)
        this.physics.add.collider(this.bunny, platforms)

        this.physics.add.overlap(this.bunny, carrots, (bunny, carrots) => {
            changeScore(bunny, carrots)
            carrots.destroy()
            carrots.setVisible(false)
            carrots.setActive(false)
        })

        this.physics.add.collider(this.bunny, this.goldCarrot, (bunny, goldCarrot) => {
            this.goldCarrot.destroy()
            console.log('500 points')
        })
        
        this.physics.add.collider(this.bunny, this.grassGround)
        this.physics.add.collider(this.bunny, this.platforms)

        //show score
        var score = 0
        var scoreText
        scoreText = this.add.text(widthCenter, heightCenter, '0', scoreConfig).setOrigin(0.5)
        scoreText.setAlpha(0.5)
        function changeScore (bunny, carrot) {
            score += 20
            scoreText.setText('' + score)
        }
    }

    update() {
        //create sprite movement
        if(Phaser.Input.Keyboard.JustDown(keyRESTART)) {
            this.scene.start('overScene')
        }


        //checks if bunny is grounded, plays animation if so
        this.bunny.isGrounded = this.bunny.body.touching.down
        if(this.bunny.isGrounded) {
            this.bunny.anims.play('jump', true)
            this.jumps = this.JUMPS
            this.jumping = false
        } else {
            this.bunny.anims.play('jump')
        }

        if(this.jumps > 0 && Phaser.Input.Keyboard.DownDuration(keyJUMP, 150)) {
            this.bunny.setVelocityY(this.JUMP_VELOCITY)
            this.jumping = true
        }

        if(this.jumping && Phaser.Input.Keyboard.UpDuration(keyJUMP)) {
            this.jumps -= 1
            this.jumping = false
        }

        //move tile sprties
        this.clouds.tilePositionX += 3        
    }

}