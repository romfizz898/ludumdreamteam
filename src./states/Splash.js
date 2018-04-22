import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init () {}

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])

    this.load.setPreloadSprite(this.loaderBar)
    //
    // load your assets
    //
    this.load.image('mushroom', 'assets/images/mushroom2.png')
    this.load.image('field', 'assets/images/main-field.png')
    this.load.image('washer', 'assets/images/washer.png')

    this.load.spritesheet('washer-move', 'assets/images/washer-move.png', 64, 64)
    this.load.spritesheet('dude', 'assets/images/hero-big.png', 96, 96)
    this.load.spritesheet('enemy', 'assets/images/enemy-big.png', 96, 96)
  }

  create () {
    this.state.start('Game')
  }
}
