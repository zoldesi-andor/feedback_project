/**
 * The user related part of a result like
 * the questionnaire answers, ip address, location, etc.
 */
interface UserInfo {
	QuestionnaireAnswers: Array<Answer>;
	Ip: string,
	Location: string
}