import React, { Dispatch, SetStateAction } from 'react'
import { useSelectedText } from '../../../../../../hooks/useSelectedText'
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
	const [select, text, reset] = useSelectedText()
	return (
		<div>
			<div>
				The next step is to figure out the object of the verb. Some verbs transitive and have an
				object, and some verbs are intransitive and have no object. To find out if the verb{' '}
				{question.simplePredicate} has an object ask yourself: Did {question.completeSubject}{' '}
				{question.simplePredicate} something? If there is a clear answer to this quesiton, that is
				the object.
			</div>

			<LineToManipulate onMouseUp={select}>
				{questionToModify.map((word, i: number) => (
					<span key={i}>
						<span>{word}</span>
						{word !== questionToModify[questionToModify.length - 1] && <span> </span>}
					</span>
				))}
			</LineToManipulate>
			{!correctObject ? <div></div> : <div></div>}
		</div>
	)
}
