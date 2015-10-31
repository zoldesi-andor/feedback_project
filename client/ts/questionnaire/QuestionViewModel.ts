/// <reference path="Option.d.ts" />
/// <reference path="Answer.d.ts" />

import AnswerViewModel = require("OptionViewModel");

class QuestionViewModel {

	public Text: string;
	public Answers: Array<AnswerViewModel>;

	constructor(
		private model: Question
	) {
		this.Text = model.Text;
		this.Answers = model.Options.map(answer => new AnswerViewModel(answer));
	}

	public get SelectedAnswer(): AnswerViewModel {
		return this.Answers.filter(answer => answer.IsSelected())[0]
	}

	public set SelectedAnswer(a: AnswerViewModel) {
		this.Answers.forEach(answer => answer.IsSelected(answer === a));
	}


	public getResult(): Answer {
		return {
			QuestionId: this.model.Id,
			OptionId: this.SelectedAnswer.OptionId
		};
	}
}

export = QuestionViewModel;