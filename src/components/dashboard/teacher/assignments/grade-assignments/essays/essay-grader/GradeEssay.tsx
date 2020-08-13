import React, { FC, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { gql, useQuery } from '@apollo/client'
import {
  findEssayToGradeByIdVariables,
  findEssayToGradeById,
} from '../../../../../../../schemaTypes'
import { useGradeEssayContextProvider } from './GradeEssayContext'
import { TeacherEssayEditor } from './TeacherEssayEditor'
import { GradingTool } from './grading-tool/GradingTool'
import { ReturnEssay } from './ReturnEssay'
import { DraftSelector } from './DraftSelector'

export type GradeEssayProps = {}

export const FIND_ESSAY_TO_GRADE_QUERY = gql`
  query findEssayToGradeById($input: FindEssayByIdInput!) {
    findEssayById(input: $input) {
      essay {
        _id
        assigned
        hasOwner {
          _id
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
          submitted
          returned
          submittedFinalDraft {
            draft
            gradingDraft
            draftNumber
            score
            additionalComments
            rubricEntries {
              _id
              entry
              score
              rubricSection
            }
          }
        }
      }
    }
  }
`

export const GradeEssay: FC<GradeEssayProps> = () => {
  const { essayId } = useParams()
  const navigate = useNavigate()

  const [, event] = useGradeEssayContextProvider()
  const [loadingDraft, setloadingDraft] = useState(false)
  const { loading, data } = useQuery<
    findEssayToGradeById,
    findEssayToGradeByIdVariables
  >(FIND_ESSAY_TO_GRADE_QUERY, {
    variables: {
      input: { _id: essayId },
    },
    onCompleted: (data) => {
      const lastSubmittedDraft =
        data.findEssayById.essay.finalDraft?.submittedFinalDraft[
          data.findEssayById.essay.finalDraft.submittedFinalDraft.length - 1
        ]
      event({
        type: 'SET_INTITIAL_DRAFT',
        payload: {
          writingLevel: data.findEssayById.essay.topic.writingLevel,
          draftToGrade: {
            _id: data.findEssayById.essay._id!,
            draftNumber: lastSubmittedDraft?.draftNumber!,
            gradingDraft: lastSubmittedDraft?.gradingDraft,
            rubricEntries: lastSubmittedDraft?.rubricEntries!,
            score: lastSubmittedDraft?.score!,
            additionalComments: lastSubmittedDraft?.additionalComments,
          },
        },
      })
      event({ type: 'SET_ESSAY_ID', payload: data.findEssayById.essay._id! })

      event({
        type: 'SET_DRAFT_SELECTOR',
        payload:
          data.findEssayById.essay.finalDraft?.submittedFinalDraft.length! - 1,
      })
      setloadingDraft(true)
    },
    onError: (error) => console.error(error),
  })
  if (loading) return <div>Loading </div>

  return (
    <>
      <button onClick={() => navigate('/dashboard/assignments/grade')}>
        Back
      </button>
      {loadingDraft && (
        <>
          <DraftSelector essay={data?.findEssayById.essay!} />
          <TeacherEssayEditor />
          <GradingTool />
          <ReturnEssay essay={data?.findEssayById.essay!} />
        </>
      )}
    </>
  )
}
