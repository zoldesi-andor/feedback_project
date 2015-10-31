import QuestionnaireViewModel = require("QuestionnaireViewModel");
import OptionViewModel = require("OptionViewModel");

/** View model for a question in a questionnaire. */
class QuestionViewModel {

	public Text: string;
	public Options: Array<OptionViewModel>;

	constructor(
		private model: Question,
		private parent: QuestionnaireViewModel
	) {
		this.Text = model.Text;
		this.Options = model.Options.map(answer => new OptionViewModel(answer, this));
	}

	public get SelectedOption(): OptionViewModel {
		return this.Options.filter(answer => answer.IsSelected())[0]
	}

	public set SelectedOption(a: OptionViewModel) {
		this.Options.forEach(answer => answer.IsSelected(answer === a));
	}

	public getResult(): Answer {
		return {
			QuestionId: this.model.Id,
			OptionId: this.SelectedOption ? this.SelectedOption.OptionId : null
		};
	}
}

export = QuestionViewModel;