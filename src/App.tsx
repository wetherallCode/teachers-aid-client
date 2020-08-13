import React, { useState, FC } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Modal } from './animations'
import { useUserContextProvider } from './contexts/UserContext'
import { Dashboard } from './components/dashboard/Dashboard'
import { Home } from './components/home/Home'
import { Login } from './components/home/Login'
import { Nav } from './components/home/Nav'
import { useToggle } from './hooks'

import { Header, HomeLink, UserNameHeader } from './styled/headerStyles'
import { LoginContainer, LoginToggle } from './styled/homeStyles'
import { capitalizer } from './utils'
import styled from 'styled-components'
import { me_me } from './schemaTypes'
import { DailyAgendaContextProvider } from './components/lesson/state/DailyAgendaContext'
import { LessonMainMenu } from './components/lesson/LessonMainMenu'

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

  const [isLoginVisible, toggleLogin] = useToggle(false)
  const [isNavOpen, setIsNavOpen] = useState(false)

  return (
    <AppContainer>
      <Header>
        <HomeLink to='/'>MrWetherall.org</HomeLink>
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
        <Route path='' element={<Home />} />
        <Route path='dashboard/*' element={<Dashboard />} />
        <Route
          path='lesson-home'
          element={
            <DailyAgendaContextProvider>
              <LessonMainMenu />
            </DailyAgendaContextProvider>
          }
        />
      </Routes>
    </AppContainer>
  )
}

export default App

const AppContainer = styled.div`
  /* height: 100vh; */
  color: var(--blue);
`
