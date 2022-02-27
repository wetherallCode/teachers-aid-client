import React, { useEffect } from 'react'
import { me_me } from '../../schemaTypes'
import { StudentDashboardHome } from './student/StudentDashboardHome'
import { TeacherDashboardHome } from './teacher/TeacherDashboardHome'
import { Navigate, useNavigate } from 'react-router-dom'
import { useUserContextProvider } from '../../contexts/UserContext'
import styled from 'styled-components'

export const Dashboard = () => {
  const me: me_me = useUserContextProvider()
  const nav = useNavigate()
  useEffect(() => {
    if (!me) nav('/')
  }, [me])
  return (
    <>
      {/* {!me ? (
        <Navigate to='/' />
      ) : ( */}
      {me && (
        <DashboardContainer>
          {me?.__typename === 'Teacher' && <TeacherDashboardHome />}
          {me?.__typename === 'Student' && <StudentDashboardHome />}
        </DashboardContainer>
      )}
      {/* )} */}
    </>
  )
}

export const DashboardContainer = styled.div`
  /* height: 95vh; */
`
