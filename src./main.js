import 'pixi'
import 'p2'
import Phaser from 'phaser'

import BootState from './states/Boot'
import SplashState from './states/Splash'
import GameState from './states/Game'
import StartGame from './states/Start'
import GameOver from './states/GameOver'

class Game extends Phaser.Game {
  constructor () {

    const screenWidth = window.innerWidth
    const screenHeight = window.innerHeight
    super(screenWidth, screenHeight, Phaser.CANVAS, 'content', null)

    this.state.add('Boot', BootState, false)
    this.state.add('Splash', SplashState, false)
    this.state.add('Game', GameState, false)
    this.state.add('Start', StartGame, false)
    this.state.add('GameOver', GameOver, false)
    this.state.start('Boot')

  }
}

window.game = new Game()