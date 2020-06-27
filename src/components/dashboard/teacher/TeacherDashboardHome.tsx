import React from 'react'
import 'react-calendar/dist/Calendar.css'
import { Route, Routes } from 'react-router'
import { LessonsHome } from './lessons/LessonsHome'
import styled from 'styled-components'
import { AssignmentDashboard } from './assignments/AssignmentDashboard'
import { CoursesHome } from './courses/CoursesHome'
import { RubricsDashboard } from './rubrics/RubricsDashboard'

export const TeacherDashboardHome = () => {
  // const me = useUserContextProvider() as me_me_Teacher

  return (
    <TeacherDashboardContainer>
      <Routes>
        <Route path='lessons/*' element={<LessonsHome />} />
      </Routes>
      <Routes>
        <Route path='assignments/*' element={<AssignmentDashboard />} />
      </Routes>
      <Routes>
        <Route path='rubrics/*' element={<RubricsDashboard />} />
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
