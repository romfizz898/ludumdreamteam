/* globals __DEV__ */
import Phaser from 'phaser'

export default class extends Phaser.State {

    create () {
        let backGameOver = this.game.add.tileSprite(0,0,1920,1080,'gameover')
        backGameOver.scale.x = this.game.width / backGameOver.width
        backGameOver.scale.y = this.game.height / backGameOver.height
        this.audio = this.add.audio('loose').play()
        this.scoreText = this.game.add.text(0.7 * this.game.width, 0.6 * this.game.height, 'Current score: ' + localStorage.getItem('score'),
            { font: '45px Arial', fill: '#212228', align: 'center' })
        this.scoreText.fixedToCamera = true
        this.scoreText = this.game.add.text(0.7 * this.game.width, 0.68 * this.game.height, 'Highscore: ' + localStorage.getItem('highscore'),
            { font: '45px Arial', fill: '#212228', align: 'center' })
        this.scoreText.fixedToCamera = true
    }

    update () {
        let cursors = this.game.input.keyboard.createCursorKeys()

        if (cursors.up.isDown) {
            this.state.start('Start')
            //this.audio.stop();
        }
    }
}