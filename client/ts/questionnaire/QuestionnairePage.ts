requirejs(
	['QuestionnaireViewModel'],
	(QuestionnaireViewModel) => {

		var config = {
			"Genger": ["", "", ""],
			"Age": ["", "", ""],
			"School": ["", "", ""]
		};

		var questionIndex = 0;
		var answerIndex = 0;
		var questions: Array<Question> = $.map(config, (prop, key) => {
			var question = <Question>{};
			question.Id = questionIndex++;
			question.Text = key;
			question.Options = prop.map(iconUrl => {
				var answer = <Option>{};
				answer.Id = answerIndex++;
				answer.CssClass = iconUrl;
				return answer;
			})
			return question;
		});

		var questionnaireViewModel = new QuestionnaireViewModel(questions);

		ko.applyBindings(questionnaireViewModel);
	}
);

