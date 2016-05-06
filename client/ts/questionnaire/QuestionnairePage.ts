/** The entry point for the questionnaire page */

requirejs(
	['QuestionnaireViewModel'],
	(QuestionnaireViewModel) => {

        var age = [];
        for(var i = 1; i< 100; i++) {
            age.push([i.toString(), i.toString()]);
        }
        
        var createFlagTag = (flag: string) => "<span style='display: inline-block;margin-right: 7px' class='flag flag-" + flag + "'/><span>" + flag.toLocaleUpperCase() + "</span>";
        
        var flags = ["ad", "ae", "af", "ag", "ai", "al", "am", "an", "ao", "ar", "as", "at", "au", "aw", "az", "ba", "bb", "bd", "be", "bf", "bg", "bh", "bi", "bj", "bm", "bn", "bo", "br", "bs", "bt", "bv", "bw", "by", "bz", "ca", "catalonia", "cd", "cf", "cg", "ch", "ci", "ck", "cl", "cm", "cn", "co", "cr", "cu", "cv", "cw", "cy", "cz", "de", "dj", "dk", "dm", "do", "dz", "ec", "ee", "eg", "eh", "england", "er", "es", "et", "eu", "fi", "fj", "fk", "fm", "fo", "fr", "ga", "gb", "gd", "ge", "gf", "gg", "gh", "gi", "gl", "gm", "gn", "gp", "gq", "gr", "gs", "gt", "gu", "gw", "gy", "hk", "hm", "hn", "hr", "ht", "hu", "ic", "id", "ie", "il", "im", "in", "io", "iq", "ir", "is", "it", "je", "jm", "jo", "jp", "ke", "kg", "kh", "ki", "km", "kn", "kp", "kr", "kurdistan", "kw", "ky", "kz", "la", "lb", "lc", "li", "lk", "lr", "ls", "lt", "lu", "lv", "ly", "ma", "mc", "md", "me", "mg", "mh", "mk", "ml", "mm", "mn", "mo", "mp", "mq", "mr", "ms", "mt", "mu", "mv", "mw", "mx", "my", "mz", "na", "nc", "ne", "nf", "ng", "ni", "nl", "no", "np", "nr", "nu", "nz", "om", "pa", "pe", "pf", "pg", "ph", "pk", "pl", "pm", "pn", "pr", "ps", "pt", "pw", "py", "qa", "re", "ro", "rs", "ru", "rw", "sa", "sb", "sc", "scotland", "sd", "se", "sg", "sh", "si", "sk", "sl", "sm", "sn", "so", "somaliland", "sr", "ss", "st", "sv", "sx", "sy", "sz", "tc", "td", "tf", "tg", "th", "tibet", "tj", "tk", "tl", "tm", "tn", "to", "tr", "tt", "tv", "tw", "tz", "ua", "ug", "um", "us", "uy", "uz", "va", "vc", "ve", "vg", "vi", "vn", "vu", "wales", "wf", "ws", "xk", "ye", "yt", "za", "zanzibar", "zm", "zw"];

		var config = {
            "Age": age,
			"Gender": [["Male", "male"], ["Female", "female"]],
            "Country": flags.map(flag => [createFlagTag(flag), ""]),
            "Have you played this game before?": [["Yes", "yes"], ["No", "no"]]
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