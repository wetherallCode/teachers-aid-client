import React, { FC } from 'react'
import { AssignEssays } from './assign-essays/AssignEssays'
import { AssignReadingGuides } from './assign-readingGuides/AssignReadingGuides'

export type AssignAssignmentsProps = {}

export const AssignAssignments: FC<AssignAssignmentsProps> = () => {
  return (
    <>
      <div>Assign</div>
      <AssignEssays />
      <AssignReadingGuides />
    </>
  )
}
