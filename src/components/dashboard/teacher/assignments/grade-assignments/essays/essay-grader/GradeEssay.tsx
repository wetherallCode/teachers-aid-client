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
        workingDraft {
          organizer {
            ... on DevelopingOrganizer {
              restatement
              developingSentenceStructure {
                subject
                verb
              }
              basicQuestionType
              answer
              conclusion
            }
            ... on AcademicOrganizer {
              academicSentenceStructure {
                subject
                verb
                object
              }
              questionType
              answerType {
                ... on HowCauseEffectAnswerType {
                  before
                  cause
                  after
                }
                ... on ProblemSolutionAnswerType {
                  problem
                  reasonForProblem
                  solvedBy
                  whySolutionSolved
                }
                ... on WhyCauseEffectAnswerType {
                  ultimateCause
                  proximateCause
                }
              }
              restatement
              conclusion
            }
            ... on AdvancedOrganizer {
              advancedSentenceStructure {
                subject
                verb
                object
              }
              questionType
              answerType {
                ... on HowCauseEffectAnswerType {
                  before
                  cause
                  after
                }
                ... on ProblemSolutionAnswerType {
                  problem
                  reasonForProblem
                  solvedBy
                  whySolutionSolved
                }
                ... on WhyCauseEffectAnswerType {
                  ultimateCause
                  proximateCause
                }
              }
              restatement
              conclusion
            }
          }
        }
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
              entry
              score
              rubricSection
              howToImprove
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

      data.findEssayById.essay.finalDraft?.submittedFinalDraft !== undefined &&
        data.findEssayById.essay.finalDraft?.submittedFinalDraft.length > 1 &&
        event({
          type: 'SET_PREVIOUS_RUBRIC_ENTRIES',
          payload: data.findEssayById.essay.finalDraft?.submittedFinalDraft[
            data.findEssayById.essay.finalDraft.submittedFinalDraft.length - 2
          ].rubricEntries!,
        })

      const previousComments = data.findEssayById.essay.finalDraft?.submittedFinalDraft.map(
        (draft) => draft.additionalComments
      )
      console.log(previousComments && previousComments)
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
          <div>
            {data?.findEssayById.essay.hasOwner.lastName},{' '}
            {data?.findEssayById.essay.hasOwner.firstName}
          </div>
          <div>{data?.findEssayById.essay.topic.question}</div>
          <DraftSelector essay={data?.findEssayById.essay!} />
          <TeacherEssayEditor />
          <GradingTool
            organizer={data?.findEssayById.essay.workingDraft.organizer!}
          />

          <ReturnEssay essay={data?.findEssayById.essay!} />
        </>
      )}
    </>
  )
}
