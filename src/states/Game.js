/* globals __DEV__ */
import Phaser from 'phaser'

import PlayerObject from '../sprites/PlayerObject'
import Washer from '../sprites/Washer'
import Gates from '../sprites/Gates'
import BaseObject from "../sprites/BaseObject"
import EnemyPlayer from "../sprites/EnemyPlayer";

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


    this.player = new PlayerObject({
        game: this.game,
        x: 40,
        y: this.world.centerY,
        maxhp: 100,
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

    this.enemyplayers = []
    for (let i = 0; i < this.max_number_of_players; ++i) {
        this["enemyplayer" + i] = new EnemyPlayer({
            game: this.game,
            x: this.game.world.randomX,
            y: this.game.world.randomY,
            maxhp: 10,
            asset: 'enemy',
            player: this.player,
            scene: this
        })
        this.game.add.existing(this['enemyplayer' + i])
    }

    //let field = this.game.add.tileSprite(0, 0, 8000, 1.2 * this.game.height, 'sky')

    this.game.add.existing(this.player)
    this.game.add.existing(this.washer)
    this.game.add.existing(this.gates)

    this.player.animations.add('left', [0, 1, 2, 3, 4, 5, 6], 3, true)
    this.player.animations.add('right', [7, 8, 9, 10, 11, 12], 3, true)
    this.player.animations.add('hold', [13, 14], 2, true)


    //const bannerText = 'Phaser + ES6 + Webpack'
    /*let banner = this.add.text(this.world.centerX, this.game.height - 80, bannerText, {
      font: '40px Bangers',
      fill: '#77BFA3',
      smoothed: false
    })

    banner.padding.set(10, 16)
    banner.anchor.setTo(0.5) */
  }



  update () {

      let playerHitWasher = this.game.physics.arcade.collide(this.player, this.washer, this.playerHitWasherTrigger, null, this)

      let playerHitGates = this.game.physics.arcade.collide(this.player, this.gates, this.playerHitGatesTrigger, null, this)


      for (let i = 0; i < this.max_number_of_players; ++i) {
          this.game.physics.arcade.overlap(this['enemyplayer' + i], this.washer, this.enemyHitWasherTrigger, null, this)
          this.game.physics.arcade.overlap(this['enemyplayer' + i], this.gates, this.enemyHitGatesTrigger, null, this)
          this.game.physics.arcade.overlap(this['enemyplayer' + i], this.player, this.playerEnemyCollideTrigger, null, this)
      }

      //@todo annimations left-right
      this.player.animations.play('hold')

      //this.wisherpointer.animations.play('washer-move')

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

    generateEnemyPlayers (number_of_enemies) {
      for (let i = 0; i < number_of_enemies; ++i) {
        this.enemyplayer = new EnemyPlayer({
            game: this.game,
            x: this.game.world.randomX,
            y: this.game.world.randomY,
            maxhp: 10,
            asset: 'dude',
            player: this.player,
            scene: this
        })
        this.enemyplayers.push(this.enemyplayer)
        this.game.add.existing(this.enemyplayer)
      }
    }

  addWishertoObject (object) {

    object.wisherpointer = this.game.add.sprite(object.body.x, object.body.y, 'washer-move')

    
    //object.wisherpointer.animations.add('washer', [0,1], 10, true)
    //object.wisherpointer.animations.play('washer', 3, true)
  }

  render() {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.player, 32, 32)
    }
  }
}
