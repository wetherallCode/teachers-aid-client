import React from 'react'
import {
  HomeScreenTitle,
  MainScreen,
  GetStartedButton,
  StyledLink,
  HomeScreenContainer,
} from '../styled/homeStyles'

export const Home = () => {
  return (
    <>
      <HomeScreenContainer>
        <MainScreen>
          <HomeScreenTitle>Welcome to Mr. Wetherall's Class</HomeScreenTitle>
          <StyledLink to='/website'>
            <GetStartedButton>Get Started</GetStartedButton>
          </StyledLink>
        </MainScreen>
      </HomeScreenContainer>
    </>
  )
}
