import { findAllMarkingPeriodGrades_findAllMarkingPeriodGrades_assignments } from '../../../../../schemaTypes'

export type ReadingGuideAverageProps = {
  readingGuides: findAllMarkingPeriodGrades_findAllMarkingPeriodGrades_assignments[]
}

export const ReadingGuideAverage = ({
  readingGuides,
}: ReadingGuideAverageProps) => {
  const readingGuideList = readingGuides.filter(
    (assignment) =>
      !assignment.exempt &&
      Date.parse(new Date().toLocaleString()) >
        Date.parse(`${assignment.dueDate}, ${assignment.dueTime}`)
  )
  if (readingGuideList.length > 0) {
    const earnedPoints = readingGuideList
      .map((rg) => rg.score.earnedPoints)
      .reduce((a, i) => a + i)
    const maxPoints = readingGuideList
      .map((rg) => rg.score.maxPoints)
      .reduce((a, i) => a + i)

    const readingGuideAverage = (earnedPoints / maxPoints).toFixed(2)

    return (
      <>
        {readingGuideList.length > 0 && (
          <div>
            <div>Reading Guide Average</div>
            <div>{readingGuideAverage}</div>
          </div>
        )}
      </>
    )
  } else {
    return (
      <>
        {readingGuideList.length > 0 && (
          <div>
            <div>Reading Guide Average</div>
          </div>
        )}
      </>
    )
  }
}
