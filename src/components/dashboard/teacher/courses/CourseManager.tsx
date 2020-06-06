import React, { FC } from 'react'
import { useParams, Routes, Route } from 'react-router'
import { LessonEditor } from '../lessons/lesson-editor/LessonEditor'
import { LessonEditorContextProvider } from '../lessons/lesson-editor/LessonEditorContext'

export type CourseManagerProps = {}

export const CourseManager: FC<CourseManagerProps> = () => {
  const param = useParams()
  const { course } = param
  return (
    <>
      <div>{course}</div>
      <Routes>
        <Route
          path='lesson-editor'
          element={
            <LessonEditorContextProvider>
              <LessonEditor course={course} />
            </LessonEditorContextProvider>
          }
        />
      </Routes>
    </>
  )
}
