import ShapeType = require("ShapeType");
import Shape = require("Shape");
import WarpInArea = require("WarpInArea");
import MenuBar = require("MenuBar");
import Model = require("Model");

import GameEventType = require("../GameEventType");
import GameModel = require("../GameModel");
import State = require("../GameState");

import ExperimentConfig = require("ExperimentConfig");

import StartPopUp = require("../StartPopUp");
import GameOverPopUp = require("../GameOverPopUp");
import IGameEvent = GameModel.IGameEvent;
import NavigationManager = require("../../common/NavigationManager");

import DataAccess from "../../common/DataAccess";
import {IResultExtender} from "../../common/IResultExtender";
import {Result} from "../../common/Result";

import FeedbackPlayer from "../feedback/FeedbackPlayer";
import {IFeedbackEvent} from "../feedback/FeedbackModel";

var Config = {
    gameDuration: 10 // 10 sec
};

var result = DataAccess.load();

if(!result) {
    NavigationManager.QuestionnairePage.go();
}

class MainState extends Phaser.State implements Model.IShapeGameModel, IResultExtender {
    private state: State;

    private shapesGroup: Phaser.Group;
    private targetShapeType: ShapeType;
    private warpInArea: WarpInArea;
    private menuBar: MenuBar;
    private feedbackPlayer: FeedbackPlayer;

    private gameTimer: Phaser.TimerEvent;

    private changeListeners: Array<(ge: GameModel.IGameEvent) => void> = [];

    private score = 0;
    private remainingTime = 0;

    private gameEvents: Array<IGameEvent> = [];

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
        this.state = State.Starting;

        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.stage.backgroundColor = "#FFFFFF";
        this.shapesGroup = this.add.physicsGroup(Phaser.Physics.ARCADE);

        this.targetShapeType = this.getRandomTargetShapeType();

        this.menuBar = new MenuBar(this, this.game);
        this.warpInArea = new WarpInArea(this, this.game);

        new StartPopUp(this.game, () => this.start());
    }

    /** Phazer update callback */
    public update(): void {
        if (this.state === State.Running) {
            this.physics.arcade.collide(this.shapesGroup, undefined);
            this.physics.arcade.collide(this.shapesGroup, this.menuBar.getSprite());

            if (this.getShapes().length === this.warpInArea.maxShapeCount && this.getTargetCount() === 0) {
                this.setRandomTarget();
            }
        }
    }

    /** Generates part of the game result. */
    public extend(result:Result):Result {
        result.GameInfo = {
            Events: this.gameEvents,
            Score: this.getScore()
        };

        return result;
    }

    /** Adds a listener which is called on model changes. */
    public addChangeListener(func: () => void): void {
        this.changeListeners.push(func);
    }

    /** Removes a change listener */
    public removeChangeListener(func: () => void): void {
        this.changeListeners = this.changeListeners.filter(l => l !== func);
    }

    /** Gets the current score */
    public getScore(): number {
        return this.score;
    }

    /** Gets the remaining time in seconds */
    public getRemainingTime(): number {
        return this.remainingTime;
    }

    /** Gets the current state of the game. */
    public getState(): State {
        return this.state;
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

                this.raiseChangedEvent(GameEventType.Success);
            } else {
                this.raiseChangedEvent(GameEventType.Miss);
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
        this.raiseChangedEvent(GameEventType.Progress);
    }

    /** Gets the number of shapes on the game field matching the target shape type */
    public getTargetCount(): number {
        return this.getShapes().filter(s => s.shapeType === this.getTargetShapeType()).length;
    }

    /** Raises a change event calling all the change listeners */
    protected raiseChangedEvent(eventType: GameEventType, data?: any): void {
        var event: IGameEvent = {
            Data: data,
            EventType: eventType,
            Time: new Date().getTime(),
            Score: this.getScore()
        };

        if(event.EventType !== GameEventType.TimerTick) {
            this.gameEvents.push(event);
        }

        this.changeListeners.forEach(l => l(event));
    }

    /** Creates a callback function which can be used to display a feedback. */
    public createShowFeedbackFunction(event:IFeedbackEvent):()=>void {
        return () => {
            var group = this.game.add.group();

            if (event.Text) {
                this.game.add.text(350, 50, event.Text, { font: "15px Arial", fill: "#ffffff" }, group)
                    .anchor.set(0.5, 0.5);
            }

            if (event.ImageUrl) {
                var image = this.game.add.sprite(450, 50, event.ImageUrl, null, group);
                var scale = 100 / image.width
                image.anchor.set(0.5, 0.5);
                image.scale.setTo(scale, scale);
            }

            var removeFeedback = () => {
                this.game.add.tween(group).to( { alpha: 0 }, 500, "Linear", true)
                    .onComplete.add(() => this.game.world.remove(group), this);
            };

            group.alpha = 0.1;
            this.game.add.tween(group).to( { alpha: 1 }, 500, "Linear", true);

            this.game.time.events.add(Phaser.Timer.SECOND * 5, removeFeedback);
            this.raiseChangedEvent(GameEventType.FeedbackPlayed, event);
        };
    }

    /** Set a random shape type as target shape. */
    protected setRandomTarget(): void {
        var targetIndex = this.rnd.integerInRange(0, this.getShapes().length - 1);
        this.setTargetShapeType(this.getShapes()[targetIndex].shapeType);
    }

    private getRandomTargetShapeType(): ShapeType {
        return <ShapeType>this.rnd.integerInRange(0, Object.keys(ShapeType).length / 2 - 1);
    }

    private start(): void {
        this.warpInArea.start();
        this.feedbackPlayer.start();
        this.menuBar.show();
        this.state = State.Running;

        this.remainingTime = Config.gameDuration;
        this.gameTimer = this.game.time.events.loop(
            1000,
            () => {
                this.remainingTime = this.remainingTime - 1;
                this.raiseChangedEvent(GameEventType.TimerTick);
            });
        this.game.time.events.add(
            Config.gameDuration * 1000,
            () => {
                this.stop();
                new GameOverPopUp(this.game, () => this.reset());
            },
            this);
    }

    private stop(): void {
        this.warpInArea.stop();
        this.feedbackPlayer.stop();
        this.state = State.Ended;

        this.game.time.events.remove(this.gameTimer);

        this.extend(result);
        DataAccess.send(result);
    }

    private reset(): void {
        this.shapesGroup.removeAll();
        this.targetShapeType = this.getRandomTargetShapeType();
        this.score = 0;
        this.gameEvents = [];

        this.menuBar.reset();

        this.start();
    }
}

export = MainState;