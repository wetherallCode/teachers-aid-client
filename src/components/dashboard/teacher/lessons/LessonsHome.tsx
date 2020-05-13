import React from 'react'

import { Routes, Route } from 'react-router'
import { SectionBuilder } from './section-builder/SectionBuilder'
import { SectionBuilderContextProvider } from './section-builder/SectionBuilderContext'

export const LessonsHome = () => {
  return (
    <Routes>
      <Route
        path='section-builder'
        element={
          <SectionBuilderContextProvider>
            <SectionBuilder />
          </SectionBuilderContextProvider>
        }
      />
    </Routes>
  )
}
