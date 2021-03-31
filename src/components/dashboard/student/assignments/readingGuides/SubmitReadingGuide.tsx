import React, { FC } from 'react'
import { gql, useMutation } from '@apollo/client'
import {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	submitReadingGuide,
	submitReadingGuideVariables,
} from '../../../../../schemaTypes'
import { useNavigate } from 'react-router'
import { useReadingGuideToCompleteContextProvider } from './state-and-styles/ReadingGuideToCompleteContext'
import { SubmitReadingGuideButton } from './state-and-styles/readingGuideStyles'

export type SubmitReadingGuideProps = {}

export const SUBMIT_READING_GUIDE_MUTATION = gql`
	mutation submitReadingGuide($input: SubmitReadingGuideInput!) {
		submitReadingGuide(input: $input) {
			readingGuide {
				_id
			}
		}
	}
`

export const SubmitReadingGuide: FC<SubmitReadingGuideProps> = () => {
	const navigate = useNavigate()
	const [state] = useReadingGuideToCompleteContextProvider()

	const [submitReadingGuide] = useMutation<submitReadingGuide, submitReadingGuideVariables>(
		SUBMIT_READING_GUIDE_MUTATION,
		{
			onCompleted: () => {
				console.log(new Date().toLocaleString())
				navigate('/dashboard/assignments')
			},
			refetchQueries: ['findReadingGuidesToComplete', 'findReadingGuideById'],
		}
	)

	return (
		<>
			<SubmitReadingGuideButton
				onClick={() =>
					submitReadingGuide({
						variables: {
							input: {
								...state.context.submitReadingGuideInputs,
								submitTime: new Date().toLocaleString(),
							},
						},
					})
				}>
				Submit
			</SubmitReadingGuideButton>
		</>
	)
}
