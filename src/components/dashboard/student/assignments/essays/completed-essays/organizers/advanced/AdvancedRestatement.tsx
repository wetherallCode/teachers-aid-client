import React, { FC, useEffect } from 'react'
import { UpdateAdvancedOrganizerType } from './AdvancedOrganizer'
import { useCompletedEssayContextProvider } from '../../state/CompletedEssayContext'

export type AdvancedRestatementProps = {
  updateAdvancedOrganizer: UpdateAdvancedOrganizerType
}

export const AdvancedRestatement: FC<AdvancedRestatementProps> = ({
  updateAdvancedOrganizer,
}) => {
  const [state, event] = useCompletedEssayContextProvider()

  useEffect(() => {
    updateAdvancedOrganizer()
    // console.log('update')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    state.context.advancedOrganizer.restatement,
    state.context.advancedOrganizer.advancedSentenceStructure,
  ])

  return (
    <>
      <div>Set the Parts of the Question</div>
      <span>What is the Subject of the question: </span>
      <span>
        <input
          value={
            state.context.advancedOrganizer.advancedSentenceStructure.subject
          }
          onChange={(e: any) =>
            event({
              type: 'SET_ADVANCED_SENTENCE_STRUCTURE_SUBJECT',
              payload: e.target.value,
            })
          }
        />
      </span>
      <span>What is the Verb of the question: </span>
      <span>
        <input
          value={state.context.advancedOrganizer.advancedSentenceStructure.verb}
          onChange={(e: any) =>
            event({
              type: 'SET_ADVANCED_SENTENCE_STRUCTURE_VERB',
              payload: e.target.value,
            })
          }
        />
      </span>
      <span>What is the Object of the question: </span>
      <span>
        <input
          value={
            state.context.advancedOrganizer.advancedSentenceStructure.object!
          }
          onChange={(e: any) =>
            event({
              type: 'SET_ADVANCED_SENTENCE_STRUCTURE_OBJECT',
              payload: e.target.value,
            })
          }
        />
      </span>
      <div>Restatement</div>
      <input
        type="text"
        value={state.context.advancedOrganizer.restatement}
        onChange={(e: any) =>
          event({
            type: 'SET_RESTATEMENT',
            payload: e.target.value,
          })
        }
      />
    </>
  )
}
