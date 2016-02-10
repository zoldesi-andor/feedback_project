import Shape = require("Shape");
import ShapeType = require("ShapeType");
import Model = require("Model");

class MenuBar {

    private gameModel: Model.IGameModel;
    private game: Phaser.Game;
    private sprite: Phaser.Sprite;

    private targetIndicator: Shape;

    constructor(gameModel: Model.IGameModel, game: Phaser.Game) {
        this.gameModel = gameModel;
        this.game = game;

        var bmd = game.add.bitmapData(800, 100);
        bmd.ctx.beginPath();
        bmd.ctx.rect(0, 0, 800, 100);
        bmd.ctx.fillStyle = '#673AB7';
        bmd.ctx.fill();

        this.sprite = game.add.sprite(0, 0, bmd);
        game.physics.arcade.enable(this.sprite);
        this.getBody().immovable = true;
        
        this.createTargetIndicator();
        
        this.gameModel.addChangeListener(() => {
            if (this.targetIndicator.shapeType === this.gameModel.getTargetShapeType()) {
                return;
            }
            
            this.targetIndicator.kill();        
            this.game.world.remove(this.targetIndicator);
            this.createTargetIndicator();
        });
    }

    public getSprite(): Phaser.Sprite {
        return this.sprite;
    }

    public getBody(): Phaser.Physics.Arcade.Body {
        return <Phaser.Physics.Arcade.Body>this.sprite.body;
    }

    private createTargetIndicator(): void {
        this.targetIndicator = new Shape(this.gameModel.getTargetShapeType(), this.game, 50, 50);
        this.targetIndicator.tint = 0xFFFFFF;
        this.game.add.existing(this.targetIndicator);
    }
}

export = MenuBar;