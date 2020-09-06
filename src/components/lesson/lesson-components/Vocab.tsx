import React, { FC } from 'react'
import { findLessonByCourseAndDate_findLessonByCourseAndDate_lesson } from '../../../schemaTypes'
import {
  LessonComponentTitleContainer,
  LessonComponentDetailsContainer,
  VocabWordContainer,
} from '../state/lessonStyles'

export type VocabProps = {
  lesson: findLessonByCourseAndDate_findLessonByCourseAndDate_lesson
}

export const Vocab: FC<VocabProps> = ({ lesson }) => {
  return (
    <>
      <LessonComponentTitleContainer>Vocab</LessonComponentTitleContainer>
      <VocabWordContainer>
        {lesson.vocabList.map((word, i: number) => (
          <li key={i}>
            {word.word}: {word.definition}
          </li>
        ))}
      </VocabWordContainer>
    </>
  )
}
