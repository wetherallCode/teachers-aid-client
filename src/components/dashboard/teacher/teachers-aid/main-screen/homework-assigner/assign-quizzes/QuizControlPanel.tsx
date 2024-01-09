import { gql, useMutation } from '@apollo/client'
import React from 'react'
import {
  assignQuizzesByStudentIdsAndDate,
  assignQuizzesByStudentIdsAndDateVariables,
  findQuizzesForCourseByAssignedDate_findQuizzesForCourseByAssignedDate_quizzes,
  markExemptVariables,
  markExempt,
} from '../../../../../../../schemaTypes'
import { MARK_EXEMPT_MUTATION } from '../../../../../student/assignments/StudentAssignments'
import {
  AssignAllQuizzesButton,
  QuizControlPanelContainer,
  QuizNameContainer,
} from '../../../styles/mainScreenStyles'
import { IndividualQuizControl } from './IndividualQuizControl'

export type QuizControlPanelProps = {
  quizzes: findQuizzesForCourseByAssignedDate_findQuizzesForCourseByAssignedDate_quizzes[]
  presentStudentList: string[]
}

export const ASSIGN_QUIZZES_MUTATION = gql`
  mutation assignQuizzesByStudentIdsAndDate(
    $input: AssignQuizzesByStudentIdsAndDateInput!
  ) {
    assignQuizzesByStudentIdsAndDate(input: $input) {
      quizzes {
        _id
      }
    }
  }
`

export const QuizControlPanel = ({
  quizzes,
  presentStudentList,
}: QuizControlPanelProps) => {
  const [assignQuizzes] = useMutation<
    assignQuizzesByStudentIdsAndDate,
    assignQuizzesByStudentIdsAndDateVariables
  >(ASSIGN_QUIZZES_MUTATION, {
    onCompleted: (data) => console.log(data),
    refetchQueries: ['findQuizzesForCourseByAssignedDate'],
  })
  const allQuizzesAssigned = quizzes.every((quiz) => quiz.assigned)

  const [markExempt] = useMutation<markExempt, markExemptVariables>(
    MARK_EXEMPT_MUTATION,
    {
      onCompleted: (data) => console.log(data),
      refetchQueries: ['findQuizzesForCourseByAssignedDate'],
    },
  )
  const totalEarnedPoints = quizzes
    .filter((q) => q.finishedQuiz)
    .map((q) => q.score.earnedPoints)
    .reduce((a, i) => a + i)
  const totalMaxPoints = quizzes
    .filter((q) => q.finishedQuiz)
    .map((q) => q.score.maxPoints)
    .reduce((a, i) => a + i)
  const totalScore = totalEarnedPoints / totalMaxPoints

  return (
    <QuizControlPanelContainer>
      <QuizNameContainer>
        <div>
          {quizzes[0].readings.readingSections + ' '} <br />
          Quiz Average:
          {' ' + (totalScore * 100).toFixed(2)}%
        </div>
        <AssignAllQuizzesButton
          onClick={() =>
            assignQuizzes({
              variables: {
                input: {
                  // assignedDate: '10/17/2021',
                  assignedDate: new Date().toLocaleDateString(),
                  studentIds: presentStudentList,
                  assign: true,
                },
              },
            })
          }
        >
          Assign
        </AssignAllQuizzesButton>
      </QuizNameContainer>

      <div style={{ overflow: 'scroll' }}>
        {quizzes.map((quiz, i) => (
          <div
            key={i}
            style={{
              backgroundColor: i % 2 === 0 ? 'var(--grey)' : 'var(--white)',
              display: 'grid',
              gridTemplateColumns: '3fr 1fr',
              height: '8%',
              justifyItems: 'center',
              alignItems: 'center',
            }}
          >
            <div style={{ justifySelf: 'left' }}>
              {quiz.hasOwner.lastName}, {quiz.hasOwner.firstName}
            </div>
            {quiz.assigned || quiz.finishedQuiz ? (
              <IndividualQuizControl
                quiz={quiz}
                presentStudentList={presentStudentList}
              />
            ) : (
              <div
                style={{
                  display: 'grid',
                  gridAutoFlow: 'column',
                  columnGap: '2vh',
                  justifyItems: 'center',
                }}
              >
                <button
                  style={
                    quiz.assigned
                      ? {
                          backgroundColor: 'var(--red)',
                          color: 'var(--white)',
                          borderRadius: '5px',
                          width: '100%',
                        }
                      : {
                          backgroundColor: 'var(--blue)',
                          color: 'var(--white)',
                          borderRadius: '5px',
                          width: '100%',
                        }
                  }
                  onClick={() =>
                    assignQuizzes({
                      variables: {
                        input: {
                          assignedDate: new Date().toLocaleDateString(),
                          // assignedDate: '10/17/2021',
                          studentIds: [quiz.hasOwner._id!],
                          assign: true,
                        },
                      },
                    })
                  }
                >
                  Assign
                </button>
                <button
                  style={
                    quiz.assigned
                      ? {
                          backgroundColor: 'var(--red)',
                          color: 'var(--white)',
                          borderRadius: '5px',
                          width: '100%',
                        }
                      : {
                          backgroundColor: 'var(--blue)',
                          color: 'var(--white)',
                          borderRadius: '5px',
                          width: '100%',
                        }
                  }
                  onClick={() =>
                    markExempt({
                      variables: {
                        input: {
                          assignmentId: quiz._id!,
                          exemptStatus: !quiz.exempt,
                        },
                      },
                    })
                  }
                >
                  {quiz.exempt ? 'Not Exempt' : 'Exempt'}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </QuizControlPanelContainer>
  )
}
