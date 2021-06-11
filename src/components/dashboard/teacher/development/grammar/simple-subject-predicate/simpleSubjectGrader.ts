type SimpleSubjectGraderProps = {
	correctSimpleSubject: string
	givenSimpleSubject: string
	completeSubject: string
}

export const simpleSubjectGrader = ({
	correctSimpleSubject,
	givenSimpleSubject,
	completeSubject,
}: SimpleSubjectGraderProps) => {
	if (!completeSubject.includes(givenSimpleSubject)) {
		return {
			whatWentWrong: 'Your simple subject is in the predicate.',
			howToFix:
				'Look at the subject to the right of the dividing line. Only and find the person, place, idea, or thing that is in the complete subject.',
			correctSimpleSubject: false,
		}
	}
	if (givenSimpleSubject !== correctSimpleSubject) {
		return {
			whatWentWrong:
				'Your simple subject is not the noun or the complete noun in the complete subject',
			howToFix: 'Find the person, place, idea, or thing that is in the complete subject.',
			correctSimpleSubject: false,
		}
	}
	// if (givenSimpleSubject === correctSimpleSubject) {
	return {
		correctSimpleSubject: true,
		message: 'Great job!',
	}
	// }

	// return { message: `Everything is good` }
}
