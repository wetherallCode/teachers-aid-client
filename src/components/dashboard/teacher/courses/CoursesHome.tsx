import React from 'react'
import { Route, Routes, useLocation } from 'react-router'
import { useNavSync } from '../../../../hooks/useNavSync'
import { CourseDirectory } from './CourseDirectory'
import { CourseManager } from './CourseManager'
import { CreateCourse } from './create-course/CreateCourse'
import { CreateCourseContextProvider } from './create-course/state/CreateCourseContext'

export type CoursesHomeProps = {}

export const CoursesHome = ({}: CoursesHomeProps) => {
  const location = useLocation()
  useNavSync(location, 'COURSES')
  return (
    <Routes>
      <Route path="" element={<CourseDirectory />} />
      <Route path=":course/*" element={<CourseManager />} />
      <Route
        path="create-course"
        element={
          <CreateCourseContextProvider>
            <CreateCourse />
          </CreateCourseContextProvider>
        }
      />
    </Routes>
  )
}
