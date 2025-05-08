import { gql, useMutation, useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { useEnumContextProvider } from '../../../../../contexts/EnumContext'
import {
  MarkingPeriodContextProvider,
  useMarkingPeriodContextProvider,
} from '../../../../../contexts/markingPeriod/MarkingPeriodContext'
import {
  findAssignmentByStudentId,
  findAssignmentByStudentIdVariables,
  findAssignmentByStudentId_findAssignmentByStudentId_assignments_Quiz,
  MarkingPeriodEnum,
  createHomeworkPass,
  createHomeworkPassVariables,
  undoHomeworkPassVariables,
  undoHomeworkPass,
} from '../../../../../schemaTypes'
import { SGOInfo } from '../sgo-info/SGOInfo'
import { useStudentInformationContextProvider } from '../state-n-styles/StudentInformationContext'
import {
  AssignmentInformationAssignmentSwitchContainer,
  AssignmentInformationContainer,
  AssignmentInformationContainerHeader,
  AssignmentInformationDisplayContainer,
  AssignmentInformationStyle,
  AssignmentSwitch,
  IndividualAssignmentDisplay,
} from '../state-n-styles/studentInformationStyles'
import { QuizInfo } from './QuizInfo'

export type AssignmentInformationProps = {
  studentId: string
  selectedMarkingPeriod: MarkingPeriodEnum
}

export const FIND_ASSINGMENT_INFORMATION_QUERY = gql`
  query findAssignmentByStudentId($input: FindAssignmentByStudentIdInput!) {
    findAssignmentByStudentId(input: $input) {
      assignments {
        _id
        assigned
        readings {
          readingSections
        }
        score {
          earnedPoints
          maxPoints
        }
        exempt
        dueDate
        dueTime
        assignedDate
        gradeType
        hasOwner {
          _id
          firstName
          lastName
        }
        markingPeriod
        ... on Essay {
          finalDraft {
            returned
            submitted
            submittedFinalDraft {
              graded
              rubricEntries {
                rubricSection
                score
              }
            }
          }
        }
        ... on ReadingGuide {
          completed
          graded
          readingGuideFinal {
            submitted
          }
        }
        ... on Quiz {
          finishedQuiz
          isActive
          startedQuiz
          finishedQuiz
        }
      }
      articleReviews {
        _id
        score {
          earnedPoints
          maxPoints
        }
        assignedDate
        exempt
        submitted
        markingPeriod
        dueDate
        dueTime
      }
    }
  }
`
export const CREATE_HOME_WORK_PASS = gql`
  mutation createHomeworkPass($input: HomeworkPassInput!) {
    homeworkPass(input: $input) {
      success
    }
  }
`

export const UNDO_HOMEWORK_PASS = gql`
  mutation undoHomeworkPass($input: UndoHomeworkPassInput!) {
    undoHomeworkPass(input: $input) {
      success
    }
  }
`

export const AssignmentInformation = ({
  studentId,
  selectedMarkingPeriod,
}: AssignmentInformationProps) => {
  const [state, event] = useStudentInformationContextProvider()
  const { loading, data } = useQuery<
    findAssignmentByStudentId,
    findAssignmentByStudentIdVariables
  >(FIND_ASSINGMENT_INFORMATION_QUERY, {
    variables: {
      input: { studentId },
    },
    // onCompleted: (data) => console.log(data),
    pollInterval: 5000,
    onError: (error) => console.error(error),
  })
  const [createHomeworkPass] = useMutation<
    createHomeworkPass,
    createHomeworkPassVariables
  >(CREATE_HOME_WORK_PASS, {
    onCompleted: (data) => console.log(data),
    refetchQueries: ['findAssignmentByStudentId'],
  })

  const [undoHomeworkPass] = useMutation<
    undoHomeworkPass,
    undoHomeworkPassVariables
  >(UNDO_HOMEWORK_PASS, {
    onCompleted: (data) => console.log(data),
    refetchQueries: ['findAssignmentByStudentId'],
  })

  const essays = data?.findAssignmentByStudentId.assignments.filter(
    (assignment) =>
      assignment.__typename === 'Essay' &&
      assignment.markingPeriod === selectedMarkingPeriod,
  )!
  const readingGuides = data?.findAssignmentByStudentId.assignments.filter(
    (assignment) =>
      assignment.__typename === 'ReadingGuide' &&
      assignment.markingPeriod === selectedMarkingPeriod,
  )!
  const quizzes = data?.findAssignmentByStudentId.assignments.filter(
    (assignment) =>
      assignment.__typename === 'Quiz' &&
      assignment.markingPeriod === selectedMarkingPeriod,
  )! as findAssignmentByStudentId_findAssignmentByStudentId_assignments_Quiz[]

  const textAnalyses = data?.findAssignmentByStudentId.assignments.filter(
    (assignment) =>
      assignment.__typename === 'TextAnalysis' &&
      assignment.markingPeriod === selectedMarkingPeriod,
  )!

  const articleReviews = data?.findAssignmentByStudentId.articleReviews.filter(
    (review) => review.markingPeriod === selectedMarkingPeriod,
  )!

  const completedEssays = data?.findAssignmentByStudentId.assignments.filter(
    (assignment) => assignment.__typename === 'Essay' && assignment.finalDraft,
  )!

  const allEssays = data?.findAssignmentByStudentId.assignments.filter(
    (assignment) =>
      (assignment.__typename === 'Essay' && assignment.finalDraft?.returned) ||
      (assignment.__typename === 'Essay' &&
        !assignment.exempt &&
        !assignment.finalDraft &&
        assignment.assigned &&
        Date.parse(new Date().toLocaleString()) >
          Date.parse(`${assignment.dueDate}, ${assignment.dueTime}`)),
  )

  const allEssaysEarnedPointTotal =
    allEssays?.length! > 0 &&
    allEssays
      ?.map((essay) => essay.score.earnedPoints)
      .reduce((acc: number, i: number) => acc + i)!

  const allEssaysMaxPointTotal =
    allEssays?.length! > 0 &&
    allEssays
      ?.map((essay) => essay.score.maxPoints)
      .reduce((acc: number, i: number) => acc + i)!

  const overallEssayScoreCalculator = (
    earnedPoints: number,
    maxPoints: number,
  ) => {
    if (earnedPoints === 0 && maxPoints === 0) {
      return 0
    }
    return (earnedPoints / maxPoints) * 4
  }

  const overallEssayScore = overallEssayScoreCalculator(
    allEssaysEarnedPointTotal ? allEssaysEarnedPointTotal : 0,
    allEssaysMaxPointTotal ? allEssaysMaxPointTotal : 0,
  )
  // console.log(state.value)
  if (loading) return <div>Loading </div>
  return (
    <AssignmentInformationContainer>
      <AssignmentInformationAssignmentSwitchContainer>
        <AssignmentSwitch
          selected={state.matches('information.assignments.essays')}
          onClick={() => event({ type: 'ESSAYS' })}
        >
          Essays
        </AssignmentSwitch>
        <AssignmentSwitch
          selected={state.matches('information.assignments.readingGuides')}
          onClick={() => event({ type: 'READING_GUIDES' })}
        >
          Reading Guides
        </AssignmentSwitch>
        <AssignmentSwitch
          selected={state.matches('information.assignments.quizzes')}
          onClick={() => event({ type: 'QUIZZES' })}
        >
          Quizzes
        </AssignmentSwitch>
        <AssignmentSwitch
          selected={state.matches('information.assignments.textAnalysis')}
          onClick={() => event({ type: 'TEXT_ANALYSIS' })}
        >
          Text Analysis
        </AssignmentSwitch>
        {/* <AssignmentSwitch
          selected={state.matches('information.assignments.sgo')}
          onClick={() => event({ type: 'SGO' })}
        >
          SGO Info
        </AssignmentSwitch> */}
        {/* <AssignmentSwitch
          selected={state.matches('information.assignments.articleReviews')}
          onClick={() => event({ type: 'ARTICLE_REVIEWS' })}
        >
          Article Reviews
        </AssignmentSwitch> */}
      </AssignmentInformationAssignmentSwitchContainer>

      <AssignmentInformationDisplayContainer>
        <AssignmentInformationContainerHeader>
          <div>Assignment Title</div>
          <div>Grade</div>
        </AssignmentInformationContainerHeader>

        {state.matches('information.assignments.essays') && (
          <AssignmentInformationStyle>
            {essays.map((essay, i: number) => (
              <IndividualAssignmentDisplay
                key={essay._id}
                everyOtherLine={i % 2 === 0}
                lastLine={essays.length - 1 === i}
              >
                <div>{essay.readings.readingSections}</div>
                {essay.__typename === 'Essay' &&
                essay.finalDraft &&
                essay.finalDraft.returned ? (
                  <div>
                    {essay.score.earnedPoints}/{essay.score.maxPoints}
                  </div>
                ) : essay.__typename === 'Essay' &&
                  essay.finalDraft &&
                  !essay.finalDraft.returned &&
                  essay.finalDraft.submittedFinalDraft.length > 1 ? (
                  <div>
                    {essay.score.earnedPoints}/{essay.score.maxPoints}
                  </div>
                ) : essay.__typename === 'Essay' &&
                  essay.finalDraft &&
                  !essay.finalDraft.returned ? (
                  <div>Pending</div>
                ) : essay.exempt ? (
                  <div>Exempt</div>
                ) : !essay.assigned ? (
                  <div>Unassigned</div>
                ) : Date.parse(new Date().toLocaleString()) <
                  Date.parse(`${essay.dueDate}, ${essay.dueTime}`) ? (
                  <div>Due on {essay.dueDate}</div>
                ) : (
                  <div>Missing</div>
                )}
                <button
                  style={{
                    background: 'var(--blue)',
                    color: 'var(--white)',
                    margin: '1vh',
                  }}
                  onClick={() => {
                    essay.assigned && !essay.exempt
                      ? createHomeworkPass({
                          variables: {
                            input: {
                              assignmentId: essay._id!,
                              assignmentType: 'ESSAY',
                              markingPeriod: essay.markingPeriod,
                              ownerId: essay.hasOwner._id!,
                            },
                          },
                        })
                      : undoHomeworkPass({
                          variables: {
                            input: {
                              assignmentId: essay._id!,
                              assignmentType: 'ESSAY',
                              markingPeriod: essay.markingPeriod,
                              ownerId: essay.hasOwner._id!,
                            },
                          },
                        })
                  }}
                >
                  {!essay.exempt ? 'Homework Pass' : 'Undo Homework Pass'}
                </button>
              </IndividualAssignmentDisplay>
            ))}
            <div>Overall Essay Score (FY): {overallEssayScore}</div>
          </AssignmentInformationStyle>
        )}
        {state.matches('information.assignments.readingGuides') && (
          <AssignmentInformationStyle>
            {readingGuides.map((guide, i: number) => (
              <IndividualAssignmentDisplay
                key={guide._id}
                everyOtherLine={i % 2 === 0}
                lastLine={readingGuides.length - 1 === i}
              >
                <div>{guide.readings.readingSections}</div>
                {guide.__typename === 'ReadingGuide' &&
                guide.readingGuideFinal &&
                guide.graded ? (
                  <div>
                    {guide.score.earnedPoints}/{guide.score.maxPoints}
                  </div>
                ) : guide.exempt ? (
                  <div>Exempt</div>
                ) : !guide.assigned ? (
                  <div>Unassigned</div>
                ) : Date.parse(new Date().toLocaleString()) <
                  Date.parse(`${guide.dueDate}, ${guide.dueTime}`) ? (
                  <div>Due on {guide.dueDate}</div>
                ) : (
                  <div>Missing</div>
                )}
                <button
                  style={{
                    background: 'var(--blue)',
                    color: 'var(--white)',
                    margin: '1vh',
                  }}
                  onClick={() => {
                    guide.assigned && !guide.exempt
                      ? createHomeworkPass({
                          variables: {
                            input: {
                              assignmentId: guide._id!,
                              assignmentType: 'READING_GUIDE',
                              markingPeriod: guide.markingPeriod,
                              ownerId: guide.hasOwner._id!,
                            },
                          },
                        })
                      : undoHomeworkPass({
                          variables: {
                            input: {
                              assignmentId: guide._id!,
                              assignmentType: 'READING_GUIDE',
                              markingPeriod: guide.markingPeriod,
                              ownerId: guide.hasOwner._id!,
                            },
                          },
                        })
                  }}
                >
                  {!guide.exempt ? 'Homework Pass' : 'Undo Homework Pass'}
                </button>
              </IndividualAssignmentDisplay>
            ))}
          </AssignmentInformationStyle>
        )}
        {state.matches('information.assignments.quizzes') && (
          <AssignmentInformationStyle>
            {quizzes.map((quiz, i: number) => (
              <div>
                <QuizInfo
                  quiz={quiz}
                  i={i}
                  numberOfQuizzesTotal={quizzes.length}
                />
                <div></div>
              </div>
            ))}
          </AssignmentInformationStyle>
        )}
        {state.matches('information.assignments.textAnalysis') && (
          <AssignmentInformationStyle>
            {textAnalyses.map((textAnalysis, i: number) => (
              <IndividualAssignmentDisplay
                key={textAnalysis._id}
                everyOtherLine={i % 2 === 0}
                lastLine={textAnalyses.length - 1 === i}
              >
                <div>{textAnalysis.readings.readingSections}</div>
                {/* {textAnalysis.__typename === 'ReadingGuide' && */}
                {/* guide.graded ? ( */}
                {textAnalysis.exempt ? (
                  <div>Exempt</div>
                ) : (
                  <div>
                    {textAnalysis.score.earnedPoints}/
                    {textAnalysis.score.maxPoints}
                  </div>
                )}
              </IndividualAssignmentDisplay>
            ))}
          </AssignmentInformationStyle>
        )}
        {state.matches('information.assignments.sgo') && (
          <SGOInfo studentId={studentId!} />
        )}
        {/* {state.matches('information.assignments.articleReviews') && (
          <AssignmentInformationStyle>
            {articleReviews.map((review, i: number) => (
              <IndividualAssignmentDisplay
                key={review._id}
                everyOtherLine={i % 2 === 0}
                lastLine={articleReviews.length - 1 === i}
              >
                <div>{review.assignedDate}</div>
                {review.submitted ? (
                  <div>
                    {review.score.earnedPoints}/{review.score.maxPoints}
                  </div>
                ) : (
                  <div>Missing</div>
                )}
              </IndividualAssignmentDisplay>
            ))}
          </AssignmentInformationStyle>
        )} */}
      </AssignmentInformationDisplayContainer>
    </AssignmentInformationContainer>
  )
}
