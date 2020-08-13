import React, { FC } from 'react'
import { useParams, useNavigate } from 'react-router'

import { useQuery, gql } from '@apollo/client'
import {
  findCompletedEssayByIdVariables,
  findCompletedEssayById,
} from '../../../../../../schemaTypes'
import { useCompletedEssayContextProvider } from './state/CompletedEssayContext'
import { EssayToRedo } from './EssayToRedo'
import { MultipleDraftView } from './MultipleDraftView'

export const FIND_COMPLETED_ESSSAY_BY_ID_QUERY = gql`
  query findCompletedEssayById($input: FindEssayByIdInput!) {
    findEssayById(input: $input) {
      essay {
        _id
        topic {
          question
          writingLevel
        }
        finalDraft {
          submittedFinalDraft {
            draft
            gradingDraft
            score
            draftNumber
            rubricEntries {
              entry
              rubricSection
              score
              howToImprove
            }
            additionalComments
          }
        }
        workingDraft {
          draft
          organizer {
            ... on DevelopingOrganizer {
              basicQuestionType
              developingSentenceStructure {
                subject
                verb
              }
              restatement
              answer
              conclusion
            }
            ... on AcademicOrganizer {
              academicSentenceStructure {
                subject
                verb
                object
              }
              restatement
              conclusion
              questionType
              answerType {
                ... on ProblemSolutionAnswerType {
                  problem
                  reasonForProblem
                  solvedBy
                  whySolutionSolved
                }
                ... on HowCauseEffectAnswerType {
                  before
                  cause
                  after
                }
                ... on WhyCauseEffectAnswerType {
                  ultimateCause
                  proximateCause
                }
              }
            }
            ... on AdvancedOrganizer {
              advancedSentenceStructure {
                subject
                verb
                object
              }
              answerType {
                ... on ProblemSolutionAnswerType {
                  problem
                  reasonForProblem
                  solvedBy
                  whySolutionSolved
                }
                ... on HowCauseEffectAnswerType {
                  before
                  cause
                  after
                }
                ... on WhyCauseEffectAnswerType {
                  ultimateCause
                  proximateCause
                }
              }
              restatement
              conclusion
              questionType
            }
          }
        }
      }
    }
  }
`

export type CompletedEssayProps = {}

export const CompletedEssay: FC<CompletedEssayProps> = () => {
  const { completedEssay } = useParams()
  const navigate = useNavigate()
  const [state, event] = useCompletedEssayContextProvider()

  const { loading, data } = useQuery<
    findCompletedEssayById,
    findCompletedEssayByIdVariables
  >(FIND_COMPLETED_ESSSAY_BY_ID_QUERY, {
    variables: {
      input: { _id: completedEssay },
    },
    onCompleted: (data) => {
      event({
        type: 'SET_WRITING_LEVEL',
        payload: data.findEssayById.essay.topic.writingLevel,
      })
      event({ type: 'SET_ESSAY_ID', payload: data.findEssayById.essay._id! })
      event({
        type: 'SET_DRAFT_NUMBER',
        payload: data.findEssayById.essay.finalDraft?.submittedFinalDraft[
          data.findEssayById.essay.finalDraft.submittedFinalDraft.length - 1
        ].draftNumber!,
      })
    },
    onError: (error) => console.error(error),
  })
  if (loading) return <div>Loading </div>
  const waysToImprove: (
    | string
    | null
  )[] = data?.findEssayById.essay.finalDraft?.submittedFinalDraft[
    data.findEssayById.essay.finalDraft.submittedFinalDraft.length - 1
  ].rubricEntries.map((entry) => entry.howToImprove)!

  return (
    <>
      <button onClick={() => navigate('/dashboard/assignments')}>Back</button>
      {state.matches('reviewEssay') && (
        <button onClick={() => event({ type: 'NEXT' })}>Redo Essay</button>
      )}
      {state.matches('redoEssay') && (
        <button onClick={() => event({ type: 'PREVIOUS' })}>Cancel</button>
      )}
      {state.matches('reviewEssay') && (
        <>
          <MultipleDraftView essay={data?.findEssayById.essay!} />
        </>
      )}
      {state.matches('redoEssay') && (
        <>
          <EssayToRedo
            essay={data?.findEssayById.essay!}
            waysToImprove={waysToImprove}
          />
        </>
      )}
    </>
  )
}
