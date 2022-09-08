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
      </DoubleSidedContentContainer>
    </>
  )
}
