import Phaser from 'phaser'

export default class extends Phaser.Sprite {
    constructor ({ game, x, y, maxhp, asset }) {
        super(game, x, y, asset)
        this.maxHealth = maxhp
        this.health = maxhp
        this.anchor.setTo(0.5)
    }

    update () {
    }
}
