class GameState extends Phaser.State {
    
    public init(): void {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
    }
    
    public preload(): void {
        this.load.atlas("shapes", "images/shapes.png", "images/shapes.json")
    }
    
    public create(): void {       
        this.stage.backgroundColor = "#404040";
        
        var circle = this.add.sprite(10, 10, "shapes");
        circle.frame = 0;
    }
}

export = GameState;