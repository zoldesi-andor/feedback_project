import * as GameModel from "../games/GameModel";

interface GameInfo {
    Score: number;
    Events: Array<GameModel.IGameEvent>;
}