import React, { FC } from 'react'

import {
  startReadingGuide,
  startReadingGuideVariables,
  findAssignmentById_findAssignmentById_assignment_ReadingGuide,
  submitReadingGuide,
  submitReadingGuideVariables,
} from '../../../../../../../schemaTypes'
import { useMutation } from '@apollo/client'
import { SUBMIT_READING_GUIDE_MUTATION } from '../../../../../student/assignments/readingGuides/SubmitReadingGuide'
import { usePaperBasedContextProvider } from '../state/PaperBasedContext'
import { START_READING_GUIDE_MUTATION } from '../../../../../student/assignments/readingGuides/ReadingGuideToComplete'

export type SubmitReadingGuideProps = {
  readingGuideId: string
  readingGuide: findAssignmentById_findAssignmentById_assignment_ReadingGuide
}

export const SubmitReadingGuide: FC<SubmitReadingGuideProps> = ({
  readingGuideId,
  readingGuide,
}) => {
  const [state, event] = usePaperBasedContextProvider()

  const [startPaperBasedReadingGuide] = useMutation<
    startReadingGuide,
    startReadingGuideVariables
  >(START_READING_GUIDE_MUTATION, {
    variables: {
      input: { paperBased: true, readingGuideId },
    },
    refetchQueries: ['findAssignmentById'],
    onCompleted: (data) => console.log(data),
    onError: (error) => console.error(error),
  })

  const [submitPaperBasedReadingGuide] = useMutation<
    submitReadingGuide,
    submitReadingGuideVariables
  >(SUBMIT_READING_GUIDE_MUTATION, {
    variables: {
      input: state.context.readingGuide,
    },
    onCompleted: (data) => console.log(data),
    refetchQueries: ['findAssignmentById'],
  })

  return (
    <>
      {!readingGuide.paperBased ? (
        <button onClick={() => startPaperBasedReadingGuide()}>
          Start Reading Guide
        </button>
      ) : (
        <>
          <div>Is the Reading Guide complete?</div>
          <select
            onChange={(e: any) => {
              event({
                type: 'SET_READING_GUIDE_COMPLETION',
                payload: e.target.value === 'true' ? true : false,
              })
            }}
          >
            <option value={'true'}>Yes</option>
            <option value={'false'}>No</option>
          </select>
          <div>Is the Reading Guide late?</div>
          <select
            onChange={(e: any) => {
              event({
                type: 'SET_READING_GUIDE_LATENESS',
                payload: e.target.value === 'true' ? true : false,
              })
            }}
          >
            <option value={'true'}>Yes</option>
            <option value={'false'}>No</option>
          </select>

          <button onClick={() => submitPaperBasedReadingGuide()}>
            Submit Reading Guide
          </button>
        </>
      )}
    </>
  )
}
