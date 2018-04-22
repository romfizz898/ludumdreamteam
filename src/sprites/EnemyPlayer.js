import BaseObject from './BaseObject'

export default class extends BaseObject {

    constructor ({ game, x, y, maxhp, asset, player, scene }) {
        super({ game, x, y, maxhp, asset })

        this.player = player
        this.scene = scene
        this.game.physics.enable(this, Phaser.Physics.ARCADE)
        this.body.collideWorldBounds = true
        this.isWasher = false
        this.enemyVelocity = 250
        this.nexthit = 5
        this.isAlive = true
    }

    moveEnemytoPlayer () {
        let vector = this.getVectorBetweenObjects(this.body, this.player.body)
        this.body.velocity.x = this.enemyVelocity * vector.x
        this.body.velocity.y = this.enemyVelocity * vector.y
    }

    moveEnemytoWasher () {
        if (this.scene.washer.body != null) {
            let vector = this.getVectorBetweenObjects(this.body, this.scene.washer.body)
            this.body.velocity.x = this.enemyVelocity * vector.x
            this.body.velocity.y = this.enemyVelocity * vector.y
        }
    }

    moveEnemytoGates () {
        if (this.isWasher) {
            let vector = this.getVectorBetweenObjects(this.body, this.scene.gates.body)
            this.body.velocity.x = this.enemyVelocity * vector.x
            this.body.velocity.y = this.enemyVelocity * vector.y
            if (this.hasOwnProperty('wisherpointer')) {
                this.wisherpointer.x = this.body.x
                this.wisherpointer.y = this.body.y
            }
        }
    }

    randomIdle () {
        if (this.hasOwnProperty('randompoint') && this.getDistanceBetweenObjects(this.body, this.randompoint) > 50) {
            let vector = this.getVectorBetweenObjects(this.body, this.randompoint)
            this.body.velocity.x = this.enemyVelocity * vector.x
            this.body.velocity.y = this.enemyVelocity * vector.y
        }
        else {
            this.randompoint = {}
            this.randompoint.x = 0.9 * this.game.world.randomX
            this.randompoint.y = 0.9 * this.game.world.randomY
        }
    }


    updateNextHit () {
        this.nexthit = this.game.time.now + 300
    }

    moveEnemy () {
        this.body.velocity.x = 0
        this.body.velocity.y = 0
        if (this.isWasher) {
            this.moveEnemytoGates()
        }
        else if (this.scene.washer.body != null && this.getDistanceBetweenObjects(this.body, this.scene.washer.body) < 700) {
            this.moveEnemytoWasher()
        }
        else {
            if (this.player.isWasher && this.getDistanceBetweenObjects(this.body, this.player.body) < 300) {
                this.moveEnemytoPlayer()
            }
            else {
                this.randomIdle()
            }
        }
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

    update () {
        this.moveEnemy()
    }
}
