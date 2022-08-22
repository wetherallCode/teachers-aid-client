import React, { FC } from 'react'
import { useMutation, gql } from '@apollo/client'
import {
  startReadingGuideVariables,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  startReadingGuide,
} from '../../../../../../schemaTypes'
import { START_READING_GUIDE_MUTATION } from './ReadingGuideToComplete'

export type StartReadingGuideProps = {
  readingGuideId: string
}

export const StartReadingGuide: FC<StartReadingGuideProps> = ({
  readingGuideId,
}) => {
  const [startReadingGuide] = useMutation<
    startReadingGuide,
    startReadingGuideVariables
  >(START_READING_GUIDE_MUTATION, {
    variables: { input: { readingGuideId, paperBased: false } },
    onCompleted: (data) => console.log(data),
    refetchQueries: ['findReadingGuideById'],
  })

  return (
    <>
      <button onClick={() => startReadingGuide()}>Begin</button>
    </>
  )
}
