import React from 'react'
import { me_me_Student } from '../../schemaTypes'
import { useUserContextProvider } from '../../contexts/UserContext'

export const StudentDashboardHome = () => {
  const me = useUserContextProvider() as me_me_Student

  return <div>{me.firstName}</div>
}
