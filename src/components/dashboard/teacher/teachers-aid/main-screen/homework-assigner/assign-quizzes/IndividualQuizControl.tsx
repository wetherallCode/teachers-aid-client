import { gql, useMutation } from '@apollo/client'
import React, { useEffect } from 'react'
import {
  activateQuizVariables,
  activateQuiz,
  findQuizzesForCourseByAssignedDate_findQuizzesForCourseByAssignedDate_quizzes,
  unAssignQuizByQuizIdVariables,
  unAssignQuizByQuizId,
  forceFinishQuizVariables,
  forceFinishQuiz,
  markExemptVariables,
  markExempt,
} from '../../../../../../../schemaTypes'
import { ACTIVATE_QUIZ_MUTATION } from '../../../../../student/assignments/quizzes/QuizSelect'
import { MARK_EXEMPT_MUTATION } from '../../../../../student/assignments/StudentAssignments'
import {
  IndividualQuizControlContainer,
  QuizStatusIndicator,
} from '../../../styles/mainScreenStyles'
import { ASSIGN_QUIZZES_MUTATION } from './QuizControlPanel'

export type IndividualQuizControlProps = {
  quiz: findQuizzesForCourseByAssignedDate_findQuizzesForCourseByAssignedDate_quizzes
  presentStudentList: string[]
}

export const UNASSIGN_QUIZ_MUTATION = gql`
  mutation unAssignQuizByQuizId($input: UnAssignQuizByQuizIdInput!) {
    unAssignQuizByQuizId(input: $input) {
      unAssigned
    }
  }
`

export const FORCE_FINISH_QUIZ_MUTATION = gql`
  mutation forceFinishQuiz($input: ForceFinishQuizInput!) {
    forceFinishQuiz(input: $input) {
      finished
    }
  }
`
export const IndividualQuizControl = ({
  quiz,
  presentStudentList,
}: IndividualQuizControlProps) => {
  const [activateQuiz] = useMutation<activateQuiz, activateQuizVariables>(
    ACTIVATE_QUIZ_MUTATION,
    {
      onCompleted: (data) => console.log(data),
      refetchQueries: [],
    },
  )
  const [unAssignQuiz] = useMutation<
    unAssignQuizByQuizId,
    unAssignQuizByQuizIdVariables
  >(UNASSIGN_QUIZ_MUTATION, {
    variables: { input: { quizId: quiz._id! } },
    onCompleted: (data) => console.log(data),
    refetchQueries: [],
  })

  const [forceFinishQuiz] = useMutation<
    forceFinishQuiz,
    forceFinishQuizVariables
  >(FORCE_FINISH_QUIZ_MUTATION, {
    variables: { input: { quizId: quiz._id! } },
    onCompleted: (data) => console.log(data),
    refetchQueries: [],
  })

  const [markExempt] = useMutation<markExempt, markExemptVariables>(
    MARK_EXEMPT_MUTATION,
    {
      onCompleted: (data) => console.log(data),
      refetchQueries: ['findQuizzesForCourseByAssignedDate'],
    },
  )

  useEffect(() => {
    if (!presentStudentList.includes(quiz.hasOwner._id!)) {
      unAssignQuiz()
      markExempt({
        variables: { input: { assignmentId: quiz._id!, exemptStatus: true } },
      })
    }
  }, [presentStudentList])

  const score = quiz.score.earnedPoints / quiz.score.maxPoints
  const notStarted = !quiz.startedQuiz && !quiz.finishedQuiz && !quiz.isActive

  return (
    <IndividualQuizControlContainer>
      <QuizStatusIndicator>
        {notStarted ? (
          'Not Started'
        ) : quiz.isActive ? (
          <div
            style={{
              display: 'grid',
              gridAutoFlow: 'column',
              columnGap: '3vh',
            }}
          >
            <div>Active</div>
            <button
              style={{
                display: 'grid',
                justifySelf: 'center',
                backgroundColor: 'var(--red)',
                color: 'var(--white)',
                borderRadius: '5px',
                width: '100%',
              }}
              onClick={() => forceFinishQuiz()}
            >
              Finish
            </button>
          </div>
        ) : quiz.finishedQuiz ? (
          <div>Finished {(score * 100).toFixed(2)}%</div>
        ) : (
          'Suspended'
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
            onClick={() => forceFinishQuiz()}
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
                  width: '100%',
                }
              : {
                  backgroundColor: 'var(--blue)',
                  color: 'var(--white)',
                  borderRadius: '5px',
                  width: '100%',
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
