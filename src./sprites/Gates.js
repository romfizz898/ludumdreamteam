import Phaser from 'phaser'

export default class extends Phaser.Sprite {
    constructor ({ game, x, y, maxhp, asset }) {
        super(game, x, y, asset)
        this.anchor.setTo(0.5)
        this.game.physics.enable(this, Phaser.Physics.ARCADE)
        this.body.immovable = true
        this.body.collideWorldBounds = true
    }

    update () {
    }
}