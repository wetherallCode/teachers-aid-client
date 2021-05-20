import React from 'react'
import { useSelectedText } from '../../../../../../hooks/useSelectedText'
import { QuestionProps } from './QuestionDeconstruction'

export type QuestionWordRemovalProps = {
	question: QuestionProps
}

export const QuestionWordRemoval = ({ question }: QuestionWordRemovalProps) => {
	const [select, text, reset] = useSelectedText()
	const questionToModify = question.original

	return (
		<div>
			<div onMouseUp={select}>{questionToModify}</div>
			<div>{text}</div>
		</div>
	)
}
