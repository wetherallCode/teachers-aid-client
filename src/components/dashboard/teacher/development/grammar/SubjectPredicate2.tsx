import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import {
	DirectionsContainer,
	MessageContainer,
	SentenceContainer,
	SubjectPredicateContainer,
} from './subjectPredicateStyles'
import { subjectPredicateGrader } from './subPredGrading'

export type SubjectPredicate2Props = {
	sentence: string
	setSentence: Dispatch<SetStateAction<string>>
}

export const SubjectPredicate2 = ({ sentence, setSentence }: SubjectPredicate2Props) => {
	const [point, setPoint] = useState<number | null>(null)

	const separator = ' | '
	const newSentence = [
		sentence.slice(0, point!).trim(),
		separator,
		sentence.slice(point!, sentence.length).trim(),
	]
	const correctSubject = 'A good player'
	const correctPredicate = 'respects their team.'

	const nounType = 'person'

	const { message, correct, whatWentWrong, howToFix } = subjectPredicateGrader({
		correctSubject,
		givenSubject: newSentence[0],
		sentence,
		noun: 'player',
		nounType,
		verb: 'respects',
		verbType: 'action',
	})

	return (
		<SubjectPredicateContainer>
			<DirectionsContainer>
				Click on the sentence below to separate it into the subject and predicate.
			</DirectionsContainer>
			{point ? (
				<SentenceContainer>
					{newSentence.map((part, i) => (
						<span
							key={i}
							style={
								i === 0
									? {
											cursor: 'pointer',
											textDecoration: 'underline',
											textUnderlinePosition: 'under',
									  }
									: i === 2
									? {
											cursor: 'pointer',
											textDecoration: 'underline',
											textDecorationStyle: 'double',
											textUnderlinePosition: 'under',
									  }
									: { cursor: 'pointer' }
							}
							onClick={() => {
								if (part === separator) {
									setPoint(null)
								}
							}}>
							{part}
						</span>
					))}
				</SentenceContainer>
			) : (
				<SentenceContainer>
					{sentence.split('').map((letter, i) => (
						<span key={i} style={{ cursor: 'pointer' }} onClick={() => setPoint(i)}>
							{letter}
						</span>
					))}
				</SentenceContainer>
			)}
			{point ? (
				<MessageContainer correct={correct}>
					{!correct ? (
						<div>
							<div style={{ textAlign: 'center' }}>Not Quite</div>
							<br></br>
							<div>What went wrong? {whatWentWrong}</div>
							<div>How to fix it: {howToFix}</div>
						</div>
					) : (
						<div>
							<div style={{ textAlign: 'center' }}>{message}</div>
							<br />
							<div>
								"{newSentence[0]}" is the complete subject of the sentence because it is{' '}
								{nounType === 'person' ? 'who' : 'what'} the sentence is about.
							</div>
							<div>
								"
								{newSentence[2].split('')[0].toString().toUpperCase() +
									newSentence[2].slice(1, newSentence[2].length - 1)}
								" is the complete predicate of the sentence because it is what the{' '}
								{nounType === 'person' ? 'person' : 'thing'} is doing.
							</div>
							<br />
							{/* <button onClick={() => setSentence(newSentence.join(' '))}>Next Step</button> */}
						</div>
					)}
				</MessageContainer>
			) : (
				<div></div>
			)}
		</SubjectPredicateContainer>
	)
}
