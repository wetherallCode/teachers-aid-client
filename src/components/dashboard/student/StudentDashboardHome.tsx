import React from 'react'
import { me_me_Student } from '../../../schemaTypes'
import { useUserContextProvider } from '../../../contexts/UserContext'
import { Routes, Route } from 'react-router'
import { StudentAssignments } from './assignments/StudentAssignments'
import { useParams } from 'react-router'

export const StudentDashboardHome = () => {
  // const me: me_me_Student = useUserContextProvider()
  const params = useParams()
  console.log(params)
  return (
    <>
      <Routes>
        <Route path='assignments/*' element={<StudentAssignments />} />
      </Routes>
    </>
  )
}
