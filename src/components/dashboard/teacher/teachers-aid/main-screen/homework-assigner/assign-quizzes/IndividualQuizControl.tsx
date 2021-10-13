import React from 'react'
import { findQuizzesForCourseByAssignedDate_findQuizzesForCourseByAssignedDate_quizzes } from '../../../../../../../schemaTypes'

export type IndividualQuizControlProps = {
  quiz: findQuizzesForCourseByAssignedDate_findQuizzesForCourseByAssignedDate_quizzes
  index: number
}

export const IndividualQuizControl = ({
  quiz,
  index,
}: IndividualQuizControlProps) => {
  return (
    <div>
      <div>{quiz.hasOwner.firstName}</div>
      <div>
        {quiz.isActive
          ? 'Active'
          : quiz.finishedQuiz
          ? 'Finished'
          : 'Not Active'}
      </div>
    </div>
  )
}
