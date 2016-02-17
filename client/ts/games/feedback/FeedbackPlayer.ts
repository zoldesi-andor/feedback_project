import FeedbackTriggerType = require("./FeedbackTriggerType");
import FeedbackModel = require("FeedbackModel");
import GameEventType = require("../GameEventType");
import GameModel = require("../GameModel");

class FeedbackPlayer {

    private game: Phaser.Game;
    private gameModel: GameModel.IGameModel;
    private experiment: FeedbackModel.IExperiment;

    private currentFeedbackOption: FeedbackModel.IFeedbackOption;

    constructor(game: Phaser.Game, gameModel: GameModel.IGameModel, experiment: FeedbackModel.IExperiment) {
        this.game = game;
        this.gameModel = gameModel;
        this.experiment = experiment;

        this.chooseFeedbackOption();
    }
    
    public preload(): void {
        
    }
    
    public create(): void {
        this.generateFeedbackElements();
    }

    private chooseFeedbackOption(): void {
        // var index = this.game.rnd.integerInRange(0, this.experiment.FeedbackOptions.length - 1);
        this.currentFeedbackOption = this.experiment.FeedbackOptions[2];
    }

    private generateFeedbackElements(): void {
        this.currentFeedbackOption.FeedbackEvents.forEach(event => {
            switch (event.Trigger.TriggerType) {
                case FeedbackTriggerType.SuccessCountBased:
                    this.createSuccessCountBasedFeedback(event);
                    break;
                case FeedbackTriggerType.TimeBased:
                    this.createTimeBasedFeedback(event);
                    break;
                default: if (console) { console.log("Unrecognised trigger type:" + event.Trigger.TriggerType); }
            }
        });
    }
    
    private createTimeBasedFeedback(event: FeedbackModel.IFeedbackEvent): void {
        this.game.time.events.add(Phaser.Timer.SECOND * event.Trigger.SecondsToWait, this.showFeedback(event), this);
    }
    
    private createSuccessCountBasedFeedback(event: FeedbackModel.IFeedbackEvent): void {
        var successCounter = 0;
        var isDisplayed = false;
        
        this.gameModel.addChangeListener((ge) => {
            if (ge.EventType === GameEventType.Success) {
                successCounter += 1;
            }
            
            if (!isDisplayed && successCounter >= event.Trigger.NumberOfSuccesses) {
                isDisplayed = true;
                this.showFeedback(event)();
            }
        });
    }
    
    private showFeedback(event: FeedbackModel.IFeedbackEvent): () => void {
        return () => { 
            var text = this.game.add.text(400, 50, event.Text, { font: "15px Arial", fill: "#ffffff" });
            
            var removeFeedback = () => {
                text.kill();
                this.game.world.remove(text);
            };
            
            this.game.time.events.add(Phaser.Timer.SECOND * 5, removeFeedback);
        };
    }
}

export = FeedbackPlayer;