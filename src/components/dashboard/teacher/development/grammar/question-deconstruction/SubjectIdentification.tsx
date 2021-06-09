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
			<div>Select the Simple Subject of the question</div>
			<div>
				Simple subjects are the noun in the complete subect. There may be adjectives that modify the
				noun or prepositional phrases that add specificity to the noun.
			</div>

			<div>{questionToModify.join(' ')}</div>
		</>
	)
}
