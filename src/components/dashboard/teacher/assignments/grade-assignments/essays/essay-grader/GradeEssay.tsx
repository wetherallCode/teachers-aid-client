import React, { FC, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { gql, useQuery } from '@apollo/client'
import {
  findEssayToGradeByIdVariables,
  findEssayToGradeById,
} from '../../../../../../../schemaTypes'
import { useGradeEssayContextProvider } from './state-n-styles/GradeEssayContext'
import { TeacherEssayEditor } from './TeacherEssayEditor'
import { GradingTool } from './grading-tool/GradingTool'
import { ReturnEssay } from './ReturnEssay'
import { DraftSelector } from './DraftSelector'
import {
  EditorToolBar,
  EditorToolBarTitle,
  EssayGraderContainer,
  EssayScreen,
  GoBackButton,
  NameAndAssignmentContainer,
  NameContainer,
  OrganizerForEssayToGradeContainer,
  ReturnEssayContainer,
  GradeDetailsContainer,
  GradeDetailsSelectorContainer,
  GradeDetailsSelector,
} from './state-n-styles/EssaysToGradeStyles'
import { OrganizerContainer } from '../../../../../student/assignments/essays/assigned-essays/state-and-styles/assignedEssayStyles'
import { PreviousEssayViewer } from './PreviousEssayViewer'
import { EssayToGradeOrganizer } from './EssayToGradeOrganizer'

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
        readings {
          readingPages
          readingSections
        }
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
          submitTime
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
  const [state, event] = useGradeEssayContextProvider()
  const [loadingDraft, setloadingDraft] = useState(false)
  const [gradeDetailState, setGradeDetailState] = useState<
    'score' | 'rubric' | 'comments'
  >('score')

  const { loading, data } = useQuery<
    findEssayToGradeById,
    findEssayToGradeByIdVariables
  >(FIND_ESSAY_TO_GRADE_QUERY, {
    variables: {
      input: { _id: essayId! },
    },
    // fetchPolicy: 'network-only',
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

      if (
        data.findEssayById.essay.finalDraft?.submittedFinalDraft[
          data.findEssayById.essay.finalDraft.submittedFinalDraft.length - 2
        ]
      ) {
        const previousDraft =
          data.findEssayById.essay.finalDraft?.submittedFinalDraft[
            data.findEssayById.essay.finalDraft.submittedFinalDraft.length - 2
          ]

        event({
          type: 'SET_PREVIOUS_DRAFT',
          payload: {
            _id: data.findEssayById.essay._id!,
            draftNumber: previousDraft?.draftNumber!,
            gradingDraft: previousDraft?.gradingDraft,
            rubricEntries: previousDraft?.rubricEntries!,
            score: previousDraft?.score!,
            additionalComments: previousDraft?.additionalComments,
          },
        })
      }

      event({ type: 'SET_ESSAY_ID', payload: data.findEssayById.essay._id! })

      if (
        data.findEssayById.essay.finalDraft?.submittedFinalDraft.length! > 1
      ) {
        event({
          type: 'SET_DRAFT_SELECTOR',
          payload:
            data.findEssayById.essay.finalDraft?.submittedFinalDraft.length! -
            2,
        })
      } else {
        event({
          type: 'SET_DRAFT_SELECTOR',
          payload:
            data.findEssayById.essay.finalDraft?.submittedFinalDraft.length! -
            1,
        })
      }

      data.findEssayById.essay.finalDraft?.submittedFinalDraft !== undefined &&
        data.findEssayById.essay.finalDraft?.submittedFinalDraft.length > 1 &&
        event({
          type: 'SET_PREVIOUS_RUBRIC_ENTRIES',
          payload:
            data.findEssayById.essay.finalDraft?.submittedFinalDraft[
              data.findEssayById.essay.finalDraft.submittedFinalDraft.length - 2
            ].rubricEntries!,
        })

      const previousComments =
        data.findEssayById.essay.finalDraft?.submittedFinalDraft.map(
          (draft) => draft.additionalComments
        )

      setloadingDraft(true)
    },
    onError: (error) => console.error(error),
  })

  if (loading) return <div>Loading </div>
  console.log(state.context.previousDraft.additionalComments)
  return (
    <EssayGraderContainer>
      {loadingDraft && (
        <>
          <EssayScreen>
            <GoBackButton
              onClick={() => navigate('/dashboard/assignments/grade')}
            >
              &larr; Back
            </GoBackButton>

            <DraftSelector essay={data?.findEssayById.essay!} />

            {data?.findEssayById.essay.finalDraft?.submittedFinalDraft[
              data?.findEssayById.essay.finalDraft.submittedFinalDraft.length -
                2
            ] ? (
              <>
                {state.context.organizerToggle ? (
                  <OrganizerForEssayToGradeContainer>
                    <EssayToGradeOrganizer
                      organizer={
                        data?.findEssayById.essay.workingDraft.organizer!
                      }
                    />
                  </OrganizerForEssayToGradeContainer>
                ) : (
                  <PreviousEssayViewer />
                )}
              </>
            ) : (
              <OrganizerForEssayToGradeContainer>
                <EssayToGradeOrganizer
                  organizer={data?.findEssayById.essay.workingDraft.organizer!}
                />
              </OrganizerForEssayToGradeContainer>
            )}
            <TeacherEssayEditor />
            <EditorToolBar>
              <EditorToolBarTitle>Editor Tools</EditorToolBarTitle>
              <button
                onClick={() =>
                  event({ type: 'CHANGE_EDIT_COLOR', payload: 'red' })
                }
              >
                Edit
              </button>
            </EditorToolBar>
          </EssayScreen>
          <NameContainer>
            <NameAndAssignmentContainer>
              <div>
                {data?.findEssayById.essay.hasOwner.lastName},{' '}
                {data?.findEssayById.essay.hasOwner.firstName}
              </div>
              <div>{data?.findEssayById.essay.topic.question}</div>
              <div>
                <span>
                  Pages {data?.findEssayById.essay.readings.readingPages}:
                </span>{' '}
                <span>
                  {data?.findEssayById.essay.readings.readingSections}
                </span>
              </div>
            </NameAndAssignmentContainer>
            <ReturnEssayContainer>
              <ReturnEssay essay={data?.findEssayById.essay!} />
            </ReturnEssayContainer>
            <GradeDetailsContainer>
              <GradeDetailsSelectorContainer>
                <GradeDetailsSelector
                  selected={gradeDetailState === 'score'}
                  onClick={() => setGradeDetailState('score')}
                >
                  Score
                </GradeDetailsSelector>
                <GradeDetailsSelector
                  selected={gradeDetailState === 'rubric'}
                  onClick={() => setGradeDetailState('rubric')}
                >
                  Rubric
                </GradeDetailsSelector>
                <GradeDetailsSelector
                  selected={gradeDetailState === 'comments'}
                  onClick={() => setGradeDetailState('comments')}
                >
                  Comments
                </GradeDetailsSelector>
              </GradeDetailsSelectorContainer>
              {gradeDetailState === 'score' && (
                <div>{state.context.draftToGrade.score}</div>
              )}
              {gradeDetailState === 'rubric' && (
                <div>
                  {state.context.previousRubricEntries.map(
                    (entry, i: number) => (
                      <div key={i}>{entry.entry}</div>
                    )
                  )}
                </div>
              )}
              {gradeDetailState === 'comments' && (
                <div>
                  {state.context.previousDraft.additionalComments?.map(
                    (comment, i: number) => (
                      <span key={i}>{comment}</span>
                    )
                  )}
                </div>
              )}
            </GradeDetailsContainer>
          </NameContainer>
          <GradingTool
            organizer={data?.findEssayById.essay.workingDraft.organizer!}
          />
        </>
      )}
    </EssayGraderContainer>
  )
}
