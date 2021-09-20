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
import { TemporaryTasks } from './temporary-tasks/TemporaryTasks'
import { TemporaryTasksContextProvider } from './temporary-tasks/state-n-styles/TemporaryTasksContext'
import { useUserContextProvider } from '../../../../contexts/UserContext'
import { me_me_Teacher } from '../../../../schemaTypes'

export type CourseManagerProps = {}

export const CourseManager: FC<CourseManagerProps> = () => {
  const me: me_me_Teacher = useUserContextProvider()
  const { course } = useParams()
  const [name] = me.teachesCourses.filter((courses) => courses._id === course)
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
              <AssignmentManager courseId={course} />
            </AssignmentManagerContextProvider>
          }
        />
        <Route
          path='tasks/*'
          element={
            <TemporaryTasksContextProvider>
              <TemporaryTasks />
            </TemporaryTasksContextProvider>
          }
        />
        <Route
          path='roster/*'
          element={<RosterDashboard courseName={name.name} />}
        />
        <Route path='view-reading-guide-data' element={<ReadingGuideData />} />

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
