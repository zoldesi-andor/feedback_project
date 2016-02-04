import ShapeType = require("ShapeType");
import Shape = require("Shape");

class GameState extends Phaser.State {

    private shapes: Phaser.Group;

    public init(): void {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
    }

    public preload(): void {
        Shape.loadResources(this.game);
    }

    public create(): void {
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.stage.backgroundColor = "#FFFFFF";

        this.shapes = this.add.physicsGroup(Phaser.Physics.ARCADE);

        this.shapes.add(this.createShape(ShapeType.kite, 20, 20));

        for (var i = 0; i < 13; i++) {
            var x = this.rnd.integerInRange(0, 700);
            var y = this.rnd.integerInRange(0, 300);
            var type = <ShapeType> i; //this.rnd.integerInRange(0, Object.keys(ShapeType).length / 2);
            this.shapes.add(this.createShape(type, x, y));
        }
    }
    
    public update(): void {
        this.physics.arcade.collide(this.shapes, undefined);
    }

    private createShape(type: ShapeType, x: number, y: number): Phaser.Sprite {
        var shape = new Shape(type, this.game, x, y)
        
        shape.scale.setTo(0.5, 0.5);
        
        shape.getBody().velocity.setTo(
            this.rnd.integerInRange(-100, 100),
            this.rnd.integerInRange(-100, 100));

        return shape;
    }
}

export = GameState;