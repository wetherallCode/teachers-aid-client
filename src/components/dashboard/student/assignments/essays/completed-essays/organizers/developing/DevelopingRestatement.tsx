import React, { FC, useEffect } from 'react'
import { useCompletedEssayContextProvider } from '../../CompletedEssayContext'
import { BasicQuestionEnum } from '../../../../../../../../schemaTypes'
import { UpdateDevelopingOrganizerType } from './DevelopingOrganizer'

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
    state.context.developingOrganizer.developingSentenceStructure,
    state.context.developingOrganizer.restatement,
    state.context.developingOrganizer.questionType,
  ])

  return (
    <>
      <span>What is the Question Type:</span>
      <span>
        <select
          value={state.context.developingOrganizer.questionType}
          onChange={(e: any) => {
            if (e.target.value !== 'Pick a Question Type')
              event({
                type: 'SET_BASIC_QUESTION_TYPE',
                payload: e.target.value,
              })
          }}
        >
          <option value={undefined}>Pick a Question Type</option>
          <option value={BasicQuestionEnum.HOW}>How</option>
          <option value={BasicQuestionEnum.WHY}>Why</option>
        </select>
      </span>
      <div>Set the Parts of the Question</div>
      <span>What is the Subject of the question: </span>
      <span>
        <input
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
      </span>
      <span>What is the Verb of the question: </span>
      <span>
        <input
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
      </span>
      <>
        <div>Restate the Question in the form of a statement</div>
        <input
          value={state.context.developingOrganizer.restatement}
          onChange={(e: any) =>
            event({ type: 'SET_RESTATEMENT', payload: e.target.value })
          }
        />
      </>
    </>
  )
}
