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
				'Look at the subject only and find the person, place, idea, or thing that is in the complete subject.',
			correctSimpleSubject: false,
		}
	}
	if (givenSimpleSubject !== correctSimpleSubject) {
		return {
			whatWentWrong:
				'Your simple subject is in the complete subject, but is not the noun in the complete subject',
			howToFix: 'Find the person, place, idea, or thing that is in the complete subject.',
			correctSimpleSubject: false,
		}
	}
	if (givenSimpleSubject === correctSimpleSubject) {
		return {
			correctSimpleSubject: true,
			message: "That's right - Great job!",
		}
	}

	return { message: `Everything is good` }
}
