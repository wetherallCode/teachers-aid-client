import React, { FC } from 'react'
import { useLessonPlannerContextProvider } from './state-and-styles/lessonPlannerContext'

export type LessonNameProps = {}

export const LessonName: FC<LessonNameProps> = () => {
  const [, event] = useLessonPlannerContextProvider()
  return (
    <>
      <div>LessonName</div>
      <input
        type='text'
        name='lessonName'
        onChange={(e: any) =>
          event({ type: 'SET_LESSON_NAME', payload: e.target.value })
        }
      />
    </>
  )
}
