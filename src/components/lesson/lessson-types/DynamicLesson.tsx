import React from 'react'
import { findLessonByCourseAndDate_findLessonByCourseAndDate_lesson } from '../../../schemaTypes'
import { WarmUp } from '../lesson-components/WarmUp'
import { LessonDetails } from '../lesson-components/LessonDetails'
import { Vocab } from '../lesson-components/Vocab'
import { Protocols } from '../lesson-components/Protocols'

export type DynamicLessonProps = {
  lesson: findLessonByCourseAndDate_findLessonByCourseAndDate_lesson
}

export const DynamicLesson = ({ lesson }: DynamicLessonProps) => {
  const { dynamicLesson } = lesson
  return (
    <>
      {lesson.duringActivities.some((protocol) => protocol.isActive) ? (
        <Protocols lesson={lesson} />
      ) : (
        <>
          {dynamicLesson === 'WARM_UP' && <WarmUp lesson={lesson} />}
          {dynamicLesson === 'LESSON_DETAILS' && (
            <LessonDetails lesson={lesson} />
          )}
          {dynamicLesson === 'VOCAB' && <Vocab lesson={lesson} />}
        </>
      )}
    </>
  )
}
