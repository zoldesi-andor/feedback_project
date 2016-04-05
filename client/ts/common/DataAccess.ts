import {Result} from "Result.d";

export default class DataAccess {

    private static Key = "Result-Store-Key";

    /**
     * Stores the result in the local storage
     * @param result
     */
    public static store(result: Result): void {
        localStorage.setItem(DataAccess.Key, JSON.stringify(result));
    }

    /**
     * Loads the result from the local storage
     * @returns {Result}
     */
    public static load(): Result {
        var resultString = localStorage.getItem(DataAccess.Key) || '{}';
        return JSON.parse(resultString);
    }

    /**
     * Sends the game result to the server.
     * @param result
     */
    public static send(result: Result): void {
        console.log(result);
    }
}
