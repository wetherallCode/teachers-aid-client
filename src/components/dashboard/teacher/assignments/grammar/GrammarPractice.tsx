import React, { useState } from 'react'
import { SimpleSubjectPredicate } from './SimpleSubjectPredicate'

import { SubjectPredicate } from './SubjectPredicate'

export type GrammarPracticeProps = {}

export const GrammarPractice = ({}: GrammarPracticeProps) => {
	const [state, setState] = useState<'idle' | 'subjectPredicate' | 'simpleSubjectPredicate'>(
		'simpleSubjectPredicate'
	)
	const sentence = 'A good player respects their team.'

	return (
		<div style={{ height: '95vh', display: 'grid', gridTemplateRows: '1fr 5fr' }}>
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
				{state === 'subjectPredicate' && <SubjectPredicate sentence={sentence} />}
				{state === 'simpleSubjectPredicate' && (
					<SimpleSubjectPredicate sentence={sentence}></SimpleSubjectPredicate>
				)}
				{<div></div>}
			</>
		</div>
	)
}
