import React, { FC } from 'react'
import { AssignedEssays } from './essays/AssignedEssays'

export type StudentAssignmentsProps = {}

export const StudentAssignments: FC<StudentAssignmentsProps> = () => {
  console.log('student-assignments')
  return (
    <>
      <div>Assignments to Complete</div>
      <AssignedEssays />
    </>
  )
}
