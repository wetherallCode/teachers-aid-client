import React, { FC } from 'react'
import { AssignedEssaySelect } from './essays/assigned-essays/AssignedEssaySelect'
import { CompletedEssaySelect } from './essays/completed-essays/CompletedEssaySelect'

export type StudentAssignmentsProps = {}

export const StudentAssignments: FC<StudentAssignmentsProps> = () => {
  console.log('student-assignments')
  return (
    <>
      <div>Assignments to Complete</div>
      <AssignedEssaySelect />
      <CompletedEssaySelect />
    </>
  )
}
