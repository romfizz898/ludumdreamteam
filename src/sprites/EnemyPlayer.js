import BaseObject from './BaseObject'

export default class extends BaseObject {

    constructor ({ game, x, y, maxhp, asset, player }) {
        super({ game, x, y, maxhp, asset })

        this.player = player
        this.game.physics.enable(this, Phaser.Physics.ARCADE)
        this.body.collideWorldBounds = true
        this.isWasher = false
        this.enemyVelocity = 10;
    }

    moveEnemytoPlayer() {


    }

    update () {
        this.addControls()
    }
}
