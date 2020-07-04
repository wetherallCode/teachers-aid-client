import React, { FC } from 'react'
import { gql, useMutation } from '@apollo/client'
import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  returnGradedEssay,
  returnGradedEssayVariables,
} from '../../../../../../schemaTypes'
import { useGradeEssayContextProvider } from './GradeEssayContext'
import { useNavigate } from 'react-router'

export type ReturnEssayProps = {}

export const RETURN_GRADED_ESSAY_MUTATION = gql`
  mutation returnGradedEssay($input: ReturnGradedEssayInput!) {
    returnGradedEssay(input: $input) {
      essay {
        _id
        assigned
      }
    }
  }
`
export const ReturnEssay: FC<ReturnEssayProps> = () => {
  const navigate = useNavigate()
  const [state] = useGradeEssayContextProvider()

  const [returnGradedEssay] = useMutation<
    returnGradedEssay,
    returnGradedEssayVariables
  >(RETURN_GRADED_ESSAY_MUTATION, {
    variables: {
      input: {
        _id: state.context.essayId,
        gradingDraft: state.context.gradingDraft,
        rubricEntries: state.context.rubricEntries,
        additionalComments: state.context.additionalComments,
        score: state.context.score,
      },
    },
    onCompleted: (data) => console.log(data),
    refetchQueries: [],
  })
  return (
    <>
      <button
        onClick={() => {
          returnGradedEssay()
          navigate('/dashboard/assignments/grade')
        }}
      >
        Return
      </button>
    </>
  )
}
