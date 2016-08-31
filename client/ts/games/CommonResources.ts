/** Helper class for the common resources (e.g. images, sprites etc.) */
export default class CommonResources {

    public static TEXT_BUBBLE_UP = "text_bubble_up";
    public static TEXT_BUBBLE_DOWN = "text_bubble_down"
    public static ROBOT = "robot";

    public static loadResources(game: Phaser.Game): void {
        game.load.image(CommonResources.TEXT_BUBBLE_UP, "images/speech-bubble.png");
        game.load.image(CommonResources.TEXT_BUBBLE_DOWN, "images/speech-bubble-uppertail.png");
        game.load.image(CommonResources.ROBOT, "images/robot_with_no_background.png");
    }
}