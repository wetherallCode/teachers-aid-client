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
          <ContentContainerTitle>Cause and Effect</ContentContainerTitle>
          <ul>After reading the paragraph and underlining the actions:</ul>
          <ul>
            <li>
              For each action, ask your self: Why did that action happen? If
              there is another action in the paragraph (or one of the paragraphs
              that came before) that made it happen; that is the cause.
              <ul>
                <li>
                  One cause may have many effects, so don't think it is always
                  one cause to an effect.
                </li>
              </ul>
              <li>
                Use that cause and effect relationship to form your main idea
                for that paragraph, and write it in your agenda.
              </li>
            </li>
          </ul>
        </IndividualContentContainer>
        <IndividualContentContainer>
          <ContentContainerTitle>Problem and Solution</ContentContainerTitle>
          <ul>After reading the paragraphs and underlining the actions:</ul>
          <ul>
            <li>
              If there is no obvious cause and effect, look for problems and/or
              solutions.
            </li>
            <ul>
              <li>
                Problems are things that get in the way of people's goals.
              </li>
            </ul>
            <li>
              For your main idea, explain what is getting in the way of people's
              goals
            </li>
            <li>
              If you can (when the paragraph presents the information), include
              the problem and solution.
            </li>
          </ul>
        </IndividualContentContainer>
      </DoubleSidedContentContainer>
    </>
  )
}
