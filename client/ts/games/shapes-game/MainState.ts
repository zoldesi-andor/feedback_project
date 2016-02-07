import ShapeType = require("ShapeType");
import Shape = require("Shape");
import WarpInArea = require("WarpInArea");
import Model = require("Model");

class GameState extends Phaser.State implements Model.IGameModel {

    private shapesGroup: Phaser.Group;
    private targetShapeType: ShapeType;
    private warpInArea: WarpInArea;

    /** Phazer init life cycle callback */
    public init(): void {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
    }

    /** Phazer preload life cycle callback */
    public preload(): void {
        Shape.loadResources(this.game);
    }

    /** Phazer create life cycle callback */
    public create(): void {
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.stage.backgroundColor = "#FFFFFF";

        this.shapesGroup = this.add.physicsGroup(Phaser.Physics.ARCADE);
        
        this.warpInArea = new WarpInArea(this, this.game);
    }
    
    /** Phazer update callback */
    public update(): void {
        this.physics.arcade.collide(this.shapesGroup, undefined);
    }
    
    /** 
     * Adds a new shape to the game field 
     * @param {Shape} s - The shape to add to the game field.
     */
    public addShape(s: Shape): void {
        this.shapesGroup.add(s);
        s.inputEnabled = true;
        s.events.onInputDown.add(() => {
            s.kill();
            this.shapesGroup.remove(s);
        });
    }
        
    /** Gets all the shapes on the game field */
    public getShapes(): Array<Shape> {
        return <Array<Shape>> this.shapesGroup.children;
    }
        
    /** Gets the target shape type (the kind of shape the user has to find) */
    public getTargetShapeType(): ShapeType {
        return this.targetShapeType;
    }
        
    /** 
     * Sets the target shape type (the kind of shape the user has to find) 
     * @param {ShapeType} t - The new target shape type.
     */
    public setTargetShapeType(t: ShapeType): void {
        this.targetShapeType = t;
    }
}

export = GameState;