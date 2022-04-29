import { irregularPastTenseVerbList } from '../../../../../../../../utils'
import { findPreposition } from './findPreposition'

type ObjectGraderProps = {
	givenObject: string
	correctObject: string
	completePredicate: string
	completeSubject: string
	simpleSubject: string
	simplePredicate: string
	questionToModify: string[]
}

export function objectGrader({
	givenObject,
	correctObject,
	completePredicate,
	simpleSubject,
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
		.filter((letter) => letter !== '.')
		.join('')

	const question = [...questionWordsExceptLast, '|', lastWordInQuestion, '.']

	if (givenObject.trim() !== '' && givenObject.trim() === ' ') {
		return {
			correctObject: false,
			message: 'You selected a space.',
			howToFix: `Make sure you select an entire word or a group of words.`,
		}
	}
	const objectContainsPreposition = correctObject ? findPreposition(correctObject.trim()) : false

	for (const wordInSelection of givenObject
		.trim()
		.split(' ')
		.filter((wordToFilter) => wordToFilter !== '')) {
		const lastWordWithOutPeriod = questionToModify[questionToModify.length - 1].slice(
			0,
			questionToModify[questionToModify.length - 1].length - 1
		)

		const completeQuestion = [...questionToModify, lastWordWithOutPeriod]

		if (
			(givenObject.trim() !== '' && !completeQuestion.includes(wordInSelection)) ||
			!lastWordWithOutPeriod
		) {
			return {
				correctObject: false,
				message: 'You selected a partial word.',
				howToFix: `Make sure you select an entire word or a group of words.`,
			}
		}
	}

	if (givenObject.trim() !== '' && completeSubject.includes(givenObject.trim())) {
		return {
			correctObject: false,
			message: 'Your object must be in the predicate.',
			howToFix: `Look to the right of the separator line to find the object.`,
		}
	}
	if (givenObject.trim() !== '' && givenObject.trim().includes(conjugatedVerb)) {
		return {
			correctObject: false,
			message: `Your object must come after the verb: ${conjugatedVerb}`,
			howToFix: `Objects are nouns and nouns can be modified by adjective, so look for the person, place, thing, or idea that the ${simpleSubject} ${conjugatedVerb} and any adjective that would come before it.`,
		}
	}
	if (
		givenObject.trim() !== '' &&
		findPreposition(givenObject.trim()) &&
		!objectContainsPreposition
	) {
		return {
			correctObject: false,
			message: 'Your object cannot include a preposition.',
			howToFix: `Ask yourself: Did ${completeSubject}
      ${simplePredicate} something?`,
		}
	}
	if (givenObject.trim() !== '' && givenObject.trim() === correctObject + '.') {
		return { correctObject: true, correctMessage: 'Good Job' }
	}
	if (givenObject.trim() !== '' && givenObject.trim() !== correctObject) {
		// if the given is one word but the correct is more than one word
		if (givenObject.trim().split(' ').length === 1 && correctObject.split(' ').length > 1) {
			console.log('given is one word but the correct is more than one word')
			return {
				correctObject: false,
				message:
					'The word you selected is a part of the object but is only one word and the object is more than one word.',
				howToFix: `Select more than one word. There may be an adjective before the noun or the word "a" or "the", or you may have selected the adjective but not the noun that it is modifying.`,
			}
		}
		// if the given is more than one word, but the correct is one word
		if (givenObject.trim().split(' ').length > 1 && correctObject.split(' ').length === 1) {
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
