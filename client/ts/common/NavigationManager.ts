/** Helper class for sipmle navigation */
class Page {
	constructor(
		private url: string
	) { }

	public go(params?: any): void {
		var url = this.url;
		if (params) {
			for (var key in params) {
				url = url.replace(":" + key, params[key].toString());
			}
		}
		
		window.location.href = url + window.location.hash;
	}
}

/** Helper class for navigating from javascript */
class NavigationManager {
	public static QuestionnairePage = new Page("/questionnaire");
	public static GamePage = new Page("/game");
}

export = NavigationManager;