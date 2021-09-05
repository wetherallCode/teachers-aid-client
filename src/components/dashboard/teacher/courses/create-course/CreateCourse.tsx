import React from 'react'
import { useCreateCourseContextProvider } from './state/CreateCourseContext'
import { CreateTitle } from './CreateTitle'
import { CreateCourseInfo } from './CreateCourseInfo'

import {
  CreateCourseContainer,
  CreateCourseContainerTitleContainer,
  CreateCourseInformationContainer,
} from './state/createCourseStyles'
import { NextSteps } from './NextSteps'

export type CreateCourseProps = {}

export const CreateCourse = ({}: CreateCourseProps) => {
  const [state] = useCreateCourseContextProvider()

  return (
    <>
      {state.matches('createCourseTitle') && (
        <CreateCourseContainer>
          <CreateCourseContainerTitleContainer>
            <div>Create New Course</div>
          </CreateCourseContainerTitleContainer>
          <CreateTitle />
        </CreateCourseContainer>
      )}
      {state.matches('createCourseInfo') && (
        <CreateCourseInformationContainer>
          <CreateCourseContainerTitleContainer>
            <div>Course Information {state.context.courseTitle.name}</div>
          </CreateCourseContainerTitleContainer>
          <CreateCourseInfo />
        </CreateCourseInformationContainer>
      )}
      {state.matches('nextSteps') && <NextSteps />}
    </>
  )
}
