import React, { FC, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { gql, useQuery, MutationFunctionOptions } from '@apollo/client'
import { StudentEssayEditor } from './StudentEssayEditor'

import {
  findEssayById,
  findEssayByIdVariables,
  UpdateWorkingDraft,
  UpdateWorkingDraftVariables,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  WritingLevelEnum,
  findEssayById_findEssayById_essay_workingDraft_organizer,
  findEssayById_findEssayById_essay_workingDraft_organizer_DevelopingOrganizer,
  findEssayById_findEssayById_essay_workingDraft_organizer_AcademicOrganizer,
  findEssayById_findEssayById_essay_workingDraft_organizer_AdvancedOrganizer,
  findEssayById_findEssayById_essay_workingDraft_organizer_AcademicOrganizer_answerType,
  findEssayById_findEssayById_essay_workingDraft_organizer_AdvancedOrganizer_answerType,
  SubmittedFinalDraftsInput,
} from '../../../../../../schemaTypes'
import { useStudentEssayContextProvider } from './StudentEssayContext'
import { OrganizerInfo } from './organizers/OrganizerInfo'

export type EssayToCompleteProps = {}

export const FIND_ESSAY_BY_ID_QUERY = gql`
  query findEssayById($input: FindEssayByIdInput!) {
    findEssayById(input: $input) {
      essay {
        _id
        workingDraft {
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
          draft
        }
        readings {
          readingPages
          readingSections
        }
        dueDate
        dueTime
        topic {
          question
          questionType
          writingLevel
        }
      }
    }
  }
`

export const UPDATE_WORKING_DRAFT_MUTATION = gql`
  mutation UpdateWorkingDraft($input: UpdateWorkingDraftInput!) {
    updateWorkingDraft(input: $input) {
      essay {
        workingDraft {
          draft
        }
      }
    }
  }
`

export type updateWorkingDraftType = (
  options?:
    | MutationFunctionOptions<UpdateWorkingDraft, UpdateWorkingDraftVariables>
    | undefined
) => void

export const EssayToComplete: FC<EssayToCompleteProps> = () => {
  const params = useParams()
  const { essayToComplete } = params

  const navigate = useNavigate()

  const [state, event] = useStudentEssayContextProvider()

  useEffect(() => {
    event({ type: 'SET_ESSAY_ID', payload: essayToComplete })
  }, [essayToComplete, event])

  const { loading, data } = useQuery<findEssayById, findEssayByIdVariables>(
    FIND_ESSAY_BY_ID_QUERY,
    {
      variables: {
        input: { _id: essayToComplete },
      },
      onCompleted: (data) => {
        event({
          type: 'SET_WRITING_LEVEL',
          payload: data.findEssayById.essay.topic.writingLevel,
        })
        event({ type: 'ORGANIZER' })

        if (
          data.findEssayById.essay.workingDraft.organizer?.__typename ===
          'DevelopingOrganizer'
        ) {
          const organizer: findEssayById_findEssayById_essay_workingDraft_organizer_DevelopingOrganizer =
            data.findEssayById.essay.workingDraft.organizer
          event({
            type: 'SET_DEVELOPING_SENTENCE_STRUCTURE',
            payload: {
              subject: organizer!.developingSentenceStructure.subject,
              verb: organizer.developingSentenceStructure.verb,
            },
          })
          event({
            type: 'SET_BASIC_QUESTION_TYPE',
            payload: organizer.basicQuestionType!,
          })
          event({ type: 'SET_RESTATEMENT', payload: organizer.restatement })
          event({ type: 'SET_ANSWER', payload: organizer.answer })
          event({ type: 'SET_CONCLUSION', payload: organizer.conclusion })
        }
        // preloading all the parts of the Academic Organizer with preanswered information
        if (
          data.findEssayById.essay.workingDraft.organizer?.__typename ===
          'AcademicOrganizer'
        ) {
          const organizer: findEssayById_findEssayById_essay_workingDraft_organizer_AcademicOrganizer =
            data.findEssayById.essay.workingDraft.organizer

          const answerTypes: findEssayById_findEssayById_essay_workingDraft_organizer_AcademicOrganizer_answerType = organizer.answerType!

          event({
            type: 'SET_ACADEMIC_SENTENCE_STRUCTURE',
            payload: {
              subject: organizer.academicSentenceStructure.subject,
              verb: organizer.academicSentenceStructure.verb,
              object: organizer.academicSentenceStructure.object,
            },
          })
          event({ type: 'SET_RESTATEMENT', payload: organizer.restatement })
          if (organizer.questionType) {
            event({
              type: 'SET_FULL_QUESTION_TYPE',
              payload: organizer.questionType,
            })
            event({ type: 'SET_PRE_LOADED', payload: true })
            if (answerTypes.__typename === 'ProblemSolutionAnswerType') {
              const type = answerTypes
              event({
                type: 'SET_PROBLEM_SOLUTION',
                payload: {
                  problem: type.problem,
                  reasonForProblem: type.reasonForProblem,
                  solvedBy: type.solvedBy,
                  whySolutionSolved: type.whySolutionSolved,
                },
              })
            }
            if (answerTypes.__typename === 'HowCauseEffectAnswerType') {
              const type = answerTypes
              event({
                type: 'SET_HOW_CAUSE_EFFECT',
                payload: {
                  before: type.before,
                  cause: type.cause,
                  after: type.after,
                },
              })
            }
            if (answerTypes.__typename === 'WhyCauseEffectAnswerType') {
              const type = answerTypes
              event({
                type: 'SET_WHY_CAUSE_EFFECT',
                payload: {
                  ultimateCause: type.ultimateCause,
                  proximateCause: type.proximateCause,
                },
              })
            }
          }
          event({ type: 'SET_CONCLUSION', payload: organizer.conclusion })
        }
        if (
          data.findEssayById.essay.workingDraft.organizer?.__typename ===
          'AdvancedOrganizer'
        ) {
          const organizer: findEssayById_findEssayById_essay_workingDraft_organizer_AdvancedOrganizer =
            data.findEssayById.essay.workingDraft.organizer

          const answerTypes: findEssayById_findEssayById_essay_workingDraft_organizer_AdvancedOrganizer_answerType = organizer.answerType!

          event({
            type: 'SET_ADVANCED_SENTENCE_STRUCTURE',
            payload: {
              subject: organizer.advancedSentenceStructure.subject,
              verb: organizer.advancedSentenceStructure.verb,
              object: organizer.advancedSentenceStructure.object,
            },
          })
          event({ type: 'SET_RESTATEMENT', payload: organizer.restatement })
          if (organizer.questionType) {
            event({
              type: 'SET_FULL_QUESTION_TYPE',
              payload: organizer.questionType,
            })
            event({ type: 'SET_PRE_LOADED', payload: true })
            if (answerTypes.__typename === 'ProblemSolutionAnswerType') {
              const type = answerTypes
              event({
                type: 'SET_PROBLEM_SOLUTION',
                payload: {
                  problem: type.problem,
                  reasonForProblem: type.reasonForProblem,
                  solvedBy: type.solvedBy,
                  whySolutionSolved: type.whySolutionSolved,
                },
              })
            }
            if (answerTypes.__typename === 'HowCauseEffectAnswerType') {
              const type = answerTypes
              event({
                type: 'SET_HOW_CAUSE_EFFECT',
                payload: {
                  before: type.before,
                  cause: type.cause,
                  after: type.after,
                },
              })
            }
            if (answerTypes.__typename === 'WhyCauseEffectAnswerType') {
              const type = answerTypes
              event({
                type: 'SET_WHY_CAUSE_EFFECT',
                payload: {
                  ultimateCause: type.ultimateCause,
                  proximateCause: type.proximateCause,
                },
              })
            }
          }
          event({ type: 'SET_CONCLUSION', payload: organizer.conclusion })
        }
        event({ type: 'NEXT' })
      },
      onError: (error) => console.error(error),
    }
  )
  if (loading) return <div>Loading </div>

  const organizer = data?.findEssayById.essay.workingDraft
    .organizer as findEssayById_findEssayById_essay_workingDraft_organizer

  const submittedFinalDraft: SubmittedFinalDraftsInput = {
    draftNumber: 0, //Because this component will always be the first draft
    draft: state.context.draftToUpdate,
    gradingDraft: state.context.draftToUpdate,
    rubricEntries: [],
    additionalComments: [],
    score: 0,
    graded: false,
  }

  return (
    <>
      <button onClick={() => navigate('/dashboard/assignments')}>Back</button>
      <div>{data?.findEssayById.essay.readings.readingSections}</div>
      {data?.findEssayById.essay ? (
        <>
          {state.matches('organizers') && (
            <OrganizerInfo
              organizer={organizer}
              question={data.findEssayById.essay.topic.question}
            />
          )}
          {state.matches('workingDraft') && (
            <>
              <StudentEssayEditor
                essay={data?.findEssayById.essay!}
                submittedFinalDraft={submittedFinalDraft}
              />
              <div>Rubric</div>
            </>
          )}
        </>
      ) : (
        <div>No Essay</div>
      )}
    </>
  )
}
