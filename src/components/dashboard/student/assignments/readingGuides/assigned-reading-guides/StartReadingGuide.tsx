import React from 'react'
import { useMutation } from '@apollo/client'
import {
  startReadingGuideVariables,
  startReadingGuide,
} from '../../../../../../schemaTypes'
import { START_READING_GUIDE_MUTATION } from './ReadingGuideToComplete'

export type StartReadingGuideProps = {
  readingGuideId: string
}

export const StartReadingGuide = ({
  readingGuideId,
}: StartReadingGuideProps) => {
  const [startReadingGuide] = useMutation<
    startReadingGuide,
    startReadingGuideVariables
  >(START_READING_GUIDE_MUTATION, {
    variables: { input: { readingGuideId, paperBased: false } },
    refetchQueries: ['findReadingGuideById'],
  })

  return (
    <>
      <button onClick={() => startReadingGuide()}>Begin</button>
    </>
  )
}
