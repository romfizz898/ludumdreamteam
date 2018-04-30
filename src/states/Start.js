/* globals __DEV__ */
import Phaser from 'phaser'

export default class extends Phaser.State {

    create () {
        let back = this.game.add.tileSprite(0,0,5750,3240,'game_opening')
        back.scale.x = this.game.width / back.width
        back.scale.y = this.game.height / back.height
        //this.audio = this.add.audio('nhl').loopFull()
    }

    update () {
        let cursors = this.game.input.keyboard.createCursorKeys()
        if (cursors.up.isDown) {
            this.state.start('Game')
            //this.audio.stop()
        }
    }
}