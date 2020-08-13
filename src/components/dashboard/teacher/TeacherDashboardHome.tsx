import React from 'react'
import 'react-calendar/dist/Calendar.css'
import { Route, Routes, useNavigate, useLocation } from 'react-router'
import { LessonsHome } from './lessons/LessonsHome'
import styled from 'styled-components'
import { AssignmentDashboard } from './assignments/AssignmentDashboard'
import { CoursesHome } from './courses/CoursesHome'
import { RubricsDashboard } from './rubrics/RubricsDashboard'
import { TeachersAid } from './teachers-aid/TeachersAid'
import { TeachersAidContextProvider } from './teachers-aid/state/TeachersAidContext'

export const TeacherDashboardHome = () => {
  // const me = useUserContextProvider() as me_me_Teacher
  const navigate = useNavigate()
  const { pathname } = useLocation()

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
      <Routes>
        <Route
          path='teachers-aid'
          element={
            <TeachersAidContextProvider>
              <TeachersAid />
            </TeachersAidContextProvider>
          }
        />
      </Routes>
      {pathname === '/dashboard' && (
        <>
          <button onClick={() => navigate('/dashboard/teachers-aid')}>
            Teacher's Aid
          </button>
          <button onClick={() => navigate('/lesson-home')}>Class Lesson</button>
        </>
      )}
    </TeacherDashboardContainer>
  )
}

const TeacherDashboardContainer = styled.div`
  /* height: 95vh; */
`
