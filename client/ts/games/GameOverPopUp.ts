import Config from "./shapes-game/Config";
import {IFeedbackEvent} from "./feedback/FeedbackModel";
import {IGameModel} from "./GameModel";
import CommonResources from "./CommonResources";

class GameOverPopUp {

    private game: Phaser.Game;
    private gameModel: IGameModel;
    private background: Phaser.Sprite;

    constructor(
        game: Phaser.Game,
        gameModel: IGameModel,
        playAgain: () => void,
        newPlayer: () => void,
        feedback: IFeedbackEvent) {

        this.game = game;
        this.gameModel = gameModel;

        this.background = this.game.add.sprite(
            Config.maxWidth * 0.9, Config.height + 20,
            CommonResources.TEXT_BUBBLE_BIG);
        this.background.anchor.set(1, 0);

        var horizontalOffset = -1 * this.background.width / 2 - 30;
        var verticalOffset = 0;

        var playAgainButton = this.game.make.text(
            horizontalOffset - this.background.width / 5,
            330 + verticalOffset,
            "Play Again",
            { font: "30px Roboto", fill: "#212121" });
        playAgainButton.anchor.set(0.5);
        this.background.addChild(playAgainButton);

        playAgainButton.inputEnabled = true;
        playAgainButton.events.onInputDown.add(() => {
            this.game.add.tween(this.background).to({ width: 0, height: 0 }, 500, "Cubic", true).onComplete.add(() => {
                playAgain();
            });
        });

        var newPlayerButton = this.game.make.text(
            horizontalOffset + this.background.width / 5,
            330 + verticalOffset,
            "New Player",
            { font: "30px Roboto", fill: "#212121" });
        newPlayerButton.anchor.set(0.5);
        this.background.addChild(newPlayerButton);

        newPlayerButton.inputEnabled = true;
        newPlayerButton.events.onInputDown.add(() => {
            this.game.add.tween(this.background).to({ width: 0, height: 0 }, 500, "Cubic", true).onComplete.add(() => {
                newPlayer();
            });
        });

        if(feedback) {
            if (feedback.ImageUrl) {
                var image = this.game.make.sprite(
                    horizontalOffset,
                    260 + verticalOffset,
                    feedback.ImageUrl
                );
                var scale = 100 / image.height;
                image.anchor.set(0.5);
                image.scale.setTo(scale);
                this.background.addChild(image);
                playAgainButton.y += 30;
                newPlayerButton.y += 30;
            }

            if (feedback.Text) {
                var text = this.game.make.text(
                    horizontalOffset,
                    verticalOffset + feedback.ImageUrl ? 150 : 170,
                    feedback.Text.replace("$score", this.gameModel.getScore().toString()),
                    { font: "40px Roboto", fill: "#212121", align: "center" });
                text.anchor.set(0.5, 0.5);
                this.background.addChild(text);
            }
        }

        var width = this.background.width;
        var height = this.background.height;

        this.background.width = this.background.height = 0;
        this.game.add.tween(this.background).to({ width: width, height: height }, 500, "Cubic", true);
    }
}

export = GameOverPopUp;
