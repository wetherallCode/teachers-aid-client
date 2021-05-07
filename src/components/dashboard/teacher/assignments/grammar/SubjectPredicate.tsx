import React, { useState } from 'react'
import { useSelectedText } from '../../../../../hooks/useSelectedText'

export type SubjectPredicateProps = {
	sentence: string
}

export const SubjectPredicate = ({ sentence }: SubjectPredicateProps) => {
	const [select, text, reset] = useSelectedText()
	const [state, setState] = useState<'subject' | 'predicate' | 'final'>('subject')
	const [subject, setSubject] = useState('')
	const [predicate, setPredicate] = useState('')

	let subjectOfSentence = sentence.slice(sentence.indexOf(subject), subject.length).trim()
	let predicateOfSentence = sentence.slice(sentence.indexOf(predicate), sentence.length + 1).trim()
	let newSentence =
		subject && !predicate
			? [subjectOfSentence, ' ', sentence.slice(subject.length)]
			: subject && predicate
			? [subjectOfSentence, ' | ', predicateOfSentence]
			: [sentence]

	const correctSubject = 'A good player'
	const correctPredicate = 'respects their team.'
	const correct = subject === correctSubject && correctPredicate

	return (
		<div>
			<div onMouseUp={select}>
				<div>
					{newSentence.map((part, i) => {
						return (
							<span
								style={
									part === subjectOfSentence
										? { textDecoration: 'underline' }
										: part === predicateOfSentence && predicate !== ''
										? { textDecoration: 'underline', textDecorationStyle: 'double' }
										: {}
								}
								key={part}>
								{part}
							</span>
						)
					})}
				</div>
			</div>
			{state === 'subject' && (
				<div>
					<div>Subject: {subject ? subject : text}</div>
					<button
						onClick={() => {
							setSubject(text)
							reset()
							setState('predicate')
						}}>
						Set
					</button>
				</div>
			)}
			{state === 'predicate' && (
				<div>
					<div>Predicate: {predicate ? predicate : text}</div>
					<button
						onClick={() => {
							setPredicate(text)
							reset()
							if (correct) {
								setState('final')
							} else {
								setSubject('')
								setPredicate('')
								setState('subject')
							}
						}}>
						Set
					</button>
				</div>
			)}
			{state === 'final' && (
				<div>
					<span style={{ textDecoration: 'underline' }}>{subject}</span> |{' '}
					<span
						style={{
							textDecoration: 'underline',
							textDecorationStyle: 'double',
						}}>
						{predicate}
					</span>
				</div>
			)}
		</div>
	)
}
