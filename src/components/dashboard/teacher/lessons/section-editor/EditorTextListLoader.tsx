import React, { FC } from 'react'
import { gql, useQuery } from '@apollo/client'
import { findTextsForTextSectionEditor } from '../../../../../schemaTypes'
import { sectionEditorMachineEvent } from './sectionEditorMachine'
import { EditorTextSelectionDisplay } from './EditorTextSelectionDisplay'
import { useUserContextProvider } from '../../../../../contexts/UserContext'

export type TextListLoaderProps = {
  event: (event: sectionEditorMachineEvent) => void
}

export const FIND_TEXTS_FOR_TEXT_SECTION_EDITOR_QUERY = gql`
  query findTextsForTextSectionEditor {
    findTexts {
      texts {
        _id
        textTitle
        ownerId
      }
    }
  }
`

export const EditorTextListLoader: FC<TextListLoaderProps> = ({ event }) => {
  const me = useUserContextProvider()
  const { loading, error, data } = useQuery<findTextsForTextSectionEditor>(
    FIND_TEXTS_FOR_TEXT_SECTION_EDITOR_QUERY
  )
  if (loading) return <div>Loading </div>
  if (error) console.error(error)
  const texts = data?.findTexts.texts.filter((text) => text.ownerId === me._id)
  return <EditorTextSelectionDisplay event={event} textList={texts!} />
}
