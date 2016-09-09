import * as GameModel from "../games/GameModel";
import {IFeedbackOption} from "../games/feedback/FeedbackModel";

interface GameInfo {
    Id: number;
    TimeStamp: number;

    ExperimentName: string;
    FeedbackOptionName: string;
    FeedbackOption: IFeedbackOption;

    TrackingToken: string;

    HasClickedPlayAgain: boolean;
    HasPlayedBefore: boolean;
    Age: number;
    Gender: string;
    Country: string;
    IsTouchScreen: boolean;
    NickName: string;
    IsPlayingOften: boolean;
    IsGoodAtGames: boolean;

    Score: number;
}