import React, { useState } from 'react'
import { QuestionWordRemoval } from './QuestionWordRemoval'

export type QuestionDeconstructionProps = {}

export type QuestionProps = {
	original: string
	questionWords: string[]
}

export const QuestionDeconstruction = ({}: QuestionDeconstructionProps) => {
	const [state, setState] =
		useState<
			// | 'init'
			| 'question-word-removal'
			| 'subject-predicate-split'
			| 'subject-identification'
			| 'verb-identification'
			| 'object-identification'
		>('question-word-removal')

	const question: QuestionProps = {
		original: `Why did John Brown's raid divide the Nation?`,
		questionWords: ['why', 'did'],
	}

	return (
		<div>
			<div>Deconstruct the Question</div>
			{state === 'question-word-removal' && <QuestionWordRemoval question={question} />}
		</div>
	)
}
