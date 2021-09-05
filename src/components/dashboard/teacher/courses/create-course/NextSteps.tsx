import React, { FC } from 'react'
import { useCreateCourseContextProvider } from './state/CreateCourseContext'
import { useNavigate } from 'react-router'
import {
  CourseTitleButton,
  CourseTitleButtonContainer,
} from './state/createCourseStyles'

export type NextStepsProps = {}

export const NextSteps = ({}: NextStepsProps) => {
  const [state, event] = useCreateCourseContextProvider()
  const navigate = useNavigate()
  return (
    <CourseTitleButtonContainer style={{ height: '95vh' }}>
      <CourseTitleButton
        onClick={() => {
          event({ type: 'ADD_ANOTHER_COURSE' })
        }}
      >
        Add Another Course
      </CourseTitleButton>
      <CourseTitleButton
        onClick={() => {
          navigate(
            `/dashboard/courses/${state.context.courseInfo.courseId}/roster`
          )
        }}
      >
        Add Students
      </CourseTitleButton>
    </CourseTitleButtonContainer>
  )
}
