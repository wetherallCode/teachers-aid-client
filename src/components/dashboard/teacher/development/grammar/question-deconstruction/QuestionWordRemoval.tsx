import React, { Dispatch, SetStateAction, useState } from 'react'
import { useSelectedText } from '../../../../../../hooks/useSelectedText'
import { capitalizer, splitSentenceByWord } from '../../../../../../utils'
import { QuestionProps } from './QuestionDeconstruction'

export type QuestionWordRemovalProps = {
	question: QuestionProps
	questionToModify: string[]
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

export const QuestionWordRemoval = ({
	question,
	questionToModify,
	setQuestionToModify,
	setState,
}: QuestionWordRemovalProps) => {
	const [select, text, reset] = useSelectedText()

	const [questionWordCheck, setQuestionWordCheck] = useState('')

	const handleQuestionWordRemove = (word: string) => {
		const index = questionToModify.findIndex((wordToFind) => wordToFind === word)
		setQuestionToModify([...questionToModify.slice(0, index), ...questionToModify.slice(index + 1)])
		setState('helping-verb-id')
		// setDeletedWords(text)
	}
	const handleCorrectSelection = (word: string) => {
		setTimeout(() => {
			handleQuestionWordRemove(word)
		}, 1000)
	}

	return (
		<div>
			<div onMouseUp={select}>
				{questionToModify.map((word, i: number) => (
					<span key={i}>
						<span
							onDoubleClick={() => {
								setQuestionWordCheck(word)
								if (questionWordCheck) {
									if (questionWordCheck.toLowerCase() === question.questionWord.toLowerCase()) {
										return handleCorrectSelection(word)
									}
								}
							}}>
							{word}
						</span>
						{word !== questionToModify[questionToModify.length - 2] && <span> </span>}
					</span>
				))}
			</div>

			<br />
			{questionWordCheck && (
				<div>
					{questionWordCheck.toLowerCase() !== question.questionWord.toLowerCase() ? (
						<div>
							"{capitalizer(questionWordCheck)}" is not the question word. It is either How or Why.
							Try it again!
						</div>
					) : (
						<div>Good Job</div>
					)}
				</div>
			)}
			{/* <div>Deleted Words</div> 
 <div>
				<button
					onClick={() => {
						setQuestionToModify(question.original.split(' '))
						setDeletedWords([])
					}}>
					Reset
				</button>
			</div> 
			<div onMouseUp={select}>
				{deletedWords.map((word, i: number) => (
					<span key={i}>
						<span
							onDoubleClick={() => {
								const index = splitSentenceByWord(question.original).findIndex(
									(wordToFind) => wordToFind === word
								)

								const returnedWords = question.original
									.split(' ')
									.filter(
										(wordToFilter) =>
											wordToFilter === word || questionToModify.includes(wordToFilter)
									)
								console.log(returnedWords)
							}}>
							{word}
						</span>
						<span> </span>
					</span>
				))}
			</div> */}
		</div>
	)
}
