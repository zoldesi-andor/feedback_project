import Shape = require("Shape");
import ShapeType = require("ShapeType");
import Model = require("Model");

import GameEventType = require("../GameEventType");
import GameModel = require("../GameModel");

import Config from "./Config";
import CommonResources from "../CommonResources";
import GameState = require("../GameState");

class MenuBar {

    private gameModel: Model.IShapeGameModel;
    private game: Phaser.Game;
    private sprite: Phaser.Sprite;
    private scoreSprite: Phaser.Text;
    private remainingTime: Phaser.Text;

    private targetIndicator: Shape;
    private robot: Phaser.Sprite;

    private changingTarget: boolean = false;

    constructor(gameModel: Model.IShapeGameModel, game: Phaser.Game) {
        this.gameModel = gameModel;
        this.game = game;

        // Creating background
        var bmd = game.add.bitmapData(Config.width, Config.height);
        bmd.ctx.beginPath();
        bmd.ctx.rect(0, 0, Config.width, Config.height);
        bmd.ctx.fillStyle = '#673AB7';
        bmd.ctx.fill();

        this.sprite = game.add.sprite(0, 0, bmd);
        game.physics.arcade.enable(this.sprite);
        this.getBody().immovable = true;

        // Creating Target indicator
        this.createTargetIndicator(true);

        // Creating Score indicator        
        this.scoreSprite = this.game.make.text(
            this.sprite.width / 2,
            70,
            "Score: 0",
            { font: "20px Roboto", fill: "#ffffff" });
        this.scoreSprite.anchor.set(0.5, 0.5);
        this.sprite.addChild(this.scoreSprite);

        // Creating Score indicator        
        this.remainingTime = this.game.make.text(
            this.sprite.width / 2,
            30,
            "",
            { font: "20px Roboto", fill: "#ffffff" });
        this.remainingTime.anchor.set(0.5, 0.5);
        this.sprite.addChild(this.remainingTime);

        this.robot = this.game.make.sprite(
            this.sprite.width - 80,
            this.sprite.height / 2,
            CommonResources.ROBOT
        );
        this.robot.scale.setTo(this.sprite.height * 0.9 / this.robot.height);
        this.robot.height = 0; // Updated by tween
        this.robot.anchor.setTo(0.5);
        this.sprite.addChild(this.robot);

        this.sprite.height = 0; // Updated by tween

        this.gameModel.addChangeListener((event) => {
            this.checkForTargetChange();
            this.checkForScoreChange(event);
            this.checkForRemainingTimeChange(event);
        });
    }

    public show(): void {
        var showMenu = this.game.add.tween(this.sprite).to({ height: Config.height }, 500, "Cubic", true);
        var showRobot = this.game.add.tween(this.robot).to({height: Config.height * 0.8}, 500, "Cubic");

        showMenu.chain(showRobot);
    }

    public hide(): void {
        this.game.add.tween(this.sprite).to({ height: 0 }, 500, "Cubic", true);
    }
    
    public reset(): void {
        this.scoreSprite.text = this.formatScoreText(this.gameModel.getScore());
        this.remainingTime.text = this.formatRemainingTime(this.gameModel.getRemainingTime());
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
    
    private checkForRemainingTimeChange(event: GameModel.IGameEvent): void {
        if (event.EventType === GameEventType.TimerTick) {
            this.remainingTime.text = this.formatRemainingTime(this.gameModel.getRemainingTime());
        }
    }

    private checkForTargetChange(): void {
        if (this.targetIndicator.shapeType === this.gameModel.getTargetShapeType()
            || this.changingTarget
            || this.gameModel.getState() !== GameState.Running) {
            return;
        }

        this.changingTarget = true;

        this.game.add.tween(this.targetIndicator).to({ width: 0, height: 0 }, 500, "Cubic", true).onComplete.add(() => {
            this.targetIndicator.kill();
            this.sprite.removeChild(this.targetIndicator);
            this.createTargetIndicator();
            this.changingTarget = false;
        }, this)
    }

    private createTargetIndicator(noTween?: boolean): void {

        this.targetIndicator = new Shape(this.gameModel.getTargetShapeType(), this.game, 50, 50, true);
        this.targetIndicator.tint = 0xFFFFFF;

        var width = this.targetIndicator.width;
        var height = this.targetIndicator.height;

        this.sprite.addChild(this.targetIndicator);

        if (!noTween) {
            this.targetIndicator.width = this.targetIndicator.height = 0;
            this.game.add.tween(this.targetIndicator).to({ width: width, height: height }, 500, "Cubic", true);
        }
    }

    private formatScoreText(score: number): string {
        return "Score " + score;
    }
    
    private formatRemainingTime(time: number): string {
        
        var result = "";
        
        while(time > 0) {
            var t = Math.floor(time/60) || time;
            
            result += (t < 10 ? "0" : "") + t.toString();
            time = time - t * 60;
            
            if(time > 0) {
                result += ":";
            }
        }
        
        return result;
    }
}

export = MenuBar;