import React, { FC } from 'react'
import { AssignEssays } from './assign-essays/AssignEssays'

export type AssignAssignmentsProps = {}

export const AssignAssignments: FC<AssignAssignmentsProps> = () => {
  return (
    <>
      <div>Assign</div>
      <AssignEssays />
    </>
  )
}
