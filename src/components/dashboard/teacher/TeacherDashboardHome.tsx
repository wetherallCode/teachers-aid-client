import React from 'react'

// import { me_me_Teacher } from '../../../schemaTypes'
// import { useUserContextProvider } from '../../../contexts/UserContext'
import 'react-calendar/dist/Calendar.css'
import { Route, Routes } from 'react-router'
import { LessonsHome } from './lessons/LessonsHome'
import styled from 'styled-components'
import { AssignmentHome } from './assignments/AssignmentHome'
import { CoursesHome } from './courses/CoursesHome'

export const TeacherDashboardHome = () => {
  // const me = useUserContextProvider() as me_me_Teacher

  return (
    <TeacherDashboardContainer>
      <Routes>
        <Route path='lessons/*' element={<LessonsHome />} />
      </Routes>
      <Routes>
        <Route path='assignments/*' element={<AssignmentHome />} />
      </Routes>
      <Routes>
        <Route path='courses/*' element={<CoursesHome />} />
      </Routes>
    </TeacherDashboardContainer>
  )
}

const TeacherDashboardContainer = styled.div`
  /* height: 95vh; */
`
