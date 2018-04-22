import Phaser from 'phaser'
import BaseObject from './BaseObject'

export default class extends BaseObject {
    constructor ({ game, x, y, maxhp, asset, player, scene }) {
        super({ game, x, y, maxhp, asset })

        this.player = player
        this.scene = scene

        this.game.physics.enable(this, Phaser.Physics.ARCADE)
        this.body.collideWorldBounds = true
        this.body.checkCollision.up = false
        this.body.checkCollision.down = false
        this.nexthit = 5
        this.body.immovable = true

        this.enemyVelocity = 175

    }

    update () {
        this.moveEnemy()
    }

    moveEnemy() {
        let min_distance = 100000000
        let vector = {}
        this.body.velocity.x = 0
        this.body.velocity.y = 0

        let distance = this.getDistanceBetweenObjects(this.body, this.player.body)
        if (distance < min_distance) {
            min_distance = distance
            vector = this.getVectorBetweenObjects (this.body, this.player.body)
        }

        for (let i = 0; i < this.scene.max_number_of_players; ++i) {
            let distance = this.getDistanceBetweenObjects(this.body, this.scene['enemyplayer' + i].body)
            if (distance < min_distance) {
                min_distance = distance
                vector = this.getVectorBetweenObjects (this.body, this.scene['enemyplayer' + i].body)
            }
        }

        this.body.velocity.x = this.enemyVelocity * (vector.x)
        this.body.velocity.y = this.enemyVelocity * (vector.y)
    }

    getVectorBetweenObjects (object1, object2) {
        let result = {}
        if (object1 != null && object2 != null) {
            result.x = object2.x - object1.x
            result.y = object2.y - object1.y
            let length = Math.sqrt(result.x * result.x + result.y * result.y)
            result.x = result.x / (length)
            result.y = result.y / (length)
        }
        else {
            result.x = result.y = 0
        }

        return result
    }

    getDistanceBetweenObjects (object1, object2) {
        let dx = object1.x - object2.x
        let dy = object1.y - object2.y

        return Math.sqrt(dx * dx + dy * dy)
    }
}
