import React, { FC } from 'react'
import { AssignReadingGuideByCourse } from './assing-by-course/AssignReadingGuideByCourse'
import { AssignReadingGuideByCourseContextProvider } from './assing-by-course/state/AssignReadingGuideByCourseContext'

export type AssignReadingGuidesProps = {}

export const AssignReadingGuides: FC<AssignReadingGuidesProps> = () => {
  return (
    <>
      <div>Assign Reading Guides</div>
      <AssignReadingGuideByCourseContextProvider>
        <AssignReadingGuideByCourse />
      </AssignReadingGuideByCourseContextProvider>
    </>
  )
}
