import React, { useState } from 'react'
import { useSelectedText } from '../../../../../hooks/useSelectedText'

export type SimpleSubjectPredicateProps = { sentence: string }

export const SimpleSubjectPredicate = ({ sentence }: SimpleSubjectPredicateProps) => {
	const [select, text, reset] = useSelectedText()
	return (
		<div>
			<div>{sentence}</div>
		</div>
	)
}
