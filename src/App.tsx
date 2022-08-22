import React, { useState, FC, useEffect } from 'react'
import { Route, Routes, useNavigate, useParams } from 'react-router-dom'
import { Modal } from './animations'
import { useUserContextProvider } from './contexts/UserContext'
import { Dashboard } from './components/dashboard/Dashboard'
import { Home } from './components/home/Home'
import { Login } from './components/home/Login'
import { Nav } from './navigation/Nav'
import { useToggle } from './hooks'
import {
  Header,
  HomeLink,
  UserNameHeader,
} from './components/home/headerStyles'
import { LoginContainer, LoginToggle } from './components/home/homeStyles'
import { capitalizer, date } from './utils'
import styled from 'styled-components'
import { DailyAgendaContextProvider } from './components/lesson/state-n-styles/DailyAgendaContext'
import { LessonMainMenu } from './components/lesson/LessonMainMenu'
import { useQuery } from '@apollo/client'
import { FIND_CURRENT_SCHOOL_DAY_QUERY } from './components/dashboard/school-day/SchoolDay'
import { useSchoolDayContextProvider } from './components/dashboard/school-day/state/SchoolDayContext'
import { ProblemAndSolutionGuide } from './components/resources/ProblemAndSolutionGuide'
import {
  findCurrentSchoolDay,
  findCurrentSchoolDayVariables,
  me_me,
  me_me_Student,
} from './schemaTypes'
import { UpdateUserActivity } from './components/home/UpdateUserActivity'
import { TodaysLessonPlan } from './components/lesson/TodaysLessonPlan'
import { StudentBehavior } from './components/dashboard/student/behavior/StudentBehavior'
import { useLocation } from 'react-router'

export type LoginToggleProps = {
  onClick: () => void
}

export type ErrorFallbackProps = { error: any }

export const ErrorFallback: FC<ErrorFallbackProps> = ({ error }) => {
  return (
    <div role='alert'>
      <p>Something went wrong:</p>
      <pre style={{ color: 'red' }}>{error.message}</pre>
    </div>
  )
}

function App() {
  const me: me_me = useUserContextProvider()
  const nav = useNavigate()
  const location = useLocation()
  console.log(location)
  const [, event] = useSchoolDayContextProvider()
  const [, setCurrentSchoolDay] = useSchoolDayContextProvider()
  // console.log(me.isActive)
  const { data, loading } = useQuery<
    findCurrentSchoolDay,
    findCurrentSchoolDayVariables
  >(FIND_CURRENT_SCHOOL_DAY_QUERY, {
    variables: {
      input: { date: date },
    },
    onCompleted: (data) => {
      if (data.findSchoolDayByDate.schoolDay)
        setCurrentSchoolDay({
          type: 'SET_TODAYS_SCHOOL_DAY',
          payload: data?.findSchoolDayByDate?.schoolDay!,
        })
    },
    onError: (error) => console.error(error),
  })
  const [isLoginVisible, toggleLogin] = useToggle(false)
  const [isNavOpen, setIsNavOpen] = useState(false)
  // const student = me.__typename === 'Student' && me !== null ? me : null

  useEffect(() => {
    if (!me) nav('/')
    if (location.pathname === '/' && me) nav('/dashboard')
  }, [me])
  return (
    <AppContainer>
      <Header>
        {/* {me && <UpdateUserActivity userId={me._id!} />} */}
        <HomeLink to='/dashboard'>
          {location.pathname !== '/dashboard'
            ? `←Back to Home Screen`
            : 'MrWetherall.org'}
        </HomeLink>
        <LoginContainer>
          {!me ? (
            <LoginToggle onClick={toggleLogin}>Login</LoginToggle>
          ) : (
            <UserNameHeader onClick={() => setIsNavOpen(true)}>
              {me.__typename === 'Teacher'
                ? `${capitalizer(me?.title) + '. ' + me?.lastName}`
                : me.firstName}
            </UserNameHeader>
          )}

          <Modal isToggled={isLoginVisible} setIsToggled={toggleLogin}>
            <Login toggleLogin={toggleLogin} />
          </Modal>
        </LoginContainer>
      </Header>
      {me !== null && (
        <Nav
          isNavOpen={isNavOpen}
          setIsNavOpen={setIsNavOpen}
          toggleLogin={toggleLogin}
          me={me}
        />
      )}

      <Routes>
        {/* <Route path='' element={<Home />} /> */}
        <Route path='dashboard/*' element={<Dashboard />} />
        {/* {!me ? (
          <Navigate to='/' />
        ) : ( */}
        {me && (
          <Route
            path='lesson-home'
            element={
              <DailyAgendaContextProvider>
                <LessonMainMenu />
              </DailyAgendaContextProvider>
            }
          />
        )}
        {/* {me && (
          <Route path='behavior-home' element={<StudentBehavior me={me} />} />
        )} */}
        <Route
          path='/problem-solution-guide/*'
          element={<ProblemAndSolutionGuide />}
        />
      </Routes>
    </AppContainer>
  )
}

export default App

const AppContainer = styled.div`
  /* height: 100vh; */
  color: var(--blue);
  background-color: var(--white);
`
