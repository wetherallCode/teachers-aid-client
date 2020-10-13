import React, { FC } from 'react'
import { useParams, Routes, Route } from 'react-router'
import { LessonEditor } from '../lessons/lesson-editor/LessonEditor'
import { LessonEditorContextProvider } from '../lessons/lesson-editor/LessonEditorContext'
import { AssignAssignments } from '../assignments/assign-assignments/AssignAssignments'
import { RosterDashboard } from './roster/RosterDashboard'
import { ReadingGuideData } from '../assignments/readingGuideData/ReadingGuideData'
import { EditCourseContextProvider } from './edit-course/state/EditCourseContext'
import { EditCourse } from './edit-course/EditCourse'
import { AssignmentManager } from './course-assignments/AssignmentManager'
import { AssignmentManagerContextProvider } from './course-assignments/state-styles/AssignmentManagerContext'

export type CourseManagerProps = {}

export const CourseManager: FC<CourseManagerProps> = () => {
  const { course } = useParams()

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
        <Route
          path='assignment-manager'
          element={
            <AssignmentManagerContextProvider>
              <AssignmentManager />
            </AssignmentManagerContextProvider>
          }
        />
        <Route path='view-reading-guide-data' element={<ReadingGuideData />} />

        <Route path='roster/*' element={<RosterDashboard />} />
        <Route
          path='edit-course'
          element={
            <EditCourseContextProvider>
              <EditCourse />
            </EditCourseContextProvider>
          }
        />
      </Routes>
    </>
  )
}
