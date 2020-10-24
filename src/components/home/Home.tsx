import React, { useState } from 'react'
import {
  HomeScreenTitle,
  GetStartedButton,
  StyledLink,
  HomeScreenContainer,
  PasswordContainer,
  GetStartedButtonContainer,
  GetAssignmentsButton,
} from './homeStyles'
import { useUserContextProvider } from '../../contexts/UserContext'
import { Modal } from '../../animations/Modal'
import { Login } from './Login'
import { useToggle } from '../../hooks'
import { me_me } from '../../schemaTypes'
import { InitialPasswordChange } from './InitialPasswordChange'
import { PasswordCheck } from './PasswordCheck'

export const Home = () => {
  const me: me_me = useUserContextProvider()
  const [isLoginVisible, toggleLogin] = useToggle(false)
  const [passwordCheck, setPasswordCheck] = useState(false)

  const student = me && me.__typename === 'Student'

  return (
    <>
      <HomeScreenContainer>
        <>
          <HomeScreenTitle>Welcome to Mr. Wetherall's Class</HomeScreenTitle>
          <>
            {me ? (
              <>
                {me !== null && (
                  <PasswordCheck me={me} setPasswordCheck={setPasswordCheck} />
                )}
                <PasswordContainer>
                  {!passwordCheck ? (
                    <GetStartedButtonContainer>
                      <StyledLink to='/lesson-home'>
                        <GetStartedButton>Go to Lesson</GetStartedButton>
                      </StyledLink>
                      {student && (
                        <StyledLink to='/dashboard/assignments'>
                          <GetAssignmentsButton>
                            Get Assignments
                          </GetAssignmentsButton>
                        </StyledLink>
                      )}
                    </GetStartedButtonContainer>
                  ) : (
                    <InitialPasswordChange me={me} />
                  )}
                </PasswordContainer>
              </>
            ) : (
              <>
                {!passwordCheck && (
                  <PasswordContainer>
                    <GetStartedButton onClick={toggleLogin}>
                      Get Started
                    </GetStartedButton>
                  </PasswordContainer>
                )}
              </>
            )}
          </>
        </>
      </HomeScreenContainer>
      <Modal isToggled={isLoginVisible} setIsToggled={toggleLogin}>
        <Login toggleLogin={toggleLogin} />
      </Modal>
    </>
  )
}
