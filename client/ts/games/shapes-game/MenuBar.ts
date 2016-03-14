import Shape = require("Shape");
import ShapeType = require("ShapeType");
import Model = require("Model");

import GameEventType = require("../GameEventType");
import GameModel = require("../GameModel");

var Config = {
    width: 800,
    height: 100
};

class MenuBar {

    private gameModel: Model.IShapeGameModel;
    private game: Phaser.Game;
    private sprite: Phaser.Sprite;
    private scoreSprite: Phaser.Text;

    private targetIndicator: Shape;

    constructor(gameModel: Model.IShapeGameModel, game: Phaser.Game) {
        this.gameModel = gameModel;
        this.game = game;

        // Creating background
        var bmd = game.add.bitmapData(Config.width, Config.height);
        bmd.ctx.beginPath();
        bmd.ctx.rect(0, 0, Config.width, Config.height);
        bmd.ctx.fillStyle = '#673AB7';
        bmd.ctx.fill();

        this.sprite = game.add.sprite(0, 0, bmd);
        game.physics.arcade.enable(this.sprite);
        this.getBody().immovable = true;

        // Creating Target indicator
        this.createTargetIndicator(true);

        // Creating Score indicator        
        this.scoreSprite = this.game.make.text(700, 50, "Score: 0", { font: "40px Roboto", fill: "#ffffff" });
        this.scoreSprite.anchor.set(0.5, 0.5);
        this.sprite.addChild(this.scoreSprite);

        this.sprite.height = 0;

        this.gameModel.addChangeListener((event) => {
            this.checkForTargetChange();
            this.checkForScoreChange(event);
        });
    }

    public show(): void {
        this.game.add.tween(this.sprite).to({ height: Config.height }, 500, "Cubic", true);
    }

    public hide(): void {
        this.game.add.tween(this.sprite).to({ height: 0 }, 500, "Cubic", true);
    }

    public getSprite(): Phaser.Sprite {
        return this.sprite;
    }

    public getBody(): Phaser.Physics.Arcade.Body {
        return <Phaser.Physics.Arcade.Body>this.sprite.body;
    }

    private checkForScoreChange(event: GameModel.IGameEvent): void {
        if (event.EventType === GameEventType.Success) {
            this.scoreSprite.text = this.formatScoreText(this.gameModel.getScore());
        }
    }

    private checkForTargetChange(): void {
        if (this.targetIndicator.shapeType === this.gameModel.getTargetShapeType()) {
            return;
        }

        this.game.add.tween(this.targetIndicator).to({ width: 0, height: 0 }, 500, "Cubic", true).onComplete.add(() => {
            this.targetIndicator.kill();
            this.sprite.removeChild(this.targetIndicator);
            this.createTargetIndicator();
        }, this)
    }

    private createTargetIndicator(noTween?: boolean): void {
        this.targetIndicator = new Shape(this.gameModel.getTargetShapeType(), this.game, 50, 50, true);
        this.targetIndicator.tint = 0xFFFFFF;

        var width = this.targetIndicator.width;
        var height = this.targetIndicator.height;

        this.sprite.addChild(this.targetIndicator);
        this.targetIndicator.bringToTop();

        if (!noTween) {
            this.targetIndicator.width = this.targetIndicator.height = 0;
            this.game.add.tween(this.targetIndicator).to({ width: width, height: height }, 500, "Cubic", true);
        }
    }

    private formatScoreText(score: number): string {
        return "Score " + score;
    }
}

export = MenuBar;