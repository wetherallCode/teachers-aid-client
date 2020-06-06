import React, { FC } from 'react'
import { Routes, Route } from 'react-router'
import { CreateAssignment } from './create-assignments/CreateAssignment'
import { CreateAssignmentContextProvider } from './create-assignments/CreateAssignmentContext'

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
    </Routes>
  )
}
