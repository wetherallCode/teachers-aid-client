import React, { useState } from 'react'
import { splitSentenceByWord } from '../../../../../../utils'
import { QuestionWordRemoval } from './QuestionWordRemoval'

export type QuestionDeconstructionProps = {}

export type QuestionProps = {
	original: string
	modifiedQuestion: string
	questionWord: string
}

export const QuestionDeconstruction = ({}: QuestionDeconstructionProps) => {
	const question: QuestionProps = {
		original: `Why did John Brown's raid divide the nation?`,
		modifiedQuestion: `Why did John Brown's raid divide the nation?`,
		questionWord: 'why',
	}

	const [questionToModify, setQuestionToModify] = useState(splitSentenceByWord(question.original))

	const [state, setState] =
		useState<
			// | 'init'
			| 'question-word-removal'
			| 'helping-verb-id'
			| 'subject-predicate-split'
			| 'subject-identification'
			| 'verb-identification'
			| 'object-identification'
		>('question-word-removal')

	return (
		<div>
			<div>Deconstruct the Question</div>

			{state === 'question-word-removal' && (
				<QuestionWordRemoval
					question={question}
					questionToModify={questionToModify}
					setQuestionToModify={setQuestionToModify}
					setState={setState}
				/>
			)}
			{state === 'helping-verb-id' && <div>Helping Verb Idendification</div>}
		</div>
	)
}
