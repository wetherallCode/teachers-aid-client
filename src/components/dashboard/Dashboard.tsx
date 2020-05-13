import React from 'react'
import { me_me } from '../../schemaTypes'
import { StudentDashboardHome } from './student/StudentDashboardHome'
import { TeacherDashboardHome } from './teacher/TeacherDashboardHome'
import { Navigate } from 'react-router-dom'
import { useUserContextProvider } from '../../contexts/UserContext'
import styled from 'styled-components'

export const Dashboard = () => {
  const me = useUserContextProvider() as me_me

  return (
    <>
      {!me ? (
        <Navigate to='/' />
      ) : (
        <DashboardContainer>
          {me?.__typename === 'Teacher' && <TeacherDashboardHome />}
          {me?.__typename === 'Student' && <StudentDashboardHome />}
        </DashboardContainer>
      )}
    </>
  )
}

export const DashboardContainer = styled.div`
  /* height: 95vh; */
`
