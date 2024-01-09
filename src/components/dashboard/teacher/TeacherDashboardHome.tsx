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
import { SchoolDay } from '../school-day/SchoolDay'
import { SchoolDayContextProvider } from '../school-day/state/SchoolDayContext'
import { ParentContacts } from './parent-contact/ParentContacts'
import { StudentInformation } from './student-information/StudentInformation'
import { StudentInformationContextProvider } from './student-information/state-n-styles/StudentInformationContext'
import { DevelopmentHome } from './development/DevelopmentHome'
import { BehaviorHome } from './behaviors/BehaviorHome'
import {
  TeacherDashboardContainer,
  TeacherDirectoryOptions,
  TeacherDirectoryOptionsLink,
  TeacherHomeScreenOptionsContainer,
} from './teacherDashboardStyles'
import { ButtonBox, HomeScreenTitle, LogoutOption } from '../../home/homeStyles'
import { Greetings } from '../../home/Greetings'
import { useUserContextProvider } from '../../../contexts/UserContext'
import { logout, me_me_Teacher } from '../../../schemaTypes'
import { capitalizer } from '../../../utils'
import { useTeacherNavContextProvider } from '../../../navigation/teacher-nav/TeacherNavContext'
import { useMutation } from '@apollo/client'
import { LOGOUT_MUTATION } from '../../home/Logout'
import { useToggle } from '../../../hooks'
// import { TeacherDashboardContainer } from './'

export const TeacherDashboardHome = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const me: me_me_Teacher = useUserContextProvider()
  const [isLoginVisible, toggleLogin] = useToggle(false)
  const [state, event] = useTeacherNavContextProvider()
  const [logoutMutation, { loading }] = useMutation<logout>(LOGOUT_MUTATION, {
    onCompleted: () => {
      toggleLogin()
    },
    refetchQueries: ['me'],
  })

  return (
    <>
      {pathname === '/dashboard' && (
        <TeacherDashboardContainer>
          <HomeScreenTitle>
            <ButtonBox onClick={() => navigate('teachers-aid')}>
              Teacher's Aid
            </ButtonBox>
            <div>
              <Greetings
                phrase={
                  me.__typename === 'Teacher'
                    ? `${capitalizer(me.title)}. ${me.lastName}`
                    : `${me.firstName}`
                }
              />
              <div style={{ textAlign: 'center' }}>
                It's {new Date().toLocaleDateString()}
              </div>
            </div>
            <ButtonBox onClick={() => navigate('/lesson-home')}>
              Today's Lessons
            </ButtonBox>
          </HomeScreenTitle>
          <TeacherHomeScreenOptionsContainer>
            <TeacherDirectoryOptions style={{ fontSize: '2vh' }}>
              <SchoolDay />
            </TeacherDirectoryOptions>
            <TeacherDirectoryOptionsLink
              to="assignments"
              onClick={() => event({ type: 'ASSIGNMENTS' })}
            >
              Assignments
            </TeacherDirectoryOptionsLink>
            <TeacherDirectoryOptionsLink
              to="courses"
              onClick={() => event({ type: 'COURSES' })}
            >
              Courses
            </TeacherDirectoryOptionsLink>
            <TeacherDirectoryOptionsLink
              to="lessons"
              onClick={() => event({ type: 'LESSONS' })}
            >
              Lessons
            </TeacherDirectoryOptionsLink>
            <TeacherDirectoryOptionsLink
              to="studentInformation"
              onClick={() => event({ type: 'STUDENT_INFORMATION' })}
            >
              Student Information
            </TeacherDirectoryOptionsLink>
            <TeacherDirectoryOptionsLink
              to="parentContacts"
              onClick={() => event({ type: 'PARENT_CONTACTS' })}
            >
              Parent Contacts
            </TeacherDirectoryOptionsLink>
            <TeacherDirectoryOptionsLink
              to="behavior/edit-behavior"
              onClick={() => event({ type: 'BEHAVIOR' })}
            >
              Behaviors
            </TeacherDirectoryOptionsLink>
            <TeacherDirectoryOptionsLink
              to="rubrics"
              onClick={() => event({ type: 'RUBRICS' })}
            >
              Rubrics
            </TeacherDirectoryOptionsLink>
            <LogoutOption onClick={() => logoutMutation()}>
              {loading ? 'Logging Out...' : 'Logout'}
            </LogoutOption>
          </TeacherHomeScreenOptionsContainer>
        </TeacherDashboardContainer>
      )}
      <Routes>
        <Route path="schoolDay/*" element={<SchoolDay />} />
      </Routes>
      <Routes>
        <Route path="lessons/*" element={<LessonsHome />} />
      </Routes>
      <Routes>
        <Route path="assignments/*" element={<AssignmentDashboard />} />
      </Routes>
      <Routes>
        <Route path="rubrics/*" element={<RubricsDashboard />} />
      </Routes>
      <Routes>
        <Route path="courses/*" element={<CoursesHome />} />
      </Routes>
      <Routes>
        <Route
          path="teachers-aid"
          element={
            <TeachersAidContextProvider>
              <TeachersAid />
            </TeachersAidContextProvider>
          }
        />
      </Routes>
      {/* {pathname === '/dashboard' && <SchoolDay />} */}
      <Routes>
        <Route
          path="studentInformation/*"
          element={
            <StudentInformationContextProvider>
              <StudentInformation />
            </StudentInformationContextProvider>
          }
        />
      </Routes>
      <Routes>
        <Route path="parentContacts/*" element={<ParentContacts />} />
      </Routes>
      <Routes>
        <Route path="behavior/*" element={<BehaviorHome />} />
      </Routes>
      <Routes>
        <Route path="development/*" element={<DevelopmentHome />} />
      </Routes>
    </>
  )
}
