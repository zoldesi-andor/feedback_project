import Config from "./shapes-game/Config";
import {IFeedbackEvent} from "./feedback/FeedbackModel";
import CommonResources from "./CommonResources";

class StartPopup {

    private game: Phaser.Game;
    private background: Phaser.Sprite;
    private robot: Phaser.Sprite;

    private closeHandler: () => void;

    constructor(game: Phaser.Game, onClose: () => void, feedback: IFeedbackEvent) {
        this.game = game;
        this.closeHandler = onClose;

        var height = Config.maxHeight * 0.5;
        var width = Config.maxWidth * 0.8;

        this.robot = this.game.add.sprite(
            Config.maxWidth * 0.7 + 120, Config.maxHeight * 0.7 + 115,
            CommonResources.ROBOT,
            null
        );
        this.robot.anchor.set(0.5);

        this.background = this.game.add.sprite(
            Config.maxWidth * 0.7 + 100, Config.maxHeight * 0.7,
            CommonResources.TEXT_BUBBLE,
            null );
        this.background.anchor.set(1);
        //this.background.height = height;
        // this.background.width = width;
        this.background.bringToTop();

        var subMessage = this.game.make.text(
            -1 * this.background.width / 2,
            -150,
            "Click to start",
            { font: "30px Roboto", fill: "#212121" });
        subMessage.anchor.set(0.5);
        this.background.addChild(subMessage);

        if(feedback) {
            if (feedback.ImageUrl) {
                var image = this.game.make.sprite(
                    -1 * this.background.width / 2,
                    -215,
                    feedback.ImageUrl
                );
                var scale = 100 / image.height;
                image.anchor.set(0.5);
                image.scale.setTo(scale);
                this.background.addChild(image);

                subMessage.y += 10;
            }

            if (feedback.Text) {
                var text = this.game.make.text(
                    -1 * this.background.width / 2,
                    feedback.ImageUrl ? -290 : -250,
                    feedback.Text,
                    { font: "40px Roboto", fill: "#212121" });
                text.anchor.set(0.5, 0.5);
                this.background.addChild(text);
            }
        }

        this.background.inputEnabled = true;
        this.background.events.onInputDown.add(() => this.Close());
    }

    /** Loads the necessary resources (e.g. images, sprites etc.) */
    public static loadResources(game: Phaser.Game): void {
        game.load.atlas("shapes", "images/shapes.png", "images/shapes.json");
    }

    /**
     * Closes the popup.
     */
    public Close(): void {
        var shrinkBackground = this.game.add.tween(this.background).to({ width: 0, height: 0 }, 500, "Cubic");
        var shrinkRobot = this.game.add.tween(this.robot).to({ width: 0, height: 0}, 500, "Cubic");

        shrinkBackground.chain(shrinkRobot);

        shrinkRobot
            .onComplete.add(
            () => {
                this.background.kill();
                this.robot.kill();
                this.game.world.remove(this.robot);
                this.game.world.remove(this.background);
                this.closeHandler();
            }, this);

        shrinkBackground.start();
    }
}

export = StartPopup;
