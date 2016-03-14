import ShapeType = require("ShapeType");
import Shape = require("Shape");
import Model = require("Model");

function min(x1: number, x2: number): number {
    return x1 < x2 ? x1 : x2;
}

class WarpInArea {
    
    public maxShapeCount = 30;
    
    private gameModel: Model.IShapeGameModel;
    private game: Phaser.Game;
    
    private timer: Phaser.TimerEvent;

    constructor(gameModel: Model.IShapeGameModel, game: Phaser.Game) {
        this.gameModel = gameModel;
        this.game = game;
    }
    
    public start(): void {
        this.timer = this.game.time.events.loop(1000, this.TimerCallback, this);
    }
    
    public stop(): void {
        if (this.timer) {
            this.game.time.events.remove(this.timer);
        }
    }

    public TimerCallback(): void {
        var missing = this.maxShapeCount - this.gameModel.getShapes().length;
        if (missing > 0) {
            for (var i = 0; i < min(missing, 3); i++) {
                this.gameModel.addShape(
                    this.createShape(
                        <ShapeType>this.game.rnd.integerInRange(0, Object.keys(ShapeType).length / 2 - 1),
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