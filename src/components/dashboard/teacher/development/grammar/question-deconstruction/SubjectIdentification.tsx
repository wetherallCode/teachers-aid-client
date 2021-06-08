import React, { Dispatch, SetStateAction } from 'react'
import { QuestionProps } from './QuestionDeconstruction'

export type SubjectIdentificationProps = {
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
	questionToModify: string[]
	question: QuestionProps
	subject: string | null
	setSubject: Dispatch<SetStateAction<string | null>>
}

export const SubjectIdentification = ({
	setState,
	question,
	questionToModify,
	subject,
	setSubject,
}: SubjectIdentificationProps) => {
	return (
		<>
			Select the Complete Subject of the question
			<div>{questionToModify.join(' ')}</div>
		</>
	)
}
