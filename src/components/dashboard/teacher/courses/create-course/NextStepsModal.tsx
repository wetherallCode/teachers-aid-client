import React, { FC } from 'react'
import { useCreateCourseContextProvider } from './state/CreateCourseContext'
import { useNavigate } from 'react-router'

export type NextStepsModalProps = {
  setIsToggled: any
}

export const NextStepsModal: FC<NextStepsModalProps> = ({ setIsToggled }) => {
  const [state, event] = useCreateCourseContextProvider()
  const navigate = useNavigate()
  return (
    <>
      <button
        onClick={() => {
          event({ type: 'ADD_ANOTHER_COURSE' })
          setIsToggled(false)
        }}
      >
        Add Another Course
      </button>
      <button
        onClick={() => {
          navigate(
            `/dashboard/courses/${state.context.courseInfo.courseId}/roster`
          )
          setIsToggled(false)
        }}
      >
        Add Students
      </button>
    </>
  )
}
