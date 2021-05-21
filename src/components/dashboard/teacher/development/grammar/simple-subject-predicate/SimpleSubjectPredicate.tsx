import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useSelectedText } from '../../../../../../hooks/useSelectedText'
import { simplePredicateGrader } from './simplePredicateGrader'
import { simpleSubjectGrader } from './simpleSubjectGrader'

export type SimpleSubjectPredicateProps = {
	sentence: string
	setSentence: Dispatch<SetStateAction<string>>
}

export const SimpleSubjectPredicate = ({ sentence, setSentence }: SimpleSubjectPredicateProps) => {
	const [select, text, reset] = useSelectedText()
	const [state, setState] = useState<'subject' | 'predicate' | 'final'>('subject')

	const [simpleSubject, setSimpleSubject] = useState('')
	const [simplePredicate, setSimplePredicate] = useState('')
	const testSentence = 'A good player with high reputation | respects their team.'
	const newSentence = testSentence.split(' ').slice(0, testSentence.split(' ').length)

	const dividedSentence = testSentence.split('|')

	const period =
		newSentence[newSentence.length - 1].split('')[
			newSentence[newSentence.length - 1].split('').length - 1
		]
	const lastWordWithOurPeriod = newSentence[newSentence.length - 1]
		.split('')
		.slice(0, newSentence[newSentence.length - 1].split('').length - 1)
		.join('')

	const modifiedNewSentence = [
		...newSentence.slice(0, newSentence.length - 1),
		lastWordWithOurPeriod,
		period,
	]

	const subjectGrader = simpleSubjectGrader({
		correctSimpleSubject: 'player',
		givenSimpleSubject: simpleSubject,
		completeSubject: dividedSentence[0],
	})

	const predicateGrader = simplePredicateGrader({
		correctSimplePredicate: 'respects',
		givenSimplePredicate: simplePredicate,
		completePredicate: dividedSentence[1],
		verbType: 'action',
	})

	// useEffect(() => {
	// 	subjectGrader.correctSimpleSubject && setState('predicate')
	// }, [subjectGrader])
	const handleDoubleClick = () =>
		state === 'subject' && !simpleSubject
			? () => {
					setSimpleSubject(text)
					reset()
			  }
			: state === 'subject' && simpleSubject
			? () => {
					setSimpleSubject('')
					setSimpleSubject(text)
					reset()
			  }
			: () => {
					setSimplePredicate(text)
					reset()
			  }

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
				{modifiedNewSentence.map((word, i: number) => {
					return (
						<span key={i}>
							<span
								onDoubleClick={handleDoubleClick()}
								style={
									word === simpleSubject
										? {
												cursor: 'pointer',
												textDecoration: 'underline',
												textUnderlinePosition: 'under',
										  }
										: word === simplePredicate
										? {
												cursor: 'pointer',
												textDecoration: 'underline',
												textDecorationStyle: 'double',
												textUnderlinePosition: 'under',
										  }
										: {}
								}>
								{word}
							</span>
							{word !== modifiedNewSentence[modifiedNewSentence.length - 2] && <span> </span>}
						</span>
					)
				})}
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
				{state === 'predicate' && simplePredicate && (
					<>
						{!predicateGrader.correctSimplePredicate ? (
							<div>
								<div>Incorrect</div>
								<div>What went wrong? {predicateGrader.whatWentWrong}</div>
								<div>How to fix? {predicateGrader.howToFix}</div>
							</div>
						) : (
							<div>
								<div>Correct</div>
								<div>{predicateGrader.message}</div>
								{/* <button onClick={() => setState('predicate')}>Next</button> */}
							</div>
						)}
					</>
				)}
			</div>
		</div>
	)
}
