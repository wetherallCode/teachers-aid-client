import React, { FC, useEffect } from 'react'
import { useCompletedEssayContextProvider } from '../../state/CompletedEssayContext'
import { BasicQuestionEnum } from '../../../../../../../../schemaTypes'
import { UpdateDevelopingOrganizerType } from './DevelopingOrganizer'
import {
  QuestionTypeContainer,
  QuestionTypeQuestionStyle,
  QuestionTypeAnswerSelectStyle,
  PartsOfQuestionContainer,
  PartsOfQuestionTitle,
  PartContainer,
  PartInput,
  OrganizerControlButtonContainer,
  OrganizerControlButton,
} from '../../../assigned-essays/state-and-styles/assignedEssayStyles'

export type DevelopingRestatementProps = {
  updateDevelopingOrganizer: UpdateDevelopingOrganizerType
}

export const DevelopingRestatement: FC<DevelopingRestatementProps> = ({
  updateDevelopingOrganizer,
}) => {
  const [state, event] = useCompletedEssayContextProvider()

  useEffect(() => {
    updateDevelopingOrganizer()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    state.context.developingOrganizer,
    updateDevelopingOrganizer,
    // state.context.developingOrganizer.developingSentenceStructure,
    // state.context.developingOrganizer.restatement,
    // state.context.developingOrganizer.questionType,
  ])

  return (
    <>
      <QuestionTypeContainer>
        <QuestionTypeQuestionStyle>
          What is the Question Type:
        </QuestionTypeQuestionStyle>
        <QuestionTypeAnswerSelectStyle
          autoFocus={true}
          value={state.context.developingOrganizer.questionType}
          onChange={(e: any) => {
            if (e.target.value !== 'none')
              event({
                type: 'SET_BASIC_QUESTION_TYPE',
                payload: e.target.value,
              })
          }}
        >
          <option value={'none'}>Pick a Question Type</option>
          <option value={BasicQuestionEnum.HOW}>How</option>
          <option value={BasicQuestionEnum.WHY}>Why</option>
        </QuestionTypeAnswerSelectStyle>
      </QuestionTypeContainer>
      <PartsOfQuestionContainer>
        <PartsOfQuestionTitle>
          Identify the Parts of the Question:
        </PartsOfQuestionTitle>
        <PartContainer>
          <div>What is the Subject of the question: </div>
          <PartInput
            value={
              state.context.developingOrganizer.developingSentenceStructure
                .subject
            }
            onChange={(e: any) =>
              event({
                type: 'SET_DEVELOPING_SENTENCE_STRUCTURE_SUBJECT',
                payload: e.target.value,
              })
            }
          />
        </PartContainer>
        <PartContainer>
          <div>What is the Verb of the question: </div>
          <PartInput
            value={
              state.context.developingOrganizer.developingSentenceStructure.verb
            }
            onChange={(e: any) =>
              event({
                type: 'SET_DEVELOPING_SENTENCE_STRUCTURE_VERB',
                payload: e.target.value,
              })
            }
          />
        </PartContainer>
      </PartsOfQuestionContainer>
      <OrganizerControlButtonContainer>
        <OrganizerControlButton onClick={() => event({ type: 'RESTATEMENT' })}>
          Next
        </OrganizerControlButton>
      </OrganizerControlButtonContainer>
    </>
  )
}
