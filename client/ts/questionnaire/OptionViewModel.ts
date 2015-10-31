import QuestionViewModel = require("QuestionViewModel");

/** View model for a possible answer to a question in the questionnaire. */
class OptionViewModel {
	
	public IsSelected: KnockoutObservable<boolean>;
	public CssClass: string;
	public Text: string;
	
	constructor(
		protected model: Option,
		protected parent: QuestionViewModel
	) {
		this.CssClass = model.CssClass;
		this.Text = model.Text;
		this.IsSelected = ko.observable<boolean>(false);
	}
	
	public select(): void {
		this.parent.SelectedOption = this;
	}
	
	public get OptionId(): number {
		return this. model.Id;
	}
}

export = OptionViewModel;