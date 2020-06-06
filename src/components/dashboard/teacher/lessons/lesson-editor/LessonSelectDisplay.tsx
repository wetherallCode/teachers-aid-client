import React, { FC, useEffect } from 'react'
import { useLessonEditorContextProvider } from './LessonEditorContext'
import {
  findLessonsByUnit,
  findLessonsByUnitVariables,
} from '../../../../../schemaTypes'
import { QueryLazyOptions } from '@apollo/client'

export type LessonSelectDisplayProps = {
  data: findLessonsByUnit
  //   loadLessons: (
  //     options?: QueryLazyOptions<findLessonsByUnitVariables> | undefined
  //   ) => void
  startPolling: (pollInterval: number) => void
}

export const LessonSelectDisplay: FC<LessonSelectDisplayProps> = ({
  data,
  //   loadLessons,
  startPolling,
}) => {
  const [state, event] = useLessonEditorContextProvider()
  useEffect(() => {
    console.log('should be polling')
    // loadLessons()
    startPolling(100)
  }, [])
  return (
    <>
      <button onClick={() => event({ type: 'PREVIOUS' })}>Previous</button>
      <div>Select Lesson</div>
      <select
        onChange={(e: any) =>
          event({ type: 'SET_LESSON_ID', payload: e.target.value })
        }
      >
        <option value={undefined}>Pick a Lesson</option>
        {data?.findLessonsByUnit.lessons.map((lesson) => (
          <option key={lesson._id!} value={lesson._id!}>
            {lesson.lessonName}
          </option>
        ))}
      </select>
      <button onClick={() => event({ type: 'NEXT' })}>Next</button>
    </>
  )
}
