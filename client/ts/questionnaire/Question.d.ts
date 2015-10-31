/** A question in the questionnaire. */
interface Question {
	Id: number,
	Text: string,
	Options: Array<Option>
}