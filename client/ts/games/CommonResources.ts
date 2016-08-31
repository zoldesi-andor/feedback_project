/** Helper class for the common resources (e.g. images, sprites etc.) */
export default class CommonResources {

    public static TEXT_BUBBLE = "text_bubble";
    public static ROBOT = "robot";

    public static loadResources(game: Phaser.Game): void {
        game.load.image(CommonResources.TEXT_BUBBLE, "images/speech-bubble.png");
        game.load.image(CommonResources.ROBOT, "images/robot_with_no_background.png");
    }
}