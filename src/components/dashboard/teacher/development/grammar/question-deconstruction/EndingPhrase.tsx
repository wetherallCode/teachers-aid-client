import React, { Dispatch, SetStateAction } from 'react'
import { QuestionDeconstructProps, QuestionProps } from './QuestionDeconstruction'
import { LineToManipulate } from './VerbIdentification'

export type EndingPhraseProps = {
	setState: Dispatch<SetStateAction<QuestionDeconstructProps>>
	questionToModify: string[]
	question: QuestionProps
}

export const EndingPhrase = ({ setState, question, questionToModify }: EndingPhraseProps) => {
	return (
		<div>
			<div>Now we'll figure out how to end the sentence.</div>
			<LineToManipulate>
				{questionToModify.map((part, i: number) => (
					<span key={i}>
						<span>{part}</span>
						{part !== questionToModify[questionToModify.length - 1] && <span> </span>}
					</span>
				))}
			</LineToManipulate>
		</div>
	)
}
