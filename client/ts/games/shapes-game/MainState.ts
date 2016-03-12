import ShapeType = require("ShapeType");
import Shape = require("Shape");
import WarpInArea = require("WarpInArea");
import MenuBar = require("MenuBar");
import Model = require("Model");

import GameEventType = require("../GameEventType");
import GameModel = require("../GameModel");

import FeedbackPlayer = require("../feedback/FeedbackPlayer");
import ExperimentConfig = require("ExperimentConfig");

class GameState extends Phaser.State implements Model.IShapeGameModel {

    private shapesGroup: Phaser.Group;
    private targetShapeType: ShapeType;
    private warpInArea: WarpInArea;
    private menuBar: MenuBar;
    private feedbackPlayer: FeedbackPlayer;

    private changeListeners: Array<(ge: GameModel.IGameEvent) => void> = [];

    private score = 0;

    /** Phazer init life cycle callback */
    public init(): void {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

        this.feedbackPlayer = new FeedbackPlayer(this.game, this, ExperimentConfig);
    }

    /** Phazer preload life cycle callback */
    public preload(): void {
        Shape.loadResources(this.game);
        this.feedbackPlayer.preload();
    }

    /** Phazer create life cycle callback */
    public create(): void {
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.stage.backgroundColor = "#FFFFFF";
        this.shapesGroup = this.add.physicsGroup(Phaser.Physics.ARCADE);
        this.targetShapeType = <ShapeType>this.rnd.integerInRange(0, Object.keys(ShapeType).length / 2 - 1);

        this.menuBar = new MenuBar(this, this.game);
        this.warpInArea = new WarpInArea(this, this.game);

        this.feedbackPlayer.create();
    }

    /** Phazer update callback */
    public update(): void {
        this.physics.arcade.collide(this.shapesGroup, undefined);
        this.physics.arcade.collide(this.shapesGroup, this.menuBar.getSprite());

        if (this.getShapes().length === this.warpInArea.maxShapeCount && this.getTargetCount() === 0) {
            this.setRandomTarget();
        }
    }

    /** Adds a listener which is called on model changes. */
    public addChangeListener(func: () => void): void {
        this.changeListeners.push(func);
    }

    /** Gets the current score */
    public getScore(): number {
        return this.score;
    }

    /** 
     * Adds a new shape to the game field 
     * @param {Shape} s - The shape to add to the game field.
     */
    public addShape(s: Shape): void {
        this.shapesGroup.add(s);
        s.inputEnabled = true;
        s.events.onInputDown.add(() => {
            if (s.shapeType === this.targetShapeType) {
                this.score += 1;

                this.game.add.tween(s).to({ width: 0, height: 0 }, 500, "Cubic", true).onComplete.add(() => {
                    s.kill();
                    this.shapesGroup.remove(s);
                }, this);

                this.raiseChangedEvent({ EventType: GameEventType.Success });
            } else {
                this.raiseChangedEvent({ EventType: GameEventType.Miss });
            }
        });
    }

    /** Gets all the shapes on the game field */
    public getShapes(): Array<Shape> {
        return <Array<Shape>>this.shapesGroup.children;
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
        this.raiseChangedEvent({ EventType: GameEventType.Other });
    }

    /** Gets the number of shapes on the game field matching the target shape type */
    public getTargetCount(): number {
        return this.getShapes().filter(s => s.shapeType === this.getTargetShapeType()).length;
    }

    /** Raises a change event calling all the change listeners */
    protected raiseChangedEvent(gameEvent: GameModel.IGameEvent): void {
        this.changeListeners.forEach(l => l(gameEvent));
    }

    /** Set a random shape type as target shape. */
    protected setRandomTarget(): void {
        var targetIndex = this.rnd.integerInRange(0, this.getShapes().length - 1);
        this.setTargetShapeType(this.getShapes()[targetIndex].shapeType);
    }
}

export = GameState;