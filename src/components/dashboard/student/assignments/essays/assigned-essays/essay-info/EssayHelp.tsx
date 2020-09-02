import React, { FC } from 'react'
import {
  EssayInfoTitle,
  EssayInfoBody,
  EssaySectionOrganizationBodyEntry,
} from '../state-and-styles/essayInfoStyles'
import { useStudentEssayContextProvider } from '../state-and-styles/StudentEssayContext'

export type EssayHelpProps = {}

export const EssayHelp: FC<EssayHelpProps> = () => {
  const [state] = useStudentEssayContextProvider()

  return (
    <>
      <EssayInfoTitle>Help with Your Essay</EssayInfoTitle>
      <EssayInfoBody>
        {state.matches('organizers.developingOrganizer.identifications') && (
          <ul>
            <EssaySectionOrganizationBodyEntry>
              Developing IDs
            </EssaySectionOrganizationBodyEntry>
          </ul>
        )}
        {state.matches('organizers.developingOrganizer.restatement') && (
          <ul>
            <EssaySectionOrganizationBodyEntry>
              Developing Restatement
            </EssaySectionOrganizationBodyEntry>
          </ul>
        )}
        {state.matches('organizers.developingOrganizer.answer') && (
          <ul>
            <EssaySectionOrganizationBodyEntry>
              Developing Answer
            </EssaySectionOrganizationBodyEntry>
          </ul>
        )}
        {state.matches('organizers.developingOrganizer.conclusion') && (
          <ul>
            <EssaySectionOrganizationBodyEntry>
              Developing Conclusion
            </EssaySectionOrganizationBodyEntry>
          </ul>
        )}
        {state.matches('organizers.academicOrganizer.restatement') && (
          <ul>
            <EssaySectionOrganizationBodyEntry>
              Academic Restatement
            </EssaySectionOrganizationBodyEntry>
          </ul>
        )}
        {state.matches('organizers.academicOrganizer.answer.questionType') && (
          <ul>
            <EssaySectionOrganizationBodyEntry>
              Academic QuestionType
            </EssaySectionOrganizationBodyEntry>
          </ul>
        )}
        {state.matches(
          'organizers.academicOrganizer.answer.problemSolution'
        ) && (
          <ul>
            <EssaySectionOrganizationBodyEntry>
              Academic Problem Solution
            </EssaySectionOrganizationBodyEntry>
          </ul>
        )}
        {state.matches(
          'organizers.academicOrganizer.answer.whyCauseEffect'
        ) && (
          <ul>
            <EssaySectionOrganizationBodyEntry>
              Academic whyCauseEffect
            </EssaySectionOrganizationBodyEntry>
          </ul>
        )}
        {state.matches(
          'organizers.academicOrganizer.answer.howCauseEffect'
        ) && (
          <ul>
            <EssaySectionOrganizationBodyEntry>
              Academic howCauseEffect
            </EssaySectionOrganizationBodyEntry>
          </ul>
        )}
        {state.matches('organizers.academicOrganizer.conclusion') && (
          <ul>
            <EssaySectionOrganizationBodyEntry>
              Academic Conclusion
            </EssaySectionOrganizationBodyEntry>
          </ul>
        )}
        {state.matches('organizers.advancedOrganizer.restatement') && (
          <ul>
            <EssaySectionOrganizationBodyEntry>
              Advanced Restatement
            </EssaySectionOrganizationBodyEntry>
          </ul>
        )}
        {state.matches('organizers.advancedOrganizer.answer.questionType') && (
          <ul>
            <EssaySectionOrganizationBodyEntry>
              Advanced QuestionType
            </EssaySectionOrganizationBodyEntry>
          </ul>
        )}
        {state.matches(
          'organizers.advancedOrganizer.answer.problemSolution'
        ) && (
          <ul>
            <EssaySectionOrganizationBodyEntry>
              Advanced Problem Solution
            </EssaySectionOrganizationBodyEntry>
          </ul>
        )}
        {state.matches(
          'organizers.advancedOrganizer.answer.whyCauseEffect'
        ) && (
          <ul>
            <EssaySectionOrganizationBodyEntry>
              Advanced whyCauseEffect
            </EssaySectionOrganizationBodyEntry>
          </ul>
        )}
        {state.matches(
          'organizers.advancedOrganizer.answer.howCauseEffect'
        ) && (
          <ul>
            <EssaySectionOrganizationBodyEntry>
              Advanced howCauseEffect
            </EssaySectionOrganizationBodyEntry>
          </ul>
        )}
        {state.matches('organizers.advancedOrganizer.conclusion') && (
          <ul>
            <EssaySectionOrganizationBodyEntry>
              Advanced Conclusion
            </EssaySectionOrganizationBodyEntry>
          </ul>
        )}
        {state.matches('workingDraft') && (
          <ul>
            {state.context.writingLevel === 'DEVELOPING' && (
              <EssaySectionOrganizationBodyEntry>
                Developing Rubric Help
              </EssaySectionOrganizationBodyEntry>
            )}
            {state.context.writingLevel === 'ACADEMIC' && (
              <EssaySectionOrganizationBodyEntry>
                Academic Rubric Help
              </EssaySectionOrganizationBodyEntry>
            )}
            {state.context.writingLevel === 'ADVANCED' && (
              <EssaySectionOrganizationBodyEntry>
                Advanced Rubric Help
              </EssaySectionOrganizationBodyEntry>
            )}
          </ul>
        )}
      </EssayInfoBody>
    </>
  )
}
