import React, { useEffect, useState } from 'react'
import {
  HomeScreenTitle,
  MainScreen,
  GetStartedButton,
  StyledLink,
  HomeScreenContainer,
} from './homeStyles'
import { useUserContextProvider } from '../../contexts/UserContext'
import { Modal } from '../../animations/Modal'
import { Login } from './Login'
import { useToggle } from '../../hooks'
import { me_me, passwordCheck, passwordCheckVariables } from '../../schemaTypes'
import { gql, useQuery, useLazyQuery } from '@apollo/client'
import { InitialPasswordChange } from './InitialPasswordChange'
import { PasswordCheck } from './PasswordCheck'

export const Home = () => {
  const me: me_me = useUserContextProvider()
  const [isLoginVisible, toggleLogin] = useToggle(false)
  const [isPasswordChangeVisible, togglePasswordChange] = useToggle(false)
  const [passwordCheck, setPasswordCheck] = useState(false)

  // useEffect(() => {
  //   if (isPasswordChangeVisible) {
  //   }
  // }, [input])
  return (
    <>
      <HomeScreenContainer>
        <MainScreen>
          <HomeScreenTitle>Welcome to Mr. Wetherall's Class</HomeScreenTitle>
          {me ? (
            <>
              {me !== null && (
                <PasswordCheck me={me} setPasswordCheck={setPasswordCheck} />
              )}
              <>
                {!passwordCheck && (
                  <StyledLink to='/lesson-home'>
                    <GetStartedButton>Go to Lesson</GetStartedButton>
                  </StyledLink>
                )}
              </>
            </>
          ) : (
            <>
              {!passwordCheck && (
                <GetStartedButton onClick={toggleLogin}>
                  Get Started
                </GetStartedButton>
              )}
            </>
          )}
          {passwordCheck && <InitialPasswordChange me={me} />}
        </MainScreen>
      </HomeScreenContainer>
      <Modal isToggled={isLoginVisible} setIsToggled={toggleLogin}>
        <Login toggleLogin={toggleLogin} />
      </Modal>
    </>
  )
}
