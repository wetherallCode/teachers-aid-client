import React, { FC } from 'react'
import { gql, useQuery } from '@apollo/client'
import { findTexts } from '../../../../../schemaTypes'
import { TextSelectionDisplay } from './TextSelectionDisplay'
import { sectionBuilderFSMEvent } from './sectionBuilderFSM'

export type TextListLoaderProps = {
  event: (event: sectionBuilderFSMEvent) => void
}

export const FIND_TEXTS_QUERY = gql`
  query findTexts {
    findTexts {
      texts {
        _id
        textTitle
      }
    }
  }
`

export const TextListLoader: FC<TextListLoaderProps> = ({ event }) => {
  const { loading, error, data } = useQuery<findTexts>(FIND_TEXTS_QUERY)
  if (loading) return <div>Loading </div>
  if (error) console.error(error)

  return (
    <TextSelectionDisplay event={event} textList={data?.findTexts.texts!} />
    // <button onClick={()=>event('NEXT')}>Next</button>
  )
}
