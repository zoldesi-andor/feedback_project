/// <reference path="Option.d.ts" />

class OptionViewModel {
	
	public IsSelected: KnockoutObservable<boolean>;
	public CssClass: string;
	public Text: string;
	
	constructor(
		protected model: Option
	) {
		this.CssClass = model.CssClass;
		this.Text = model.Text;
		this.IsSelected = ko.observable<boolean>(false);
	}
	
	public get OptionId(): number {
		return this. model.Id;
	}
}

export = OptionViewModel;