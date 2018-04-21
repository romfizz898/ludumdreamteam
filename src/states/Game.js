/* globals __DEV__ */
import Phaser from 'phaser'

import PlayerObject from '../sprites/PlayerObject'
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
        x: this.world.centerX,
        y: this.world.centerY,
        maxhp: 100,
        asset: 'dude',
        cursors: this.cursors
    })

    this.game.add.existing(this.player)




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

  }

  render() {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.player, 32, 32)
    }
  }
}
