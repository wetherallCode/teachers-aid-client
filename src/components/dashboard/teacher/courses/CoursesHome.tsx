import React, { FC } from 'react'
import { Route, Routes } from 'react-router'
// import { LessonEditorContextProvider } from '../lessons/lesson-editor/LessonEditorContext'
// import { LessonEditor } from '../lessons/lesson-editor/LessonEditor'
import { CourseManager } from './CourseManager'

export type CoursesHomeProps = {}

export const CoursesHome: FC<CoursesHomeProps> = () => {
  return (
    <Routes>
      <Route path=':course/*' element={<CourseManager />} />
    </Routes>
  )
}
