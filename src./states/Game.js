/* globals __DEV__ */
import Phaser from 'phaser'

import PlayerObject from '../sprites/PlayerObject'
import Washer from '../sprites/Washer'
import Gates from '../sprites/Gates'
import BaseObject from "../sprites/BaseObject"
import EnemyPlayer from "../sprites/EnemyPlayer"
import GoblinObject from "../sprites/GoblinObject"

export default class extends Phaser.State {

  init() { }
  preload() {
  }

  create() {

    this.game.world.setBounds(0, 0, this.game.width, this.game.height)

    this.game.physics.startSystem(Phaser.Physics.ARCADE)
    this.cursors = this.game.input.keyboard

    let backGround = this.game.add.tileSprite(0,0,1136,737,'field')
    backGround.scale.x = this.game.width / backGround.width
    backGround.scale.y = this.game.height / backGround.height

      this.add.text(0.75 * this.game.width,  0.9 * this.game.height, 'HP',
          { font: '45px Arial', fill: '#ffffff', align: 'center' }).fixedToCamera = true

    this.score = 0
    this.scoreText = this.game.add.text(0.6 * this.game.width, 0.9 * this.game.height, 'Score: ' + this.score,
          { font: '45px Arial', fill: '#ffffff', align: 'center' })
    this.scoreText.fixedToCamera = true

    this.add.sprite(0.8 * this.game.width, 0.91 * this.game.height, 'progress1').fixedToCamera = true
    this.hpProgressBar = this.game.add.sprite(0.8 * this.game.width, 0.91 * this.game.height, 'progress2')
    this.hpProgressBar.fixedToCamera = true

    this.player = new PlayerObject({
        game: this.game,
        x: 40,
        y: this.world.centerY,
        maxhp: 10,
        asset: 'dude',
        cursors: this.cursors
    })

    this.washer = new Washer({
        game: this.game,
        x: 300,
        y: this.world.centerY,
        asset: 'washer'
    })

    this.gates = new Gates({
        game: this.game,
        x: this.world.width,
        y: this.world.centerY,
        asset: 'mushroom'
    })

    this.max_number_of_players = 10
    this.max_number_of_goblins = 5

    this.enemygoblins = []
    this.next_goblin_spawn = 5000
    this.next_enemy_spawn = 1000

    for (let i = 0; i < this.max_number_of_players; ++i) {
        this["enemyplayer" + i] = new EnemyPlayer({
            game: this.game,
            x: this.game.world.randomX,
            y: this.game.world.randomY,
            maxhp: 3,
            asset: 'enemy',
            player: this.player,
            scene: this
        })

        this["enemyplayer" + i].animations.add('left', [0, 1, 2, 3, 4, 5, 6], 3, true)
        this["enemyplayer" + i].animations.add('right', [7, 8, 9, 10, 11, 12], 3, true)
        this["enemyplayer" + i].animations.add('hold', [13, 14], 2, true)

        this.game.add.existing(this['enemyplayer' + i])

    }

    for (let i = 0; i < 2; ++i) {
      this["enemygoblin" + i] = new GoblinObject({
          game: this.game,
          x: this.game.world.randomX,
          y: this.game.world.randomY,
          maxhp: 3,
          asset: 'mushroom',
          player: this.player,
          scene: this
      })
      this.game.add.existing(this["enemygoblin" + i])
      this.enemygoblins.push(this['enemygoblin' + i])
    }

    this.game.add.existing(this.player)
    this.game.add.existing(this.washer)
    this.game.add.existing(this.gates)

    this.player.animations.add('left', [0, 1, 2, 3, 4, 5, 6], 3, true)
    this.player.animations.add('right', [7, 8, 9, 10, 11, 12], 3, true)
    this.player.animations.add('hold', [13, 14], 2, true)

  }



  update () {

      let playerHitWasher = this.game.physics.arcade.collide(this.player, this.washer, this.playerHitWasherTrigger, null, this)
      let playerHitGates = this.game.physics.arcade.collide(this.player, this.gates, this.playerHitGatesTrigger, null, this)
      this.spawnNewGoblin()
      this.spawnNewEnemies()

      for (let i = 0; i < this.max_number_of_players; ++i) {
          this.game.physics.arcade.overlap(this['enemyplayer' + i], this.washer, this.enemyHitWasherTrigger, null, this)
          this.game.physics.arcade.overlap(this['enemyplayer' + i], this.gates, this.enemyHitGatesTrigger, null, this)
          this.game.physics.arcade.overlap(this['enemyplayer' + i], this.player, this.playerEnemyCollideTrigger, null, this)
      }

      for (let i = 0; i < this.enemygoblins.length; ++i) {
          this.game.physics.arcade.overlap(this['enemygoblin' + i], this.player, this.playerGoblinCollideTrigger, null, this)
          for (let j = 0; j < this.max_number_of_players; ++j) {
              this.game.physics.arcade.overlap(this['enemygoblin' + i], this['enemyplayer' + j], this.enemyGoblinCollideTrigger, null, this)
          }
      }

      //@todo annimations left-right
      this.player.animations.play('hold')
  }

