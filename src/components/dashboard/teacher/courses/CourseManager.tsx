import React, { FC } from 'react'
import { useParams, Routes, Route } from 'react-router'
import { LessonEditor } from '../lessons/lesson-editor/LessonEditor'
import { LessonEditorContextProvider } from '../lessons/lesson-editor/LessonEditorContext'
import { AssignAssignments } from '../assignments/assign-assignments/AssignAssignments'
import { RosterDashboard } from './roster/RosterDashboard'

export type CourseManagerProps = {}

export const CourseManager: FC<CourseManagerProps> = () => {
  const param = useParams()
  const { course } = param
  return (
    <>
      <Routes>
        <Route
          path='lesson-editor'
          element={
            <LessonEditorContextProvider>
              <LessonEditor course={course} />
            </LessonEditorContextProvider>
          }
        />
        <Route path='assign-assignments' element={<AssignAssignments />} />
        <Route path='roster' element={<RosterDashboard />} />
      </Routes>
    </>
  )
}
