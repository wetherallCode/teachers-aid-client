import React, { FC, useState } from 'react'

import { useParams } from 'react-router'
import { ReadingGuideLessonSelect } from './ReadingGuideLessonSelect'
import { ReadingGuideDataViewer } from './ReadingGuideDataViewer'
import { UnitSelect } from '../assign-assignments/assign-readingGuides/assing-by-course/UnitSelect'

export type ReadingGuideDataProps = {}

export const ReadingGuideData: FC<ReadingGuideDataProps> = () => {
  const { course } = useParams()
  const [unitId, setUnitId] = useState('')
  const [lessonId, setLessonId] = useState('')

  return (
    <>
      <UnitSelect setUnitId={setUnitId} />
      {unitId && (
        <ReadingGuideLessonSelect
          course={course!}
          unitId={unitId}
          setLessonId={setLessonId}
        />
      )}
      {lessonId && (
        <ReadingGuideDataViewer lessonId={lessonId} course={course!} />
      )}
    </>
  )
}
