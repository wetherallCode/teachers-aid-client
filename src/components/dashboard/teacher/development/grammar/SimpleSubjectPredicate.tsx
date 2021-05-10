import React, { Dispatch, SetStateAction, useState } from 'react'
import { useSelectedText } from '../../../../../hooks/useSelectedText'
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

	const { whatWentWrong, howToFix, correctSimpleSubject } = simpleSubjectGrader({
		correctSimpleSubject: 'player',
		givenSimpleSubject: simpleSubject,
		completeSubject: dividedSentence[0],
	})
	// correctSimplePredicate: 'respects',
	// givenPredicate: simplePredicate,
	// completePredicate: dividedSentence[1],

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
								state === 'subject'
									? () => {
											setSimpleSubject(text)
											reset()
											setState('predicate')
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
				{/* <div> */}
				{/* <div>Incorrect</div> */}
				{/* <div>What went wrong? {whatWentWrong}</div> */}
				{/* </div> */}
			</div>
		</div>
	)
}
