import React from 'react'
import { useSelectedText } from '../../../../../../hooks/useSelectedText'

export type ObjectsProps = {}

export const Objects = ({}: ObjectsProps) => {
	const [select, text, reset] = useSelectedText()
	const sentence = 'A good player with high reputation | respects their team.'
	const completeSubject = sentence.split('|')[0]
	const completePredicate = sentence.split('|')[1]
	return (
		<div>
			<div>Direct Objects are nouns or pronouns that recieve the action of the verb.</div>
			<div>Example: Rob hits the ball. </div>
			<div>Hits is the verb and the ball recieves the hit.</div>
			<br />
			<div onMouseUp={select}>
				<span>{completeSubject}</span>
				<span> | </span>
				<span>{completePredicate}</span>
			</div>
		</div>
	)
}
