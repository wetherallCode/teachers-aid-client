import React, { FC } from 'react'
import { Routes, Route } from 'react-router'
import { CreateAssignment } from './create-assignments/CreateAssignment'
import { CreateAssignmentContextProvider } from './create-assignments/CreateAssignmentContext'
import { EditAssignments } from './edit-assignments/EditAssignments'

export type AssignmentHomeProps = {}

export const AssignmentHome: FC<AssignmentHomeProps> = () => {
  return (
    <Routes>
      <Route
        path='create'
        element={
          <CreateAssignmentContextProvider>
            <CreateAssignment />
          </CreateAssignmentContextProvider>
        }
      />
      <Route path='edit' element={<EditAssignments />} />
    </Routes>
  )
}
