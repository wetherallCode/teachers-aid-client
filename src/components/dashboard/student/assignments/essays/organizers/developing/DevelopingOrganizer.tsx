import React, { FC, useEffect } from 'react'
import { gql, useMutation } from '@apollo/client'
import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateDevelopingOrganizer,
  updateDevelopingOrganizerVariables,
  BasicQuestionEnum,
} from '../../../../../../../schemaTypes'
import { useStudentEssayContextProvider } from '../../StudentEssayContext'

export type DevelopingOrganizerProps = {}

export const UPDATE_DEVELOPING_ORGANIZER_MUTATION = gql`
  mutation updateDevelopingOrganizer($input: UpdateDevelopingOrganizerInput!) {
    updateDevelopingOrganizer(input: $input) {
      essay {
        _id
        # workingDraft {
        #   organizer {
        #     ... on DevelopingOrganizer {
        #       basicQuestionType
        #       developingSentenceStructure {
        #         subject
        #         verb
        #       }
        #       restatement
        #       answer
        #       conclusion
        #     }
        #   }
        # }
      }
    }
  }
`

export const DevelopingOrganizer: FC<DevelopingOrganizerProps> = () => {
  const [state, event] = useStudentEssayContextProvider()

  const sentenceStructure = {
    subject:
      state.context.developingOrganizer.developingSentenceStructure.subject,
    verb: state.context.developingOrganizer.developingSentenceStructure.verb,
  }

  const [updateDevelopingOrganizer] = useMutation<
    updateDevelopingOrganizer,
    updateDevelopingOrganizerVariables
  >(UPDATE_DEVELOPING_ORGANIZER_MUTATION, {
    variables: {
      input: {
        essayId: state.context.essayId,
        answer: state.context.developingOrganizer.answer,
        basicQuestionType: state.context.developingOrganizer.questionType,
        conclusion: state.context.developingOrganizer.conclusion,
        developingSentenceStructure:
          state.context.developingOrganizer.developingSentenceStructure,
        restatement: state.context.developingOrganizer.restatement,
      },
    },
    onCompleted: (data) => {
      console.log(data)
    },
    onError: (error) => console.error(error),
    refetchQueries: ['findEssayById'],
  })

  useEffect(() => {
    updateDevelopingOrganizer()
  }, [state.context.developingOrganizer, updateDevelopingOrganizer])

  return (
    <>
      <div>Developing Organizer</div>
      {state.matches('organizers.developingOrganizer.identifications') && (
        <>
          <span>What is the Question Type:</span>{' '}
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
                state.context.developingOrganizer.developingSentenceStructure
                  .verb
              }
              onChange={(e: any) =>
                event({
                  type: 'SET_DEVELOPING_SENTENCE_STRUCTURE_VERB',
                  payload: e.target.value,
                })
              }
            />
          </span>
          <button onClick={() => event({ type: 'NEXT' })}>Next</button>
        </>
      )}
      {state.matches('organizers.developingOrganizer.restatement') && (
        <>
          <div>Restate the Question in the form of a statement</div>
          <input
            value={state.context.developingOrganizer.restatement}
            onChange={(e: any) =>
              event({ type: 'SET_RESTATEMENT', payload: e.target.value })
            }
          />
          <button onClick={() => event({ type: 'NEXT' })}>Next</button>
        </>
      )}
      {state.matches('organizers.developingOrganizer.answer') && (
        <>
          <div>Answer the Question to the best of your ability.</div>
          <input
            value={state.context.developingOrganizer.answer}
            onChange={(e: any) =>
              event({ type: 'SET_ANSWER', payload: e.target.value })
            }
          />
          <button onClick={() => event({ type: 'NEXT' })}>Next</button>
        </>
      )}
      {state.matches('organizers.developingOrganizer.conclusion') && (
        <>
          <div>
            Think of a consequence of what the subject (
            {sentenceStructure.subject}) did ({sentenceStructure.verb})
          </div>
          <input
            value={state.context.developingOrganizer.conclusion}
            onChange={(e: any) =>
              event({ type: 'SET_CONCLUSION', payload: e.target.value })
            }
          />
          <button onClick={() => event({ type: 'NEXT' })}>Next</button>
        </>
      )}
    </>
  )
}
