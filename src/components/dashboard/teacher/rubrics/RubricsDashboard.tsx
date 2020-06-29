import React, { FC } from 'react'
import { Routes, Route } from 'react-router'
import { RubricBuilder } from './rubric-builder/RubricBuilder'
import { RubricEditor } from './rubric-editor/RubricEditor'
import { RubricEditorContextProvider } from './rubric-editor/RubricEditorContext'

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
      <Route
        path='edit'
        element={
          <RubricEditorContextProvider>
            <RubricEditor />
          </RubricEditorContextProvider>
        }
      />
    </Routes>
  )
}
