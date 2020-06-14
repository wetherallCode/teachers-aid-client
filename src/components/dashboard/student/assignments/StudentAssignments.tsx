import React, { FC } from 'react'
import { AssignedEssaySelect } from './essays/AssignedEssaySelect'

export type StudentAssignmentsProps = {}

export const StudentAssignments: FC<StudentAssignmentsProps> = () => {
  console.log('student-assignments')
  return (
    <>
      <div>Assignments to Complete</div>
      <AssignedEssaySelect />
    </>
  )
}
