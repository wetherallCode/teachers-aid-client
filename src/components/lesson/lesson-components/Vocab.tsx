import React, { useEffect } from 'react'
import { findLessonByCourseAndDate_findLessonByCourseAndDate_lesson } from '../../../schemaTypes'
import {
  LessonComponentTitleContainer,
  VocabWordContainer,
  VocabWordStyle,
} from '../state-n-styles/lessonStyles'

export type VocabProps = {
  lesson: findLessonByCourseAndDate_findLessonByCourseAndDate_lesson
  setPolling: React.Dispatch<React.SetStateAction<number>>
}

export const Vocab = ({ lesson, setPolling }: VocabProps) => {
  useEffect(() => {
    setPolling(2000)
  })
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
