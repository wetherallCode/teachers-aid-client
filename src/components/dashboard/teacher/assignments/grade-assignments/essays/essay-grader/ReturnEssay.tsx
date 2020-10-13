import React, { FC } from 'react'
import { gql, useMutation } from '@apollo/client'
import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  returnGradedEssay,
  returnGradedEssayVariables,
  findEssayToGradeById_findEssayById_essay,
} from '../../../../../../../schemaTypes'
import { useGradeEssayContextProvider } from './GradeEssayContext'
import { useNavigate } from 'react-router'
import { ReturnEssayButton } from './essay-grader-styles/EssaysToGradeStyles'

export type ReturnEssayProps = {
  essay: findEssayToGradeById_findEssayById_essay
}

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
export const ReturnEssay: FC<ReturnEssayProps> = ({ essay }) => {
  const navigate = useNavigate()
  const [state] = useGradeEssayContextProvider()

  const [returnGradedEssay] = useMutation<
    returnGradedEssay,
    returnGradedEssayVariables
  >(RETURN_GRADED_ESSAY_MUTATION, {
    variables: { input: state.context.draftToGrade },
    // {
    // input: {
    //   _id: state.context.essayId,
    //   gradingDraft: state.context.draftToGrade.gradingDraft,
    //   rubricEntries: state.context.draftToGrade.rubricEntries,
    //   draftNumber: state.context.draftToGrade.draftNumber,
    //   additionalComments: state.context.draftToGrade.additionalComments,
    //   score: state.context.draftToGrade.score,
    // },

    // },
    onError: (error) => console.error(error),
    onCompleted: (data) => console.log(data),
    refetchQueries: [],
  })

  return (
    <>
      <ReturnEssayButton
        onClick={() => {
          if (
            essay.finalDraft?.submittedFinalDraft.length! - 1 ===
            state.context.draftToGrade.draftNumber
          ) {
            if (state.context.draftToGrade.rubricEntries.length !== 0) {
              returnGradedEssay()
              navigate('/dashboard/assignments/grade')
            } else console.log('You are required to check rubric entries')
          } else console.log('You cannot return a graded draft!')
        }}
      >
        Return
      </ReturnEssayButton>
    </>
  )
}
