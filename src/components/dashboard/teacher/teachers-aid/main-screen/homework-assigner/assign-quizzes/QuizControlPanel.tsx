import { gql, useMutation } from '@apollo/client'
import React from 'react'
import {
  assignQuizzesByStudentIdsAndDate,
  assignQuizzesByStudentIdsAndDateVariables,
  findQuizzesForCourseByAssignedDate_findQuizzesForCourseByAssignedDate_quizzes,
} from '../../../../../../../schemaTypes'
import {
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
  // console.log(allQuizzesAssigned)
  return (
    <QuizControlPanelContainer>
      <QuizNameContainer>
        {quizzes[0].readings.readingSections + ' '}
        <button
          onClick={() =>
            assignQuizzes({
              variables: {
                input: {
                  assignedDate: '10/17/2021',
                  // assignedDate: new Date().toLocaleDateString(),

                  studentIds: presentStudentList,
                  assign: true,
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
              <IndividualQuizControl quiz={quiz} />
            ) : (
              <>
                {' '}
                <button
                  style={
                    quiz.assigned
                      ? {
                          backgroundColor: 'var(--red)',
                          color: 'var(--white)',
                          borderRadius: '5px',
                          width: '75%',
                        }
                      : {
                          backgroundColor: 'var(--blue)',
                          color: 'var(--white)',
                          borderRadius: '5px',
                          width: '75%',
                        }
                  }
                  onClick={() =>
                    assignQuizzes({
                      variables: {
                        input: {
                          // assignedDate: new Date().toLocaleDateString(),
                          assignedDate: '10/17/2021',
                          studentIds: [quiz.hasOwner._id!],
                          assign: true,
                        },
                      },
                    })
                  }
                >
                  Assign
                </button>
                <button>Exempt</button>
              </>
            )}
          </div>
        ))}
      </div>
    </QuizControlPanelContainer>
  )
}
