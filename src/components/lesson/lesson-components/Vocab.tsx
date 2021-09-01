import React, { FC } from 'react'
import { findLessonByCourseAndDate_findLessonByCourseAndDate_lesson } from '../../../schemaTypes'
import {
  LessonComponentTitleContainer,
  LessonComponentDetailsContainer,
  VocabWordContainer,
  VocabWordStyle,
} from '../state-n-styles/lessonStyles'

export type VocabProps = {
  lesson: findLessonByCourseAndDate_findLessonByCourseAndDate_lesson
}

export const Vocab: FC<VocabProps> = ({ lesson }) => {
  return (
    <>
      <LessonComponentTitleContainer>Vocab</LessonComponentTitleContainer>
      <VocabWordContainer>
        {lesson.vocabList.map((word, i: number) => (
          <VocabWordStyle key={i}>
            {word.word}: {word.definition}
          </VocabWordStyle>
        ))}
      </VocabWordContainer>
    </>
  )
}
