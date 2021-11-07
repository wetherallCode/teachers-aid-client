import { gql, useMutation } from '@apollo/client'
import React from 'react'
import {
  activateQuizVariables,
  activateQuiz,
  findQuizzesForCourseByAssignedDate_findQuizzesForCourseByAssignedDate_quizzes,
  unAssignQuizByQuizIdVariables,
  unAssignQuizByQuizId,
} from '../../../../../../../schemaTypes'
import { ACTIVATE_QUIZ_MUTATION } from '../../../../../student/assignments/quizzes/QuizSelect'
import {
  IndividualQuizControlContainer,
  QuizStatusIndicator,
} from '../../../styles/mainScreenStyles'
import { ASSIGN_QUIZZES_MUTATION } from './QuizControlPanel'

export type IndividualQuizControlProps = {
  quiz: findQuizzesForCourseByAssignedDate_findQuizzesForCourseByAssignedDate_quizzes
}

export const UNASSIGN_QUIZ_MUTATION = gql`
  mutation unAssignQuizByQuizId($input: UnAssignQuizByQuizIdInput!) {
    unAssignQuizByQuizId(input: $input) {
      unAssigned
    }
  }
`
export const IndividualQuizControl = ({ quiz }: IndividualQuizControlProps) => {
  const [activateQuiz] = useMutation<activateQuiz, activateQuizVariables>(
    ACTIVATE_QUIZ_MUTATION,
    {
      onCompleted: (data) => console.log(data),
      refetchQueries: [],
    }
  )
  const [unAssignQuiz] = useMutation<
    unAssignQuizByQuizId,
    unAssignQuizByQuizIdVariables
  >(UNASSIGN_QUIZ_MUTATION, {
    variables: { input: { quizId: quiz._id! } },
    onCompleted: (data) => console.log(data),
    refetchQueries: [],
  })
  const score = quiz.score.earnedPoints / quiz.score.maxPoints
  const notStarted = !quiz.startedQuiz && !quiz.finishedQuiz && !quiz.isActive
  return (
    <IndividualQuizControlContainer>
      <QuizStatusIndicator>
        {notStarted ? (
          'Not Started'
        ) : quiz.isActive ? (
          'Active'
        ) : quiz.finishedQuiz ? (
          <div>Finished {(score * 100).toFixed(2)}%</div>
        ) : (
          'Not Active'
        )}
      </QuizStatusIndicator>

      {!quiz.isActive && !quiz.finishedQuiz && !notStarted && (
        <>
          <button
            style={
              !quiz.isActive
                ? {
                    backgroundColor: 'var(--red)',
                    color: 'var(--white)',
                    borderRadius: '5px',
                    width: '80%',
                    display: 'grid',
                    justifySelf: 'center',
                  }
                : {
                    backgroundColor: 'var(--blue)',
                    color: 'var(--white)',
                    borderRadius: '5px',
                    width: '80%',
                    display: 'grid',
                    justifySelf: 'center',
                  }
            }
            onClick={() =>
              activateQuiz({
                variables: {
                  input: {
                    activate: true,
                    quizId: quiz._id!,
                  },
                },
              })
            }
          >
            Reactivate
          </button>
          <button
            style={{
              display: 'grid',
              justifySelf: 'center',
              backgroundColor: 'var(--red)',
              color: 'var(--white)',
              borderRadius: '5px',
              width: '80%',
            }}
          >
            Finish
          </button>
        </>
      )}
      {quiz.assigned && notStarted && (
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
          onClick={() => unAssignQuiz()}
        >
          Unassign
        </button>
      )}
    </IndividualQuizControlContainer>
  )
}
