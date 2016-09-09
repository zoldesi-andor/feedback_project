import {GameInfo} from "./GameInfo";
import {IGameEvent} from "../games/GameModel";

export default class DataAccess {

    private static Key = "Result-Store-Key";

    /**
     * Stores the game info in the local storage
     * @param result
     */
    public static storeGameInfo(result: GameInfo): void {
        sessionStorage.setItem(DataAccess.Key, JSON.stringify(result));
    }

    /**
     * Loads the game info from the local storage
     * @returns {Result}
     */
    public static loadGameInfo(): GameInfo {
        var resultString = sessionStorage.getItem(DataAccess.Key) || '{}';
        return JSON.parse(resultString);
    }

    /**
     * Sends the game info to the server.
     * @param gameInfo
     * @returns {JQueryXHR}
     */
    public static sendGameInfo(gameInfo: GameInfo): JQueryPromise<any> {
        return $.ajax({
            type: "POST",
            url: "/api/game/info",
            data: JSON.stringify(gameInfo),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
        });
    }

    /**
     * Sends a game event to the server.
     * @param gameId
     * @param gameEvent
     * @returns {JQueryXHR}
     */
    public static sendGameEvent(gameId: number, gameEvent: IGameEvent): JQueryPromise<void> {
        return $.ajax({
            type: "POST",
            url: `/api/game/${gameId}/event`,
            data: JSON.stringify(gameEvent),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
        });
    }

    /**
     * Sends an array of game events.
     * @param gameId
     * @param gameEvents
     * @returns {JQueryXHR}
     */
    public static sendGameEvents(gameId: number, gameEvents: Array<IGameEvent>): JQueryPromise<void> {
        return $.ajax({
            type: "POST",
            url: `/api/game/${gameId}/events`,
            data: JSON.stringify(gameEvents),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
        });
    }
}
