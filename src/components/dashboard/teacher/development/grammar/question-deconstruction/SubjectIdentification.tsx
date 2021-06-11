import React, { Dispatch, SetStateAction, useEffect } from 'react'
import { useSelectedText } from '../../../../../../hooks/useSelectedText'
import { simpleSubjectGrader } from '../simple-subject-predicate/simpleSubjectGrader'
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
	const [select, text, reset] = useSelectedText()
	const isAnswered = text === ''
	const { correctSimpleSubject, howToFix, message, whatWentWrong } = simpleSubjectGrader({
		correctSimpleSubject: question.simpleSubject,
		givenSimpleSubject: text,
		completeSubject: question.completeSubject,
	})
	useEffect(() => {
		if (correctSimpleSubject) {
			setTimeout(() => {
				setState('verb-identification')
			}, 3000)
		}
	}, [correctSimpleSubject])
	return (
		<>
			<div>Select the Simple Subject of the question</div>
			<div>
				Simple subjects are the noun in the complete subect. There may be adjectives that modify the
				noun or prepositional phrases that add specificity to the noun.
			</div>

			<div onMouseUp={select}>
				{questionToModify
					.join(' ')
					.split(' ')
					.map((part, i: number) => (
						<span key={i}>
							<span>{part}</span>
							{part !== questionToModify[questionToModify.length - 1] && <span> </span>}
						</span>
					))}
			</div>
			<div>
				{isAnswered ? (
					''
				) : (
					<div>
						<div>{correctSimpleSubject ? 'Correct' : 'Not Quite'}</div>
						{!correctSimpleSubject ? (
							<>
								<div>
									What went wrong? <span>{whatWentWrong}</span>
								</div>
								<div>
									How do you fix it? <span>{howToFix}</span>
								</div>
							</>
						) : (
							<div>{message}</div>
						)}
					</div>
				)}
			</div>
		</>
	)
}
