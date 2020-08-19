import React, { FC } from 'react'
import { Route, Routes } from 'react-router'
import { CourseManager } from './CourseManager'
import { CreateCourse } from './create-course/CreateCourse'
import { CreateCourseContextProvider } from './create-course/state/CreateCourseContext'
import { EditCourseContextProvider } from './edit-course/state/EditCourseContext'
import { EditCourse } from './edit-course/EditCourse'

export type CoursesHomeProps = {}

export const CoursesHome: FC<CoursesHomeProps> = () => {
  return (
    <Routes>
      <Route path=':course/*' element={<CourseManager />} />
      <Route
        path='create-course'
        element={
          <CreateCourseContextProvider>
            <CreateCourse />
          </CreateCourseContextProvider>
        }
      />
    </Routes>
  )
}
