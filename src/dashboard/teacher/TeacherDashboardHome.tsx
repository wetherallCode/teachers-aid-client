import React from 'react'
import Calendar from 'react-calendar'
import { me_me_Teacher } from '../../schemaTypes'
import { useUserContextProvider } from '../../contexts/UserContext'
import 'react-calendar/dist/Calendar.css'
import { Route, Routes } from 'react-router'
import { LessonsHome } from './lessons/LessonsHome'

export const TeacherDashboardHome = () => {
  const me = useUserContextProvider() as me_me_Teacher

  return (
    <div>
      <Routes>
        <Route path='lessons/*' element={<LessonsHome />} />
      </Routes>
    </div>
  )
}
