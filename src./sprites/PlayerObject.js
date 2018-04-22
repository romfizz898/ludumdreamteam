import BaseObject from './BaseObject'

export default class extends BaseObject {

    constructor ({ game, x, y, maxhp, asset, cursors }) {
        super({ game, x, y, maxhp, asset })

        this.game.physics.enable(this, Phaser.Physics.ARCADE)
        this.body.collideWorldBounds = true
        this.cursors = cursors
        this.isWasher = false
        this.isAlive = true
    }

    addControls() {
        this.body.velocity.x = 0
        this.body.velocity.y = 0

        if (this.cursors.isDown(Phaser.Keyboard.LEFT))
        {
            this.body.velocity.x = -260
            if (this.hasOwnProperty('wisherpointer')) {
                this.wisherpointer.x = this.body.x
            }

        }
        else if (this.cursors.isDown(Phaser.Keyboard.RIGHT))
        {
            this.body.velocity.x = 260
            if (this.hasOwnProperty('wisherpointer')) {
                this.wisherpointer.x = this.body.x
            }
        }

        if (this.cursors.isDown(Phaser.Keyboard.UP))
        {
            this.body.velocity.y = -260
            if (this.hasOwnProperty('wisherpointer')) {
                this.wisherpointer.y = this.body.y - 60
            }
        }

        if (this.cursors.isDown(Phaser.Keyboard.DOWN))
        {
            this.body.velocity.y = 260
            if (this.hasOwnProperty('wisherpointer')) {
                this.wisherpointer.y = this.body.y - 60
            }
        }
    }

    update () {
        this.addControls()
    }
}