import React, { useState } from 'react'
import {
  HomeScreenTitle,
  GetStartedButton,
  StyledLink,
  HomeScreenContainer,
  PasswordContainer,
  // GetStartedButtonContainer,
  // GetAssignmentsButton,
  StudentHomeScreenOptions,
  StudentHomeScreenOptionsContainer,
  OptionTitle,
  StudentOptionsLinkButton,
  LogoutOption,
} from './homeStyles'
import { useUserContextProvider } from '../../contexts/UserContext'
import { Modal } from '../../animations/Modal'
import { Login } from './Login'
import { useToggle } from '../../hooks'
import { logout, me_me } from '../../schemaTypes'
import { InitialPasswordChange } from './InitialPasswordChange'
import { PasswordCheck } from './PasswordCheck'
import { StudentGradeDisplay } from './StudentGradeDisplay'
import { Greetings } from './Greetings'
import { capitalizer } from '../../utils'
import { useMutation } from '@apollo/client'
import { LOGOUT_MUTATION } from './Logout'
import { TodaysLessonPlan } from '../lesson/TodaysLessonPlan'
import { DailyAgendaContextProvider } from '../lesson/state-n-styles/DailyAgendaContext'

export const Home = () => {
  const me: me_me = useUserContextProvider()
  const [hasLessonNow, setHasLessonNow] = useState(false)

  const [isLoginVisible, toggleLogin] = useToggle(false)
  const [passwordCheck, setPasswordCheck] = useState(false)

  const student = me && me.__typename === 'Student'
  const teacher = me && me.__typename === 'Teacher'
  const [logoutMutation, { loading }] = useMutation<logout>(LOGOUT_MUTATION, {
    onCompleted: () => {
      toggleLogin()
    },
    refetchQueries: ['me'],
  })

  const lessonLink = hasLessonNow ? 'lesson-home' : ''

  return (
    <HomeScreenContainer>
      {me ? (
        <>
          {me !== null && (
            <PasswordCheck me={me} setPasswordCheck={setPasswordCheck} />
          )}

          {!passwordCheck ? (
            <>
              <HomeScreenTitle>
                <Greetings
                  phrase={
                    me.__typename === 'Teacher'
                      ? `${capitalizer(me.title)}. ${me.lastName}`
                      : `${me.firstName}`
                  }
                />
              </HomeScreenTitle>
              {student && (
                <div></div>
                // <StudentHomeScreenOptionsContainer>
                //   <StudentHomeScreenOptions to={lessonLink}>
                //     <OptionTitle>Today's Lesson Plan</OptionTitle>
                //     <DailyAgendaContextProvider>
                //       <TodaysLessonPlan setHasLessonNow={setHasLessonNow} />
                //     </DailyAgendaContextProvider>
                //     {/* <StyledLink to='/lesson-home'>
                //       <StudentOptionsLinkButton>Go</StudentOptionsLinkButton>
                //     </StyledLink> */}
                //   </StudentHomeScreenOptions>

                //   <StudentHomeScreenOptions to='/dashboard/assignments'>
                //     <OptionTitle>Get Assignments</OptionTitle>
                //     {/* <StyledLink to='/dashboard/assignments'>
                //       <StudentOptionsLinkButton>Go</StudentOptionsLinkButton>
                //     </StyledLink> */}
                //   </StudentHomeScreenOptions>
                //   <StudentHomeScreenOptions to=''>
                //     {me && me.__typename === 'Student' && (
                //       <StudentGradeDisplay studentId={me._id!} />
                //     )}
                //   </StudentHomeScreenOptions>
                //   <StudentHomeScreenOptions to='behavior-home'>
                //     <OptionTitle>How did I do Today?</OptionTitle>
                //   </StudentHomeScreenOptions>
                //   <StudentHomeScreenOptions to=''>
                //     5th Box
                //   </StudentHomeScreenOptions>
                //   <LogoutOption onClick={() => logoutMutation()}>
                //     {loading ? 'Logging Out...' : 'Logout'}
                //   </LogoutOption>
                // </StudentHomeScreenOptionsContainer>
              )}
              {teacher && <div>Teacher</div>}
            </>
          ) : (
            <InitialPasswordChange me={me} />
          )}
        </>
      ) : (
        <>
          {!passwordCheck && (
            // <PasswordContainer>
            <>
              <HomeScreenTitle>
                Welcome to Mr. Wetherall's Class
              </HomeScreenTitle>

              <GetStartedButton onClick={toggleLogin}>Login</GetStartedButton>
            </>
            // </PasswordContainer>
          )}
        </>
      )}

      <Modal isToggled={isLoginVisible} setIsToggled={toggleLogin}>
        <Login toggleLogin={toggleLogin} />
      </Modal>
    </HomeScreenContainer>
  )
}
