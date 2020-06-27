import React, { FC } from 'react'
import { useParams } from 'react-router'
import { gql, useQuery } from '@apollo/client'
import {
  findEssayToGradeByIdVariables,
  findEssayToGradeById,
} from '../../../../../../schemaTypes'
import { useGradeEssayContextProvider } from './GradeEssayContext'

export type GradeEssayProps = {}

export const FIND_ESSAY_TO_GRADE_QUERY = gql`
  query findEssayToGradeById($input: FindEssayByIdInput!) {
    findEssayById(input: $input) {
      essay {
        _id
        hasOwner {
          firstName
          lastName
        }
        topic {
          question
          writingLevel
        }
        dueDate
        dueTime
        finalDraft {
          submitTime
          submittedFinalDraft {
            draft
            gradingDraft
            comments
          }
        }
      }
    }
  }
`

export const GradeEssay: FC<GradeEssayProps> = () => {
  const [, event] = useGradeEssayContextProvider()
  const { assignmentId } = useParams()
  const { loading, data } = useQuery<
    findEssayToGradeById,
    findEssayToGradeByIdVariables
  >(FIND_ESSAY_TO_GRADE_QUERY, {
    variables: {
      input: { _id: assignmentId },
    },
    onCompleted: (data) => {
      event({ type: 'SET_ESSAY_ID', payload: data.findEssayById.essay._id! })
    },
    onError: (error) => console.error(error),
  })
  if (loading) return <div>Loading </div>
  return (
    <>
      <div>{data?.findEssayById.essay.hasOwner.firstName}</div>
    </>
  )
}
