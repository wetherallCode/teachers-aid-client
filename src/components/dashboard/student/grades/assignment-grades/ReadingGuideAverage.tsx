import { findAllMarkingPeriodGrades_findAllMarkingPeriodGrades_assignments } from '../../../../../schemaTypes'

export type ReadingGuideAverageProps = {
  readingGuides: findAllMarkingPeriodGrades_findAllMarkingPeriodGrades_assignments[]
}

export const ReadingGuideAverage = ({
  readingGuides,
}: ReadingGuideAverageProps) => {
  const readingGuideList = readingGuides.filter((assignment) =>
    !assignment.exempt &&
    Date.parse(new Date().toLocaleString()) >
    Date.parse(`${assignment.dueDate}, ${assignment.dueTime}`)
  )

  const earnedPoints = readingGuideList.map(rg => rg.score.earnedPoints).reduce((a, i) => a + i)
  const maxPoints = readingGuideList.map(rg => rg.score.maxPoints).reduce((a, i) => a + i)
  console.log(earnedPoints, maxPoints)
  const readingGuideAverage = (earnedPoints / maxPoints).toFixed(2)

  return (
    <div>
      <div>Reading Guide Average</div>
      <div>{readingGuideAverage}</div>
    </div>
  )
}
