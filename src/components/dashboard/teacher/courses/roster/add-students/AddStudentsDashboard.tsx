import React, { FC } from 'react'

import { Routes, Route } from 'react-router'
import { AddStudents } from './AddStudents'

export type AddStudentsProps = {}

export const AddStudentsDashboard: FC<AddStudentsProps> = () => {
  return (
    <>
      <Routes>
        <Route path='add-student' element={<AddStudents />} />
      </Routes>
    </>
  )
}
