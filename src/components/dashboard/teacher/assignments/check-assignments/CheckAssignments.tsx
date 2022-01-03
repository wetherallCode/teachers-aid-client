import React from 'react'
import { Route, Routes } from 'react-router'
import { Link } from 'react-router-dom'
import { CheckReadingGuides } from './reading-guides/CheckReadingGuides'

export type CheckAssignmentsProps = {}

export const CheckAssignments = ({}: CheckAssignmentsProps) => {
  return (
    <>
      <div>Check Assignments</div>
      <div>
        <Link to='essays'>Essays</Link>
        <Link to='readingGuides'>Reading Guides</Link>
      </div>
      <Routes>
        <Route path='essays' element={<div>Essays</div>} />
        <Route path='readingGuides' element={<CheckReadingGuides />} />
      </Routes>
    </>
  )
}
