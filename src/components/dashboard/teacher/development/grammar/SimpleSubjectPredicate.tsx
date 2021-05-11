import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useSelectedText } from '../../../../../hooks/useSelectedText'
import { simplePredicateGrader } from './simplePredicateGrader'
import { simpleSubjectGrader } from './simpleSubGrader'

export type SimpleSubjectPredicateProps = {
	sentence: string
	setSentence: Dispatch<SetStateAction<string>>
}

export const SimpleSubjectPredicate = ({ sentence, setSentence }: SimpleSubjectPredicateProps) => {
	const [select, text, reset] = useSelectedText()
	const [state, setState] = useState<'subject' | 'predicate' | 'final'>('subject')

	const [simpleSubject, setSimpleSubject] = useState('')
	const [simplePredicate, setSimplePredicate] = useState('')
	const testSentence = 'A good player | respects their team'
	const newSentence = testSentence.split(' ')
	const dividedSentence = testSentence.split('|')

	const subjectGrader = simpleSubjectGrader({
		correctSimpleSubject: 'player',
		givenSimpleSubject: simpleSubject,
		completeSubject: dividedSentence[0],
	})

	const predicateGrader = simplePredicateGrader({
		correctSimplePredicate: 'respects',
		givenSimplePredicate: simplePredicate,
		completePredicate: dividedSentence[1],
	})

	// useEffect(() => {
	// 	subjectGrader.correctSimpleSubject && setState('predicate')
	// }, [subjectGrader])

	return (
		<div>
			{state === 'subject' && (
				<div>Find the simple subject of the sentence. Double Click to select the word.</div>
			)}
			{state === 'predicate' && (
				<div>Find the simple predicate of the sentence. Double Click to select the word.</div>
			)}
			<br />
			<div onMouseUp={select}>
				{newSentence.map((word, i: number) => (
					<span key={i}>
						<span
							onDoubleClick={
								state === 'subject' && !simpleSubject
									? () => {
											setSimpleSubject(text)
											reset()
									  }
									: state === 'subject' && simpleSubject
									? () => {
											setSimpleSubject('')
											reset()
									  }
									: () => {
											setSimplePredicate(text)
											reset()
									  }
							}
							style={
								word === simpleSubject
									? { textDecoration: 'underline' }
									: word === simplePredicate
									? {
											textDecoration: 'underline',
											textDecorationStyle: 'double',
									  }
									: {}
							}>
							{word}
						</span>
						<span> </span>
					</span>
				))}
				{state === 'subject' && simpleSubject && (
					<>
						{!subjectGrader.correctSimpleSubject ? (
							<div>
								<div>Incorrect</div>
								<div>What went wrong? {subjectGrader.whatWentWrong}</div>
								<div>How to fix? {subjectGrader.howToFix}</div>
							</div>
						) : (
							<div>
								<div>Correct</div>
								<div>{subjectGrader.message}</div>
								<button onClick={() => setState('predicate')}>Next</button>
							</div>
						)}
					</>
				)}
			</div>
		</div>
	)
}
