import React from 'react'
import {
  ContentContainerTitle,
  DisplayTitle,
  DoubleSidedContentContainer,
  IndividualContentContainer,
} from './handbookStyles'

export type TextAnalysisProps = {}

export const TextAnalysis = ({}: TextAnalysisProps) => {
  return (
    <>
      <DisplayTitle>Text Analysis Help</DisplayTitle>
      <DoubleSidedContentContainer style={{ fontSize: '2vh' }}>
        <IndividualContentContainer>
          <ContentContainerTitle>Directions</ContentContainerTitle>
          <ul>
            <li>
              While working in groups, students will markup text and construct
              main ideas using specific text structures.
            </li>
            <br />
            <li>
              Students will be use the class website to look up vocabulary, and
              directions for making main ideas.
            </li>
            <br />
            <li>
              Students will have to be reliant on their group more than the
              teacher.
            </li>
          </ul>
        </IndividualContentContainer>
        <IndividualContentContainer>
          <ContentContainerTitle>Grading</ContentContainerTitle>
          <ul>
            <li>
              The grade will be determined by completing the total amount of
              paragraphs in the assigned sections.
            </li>
            <br />
            <li>
              Students can lose points for being slow to start, not working well
              with the group, or being off task
            </li>
            <br />
            <li>
              The assignment will count as a Processes grade and will be
              averaged in with quizzes and reading guides.
            </li>
          </ul>
        </IndividualContentContainer>
      </DoubleSidedContentContainer>
    </>
  )
}
