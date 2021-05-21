import React, { useState } from 'react'
import { useSelectedText } from '../../../../../../hooks/useSelectedText'
import { splitSentenceByWord } from '../../../../../../utils'
import { QuestionProps } from './QuestionDeconstruction'

export type QuestionWordRemovalProps = {
	question: QuestionProps
}

export const QuestionWordRemoval = ({ question }: QuestionWordRemovalProps) => {
	const [select, text, reset] = useSelectedText()
	const [questionToModify, setQuestionToModify] = useState(splitSentenceByWord(question.original))
	const [deletedWords, setDeletedWords] = useState<string[]>([])

	// const handleWordRemoval  = (word: string, )
	return (
		<div>
			<div onMouseUp={select}>
				{questionToModify.map((word, i: number) => (
					<span key={i}>
						<span
							onDoubleClick={() => {
								const index = questionToModify.findIndex((wordToFind) => wordToFind === word)
								setQuestionToModify([
									...questionToModify.slice(0, index),
									...questionToModify.slice(index + 1),
								])
								setDeletedWords((list) => [...list, word])
							}}>
							{word}
						</span>
						{word !== questionToModify[questionToModify.length - 2] && <span> </span>}
					</span>
				))}
			</div>

			<br />
			<div>Deleted Words</div>
			<div onMouseUp={select}>
				{deletedWords.map((word, i: number) => (
					<span key={i}>
						<span
							onDoubleClick={() => {
								const index = splitSentenceByWord(question.original).findIndex(
									(wordToFind) => wordToFind === word
								)
								setQuestionToModify(() => {
									if (true) return [word]
								})
							}}>
							{word}
						</span>
						<span> </span>
					</span>
				))}
			</div>
		</div>
	)
}
