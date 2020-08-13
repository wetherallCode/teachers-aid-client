import React, { FC } from 'react'
import { findLessonByCourseAndDate_findLessonByCourseAndDate_lesson } from '../../../schemaTypes'

export type VocabProps = {
  lesson: findLessonByCourseAndDate_findLessonByCourseAndDate_lesson
}

export const Vocab: FC<VocabProps> = ({ lesson }) => {
  return (
    <>
      {lesson.vocabList.map((word, i: number) => (
        <div key={i}>
          {word.word}: {word.definition}
        </div>
      ))}
    </>
  )
}
