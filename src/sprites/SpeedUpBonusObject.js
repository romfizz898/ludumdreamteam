import BonusObject from './BonusObject'

export default class extends BonusObject {
    constructor ({ game, x, y, asset, scene }) {
        super({game, x, y, asset, scene })
        this.anchor.setTo(0.5)
    }

    applyBonus (player) {
        player.speed += 16
        this.kill()
        this.isAlive = false
    }

    update () {
    }
}