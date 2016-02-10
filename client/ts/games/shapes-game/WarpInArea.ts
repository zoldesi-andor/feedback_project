import ShapeType = require("ShapeType");
import Shape = require("Shape");
import Model = require("Model");

function min(x1: number, x2: number): number {
    return x1 < x2 ? x1 : x2;
}

class WarpInArea {
    private gameModel: Model.IGameModel;
    private game: Phaser.Game;

    public maxShapeCount = 30;

    constructor(gameModel: Model.IGameModel, game: Phaser.Game) {
        this.gameModel = gameModel;
        this.game = game;

        this.game.time.events.loop(1000, this.TimerCallback, this);
    }

    public TimerCallback(): void {
        var missing = this.maxShapeCount - this.gameModel.getShapes().length;
        if (missing > 0) {
            for (var i = 0; i < min(missing, 3); i++) {
                this.gameModel.addShape(
                    this.createShape(
                        <ShapeType>this.game.rnd.integerInRange(0, Object.keys(ShapeType).length / 2),
                        this.game.rnd.integerInRange(100, 700),
                        150
                    ));
            }
        }
    }

    private createShape(type: ShapeType, x: number, y: number): Shape {
        var shape = new Shape(type, this.game, x, y)

        var angle = this.game.rnd.integerInRange(120, 60);
        var speed = this.game.rnd.integerInRange(200, 300);

        var body = shape.getBody();

        this.game.physics.arcade.velocityFromAngle(angle, speed, body.velocity);

        shape.angle = this.game.rnd.integerInRange(-200, 200);
        // body.angularDrag = 20;

        return shape;
    }
}

export = WarpInArea;