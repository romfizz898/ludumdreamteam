/* globals __DEV__ */
import Phaser from 'phaser'

import PlayerObject from '../sprites/PlayerObject'
import Washer from '../sprites/Washer'
import Gates from '../sprites/Gates'
import BaseObject from "../sprites/BaseObject"

export default class extends Phaser.State {

  init() { }
  preload() { }

  create() {
    this.game.world.setBounds(0, 0, this.game.width, this.game.height)

    this.game.physics.startSystem(Phaser.Physics.ARCADE)
    this.cursors = this.game.input.keyboard

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
          asset: 'mushroom'
      })

      this.gates = new Gates({
          game: this.game,
          x: this.world.width,
          y: this.world.centerY,
          asset: 'mushroom'
      })

    this.game.add.existing(this.player)
    this.game.add.existing(this.washer)
    this.game.add.existing(this.gates)

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
              asset: 'mushroom'
          })
          this.game.add.existing(this.washer)
          this.player.wisherpointer.destroy()
      }
  }

  addWishertoObject (object) {
    object.wisherpointer = this.game.add.sprite(object.x, object.y - 40, 'mushroom')
  }

  render() {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.player, 32, 32)
    }
  }
}
