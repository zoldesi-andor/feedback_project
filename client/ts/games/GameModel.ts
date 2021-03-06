import * as FeedbackModel from "./feedback/FeedbackModel";
import GameEventType = require("./GameEventType");
import GameState = require("./GameState");

/** Interface for Game Events */
export interface IGameEvent {
    Sequence: number;
    Data?:any;
    EventType:GameEventType;
    Time:number;
    GameTimer: number;
    Score:number;
    SuccessCount: number;
    MissCount: number;
}

/** General interface for game models */
export interface IGameModel {
    /** Adds a listener which is called on model changes. */
    addChangeListener(func:(event:IGameEvent) => void):void;

    /** Removes a change listener */
    removeChangeListener(func:(event:IGameEvent) => void):void;

    /** Returns the current score */
    getScore():number;

    /** Returns the current game state (e.g. Running, Paused, ...) */
    getState(): GameState;

    /** Returns the remaining time */
    getRemainingTime():number;

    /** Creates a callback function which can be used to display a feedback. */
    createShowFeedbackFunction(event:FeedbackModel.IFeedbackEvent):() => void;
}