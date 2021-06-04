import React, { useState } from 'react'
import { splitSentenceByWord } from '../../../../../../utils'
import { HelpingVerbIdentification } from './HelpingVerbIdentification'
import { QuestionWordRemoval } from './QuestionWordRemoval'
import { SubjectPredicateSplit } from './SubjectPredicateSplit'

export type QuestionDeconstructionProps = {}

export type QuestionProps = {
	original: string
	modifiedQuestion: string
	questionWord: string
	helpingVerb: string
	completeSubject: string
	simpleSubject: string
	nounType: 'PERSON' | 'PLACE' | 'THING' | 'IDEA'
	compoundNoun: boolean
	completePredicate: string
	simplePredicate: string
}

export const QuestionDeconstruction = ({}: QuestionDeconstructionProps) => {
	const whyWasQuestion: QuestionProps = {
		original: `Why was John Brown executed for treason?`,
		modifiedQuestion: `Why was John Brown executed for treason?`,
		questionWord: 'why',
		helpingVerb: 'was',
		completeSubject: 'John Brown',
		simpleSubject: 'John Brown',
		nounType: 'PERSON',
		compoundNoun: true,
		completePredicate: 'executed for treason?',
		simplePredicate: 'executed',
	}

	const howDidQuestion: QuestionProps = {
		original: `How did John Brown affect the nation?`,
		modifiedQuestion: `How did John Brown affect the nation?`,
		questionWord: 'how',
		helpingVerb: 'did',
		completeSubject: 'John Brown',
		simpleSubject: 'John Brown',
		nounType: 'PERSON',
		compoundNoun: true,
		completePredicate: 'affect the nation',
		simplePredicate: 'affect',
	}

	// const question = howDidQuestion
	const question = whyWasQuestion
	const [questionToModify, setQuestionToModify] = useState(splitSentenceByWord(question.original))
	console.log(questionToModify)

	const [state, setState] =
		useState<
			// | 'init'
			| 'question-word-removal'
			| 'subject-predicate-split'
			| 'subject-identification'
			| 'helping-verb-id'
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
			{state === 'subject-predicate-split' && (
				<SubjectPredicateSplit
					questionToModify={questionToModify}
					setQuestionToModify={setQuestionToModify}
					setState={setState}
					question={question}
				/>
			)}
			{state === 'helping-verb-id' && (
				<HelpingVerbIdentification
					questionToModify={questionToModify}
					setQuestionToModify={setQuestionToModify}
					setState={setState}
					question={question}
				/>
			)}
		</div>
	)
}
