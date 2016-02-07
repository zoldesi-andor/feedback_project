import Shape = require("Shape");
import ShapeType = require("ShapeType");
import Model = require("Model");

class MenuBar {
    
    private gameModel;
    private sprite;
    
    constructor(gameModel: Model.IGameModel, game: Phaser.Game) {
        this.gameModel = gameModel;
        
        var bmd = game.add.bitmapData(800, 100);
        bmd.ctx.beginPath();
        bmd.ctx.rect(0,0,800,100);
        bmd.ctx.fillStyle = '#ff0000';
        bmd.ctx.fill();
        
        this.sprite = game.add.sprite(0, 0, bmd);
        game.physics.arcade.enable(this.sprite);
        this.getBody().immovable = true;
    }
    
    private getBody(): Phaser.Physics.Arcade.Body {
        return <Phaser.Physics.Arcade.Body> this.sprite.body;
    }
}

export = MenuBar;