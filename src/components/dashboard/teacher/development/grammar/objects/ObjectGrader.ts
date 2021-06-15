type ObjectGraderProps = {
	givenObject: string
	correctObject: string
	completePredicate: string
	completeSubject: string
	simplePredicate: string
}

export function objectGrader({
	givenObject,
	correctObject,
	completePredicate,
	completeSubject,
	simplePredicate,
}: ObjectGraderProps) {
	if (!completePredicate.includes(givenObject)) {
		return {
			correctObject: false,
			message: 'Your object must be in the predicate.',
			howToFix: `Ask yourself: Did ${completeSubject}
      ${simplePredicate} something?`,
		}
	}
	if (givenObject.includes(simplePredicate)) {
		return {
			correctObject: false,
			message: 'Your object must come after the verb.',
			howToFix: `Ask yourself: Did ${completeSubject}
      ${simplePredicate} something?`,
		}
	}
	if (givenObject !== correctObject) {
		return {
			correctObject: false,
			message: 'Your object cannot include a preposition.',
			howToFix: `Ask yourself: Did ${completeSubject}
      ${simplePredicate} something?`,
		}
	}
	return { correctObject: true.valueOf, correctMessage: 'Good Job' }
}
