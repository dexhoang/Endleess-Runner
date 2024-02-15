// class Platform extends Phaser.Physics.Arcade.Sprite {
//     constructor(scene, velocity) {
//         super(scene, gameWidth + 96, Phaser.Math.Between(32/2, gameHeight - 32/2), 'platform')
//         this.parentScene = scene

//         this.parentScene.add.existing(this)
//         this.parentScene.physics.add.existing(this)
//         this.setVelocityX(velocity)
//         this.setImmovable()
//         this.newBarrier = true
//     }

//     update() {
//         if(this.newBarrier && this.x < centerX) {
//             // (recursively) call parent scene method from this context
//             this.parentScene.addBarrier(this.parent, this.velocity);
//             this.newBarrier = false;
//         }

//         // destroy paddle if it reaches the left edge of the screen
//         if(this.x < -this.width) {
//             this.destroy();
//         }
//     }
// }