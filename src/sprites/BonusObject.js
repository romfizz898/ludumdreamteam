import Phaser from 'phaser'

export default class extends Phaser.Sprite {
    constructor ({ game, x, y, asset, scene }) {
        super(game, x, y, asset)
        this.scene = scene
        this.anchor.setTo(0.5)
        this.game.physics.enable(this, Phaser.Physics.ARCADE)
        this.body.collideWorldBounds = true
        this.isAlive = true
    }

    applyBonus (bonus, player) {

    }

    update () {
    }
}