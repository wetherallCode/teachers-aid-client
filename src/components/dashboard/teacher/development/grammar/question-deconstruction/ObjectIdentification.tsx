import React, { Dispatch, SetStateAction } from 'react'
import { QuestionDeconstructProps, QuestionProps } from './QuestionDeconstruction'
import { LineToManipulate } from './VerbIdentification'

export type ObjectIdentificationProps = {
	setState: Dispatch<SetStateAction<QuestionDeconstructProps>>
	questionToModify: string[]
	question: QuestionProps
	object: string | null
	setObject: Dispatch<SetStateAction<string | null>>
}

export const ObjectIdentification = ({
	setState,
	question,
	questionToModify,
	object,
	setObject,
}: ObjectIdentificationProps) => {
	console.log(questionToModify)
	return (
		<div>
			<LineToManipulate>
				{questionToModify.map((word, i: number) => (
					<span key={i}>
						<span>{word}</span>
						{word !== questionToModify[questionToModify.length - 1] && <span> </span>}
					</span>
				))}
			</LineToManipulate>
		</div>
	)
}
