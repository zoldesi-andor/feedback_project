
var Config = {
    maxHeight: window.innerHeight,
    maxWidth: 800
}

class StartPopup {

    private game: Phaser.Game;
    private background: Phaser.Sprite;

    private closeHandler: () => void;

    constructor(game: Phaser.Game, onClose: () => void) {
        this.game = game;
        this.closeHandler = onClose;

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
        this.background.bringToTop();

        var message1 = this.game.make.text(
            0,
            -1 * (height * 0.15),
            "Are you ready?",
            { font: "50px Roboto", fill: "#212121" });
        message1.anchor.set(0.5);
        this.background.addChild(message1);

        var message2 = this.game.make.text(
            0,
            (height * 0.15),
            "Click to start",
            { font: "30px Roboto", fill: "#212121" });
        message2.anchor.set(0.5);
        this.background.addChild(message2);

        this.background.inputEnabled = true;
        this.background.events.onInputDown.add(() => this.Close());
    }

    /**
     * Closes the popup.
     */
    public Close(): void {
        this.game.add.tween(this.background).to({ width: 0, height: 0 }, 500, "Cubic", true)
            .onComplete.add(
            () => {
                this.background.kill();
                this.game.world.remove(this.background);
                this.closeHandler();
            }, this)
    }
}

export = StartPopup;
