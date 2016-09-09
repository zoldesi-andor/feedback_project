import FeedbackTriggerType = require("./FeedbackTriggerType");
import GameEventType = require("../GameEventType");
import GameModel = require("../GameModel");

import {IExperiment, IFeedbackOption, IFeedbackEvent} from "./FeedbackModel";

export default class FeedbackPlayer {

    private game: Phaser.Game;
    private gameModel: GameModel.IGameModel;
    private experiment: IExperiment;

    private currentFeedbackOption: IFeedbackOption;
    
    private timers: Array<Phaser.TimerEvent> = [];
    private listeners: Array<(ge: GameModel.IGameEvent) => void> = [];

    constructor(game: Phaser.Game, gameModel: GameModel.IGameModel, experiment: IExperiment) {
        this.game = game;
        this.gameModel = gameModel;
        this.experiment = experiment;

        this.chooseFeedbackOption();
    }
    
    public preload(): void {
        this.currentFeedbackOption.FeedbackEvents.forEach((feedbackEvent, index) => {
            if(feedbackEvent.ImageUrl) {
                this.game.load.image(feedbackEvent.ImageUrl, feedbackEvent.ImageUrl);
            }
        });
    }
    
    /** Starts playing feedbacks */
    public start(): void {
        this.generateFeedbackElements();
    }
    
    /** Stops playing feedbacks */
    public stop(): void {
        this.timers.forEach(t => this.game.time.events.remove(t));
        this.listeners.forEach(l => this.gameModel.removeChangeListener(l));
    }

    /** Gets the start feedback event */
    public getStartFeedback(): IFeedbackEvent {
        return this.currentFeedbackOption.FeedbackEvents.filter(e => e.Trigger.TriggerType === FeedbackTriggerType.Begin)[0];
    }

    /** Gets the game over feedback event */
    public getEndFeedback(): IFeedbackEvent {
        return this.currentFeedbackOption.FeedbackEvents.filter(e => e.Trigger.TriggerType === FeedbackTriggerType.End)[0];
    }

    /** Gets the current feedback option */
    public getCurrentFeedbackOption(): IFeedbackOption {
        return this.currentFeedbackOption;
    }

    private chooseFeedbackOption(): void {
        var index = this.game.rnd.integerInRange(0, this.experiment.FeedbackOptions.length - 1);
        this.currentFeedbackOption = this.experiment.FeedbackOptions[index];

        if(console && console.log) {
            console.log(`Using feedback option: ${this.currentFeedbackOption.Name}`);
        }
    }

    private generateFeedbackElements(): void {
        this.currentFeedbackOption.FeedbackEvents.forEach(event => {
            switch (event.Trigger.TriggerType) {
                case FeedbackTriggerType.SuccessCountBased:
                    this.createEventCountBasedFeedback(event, GameEventType.Success);
                    break;
                case FeedbackTriggerType.ProgressCountBased:
                    this.createEventCountBasedFeedback(event, GameEventType.Progress);
                    break;
                case FeedbackTriggerType.TimeBased:
                    this.createEventCountBasedFeedback(event, GameEventType.TimerTick);
                    break;
                default: if (console) { console.log("Unrecognised trigger type:" + event.Trigger.TriggerType); }
            }
        });
    }
    
    private createTimeBasedFeedback(event: IFeedbackEvent): void {
        if (event.Trigger.IsReoccurring) {
            var timer = this.game.time.events.loop(Phaser.Timer.SECOND * event.Trigger.SecondsToWait, this.gameModel.createShowFeedbackFunction(event), this);
            this.timers.push(timer);
        } else {
            this.game.time.events.add(Phaser.Timer.SECOND * event.Trigger.SecondsToWait, this.gameModel.createShowFeedbackFunction(event), this);
        }
    }
    
    private createEventCountBasedFeedback(event: IFeedbackEvent, eventType: GameEventType): void {
        var successCounter = 0;
        var isDisplayed = false;
        
        var listener = (ge: GameModel.IGameEvent) => {
            if (ge.EventType === eventType) {
                successCounter += 1;
            }
            
            if (!isDisplayed && successCounter >= event.Trigger.NumberOfEvents) {
                if (event.Trigger.IsReoccurring) {
                    successCounter = 0;
                } else {
                    isDisplayed = true;
                }
                
                this.gameModel.createShowFeedbackFunction(event)();
            }
        };
        
        this.listeners.push(listener);
        this.gameModel.addChangeListener(listener);
    }
}