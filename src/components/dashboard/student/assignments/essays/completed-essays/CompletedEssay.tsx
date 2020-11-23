import React, { FC } from 'react'
import { useParams, useNavigate } from 'react-router'

import { useQuery, gql } from '@apollo/client'
import {
  findCompletedEssayByIdVariables,
  findCompletedEssayById,
  SubmittedFinalDraftsInput,
} from '../../../../../../schemaTypes'
import { useCompletedEssayContextProvider } from './state/CompletedEssayContext'

import { MultipleDraftView } from './MultipleDraftView'
import {
  EssayContainer,
  AssignmentDetailsContainer,
  AssignmentDetailsGoBackButton,
  EssayInfoContainer,
  SubmitEssayContainer,
  AssignmentDetailsReadingInfo,
  EssaySubmitButton,
  OrganizerContainer,
} from '../assigned-essays/state-and-styles/assignedEssayStyles'
import {
  EssayViewContainer,
  CompletedEssayDetailsContainer,
  CompletedEssayDetailsPartContainers,
  EssayRedoButtonContainer,
  CompletedEssayControlButton,
} from './state/completedEssayStyles'
import { HowToImprove } from './HowToImprove'
import { SubmitRedoneEssay } from './SubmitRedoneEssay'
import { RedoEssayOrganizerHelp } from './RedoEssayOrganizerHelp'
import { RedoEssayOrganizer } from './organizers/RedoEssayOrganizer'

export const FIND_COMPLETED_ESSSAY_BY_ID_QUERY = gql`
  query findCompletedEssayById($input: FindEssayByIdInput!) {
    findEssayById(input: $input) {
      essay {
        _id
        topic {
          question
          writingLevel
        }
        readings {
          readingPages
          readingSections
        }
        score {
          maxPoints
          earnedPoints
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
      event({
        type: 'SET_DRAFT',
        payload: data.findEssayById.essay.workingDraft.draft,
      })
    },
    pollInterval: 15000,
    onError: (error) => console.error(error),
  })

  const waysToImprove: (
    | string
    | null
  )[] = data?.findEssayById.essay.finalDraft?.submittedFinalDraft[
    data.findEssayById.essay.finalDraft.submittedFinalDraft.length - 1
  ].rubricEntries.map((entry) => entry.howToImprove)!

  const submittedFinalDraft: SubmittedFinalDraftsInput = {
    draftNumber: state.context.draftNumber + 1,
    draft: state.context.draftToUpdate,
    gradingDraft: state.context.draftToUpdate,
    rubricEntries: [],
    additionalComments: [],
    score: 0,
    graded: false,
  }

  if (loading) return <div>Loading </div>
  const gradePercent =
    data?.findEssayById.essay.score.earnedPoints! /
    data?.findEssayById.essay.score.maxPoints!

  return (
    <EssayContainer>
      <CompletedEssayDetailsContainer>
        <CompletedEssayDetailsPartContainers>
          <AssignmentDetailsReadingInfo>
            Read pages {data?.findEssayById.essay.readings.readingPages}:{' '}
            {data?.findEssayById.essay.readings.readingSections}
          </AssignmentDetailsReadingInfo>
        </CompletedEssayDetailsPartContainers>
        <CompletedEssayDetailsPartContainers>
          <AssignmentDetailsReadingInfo>
            Overall Score: {data?.findEssayById.essay.score.earnedPoints} /{' '}
            {data?.findEssayById.essay.score.maxPoints} ({gradePercent * 100}%)
          </AssignmentDetailsReadingInfo>
        </CompletedEssayDetailsPartContainers>
        <CompletedEssayDetailsPartContainers>
          <AssignmentDetailsGoBackButton
            onClick={() => navigate('/dashboard/assignments')}
          >
            Back to Assignments
          </AssignmentDetailsGoBackButton>
          {state.matches('redoEssay') && (
            <AssignmentDetailsGoBackButton
              onClick={() => event({ type: 'ORGANIZER' })}
            >
              Change Organizer
            </AssignmentDetailsGoBackButton>
          )}
        </CompletedEssayDetailsPartContainers>
      </CompletedEssayDetailsContainer>

      {(state.matches('reviewEssay') || state.matches('redoEssay')) && (
        <EssayViewContainer>
          <MultipleDraftView essay={data?.findEssayById.essay!} />

          <EssayRedoButtonContainer>
            {state.matches('reviewEssay') && (
              <CompletedEssayControlButton
                onClick={() => {
                  event({ type: 'NEXT' })
                }}
              >
                Redo Essay
              </CompletedEssayControlButton>
            )}
            {state.matches('redoEssay') && (
              <SubmitRedoneEssay
                _id={state.context.essayId}
                submittedFinalDraft={submittedFinalDraft}
              />
            )}
          </EssayRedoButtonContainer>
        </EssayViewContainer>
      )}

      {state.matches('reviewOrganizer') && (
        <OrganizerContainer>
          <RedoEssayOrganizer essay={data?.findEssayById.essay!} />
        </OrganizerContainer>
      )}
      <EssayInfoContainer>
        {/* {state.matches('redoEssay') && ( */}
        {!state.matches('reviewOrganizer') && (
          <HowToImprove waysToImprove={waysToImprove} />
        )}
        {/* )} */}
        {state.matches('reviewOrganizer') && <RedoEssayOrganizerHelp />}
      </EssayInfoContainer>
    </EssayContainer>
  )
}
