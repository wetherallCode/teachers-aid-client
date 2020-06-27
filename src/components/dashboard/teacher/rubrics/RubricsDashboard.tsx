import React, { FC } from 'react'
import { Routes, Route } from 'react-router'
import { RubricBuilder } from './rubric-builder/RubricBuilder'

export type RubricsDashboardProps = {}

export const RubricsDashboard: FC<RubricsDashboardProps> = () => {
  return (
    <Routes>
      <Route
        path='build'
        element={
          <>
            <RubricBuilder />
          </>
        }
      />
      <Route path='edit' element={<div>Edit</div>} />
    </Routes>
  )
}
