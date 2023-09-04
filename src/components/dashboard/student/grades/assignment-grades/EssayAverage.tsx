import { findAllMarkingPeriodGrades_findAllMarkingPeriodGrades_assignments } from '../../../../../schemaTypes'

export type EssayAverageProps = {
  essays: findAllMarkingPeriodGrades_findAllMarkingPeriodGrades_assignments[]
}

export const EssayAverage = ({ essays }: EssayAverageProps) => {
  const essayList = essays.filter(
    (assignment) =>
      (assignment.__typename === 'Essay' &&
        !assignment.exempt &&
        assignment.finalDraft?.returned &&
        Date.parse(new Date().toLocaleString()) >
        Date.parse(`${assignment.dueDate}, ${assignment.dueTime}`)) ||
      (assignment.__typename === 'Essay' &&
        !assignment.exempt &&
        !assignment.finalDraft &&
        // assignment.markingPeriod === markingPeriod &&
        Date.parse(new Date().toLocaleString()) >
        Date.parse(`${assignment.dueDate}, ${assignment.dueTime}`))
  )

  const earnedPointsAverage = essayList.map(e => e.score.earnedPoints).reduce((a, i) => a + i, 0)
  const maxPointsAverage = essayList.map(e => e.score.maxPoints).reduce((a, i) => a + i, 0)
  const essayAverage = (earnedPointsAverage / maxPointsAverage)

  return (
    <div>
      <div>Essay Average</div>
      <div>{essayAverage.toFixed(2)}%</div>
    </div>
  )
}
