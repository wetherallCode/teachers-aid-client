import React, { FC } from 'react'
import { useParams } from 'react-router'
import { gql, useQuery } from '@apollo/client'
import {
  findEssayToGradeByIdVariables,
  findEssayToGradeById,
} from '../../../../../../schemaTypes'
import { useGradeEssayContextProvider } from './GradeEssayContext'
import { TeacherEssayEditor } from './TeacherEssayEditor'
import { GradingTool } from './grading-tool/GradingTool'
import { ReturnEssay } from './ReturnEssay'

export type GradeEssayProps = {}

export const FIND_ESSAY_TO_GRADE_QUERY = gql`
  query findEssayToGradeById($input: FindEssayByIdInput!) {
    findEssayById(input: $input) {
      essay {
        _id
        assigned
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
            rubricEntries {
              entry
              score
              rubricSection
              rubricWritingLevels
            }
          }
        }
      }
    }
  }
`

export const GradeEssay: FC<GradeEssayProps> = () => {
  const [state, event] = useGradeEssayContextProvider()
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
      event({
        type: 'SET_WRITING_LEVEL',
        payload: data.findEssayById.essay.topic.writingLevel,
      })
      event({
        type: 'SET_DRAFT_TO_RETURN',
        payload:
          data.findEssayById.essay.finalDraft?.submittedFinalDraft.gradingDraft,
      })
      event({ type: 'NEXT' })
    },
    onError: (error) => console.error(error),
  })
  if (loading) return <div>Loading </div>

  return (
    <>
      {data?.findEssayById.essay.finalDraft && (
        <>
          <div>{data?.findEssayById.essay.hasOwner.firstName}</div>
          <TeacherEssayEditor essay={data?.findEssayById.essay!} />
          <GradingTool />
          <ReturnEssay />
        </>
      )}
    </>
  )
}
