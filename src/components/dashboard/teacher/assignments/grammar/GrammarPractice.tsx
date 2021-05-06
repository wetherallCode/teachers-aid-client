import { useState } from 'react'
import { useSelectedText } from '../../../../../hooks/useSelectedText'

export type GrammarPracticeProps = {}

export const GrammarPractice = ({}: GrammarPracticeProps) => {
	const [select, text, reset] = useSelectedText()
	const [state, setState] = useState<'subject' | 'predicate' | 'final'>('subject')
	const [subject, setSubject] = useState('')
	const [predicate, setPredicate] = useState('')

	return (
		<>
			<div onMouseUp={select}>1. A good player respects their team.</div>
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
							setState('final')
						}}>
						Set
					</button>
				</div>
			)}
			{state === 'final' && (
				<div>
					<span style={{ textDecoration: 'underline' }}>{subject}</span> |{' '}
					<span style={{ textDecoration: 'underline', textDecorationStyle: 'double' }}>
						{predicate}
					</span>
				</div>
			)}
		</>
	)
}
