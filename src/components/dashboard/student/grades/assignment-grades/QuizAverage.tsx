import { findAllMarkingPeriodGrades_findAllMarkingPeriodGrades_assignments } from '../../../../../schemaTypes'

export type QuizAverageProps = {
  quizzes: findAllMarkingPeriodGrades_findAllMarkingPeriodGrades_assignments[]
}

export const QuizAverage = ({ quizzes }: QuizAverageProps) => {
  const quizList = quizzes.filter(
    (assignment) =>
      !assignment.exempt &&
      Date.parse(new Date().toLocaleString()) >
        Date.parse(`${assignment.dueDate}, ${assignment.dueTime}`)
  )

  if (quizList.length > 0) {
    const earnedPoints = quizList
      .map((q) => q.score.earnedPoints)
      .reduce((a, i) => a + i)
    const maxPoints = quizList
      .map((q) => q.score.maxPoints)
      .reduce((a, i) => a + i)

    const quizPointAverage = ((earnedPoints / maxPoints) * 100).toFixed(2)

    return (
      <div>
        <div>Quiz Average</div>
        <div>{quizPointAverage}%</div>
      </div>
    )
  } else {
    return (
      <div>
        <div>Quiz Average</div>
      </div>
    )
  }
}
