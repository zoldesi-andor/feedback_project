
import GameEventType = require("./GameEventType");

declare module GameModel {    
    /** Interface for Game Events */
    export interface IGameEvent {
        Data?: any;
        EventType: GameEventType;
    }
    
    /** General interface for game models */
    export interface IGameModel {
        /** Adds a listener which is called on model changes. */
        addChangeListener(func: (event: IGameEvent) => void): void;
        
        /** Returns the current score */
        getScore(): number;
    }
}

export = GameModel;