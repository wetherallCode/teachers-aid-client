import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useSelectedText } from '../../../../../../hooks/useSelectedText'
import { capitalizer } from '../../../../../../utils'
import { QuestionProps } from './QuestionDeconstruction'

export type HelpingVerbIdentificationProps = {
	questionToModify: string[]
	question: QuestionProps
	setQuestionToModify: Dispatch<SetStateAction<string[]>>
	setState: React.Dispatch<
		React.SetStateAction<
			| 'question-word-removal'
			| 'helping-verb-id'
			| 'subject-predicate-split'
			| 'subject-identification'
			| 'verb-identification'
			| 'object-identification'
		>
	>
}

export const HelpingVerbIdentification = ({
	questionToModify,
	setQuestionToModify,
	setState,
	question,
}: HelpingVerbIdentificationProps) => {
	const [select, text, reset] = useSelectedText()
	const [point, setPoint] = useState<number | null>(null)

	const removeDidHandler = (word: string) => {
		const index = questionToModify.findIndex((wordToFind) => wordToFind === word)
		setQuestionToModify([...questionToModify.slice(0, index), ...questionToModify.slice(index + 1)])
		setTimeout(() => {
			setState('subject-identification')
		}, 3000)
	}

	const moveBeingWord = (word: string) => {
		if (word === 'was' || word === 'were') {
			const index = questionToModify.findIndex((wordToFind) => wordToFind === word)

			setQuestionToModify([
				...questionToModify.slice(0, index),
				...questionToModify.slice(index + 1),
			])
		}
	}

	const newSentence = [
		questionToModify.join(' ').split('').slice(0, point!).join(''),
		question.helpingVerb,
		questionToModify
			.join(' ')
			.split('')
			.slice(point!, questionToModify.join(' ').split('').length)
			.join(''),
	]

	const correctSentence =
		question.helpingVerb +
			' ' +
			questionToModify
				.join(' ')
				.split('')
				.slice(point!, questionToModify.join(' ').split('').length)
				.join('') ===
		question.helpingVerb + ' ' + question.completePredicate

	const helpingVerbCheck = (word: string) => {
		if (word === question.helpingVerb && question.helpingVerb === 'did') {
			removeDidHandler(word)
		} else if (word === question.helpingVerb) {
			moveBeingWord(word)
		} else console.log('incorrect')
	}

	useEffect(() => {
		if (point && !correctSentence) {
			setTimeout(() => {
				setPoint(null)
			}, 3000)
		}
		if (point && correctSentence) {
			console.log(newSentence.join(' ').split(' '))
			setQuestionToModify(newSentence.join(' ').split(' '))
			setTimeout(() => {
				setState('subject-identification')
			}, 3000)
		}
	}, [point, correctSentence])
	// console.log(questionToModify.join(' ').replace('  ', '').split('  '))
	return (
		<>
			<div>
				{question.helpingVerb === 'did' && (
					<>
						<div>
							Since the helping verb is "Did," you don't need it in the sentence anymore. Double
							click to remove the word.
						</div>
						<div onMouseUp={select}>
							{questionToModify.join(' ').split(' ').includes('did') ? (
								questionToModify.map((word, i: number) => (
									<span key={i}>
										<span onDoubleClick={() => removeDidHandler(word.toLowerCase())}>
											{word === questionToModify[0] ? capitalizer(word) : word}
										</span>
										{word !== questionToModify[questionToModify.length - 1] && <span> </span>}
									</span>
								))
							) : (
								<div>
									{questionToModify
										.join(' ')
										//   .replace(' | ', '')
										.replace('?', '.')}
								</div>
							)}
						</div>
					</>
				)}
				{question.helpingVerb !== 'did' && (
					<>
						<div>
							Since the helping verb is "Was," you need to move it to the beginning of the
							predicate. Double click to remove the word. Then click the place where it should be
							moved to.
						</div>
						<div onMouseUp={select}>
							{questionToModify.includes('was' || 'were') ? (
								questionToModify.map((word, i: number) => (
									<span key={i}>
										<span onDoubleClick={() => helpingVerbCheck(word.toLowerCase())}>
											{word === questionToModify[0] ? capitalizer(word) : word}
										</span>
										{word !== questionToModify[questionToModify.length - 1] && <span> </span>}
									</span>
								))
							) : !point ? (
								questionToModify
									.join(' ')
									.split('')
									.map((letter, i: number) => (
										<span
											key={i}
											onClick={() => {
												setPoint(i)
											}}>
											{letter}
										</span>
									))
							) : correctSentence ? (
								<div>{newSentence.join(' ')}</div>
							) : (
								<div>{newSentence.join(' ')}</div>
							)}
						</div>
					</>
				)}
			</div>
		</>
	)
}
