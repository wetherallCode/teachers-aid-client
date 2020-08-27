import React, { FC, useEffect } from 'react'
import { useStudentEssayContextProvider } from '../../state-and-styles/StudentEssayContext'
import { UpdateAcademicOrganizerType } from './AcademicOrganizer'

export type AcademicRestatementProps = {
  updateAcademicOrganizer: UpdateAcademicOrganizerType
}

export const AcademicRestatement: FC<AcademicRestatementProps> = ({
  updateAcademicOrganizer,
}) => {
  const [state, event] = useStudentEssayContextProvider()

  useEffect(() => {
    updateAcademicOrganizer()
  }, [
    state.context.academicOrganizer.restatement,
    state.context.academicOrganizer.academicSentenceStructure,
    updateAcademicOrganizer,
  ])

  return (
    <>
      <div>Set the Parts of the Question</div>
      <span>What is the Subject of the question: </span>
      <span>
        <input
          value={
            state.context.academicOrganizer.academicSentenceStructure.subject
          }
          onChange={(e: any) =>
            event({
              type: 'SET_ACADEMIC_SENTENCE_STRUCTURE_SUBJECT',
              payload: e.target.value,
            })
          }
        />
      </span>
      <span>What is the Verb of the question: </span>
      <span>
        <input
          value={state.context.academicOrganizer.academicSentenceStructure.verb}
          onChange={(e: any) =>
            event({
              type: 'SET_ACADEMIC_SENTENCE_STRUCTURE_VERB',
              payload: e.target.value,
            })
          }
        />
      </span>
      <span>What is the Object of the question: </span>
      <span>
        <input
          value={
            state.context.academicOrganizer.academicSentenceStructure.object!
          }
          onChange={(e: any) =>
            event({
              type: 'SET_ACADEMIC_SENTENCE_STRUCTURE_OBJECT',
              payload: e.target.value,
            })
          }
        />
      </span>
      <div>Restatement</div>
      <input
        type='text'
        value={state.context.academicOrganizer.restatement}
        onChange={(e: any) =>
          event({
            type: 'SET_RESTATEMENT',
            payload: e.target.value,
          })
        }
      />
      <button onClick={() => event({ type: 'NEXT' })}>Next</button>
    </>
  )
}