  playerHitWasherTrigger () {
    this.player.isWasher = true
    this.washer.destroy()
    this.addWishertoObject(this.player)
  }

  playerHitGatesTrigger () {
      if (this.player.isWasher) {
          this.player.isWasher = false
          this.washer = new Washer({
              game: this.game,
              x: 300,
              y: this.world.centerY,
              asset: 'washer'
          })
          this.game.add.existing(this.washer)
          this.player.wisherpointer.destroy()

          this.score++
          this.scoreText.setText('Score: ' + this.score)
      }
  }

    enemyHitWasherTrigger (enemyplayer, washer) {
        enemyplayer.isWasher = true
        this.washer.destroy()
        this.addWishertoObject(enemyplayer)
    }

    enemyHitGatesTrigger (enemyplayer, gates) {
        if (enemyplayer.isWasher) {
            enemyplayer.isWasher = false
            this.washer = new Washer({
                game: this.game,
                x: 300,
                y: this.world.centerY,
                asset: 'washer'
            })
            this.game.add.existing(this.washer)
            enemyplayer.wisherpointer.destroy()
            this.score--
            this.scoreText.setText('Score: ' + this.score)
        }
    }

    enemyGoblinCollideTrigger (goblin, enemy) {
        if (this.game.time.now > goblin.nexthit) {
            enemy.health -= 1
            goblin.updateNextHit()
            if (enemy.health <= 0) {
                if (enemy.isWasher) {
                    enemy.isWasher = false
                    this.washer = new Washer({
                        game: this.game,
                        x: 300,
                        y: this.world.centerY,
                        asset: 'mushroom'
                    })
                    this.game.add.existing(this.washer)
                    enemy.wisherpointer.destroy()
                }
                enemy.kill()
                enemy.isAlive = false
            }
        }
    }

    playerEnemyCollideTrigger (enemyplayer, player) {
        if (player.isWasher && this.game.time.now > enemyplayer.nexthit) {
            enemyplayer.isWasher = true
            player.isWasher = false
            this.addWishertoObject(enemyplayer)
            player.wisherpointer.destroy()
            enemyplayer.updateNextHit()
        }
        else if (enemyplayer.isWasher) {
            enemyplayer.isWasher = false
            player.isWasher = true
            this.addWishertoObject(player)
            enemyplayer.wisherpointer.destroy()
        }
    }

    playerGoblinCollideTrigger (goblin, player) {
        if (this.game.time.now > goblin.nexthit) {
            player.health -= 1
            this.updateProgressBar()
            goblin.updateNextHit()
            if (player.health <= 0) {
                player.kill()
            }
        }
    }

    spawnNewGoblin () {
      if (this.game.time.now > this.next_goblin_spawn && this.enemygoblins.length < this.max_number_of_goblins) {
          this.next_goblin_spawn = this.game.time.now + 3000
          this['enemygoblin' + this.enemygoblins.length] = new GoblinObject({
              game: this.game,
              x: this.game.world.randomX,
              y: this.game.world.randomY,
              maxhp: 10,
              asset: 'mushroom',
              player: this.player,
              scene: this
          })

          this['enemygoblin' + this.enemygoblins.length].enemyVelocity =
              this['enemygoblin' + this.enemygoblins.length].enemyVelocity + this.enemygoblins.length * 10


          this.game.add.existing(this['enemygoblin' + this.enemygoblins.length])
          this.enemygoblins.push(this['enemygoblin' + this.enemygoblins.length])
      }
   }

   spawnNewEnemies () {
       if (this.game.time.now > this.next_enemy_spawn) {
           for (let i = 0; i < this.max_number_of_players; ++i) {
               if (!this["enemyplayer" + i].isAlive) {
                   this["enemyplayer" + i].isAlive = true
                   this["enemyplayer" + i].health = 3
                   if (Math.random() < 0.5) {
                       this["enemyplayer" + i].reset(this.game.world.randomX, 50)
                   }
                   else {
                       this["enemyplayer" + i].reset(this.game.world.randomX, this.game.world.height - 50)
                   }
                   this.next_enemy_spawn = this.game.time.now + 200
                   break
               }
           }
       }
   }

    updateProgressBar () {
        this.hpProgressBar.scale.x = this.player.health / this.player.maxHealth
    }

  addWishertoObject (object) {
    object.wisherpointer = this.game.add.sprite(object.body.x, object.body.y, 'washer-move')
  }

  render() {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.player, 32, 32)
    }
  }
}
