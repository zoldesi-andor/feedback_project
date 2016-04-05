import {GameInfo} from "./GameInfo";

/**
 * The result of a game play (user info, score, etc.)
 */
interface Result {
	TimeStamp: number;
	UserInfo: UserInfo;
	GameInfo: GameInfo;
}