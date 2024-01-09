import { useMutation } from '@apollo/client'
import {
  activateQuizVariables,
  findAssignmentByStudentId_findAssignmentByStudentId_assignments_Quiz,
  unAssignQuizByQuizId,
  unAssignQuizByQuizIdVariables,
  activateQuiz,
  assignQuizzesByStudentIdsAndDate,
  assignQuizzesByStudentIdsAndDateVariables,
} from '../../../../../schemaTypes'
import { ACTIVATE_QUIZ_MUTATION } from '../../../student/assignments/quizzes/QuizSelect'
import { UNASSIGN_QUIZ_MUTATION } from '../../teachers-aid/main-screen/homework-assigner/assign-quizzes/IndividualQuizControl'
import { ASSIGN_QUIZZES_MUTATION } from '../../teachers-aid/main-screen/homework-assigner/assign-quizzes/QuizControlPanel'
import { IndividualAssignmentDisplay } from '../state-n-styles/studentInformationStyles'

export type QuizInfoProps = {
  quiz: findAssignmentByStudentId_findAssignmentByStudentId_assignments_Quiz
  i: number
  numberOfQuizzesTotal: number
}

export const QuizInfo = ({ quiz, i, numberOfQuizzesTotal }: QuizInfoProps) => {
  const [unAssignQuiz] = useMutation<
    unAssignQuizByQuizId,
    unAssignQuizByQuizIdVariables
  >(UNASSIGN_QUIZ_MUTATION, {
    variables: { input: { quizId: quiz._id! } },
    onCompleted: (data) => console.log(data),
    refetchQueries: ['findAssignmentByStudentId'],
  })
  const [activateQuiz] = useMutation<activateQuiz, activateQuizVariables>(
    ACTIVATE_QUIZ_MUTATION,
    {
      onCompleted: (data) => console.log(data),
      refetchQueries: ['findAssignmentByStudentId'],
    },
  )
  const [assignQuizzes] = useMutation<
    assignQuizzesByStudentIdsAndDate,
    assignQuizzesByStudentIdsAndDateVariables
  >(ASSIGN_QUIZZES_MUTATION, {
    onCompleted: (data) => console.log(data),
    refetchQueries: ['findAssignmentByStudentId'],
  })

  return (
    <>
      <IndividualAssignmentDisplay
        key={quiz._id}
        everyOtherLine={i % 2 === 0}
        lastLine={numberOfQuizzesTotal === i}
      >
        <div>{quiz.readings.readingSections}</div>
        {quiz.exempt ? (
          <div>Exempt</div>
        ) : quiz.finishedQuiz ? (
          <div>
            {quiz.score.earnedPoints}/{quiz.score.maxPoints}{' '}
            {((quiz.score.earnedPoints / quiz.score.maxPoints) * 100).toFixed(
              2,
            )}
            %
          </div>
        ) : (
          <div>
            {!quiz.isActive && quiz.startedQuiz && (
              <button
                onClick={() =>
                  activateQuiz({
                    variables: { input: { activate: true, quizId: quiz._id! } },
                  })
                }
              >
                Suspended
              </button>
            )}
            {!quiz.startedQuiz && (
              <button
                onClick={() =>
                  assignQuizzes({
                    variables: {
                      input: {
                        assign: true,
                        studentIds: [quiz.hasOwner._id!],
                        assignedDate: quiz.assignedDate,
                      },
                    },
                  })
                }
              >
                Start
              </button>
            )}
            {quiz.startedQuiz && quiz.isActive && <div>Active</div>}
          </div>
        )}
      </IndividualAssignmentDisplay>
    </>
  )
}
