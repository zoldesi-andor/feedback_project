import QuestionViewModel = require('QuestionViewModel');
import NavigationManager = require('../common/NavigationManager');
import ResultExtenderBase = require("../common/ResultExtenderBase");
import {Result} from "../common/Result";
import {IResultExtender} from "../common/IResultExtender";
import DataAccess from "../common/DataAccess";

/** View model for a questionnaire */
class QuestionnaireViewModel extends ResultExtenderBase {

	public Questions: Array<QuestionViewModel>;
	
	private resultExtenders: Array<IResultExtender>;

	constructor(questions: Array<Question>) {
		super();
		this.Questions = questions.map(question => new QuestionViewModel(question, this));
		this.resultExtenders = [
			new TimeStampExtender(),
			new IpAndLocationExtender(),
			this
		];
	}

	public submit(): void {
	
		var result: Result = null;
		this.resultExtenders.forEach(extender => {
			result = extender.extend(result);
		});
		
		console.log(result);
		DataAccess.store(result);
        
        NavigationManager.GamePage.go();
	}

	public process(result: Result): Result {
		result.UserInfo.QuestionnaireAnswers = this.getResults();

		return result;
	}

	private getResults(): Array<Answer> {
		return this.Questions.map(qvm => qvm.getResult());
	}
}

class TimeStampExtender extends ResultExtenderBase {
	process(result: Result): Result {
		result.TimeStamp = new Date().getTime();
		return result;
	}
}

class IpAndLocationExtender extends ResultExtenderBase {

	private request: JQueryXHR;
	private ip: string;
	private countryName: string;
	private countryCode: string;
	private city: string;

	constructor() {
		super();

		this.request = $.get("http://api.hostip.info/get_json.php", (data, status, resp) => {
			this.ip = data.ip;
			this.countryCode = data.country_code;
			this.countryName = data.country_name;
			this.city = data.city;
		});
	}

	process(result: Result): Result {
		this.request.done(() => {
			result.UserInfo.Ip = this.ip;
			result.UserInfo.Location = this.countryName;
		});

		return result;
	}
}

export = QuestionnaireViewModel;