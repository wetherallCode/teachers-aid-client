import React, { FC } from 'react'
import { LessonCalendar } from './LessonCalendar'
import { LessonFinderContainer } from './state-n-styles/lessonFinderStyles'

export type LessonFinderProps = {}

export const LessonFinder: FC<LessonFinderProps> = () => {
  return (
    <LessonFinderContainer>
      <LessonCalendar />
    </LessonFinderContainer>
  )
}
