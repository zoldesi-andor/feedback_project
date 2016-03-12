import Shape = require("Shape");
import ShapeType = require("ShapeType");
import Model = require("Model");

import GameEventType = require("../GameEventType");
import GameModel = require("../GameModel");

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
        var bmd = game.add.bitmapData(800, 100);
        bmd.ctx.beginPath();
        bmd.ctx.rect(0, 0, 800, 100);
        bmd.ctx.fillStyle = '#673AB7';
        bmd.ctx.fill();

        this.sprite = game.add.sprite(0, 0, bmd);
        game.physics.arcade.enable(this.sprite);
        this.getBody().immovable = true;

        // Creating Target indicator
        this.createTargetIndicator();

        // Creating Score indicator
        this.scoreSprite = this.game.add.text(700, 50, "Score: 0", { font: "40px Roboto", fill: "#ffffff" });
        this.scoreSprite.anchor.set(0.5, 0.5)

        this.gameModel.addChangeListener((event) => {
            this.checkForTargetChange();
            this.checkForScoreChange(event);
        });
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
            this.game.world.remove(this.targetIndicator);
            this.createTargetIndicator();
        }, this)
    }

    private createTargetIndicator(): void {
        this.targetIndicator = new Shape(this.gameModel.getTargetShapeType(), this.game, 50, 50);
        this.targetIndicator.tint = 0xFFFFFF;

        var width = this.targetIndicator.width;
        var height = this.targetIndicator.height;

        this.targetIndicator.width = this.targetIndicator.height = 0;
        this.game.add.existing(this.targetIndicator);

        this.game.add.tween(this.targetIndicator).to({ width: width, height: height }, 500, "Cubic", true);
    }
    
    private formatScoreText(score: number): string {
        return "Score " + score;        
    }
}

export = MenuBar;