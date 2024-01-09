import React from 'react'
import { Route, Routes } from 'react-router'
import { Link } from 'react-router-dom'
import { CheckEssays } from './essays/CheckEssays'
import { CheckReadingGuides } from './reading-guides/CheckReadingGuides'

export type CheckAssignmentsProps = {}

export const CheckAssignments = ({}: CheckAssignmentsProps) => {
  return (
    <>
      <div>Check Assignments</div>
      <div>
        <Link to="essays">Essays</Link>
        <br />
        <Link to="readingGuides">Reading Guides</Link>
      </div>
      <Routes>
        <Route path="essays" element={<CheckEssays />} />
        <Route path="readingGuides" element={<CheckReadingGuides />} />
      </Routes>
    </>
  )
}
