import NavigationManager = require("../common/NavigationManager");

class IndexViewModel {
    public games: KnockoutObservableArray<any>;

    constructor() {
        this.games = ko.observableArray([
            {
                title: "The Shape Game",
                description: "Click the shape shown in the top left corner. Find all of the shape to move on to the next shape. Find as many as you can to score points.",
                imageUrl: "images/the-feedback-game.png"
            }
        ]);
    }

    public selectGame(): void {
        NavigationManager.QuestionnairePage.go();
    }
}

export = IndexViewModel;
