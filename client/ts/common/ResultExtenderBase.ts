import {IResultExtender} from "./IResultExtender";
import {Result} from "./Result";

abstract class ResultExtenderBase implements IResultExtender {
	public extend(result: Result): Result {
		if(!result)
			result = <Result> { };
		if(!result.UserInfo)
			result.UserInfo = <UserInfo> { };
			
		return this.process(result);
	}
	
	abstract process(result: Result): Result;
}

export = ResultExtenderBase;