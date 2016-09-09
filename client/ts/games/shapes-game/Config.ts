export default class Config {
    /** The game duration */
    public static gameDuration = 120; // 10 sec

    /**
     * To avoid spamming the result object with every timer tick event
     * only record every timerTickCaptureInterval'th event.
     */
    public static timerTickCaptureInterval = 20;

    /** The window width */
    public static width = 800;

    /** TODO rename it. The height of the menu bar!!! */
    public static height = 100;

    /** The max height of the window */
    public static maxHeight = window.innerHeight;

    /** The max width of the window */
    public static maxWidth = 800;

    /** The maximal number of total shapes */
    public static maxShapeCount = 30;
}
