import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { LessonCalendar } from './LessonCalendar'
import { LessonFinderContainer } from './state-n-styles/lessonFinderStyles'

export type LessonFinderProps = {}

export const LessonFinder: FC<LessonFinderProps> = () => {
  return (
    <LessonFinderContainer>
      <LessonCalendar />
      <OptionsContainer>
        <OptionsLink to="section-builder">Section Builder</OptionsLink>
        <OptionsLink to="section-editor">Section Editor</OptionsLink>
        <OptionsLink to="essay-question">Essay Builder</OptionsLink>
      </OptionsContainer>
    </LessonFinderContainer>
  )
}

const OptionsContainer = styled.div`
  height: 25vh;
  display: grid;
  grid-auto-flow: column;
  grid-gap: 1vh;
  padding: 2vh;
`
const OptionsLink = styled(Link)`
  display: grid;
  grid-template-rows: 1fr 1fr;
  border: 1px solid var(--blue);
  border-radius: 10px;
  justify-items: center;
  align-items: center;
  text-decoration: none;
  color: var(--blue);
  font-size: 3vh;
  :hover {
    box-shadow: 2px 2px 2px var(--blue);
  }
`
