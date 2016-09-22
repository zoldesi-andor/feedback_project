import ShapeType = require("ShapeType");

class Shape extends Phaser.Sprite {
    public shapeType: ShapeType;

    constructor(type: ShapeType, game: Phaser.Game, x: number, y: number, noPhysics?: boolean) {
        super(game, x, y, "shapes");

        this.shapeType = type;
        this.frame = type;

        if (!noPhysics) {
            game.physics.arcade.enable(this);

            var body = this.getBody();
            body.bounce.set(1);
            body.collideWorldBounds = true;
            body.drag.setTo(30, 30);
            body.angularDrag = 30;
        }

        this.scale.setTo(0.5, 0.5);
        this.anchor.set(0.5, 0.5);

        this.tint = Shape.Colors[game.rnd.integerInRange(0, Shape.Colors.length - 1)];
    }

    public getBody(): Phaser.Physics.Arcade.Body {
        return <Phaser.Physics.Arcade.Body>this.body;
    }

    /** Loads the necessary resources (e.g. images, sprites etc.) */
    public static loadResources(game: Phaser.Game): void {
        game.load.atlas("shapes", "images/shapes.png", "images/shapes.json");
    }

    public static Colors = [
        0xFF5722, 0x795548, 0xFFEB3B, 0xFFC107, 0xFF9800, 0x4CAF50, 0x8BC34A,
        0xCDDC39, 0x03A9F4, 0x00BCD4, 0x009688, 0x673AB7, 0x3F51B5, 0x2196F3,
        0xF44336, 0xE91E63, 0x9C27B0,
    ]
}

export = Shape;