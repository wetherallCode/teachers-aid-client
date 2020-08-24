import styled from 'styled-components'

export const LessonMainMenuContainer = styled.div`
  grid-template-rows: 1fr 1fr;
  height: 47.5vh;
`

export const GreetingsContainer = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  height: 100%;
  font-size: 3rem;
`

export const LessonSelectorContainer = styled.div`
  grid-template-columns: 1fr 1fr;
  font-size: 2rem;
  height: 100%;
  display: grid;
  justify-items: center;
  align-items: center;
`

export const CurrentLessonContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr 2fr 2fr;
`

export const CurrentLesson = styled.div`
  font-size: 1.8rem;
  text-decoration: underline;
  justify-self: center;
`
export const LessonNameStyle = styled.div`
  font-size: 1.3rem;
  justify-self: center;
  align-self: center;
`
export const GoToLessonButton = styled.button`
  font-size: 1.1rem;
  border-radius: 5px;
  height: 55%;
  width: 75%;
  justify-self: center;
  background-color: var(--blue);
  color: var(--white);
`
