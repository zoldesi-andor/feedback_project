import QuestionViewModel = require('QuestionViewModel');

class QuestionnaireViewModel {
	
	public Questions: Array<QuestionViewModel>;
	
	constructor(questions: Array<Question>) {
		this.Questions = questions.map(question => new QuestionViewModel(question, this));
	}
	
	public submit(): void {
		console.log(this.getResults());
	}
	
	public getResults(): Array<Answer> {
		return this.Questions.map(qvm => qvm.getResult());
	}
}

export = QuestionnaireViewModel;