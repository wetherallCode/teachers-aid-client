import React from 'react'

import { Routes, Route } from 'react-router'
import { SectionBuilder } from './section-builder/SectionBuilder'

export const LessonsHome = () => {
  return (
    <Routes>
      <Route path='section-builder' element={<SectionBuilder />} />
    </Routes>
  )
}
