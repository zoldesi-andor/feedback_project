import FeedbackTriggerType = require("./FeedbackTriggerType");
import FeedbackModel = require("FeedbackModel");
import GameEventType = require("../GameEventType");
import GameModel = require("../GameModel");

class FeedbackPlayer {

    private game: Phaser.Game;
    private gameModel: GameModel.IGameModel;
    private experiment: FeedbackModel.IExperiment;

    private currentFeedbackOption: FeedbackModel.IFeedbackOption;
    
    private timers: Array<Phaser.TimerEvent> = [];
    private listeners: Array<(ge: GameModel.IGameEvent) => void> = [];

    constructor(game: Phaser.Game, gameModel: GameModel.IGameModel, experiment: FeedbackModel.IExperiment) {
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

    private chooseFeedbackOption(): void {
        // var index = this.game.rnd.integerInRange(0, this.experiment.FeedbackOptions.length - 1);
        this.currentFeedbackOption = this.experiment.FeedbackOptions[2];
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
                    this.createTimeBasedFeedback(event);
                    break;
                default: if (console) { console.log("Unrecognised trigger type:" + event.Trigger.TriggerType); }
            }
        });
    }
    
    private createTimeBasedFeedback(event: FeedbackModel.IFeedbackEvent): void {
        if (event.Trigger.IsReoccurring) {
            var timer = this.game.time.events.loop(Phaser.Timer.SECOND * event.Trigger.SecondsToWait, this.createFnShowFeedback(event), this);
            this.timers.push(timer);
        } else {
            this.game.time.events.add(Phaser.Timer.SECOND * event.Trigger.SecondsToWait, this.createFnShowFeedback(event), this);
        }
    }
    
    private createEventCountBasedFeedback(event: FeedbackModel.IFeedbackEvent, eventType: GameEventType): void {
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
                
                this.createFnShowFeedback(event)();
            }
        };
        
        this.listeners.push(listener);
        this.gameModel.addChangeListener(listener);
    }
    
    /** Creates a function which displays the feedback when called */
    private createFnShowFeedback(event: FeedbackModel.IFeedbackEvent): () => void {
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
        };
    }
}

export = FeedbackPlayer;