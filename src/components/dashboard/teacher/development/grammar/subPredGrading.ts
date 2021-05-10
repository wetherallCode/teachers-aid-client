export type SubjectPredicateGraderProps = {
	givenSubject: string
	correctSubject: string
	sentence: string
	noun: string
	nounType: string
	verb: string
	verbType: string
	// givenPredicate: string
	// correctPredicate: string
	// prepositionalPhrases: string[]
	// object: string
}

// export const subjectPredicateGradingArgsObj: SubjectPredicateGraderArgs = {
//   givenSubject: '',
//   correctSubject: '',
//   sentence: '',
//   noun: '',
//   verb: '',
//   verbType: '',
//   givenPredicate: '',
//   correctPredicate: '',
//   prepositionalPhrases: [],
//   object: '',
// }

export const subjectPredicateGrader = ({
	givenSubject,
	correctSubject,
	sentence,
	noun,
	nounType,
	verb,
	verbType,
}: // givenPredicate,
// correctPredicate,
// prepositionalPhrases,
// object,
SubjectPredicateGraderProps) => {
	const subjectCheck = givenSubject.split(' ')

	for (const word of subjectCheck) {
		if (!sentence.split(' ').includes(word)) {
			return {
				whatWentWrong: `You've split a word!`,
				howToFix: `Only separate the sentence between words`,
				correct: false,
			}
		}
	}

	if (!subjectCheck.includes(noun)) {
		return {
			whatWentWrong: `"` + givenSubject + `" doesn't contain a noun. `,
			howToFix:
				'Your subject needs to include the person, place, thing, or idea that the sentence is about.',
			correct: false,
		}
	}
	if (subjectCheck.includes(verb)) {
		return {
			whatWentWrong: `Your subject contains a verb.`,
			howToFix:
				`Look at the statement and take out the ` +
				(verbType === 'action'
					? `action word`
					: verbType === 'being'
					? `being word (was or were)`
					: 'feeling word'),
			correct: false,
		}
	}
	if (givenSubject !== correctSubject) {
		return { whatWentWrong: `Your subject isn't correct`, correct: false }
	}
	return { message: 'Correct - Good job!', correct: true }
}
