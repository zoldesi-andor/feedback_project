import NavigationManager = require('../common/NavigationManager');
import DataAccess from "../common/DataAccess";
import Countries from "./countries";
import UUIDGenerator from "../common/UUIDGenerator";
import {GameInfo} from "../common/GameInfo";

/** View model for a questionnaire */
class QuestionnaireViewModel {

	public nickName: KnockoutObservable<string>;
	public age: KnockoutObservable<number>;
	public gender: KnockoutObservable<string>;
	public country: KnockoutObservable<string>;

	public isPlayingOften: KnockoutObservable<number>;
	public isGoodAtGames: KnockoutObservable<number>;

	public hasPlayedBefore: KnockoutObservable<boolean>;

    public isValid: KnockoutComputed<boolean>;

	public countries: KnockoutObservableArray<any>;

	private extenders: Array<IExtender<GameInfo>>;

	constructor() {
	    var gameInfo = DataAccess.loadGameInfo() || <GameInfo>{};

		this.nickName = ko.observable<string>(gameInfo.NickName);
		this.age = ko.observable<number>(gameInfo.Age);
		this.gender = ko.observable<string>(gameInfo.Gender);
		this.country = ko.observable<string>(gameInfo.Country);
		this.isPlayingOften = ko.observable<number>(gameInfo.IsPlayingOften);
		this.isGoodAtGames = ko.observable<number>(gameInfo.IsGoodAtGames);
		this.hasPlayedBefore = ko.observable<boolean>(gameInfo.HasPlayedBefore);

		this.countries = ko.observableArray<any>(Countries);

        this.isValid = ko.computed<boolean>(() =>
            this.nickName() !== "" &&
            this.age() > 0 &&
            this.gender() !== "" &&
            this.country() !== "" &&
            this.isPlayingOften() &&
            this.isGoodAtGames() &&
            this.hasPlayedBefore()
        );

		this.extenders = [
			TimeStampExtender,
			IsTouchExtender,
			TrackingTokenExtender,
			(result: GameInfo) => {

				result.NickName = this.nickName();
				result.Age = this.age();
				result.Gender = this.gender();
				result.Country = this.country();

				result.IsGoodAtGames = this.isGoodAtGames();
				result.IsPlayingOften = this.isPlayingOften();

				result.HasPlayedBefore = this.hasPlayedBefore();

				return result;
			}
		]
	}

	public submit(): void {
	
		let result: GameInfo = <GameInfo>{};
		this.extenders.forEach(extender => {
			result = extender(result);
		});

		DataAccess.storeGameInfo(result);
        
        NavigationManager.GamePage.go();
	}
}

let TimeStampExtender = (result: GameInfo) => {
		result.TimeStamp = new Date().getTime();
		return result;
};

let IsTouchExtender = (result: GameInfo) => {
	result.IsTouchScreen = 'ontouchstart' in window;
	return result;
};

let TrackingTokenExtender = (result: GameInfo) => {
	var trackingToken = localStorage.getItem("tracking-token") || UUIDGenerator();
	localStorage.setItem("tracking-token", trackingToken);
	result.TrackingToken = trackingToken;
	return result;
};

export = QuestionnaireViewModel;