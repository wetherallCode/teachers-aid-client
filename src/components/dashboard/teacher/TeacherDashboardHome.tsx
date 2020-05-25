import React from 'react'

// import { me_me_Teacher } from '../../../schemaTypes'
// import { useUserContextProvider } from '../../../contexts/UserContext'
import 'react-calendar/dist/Calendar.css'
import { Route, Routes } from 'react-router'
import { LessonsHome } from './lessons/LessonsHome'
import styled from 'styled-components'

export const TeacherDashboardHome = () => {
  // const me = useUserContextProvider() as me_me_Teacher

  return (
    <TeacherDashboardContainer>
      <Routes>
        <Route path='lessons/*' element={<LessonsHome />} />
      </Routes>
    </TeacherDashboardContainer>
  )
}

const TeacherDashboardContainer = styled.div`
  /* height: 95vh; */
`
