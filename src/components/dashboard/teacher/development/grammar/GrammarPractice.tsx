import React, { useState } from 'react'
import { AdjectivesAndPrepositonalPhrases } from './adjectives-prepositions/AdjectivesAndPrepositonalPhrases'
import { SimpleSubjectPredicate } from './simple-subject-predicate/SimpleSubjectPredicate'

import { SubjectPredicate } from './complete-subject-predicate/SubjectPredicate'
import { SubjectPredicate2 } from './complete-subject-predicate/SubjectPredicate2'
import { Objects } from './objects/Objects'

export type GrammarPracticeProps = {}

export const GrammarPractice = ({}: GrammarPracticeProps) => {
	const [sentence, setSentence] = useState(
		'A good player with high reputation respects their team.'
	)
	const [state, setState] =
		useState<
			| 'idle'
			| 'subjectPredicate'
			| 'simpleSubjectPredicate'
			| 'adjectivesAndPrepositions'
			| 'objects'
		>('idle')

	return (
		<div style={{ height: '90vh', display: 'grid', gridTemplateRows: '1fr 5fr' }}>
			<nav
				style={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-around',
					alignItems: 'center',
					fontSize: '2vh',
					textDecoration: 'underline',
					cursor: 'pointer',
				}}>
				<div onClick={() => setState('idle')}>Grammar Home</div>
				<div onClick={() => setState('subjectPredicate')}>Subject and Predicate</div>
				<div onClick={() => setState('simpleSubjectPredicate')}>Simple Subject and Predicate</div>
				<div onClick={() => setState('adjectivesAndPrepositions')}>Adjectives and Prepositions</div>
				<div onClick={() => setState('objects')}>Objects</div>
			</nav>
			<>
				{state === 'idle' && (
					<div
						style={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							fontSize: '5vh',
						}}>
						Welcome to Grammar Practice R&D
					</div>
				)}
				{state === 'subjectPredicate' && (
					// <SubjectPredicate sentence={sentence} />
					<SubjectPredicate2 sentence={sentence} setSentence={setSentence} />
				)}
				{state === 'simpleSubjectPredicate' && (
					<SimpleSubjectPredicate sentence={sentence} setSentence={setSentence} />
				)}
				{state === 'adjectivesAndPrepositions' && <AdjectivesAndPrepositonalPhrases />}
				{state === 'objects' && <Objects />}
			</>
		</div>
	)
}
