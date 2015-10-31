/** The entry point for the questionnaire page */

requirejs(
	['QuestionnaireViewModel'],
	(QuestionnaireViewModel) => {

		var config = {
			"Genger": [["Male", "male"], ["Female", "female"]],
			"Age": [["0-12", "0-12"], ["13-50", "13-50"], ["50+", "50plus"]],
			"School": [["Elementary", "elementary"], ["High School", "high-school"], ["University", "uni"]]
		};

		var questionIndex = 0;
		var answerIndex = 0;
		var questions: Array<Question> = $.map(config, (prop, key) => {
			var question = <Question>{};
			question.Id = questionIndex++;
			question.Text = key;
			question.Options = prop.map(props => {
				var answer = <Option>{};
				answer.Id = answerIndex++;
				answer.Text = props[0];
				answer.CssClass = props[1];
				return answer;
			})
			return question;
		});

		var questionnaireViewModel = new QuestionnaireViewModel(questions);

		ko.applyBindings(questionnaireViewModel);
	}
);