/** The entry point for the Game page */
requirejs(
    ["MainState"],
    (MainState: any) => {
        var game = new Phaser.Game(800, window.innerHeight, Phaser.AUTO);
        game.state.add("GameState", new MainState(), true);
    }
);