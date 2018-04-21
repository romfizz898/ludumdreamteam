import BaseObject from './BaseObject'

export default class extends BaseObject {

    constructor ({ game, x, y, maxhp, asset, cursors }) {
        super({ game, x, y, maxhp, asset })

        this.game.physics.enable(this, Phaser.Physics.ARCADE)
        this.cursors = cursors
    }

    addControls() {
        this.body.velocity.x = 0
        this.body.velocity.y = 0

        if (this.cursors.isDown(Phaser.Keyboard.LEFT))
        {
            this.body.velocity.x = -200
            if (this.x <= 0) {
                this.body.velocity.x = 0
            }

        }
        else if (this.cursors.isDown(Phaser.Keyboard.RIGHT))
        {
            this.body.velocity.x = 200
            if (this.x >= this.game.width) {
                this.body.velocity.x = 0
            }
        }

        if (this.cursors.isDown(Phaser.Keyboard.UP))
        {
            this.body.velocity.y = -200
            if (this.y <= 0) {
                this.body.velocity.y = 0
            }
        }

        if (this.cursors.isDown(Phaser.Keyboard.DOWN))
        {
            this.body.velocity.y = 200
            if (this.y >= this.game.height) {
                this.body.velocity.y = 0
            }
        }
    }

    update () {
        this.addControls()
    }
}
