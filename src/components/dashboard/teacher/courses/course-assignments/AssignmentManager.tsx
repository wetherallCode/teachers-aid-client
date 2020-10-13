import React, { FC } from 'react'

export type AssignmentManagerProps = {}

export const AssignmentManager: FC<AssignmentManagerProps> = () => {
  return (
    <>
      <div>Assignment Manager</div>
      <div>Create Grade Download</div>
      <select>
        <option>Responsibility Points</option>
        <option>Essays</option>
        <option>Article Reviews</option>
      </select>
    </>
  )
}
