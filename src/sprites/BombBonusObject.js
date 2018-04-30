import BonusObject from './BonusObject'

export default class extends BonusObject {
    constructor ({ game, x, y, asset, scene }) {
        super({game, x, y, asset, scene })
        this.anchor.setTo(0.5)
    }

    applyBonus (player) {
        for (let i = 0; i < this.scene.enemygoblins.length; ++i) {
            if (this.scene["enemygoblin" + i].isAlive == true) {
                this.scene["enemygoblin" + i].kill()
                this.scene["enemygoblin" + i].isAlive = false
                this.isAlive = false
                break
            }
        }
        this.kill()
    }

    update () {
    }
}