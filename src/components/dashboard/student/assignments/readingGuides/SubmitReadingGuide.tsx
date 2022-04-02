import React, { FC } from 'react'
import { gql, useMutation } from '@apollo/client'
import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  submitReadingGuide,
  submitReadingGuideVariables,
} from '../../../../../schemaTypes'
import { useNavigate } from 'react-router'
import { useReadingGuideToCompleteContextProvider } from './state-and-styles/ReadingGuideToCompleteContext'
import {
  SmallNextButton,
  SubmitReadingGuideButton,
} from './state-and-styles/readingGuideStyles'
import { responsibilityPointConverter } from '../../../../../utils'

export type SubmitReadingGuideProps = {
  grade: number
}

export const SUBMIT_READING_GUIDE_MUTATION = gql`
  mutation submitReadingGuide($input: SubmitReadingGuideInput!) {
    submitReadingGuide(input: $input) {
      readingGuide {
        _id
      }
    }
  }
`

export const SubmitReadingGuide = ({ grade }: SubmitReadingGuideProps) => {
  const navigate = useNavigate()
  const [state] = useReadingGuideToCompleteContextProvider()

  const [submitReadingGuide] = useMutation<
    submitReadingGuide,
    submitReadingGuideVariables
  >(SUBMIT_READING_GUIDE_MUTATION, {
    onCompleted: () => {
      navigate('/dashboard/assignments')
    },
    refetchQueries: ['findReadingGuidesToComplete', 'findReadingGuideById'],
  })

  return (
    <>
      <SmallNextButton
        onClick={() =>
          submitReadingGuide({
            variables: {
              input: {
                ...state.context.submitReadingGuideInputs,
                submitTime: new Date().toLocaleString(),
                responsibilityPoints: responsibilityPointConverter(grade, 5),
              },
            },
          })
        }
      >
        Submit
      </SmallNextButton>
    </>
  )
}
