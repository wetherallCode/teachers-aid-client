import React, { useState, useRef } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Modal } from './animations'
import { useUserContextProvider } from './contexts/UserContext'
import { Dashboard } from './dashboard/Dashboard'
import { Home } from './home/Home'
import { Login } from './home/Login'
import { Nav } from './home/Nav'
import { useToggle } from './hooks'
// import { useLocation } from 'react-router'
import {
  Header,
  // DashboardLink,
  HomeLink,
  UserNameHeader,
} from './styled/headerStyles'
import { LoginContainer, LoginToggle } from './styled/homeStyles'
import { capitalizer } from './utils'

export type LoginToggleProps = {
  onClick: () => void
}

function App() {
  const me = useUserContextProvider()
  const [isLoginVisible, toggleLogin] = useToggle(false)
  const [isNavOpen, setIsNavOpen] = useState(false)

  return (
    <div>
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
      </Routes>
    </div>
  )
}

export default App
