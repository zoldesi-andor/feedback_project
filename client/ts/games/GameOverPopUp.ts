

var Config = {
    maxHeight: window.innerHeight,
    maxWidth: 800
}

class StartPopup {

    private game: Phaser.Game;
    private background: Phaser.Sprite;

    constructor(game: Phaser.Game, playAgain: () => void) {
        this.game = game;

        var height = Config.maxHeight * 0.8;
        var width = Config.maxWidth * 0.8;

        var bmd = this.game.add.bitmapData(width, height);
        bmd.ctx.beginPath();
        bmd.ctx.rect(0, 0, width, height);
        bmd.ctx.fillStyle = '#DDDDDD';
        bmd.ctx.fill();

        this.background = this.game.add.sprite(
            Config.maxWidth / 2, Config.maxHeight / 2,
            bmd);
        this.background.anchor.set(0.5, 0.5);
        this.background.width = this.background.height = 0;
        this.background.bringToTop();
        
        this.background.inputEnabled = true;
        this.background.events.onInputDown.add(() => {
            this.game.add.tween(this.background).to({width: 0, height: 0}, 500, "Cubic", true).onComplete.add(playAgain);
        });
        
        this.game.add.tween(this.background).to({width: width, height: height}, 500, "Cubic", true);
    }
}

export = StartPopup;
