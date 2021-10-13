import { gql, useMutation } from '@apollo/client'
import React from 'react'
import {
  assignQuizzesByStudentIdsAndDate,
  assignQuizzesByStudentIdsAndDateVariables,
  findQuizzesForCourseByAssignedDate_findQuizzesForCourseByAssignedDate_quizzes,
} from '../../../../../../../schemaTypes'
import {
  IndividualQuizContainer,
  QuizControlPanelContainer,
  QuizNameContainer,
} from '../../../styles/mainScreenStyles'

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
  return (
    <QuizControlPanelContainer>
      <QuizNameContainer>
        QuizName{' '}
        <button
          onClick={() =>
            assignQuizzes({
              variables: {
                input: {
                  // assignedDate: new Date().toLocaleDateString(),
                  assignedDate: '10/12/2021',
                  studentIds: presentStudentList,
                },
              },
            })
          }
        >
          Assign
        </button>
      </QuizNameContainer>

      <div style={{ overflow: 'scroll' }}>
        {quizzes.map((quiz, i) => (
          <div
            style={{
              backgroundColor: i % 2 === 0 ? 'var(--grey)' : 'var(--white)',
              display: 'grid',
              gridTemplateColumns: '3fr 1fr',
            }}
          >
            <div>
              {quiz.hasOwner.lastName}, {quiz.hasOwner.firstName}
            </div>
            {quiz.assigned ? (
              <div>
                {quiz.isActive
                  ? 'Active'
                  : quiz.finishedQuiz
                  ? 'Finished'
                  : 'Not Active'}
              </div>
            ) : (
              <button
                onClick={() =>
                  assignQuizzes({
                    variables: {
                      input: {
                        // assignedDate: new Date().toLocaleDateString(),
                        assignedDate: '10/12/2021',
                        studentIds: [quiz.hasOwner._id!],
                      },
                    },
                  })
                }
              >
                Assign
              </button>
            )}
          </div>
        ))}
      </div>
    </QuizControlPanelContainer>
  )
}
