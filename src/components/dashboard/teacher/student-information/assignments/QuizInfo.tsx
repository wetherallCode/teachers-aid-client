import { useMutation } from '@apollo/client'
import {
  activateQuizVariables,
  findAssignmentByStudentId_findAssignmentByStudentId_assignments_Quiz,
  unAssignQuizByQuizId,
  unAssignQuizByQuizIdVariables,
  activateQuiz,
  assignQuizzesByStudentIdsAndDate,
  assignQuizzesByStudentIdsAndDateVariables,
  createHomeworkPassVariables,
  undoHomeworkPassVariables,
  createHomeworkPass,
  undoHomeworkPass,
} from '../../../../../schemaTypes'
import { ACTIVATE_QUIZ_MUTATION } from '../../../student/assignments/quizzes/QuizSelect'
import { UNASSIGN_QUIZ_MUTATION } from '../../teachers-aid/main-screen/homework-assigner/assign-quizzes/IndividualQuizControl'
import { ASSIGN_QUIZZES_MUTATION } from '../../teachers-aid/main-screen/homework-assigner/assign-quizzes/QuizControlPanel'
import { IndividualAssignmentDisplay } from '../state-n-styles/studentInformationStyles'
import {
  CREATE_HOME_WORK_PASS,
  UNDO_HOMEWORK_PASS,
} from './AssignmentInformation'

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
  return (
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
          {((quiz.score.earnedPoints / quiz.score.maxPoints) * 100).toFixed(2)}%
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
      <button
        style={{
          background: 'var(--blue)',
          color: 'var(--white)',
          margin: '1vh',
        }}
        onClick={() => {
          quiz.assigned && !quiz.exempt
            ? createHomeworkPass({
                variables: {
                  input: {
                    assignmentId: quiz._id!,
                    assignmentType: 'QUIZ',
                    markingPeriod: quiz.markingPeriod,
                    ownerId: quiz.hasOwner._id!,
                  },
                },
              })
            : undoHomeworkPass({
                variables: {
                  input: {
                    assignmentId: quiz._id!,
                    assignmentType: 'QUIZ',
                    markingPeriod: quiz.markingPeriod,
                    ownerId: quiz.hasOwner._id!,
                  },
                },
              })
        }}
      >
        {!quiz.exempt ? 'Homework Pass' : 'Undo Homework Pass'}
      </button>
    </IndividualAssignmentDisplay>
  )
}
