import { irregularPastTenseVerbList } from '../../../../../../utils'
import { findPreposition } from '../simple-subject-predicate/findPreposition'

type ObjectGraderProps = {
	givenObject: string
	correctObject: string
	completePredicate: string
	completeSubject: string
	simplePredicate: string
	questionToModify: string[]
}

export function objectGrader({
	givenObject,
	correctObject,
	completePredicate,
	completeSubject,
	simplePredicate,
	questionToModify,
}: ObjectGraderProps) {
	const conjugatedVerb =
		irregularPastTenseVerbList(simplePredicate) === simplePredicate
			? simplePredicate + 'ed'
			: irregularPastTenseVerbList(simplePredicate)

	const nonContextSentence = completeSubject + ' ' + conjugatedVerb + ' ' + correctObject

	const questionWords = questionToModify.filter((word) => word !== '' && word !== '|')
	const questionWordsExceptLast = questionWords.slice(0, questionWords.length - 1)

	const lastWordInQuestion = questionToModify
		.slice(questionToModify.length - 1)
		.join('')
		.split('')
		.filter((letter) => letter !== '?')
		.join('')

	const question = [...questionWordsExceptLast, lastWordInQuestion, '?']
	for (const word of question) {
		if (
			givenObject !== '' &&
			givenObject
				.split(' ')
				.filter((wordToFilter) => wordToFilter !== '')
				// .some((wordToSearchFor) => wordToSearchFor! !== word)
				.some((wordToScan) => wordToScan !== word)
		)
			// for (const partialWord of givenObject.split(' ')) {
			// 	if (givenObject !== '' && partialWord !== word) {
			return {
				correctObject: false,
				message: 'You selected a partial word.',
				howToFix: `Make sure you select an entire word or a group of words.`,
			}
		// 	}
		// }
	}

	if (givenObject !== '' && completeSubject.includes(givenObject)) {
		return {
			correctObject: false,
			message: 'Your object must be in the predicate.',
			howToFix: `Look to the right of the separator line to find the object.`,
		}
	}
	if (givenObject !== '' && givenObject.includes(simplePredicate)) {
		return {
			correctObject: false,
			message: `Your object must come after the verb: ${simplePredicate}`,
			howToFix: ``,
		}
	}
	if (givenObject !== '' && findPreposition(givenObject)) {
		return {
			correctObject: false,
			message: 'Your object cannot include a preposition.',
			howToFix: `Ask yourself: Did ${completeSubject}
      ${simplePredicate} something?`,
		}
	}
	if (givenObject !== '' && !nonContextSentence.includes(givenObject)) {
		return {
			correctObject: false,
			message: 'Your selection is not the word that comes right after the verb.',
			howToFix: `The Object of the verb is going to come directly after the verb.`,
		}
	}
	if (givenObject !== '' && givenObject !== correctObject) {
		// if the given is one word but the correct is more than one word
		if (givenObject.split(' ').length === 1 && correctObject.split(' ').length > 1) {
			console.log('given is one word but the correct is more than one word')
			return {
				correctObject: false,
				message: 'The word you selected is one word but the object is more than one word.',
				howToFix: `Select more than one word`,
			}
		}
		// if the given is more than one word, but the correct is one word
		if (givenObject.split(' ').length > 1 && correctObject.split(' ').length === 1) {
			console.log('given is more than one word, but the correct is one word')
			return {
				correctObject: false,
				message: 'The word you selected is more than one word but the object is only one word.',
				howToFix: `Select only one word`,
			}
		}

		return {
			correctObject: false,
			message: 'Your selection is not the object.',
			howToFix: `Try again.`,
		}
	}
	return { correctObject: true, correctMessage: 'Good Job' }
}
