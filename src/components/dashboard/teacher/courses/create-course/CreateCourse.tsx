import React, { FC, useState } from 'react'
import { useCreateCourseContextProvider } from './state/CreateCourseContext'
import { CreateTitle } from './CreateTitle'
import { CreateCourseInfo } from './CreateCourseInfo'
import { Modal } from '../../../../../animations'

export type CreateCourseProps = {}

export const CreateCourse: FC<CreateCourseProps> = () => {
  const [state] = useCreateCourseContextProvider()

  return (
    <>
      <div>Create New Course</div>
      {state.matches('createCourseTitle') && <CreateTitle />}
      {state.matches('createCourseInfo') && <CreateCourseInfo />}
    </>
  )
}
