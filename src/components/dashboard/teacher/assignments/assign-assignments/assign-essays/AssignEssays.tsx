import React, { FC } from 'react'
import { AssignEssaysByLesson } from './assign-by-course/AssignEssaysByLesson'
import { AssignEssayByCourseContextProvider } from './assign-by-course/AssignEssayByCourseContext'

export type AssignEssaysProps = {}

export const AssignEssays: FC<AssignEssaysProps> = () => {
  return (
    <>
      <div>Assign Essays</div>
      <div>AssignEssaysByCourse</div>
      <div>AssignEssaysByStudent</div>
      <AssignEssayByCourseContextProvider>
        <AssignEssaysByLesson />
      </AssignEssayByCourseContextProvider>
    </>
  )
}
