import React, { FC, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'

import { useQuery, gql } from '@apollo/client'
import {
  findCompletedEssayByIdVariables,
  findCompletedEssayById,
  SubmittedFinalDraftsInput,
  me_me_Student,
  SchoolDayLengthEnum,
  findCurrentSchoolDay,
  findCurrentSchoolDayVariables,
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
import { useTime } from '../../../../../../hooks/useTime'
import { timeFinder } from '../../../../../../utils'
import { useUserContextProvider } from '../../../../../../contexts/UserContext'
import { useSchoolDayContextProvider } from '../../../../school-day/state/SchoolDayContext'
import { FIND_CURRENT_SCHOOL_DAY_QUERY } from '../../../../school-day/SchoolDay'
import { useAssignmentsAllowedInClassCheck } from '../../../../../../hooks/useAssignmentsAllowedInClassCheck'
import { useClassTimeIndicator } from '../../../../../../hooks/useClassTimeIndicator'

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

export const CompletedEssay = ({}: CompletedEssayProps) => {
  const { completedEssay } = useParams()
  const me: me_me_Student = useUserContextProvider()
  const navigate = useNavigate()
  const [state, event] = useCompletedEssayContextProvider()
  const [currentSchoolDayState] = useSchoolDayContextProvider()
  const { dateTime } = useTime()
  const { classTime } = useClassTimeIndicator(me)
  const { loading, data } = useQuery<
    findCompletedEssayById,
    findCompletedEssayByIdVariables
  >(FIND_COMPLETED_ESSSAY_BY_ID_QUERY, {
    variables: {
      input: { _id: completedEssay! },
    },
    onCompleted: (data) => {
      event({
        type: 'SET_WRITING_LEVEL',
        payload: data.findEssayById.essay.topic.writingLevel,
      })
      event({ type: 'SET_ESSAY_ID', payload: data.findEssayById.essay._id! })
      event({
        type: 'SET_DRAFT_NUMBER',
        payload:
          data.findEssayById.essay.finalDraft?.submittedFinalDraft[
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

  const waysToImprove: (string | null)[] =
    data?.findEssayById.essay.finalDraft?.submittedFinalDraft[
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
  const { data: schoolDayData } = useQuery<
    findCurrentSchoolDay,
    findCurrentSchoolDayVariables
  >(FIND_CURRENT_SCHOOL_DAY_QUERY, {
    variables: {
      input: { date: '12/14/2021' },
    },
    onCompleted: (data) => console.log(data),
    onError: (error) => console.error(error),
  })
  const schoolDay = schoolDayData?.findSchoolDayByDate.schoolDay !== null

  const gradePercent =
    data?.findEssayById.essay.score.earnedPoints! /
    data?.findEssayById.essay.score.maxPoints!

  const { assignmentsAllowedInClass } = useAssignmentsAllowedInClassCheck(me)

  const { schoolDayLength } = currentSchoolDayState.context.currentSchoolDay
  const isAbsent =
    me.hasAbsences?.length > 0 &&
    me.hasAbsences?.find((a) => a.dayAbsent === new Date().toLocaleDateString())

  const classworkLocked =
    classTime &&
    !assignmentsAllowedInClass &&
    !isAbsent &&
    me.hasAssignmentsLocked

  useEffect(() => {
    if (classTime && !assignmentsAllowedInClass && state.matches('redoEssay')) {
      navigate('/dashboard/assignments')
    }
  }, [classTime, navigate, assignmentsAllowedInClass])

  if (loading) return <div>Loading </div>
  console.log(classworkLocked)

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
            {data?.findEssayById.essay.score.maxPoints} (
            {(gradePercent * 100).toFixed(1)}%)
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
            {state.matches('reviewEssay') && !classTime && (
              <CompletedEssayControlButton
                onClick={() => {
                  event({ type: 'NEXT' })
                }}
              >
                Redo Essay
              </CompletedEssayControlButton>
            )}
            {state.matches('reviewEssay') && !classworkLocked ? (
              <CompletedEssayControlButton
                onClick={() => {
                  event({ type: 'NEXT' })
                }}
              >
                Redo Essay
              </CompletedEssayControlButton>
            ) : (
              <CompletedEssayControlButton>
                You Can't Redo Essays During Class
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
