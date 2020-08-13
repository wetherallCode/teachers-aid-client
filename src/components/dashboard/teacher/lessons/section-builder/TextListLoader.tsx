import React, { FC } from 'react'
import { gql, useQuery } from '@apollo/client'
import { findTexts } from '../../../../../schemaTypes'
import { TextSelectionDisplay } from './TextSelectionDisplay'
import { useUserContextProvider } from '../../../../../contexts/UserContext'
import { useSectionBuilderContextProvider } from './state/SectionBuilderContext'

export type TextListLoaderProps = {}

export const FIND_TEXTS_QUERY = gql`
  query findTexts {
    findTexts {
      texts {
        _id
        textTitle
        ownerId
      }
    }
  }
`

export const TextListLoader: FC<TextListLoaderProps> = () => {
  const [, event] = useSectionBuilderContextProvider()
  const me = useUserContextProvider()

  const { loading, error, data } = useQuery<findTexts>(FIND_TEXTS_QUERY)
  if (loading) return <div>Loading </div>
  if (error) console.error(error)

  const texts = data?.findTexts.texts.filter((text) => text.ownerId === me._id)

  return <TextSelectionDisplay textList={texts!} />
}
