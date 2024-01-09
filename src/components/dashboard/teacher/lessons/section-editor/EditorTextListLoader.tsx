import React from 'react'
import { gql, useQuery } from '@apollo/client'
import {
  findTextsForTextSectionEditor,
  me_me_Teacher,
} from '../../../../../schemaTypes'
import { sectionEditorMachineEvent } from './state-n-styles/sectionEditorMachine'
import { EditorTextSelectionDisplay } from './EditorTextSelectionDisplay'
import { useUserContextProvider } from '../../../../../contexts/UserContext'

export type TextListLoaderProps = {}

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

export const EditorTextListLoader = ({}: TextListLoaderProps) => {
  const me: me_me_Teacher = useUserContextProvider()

  const { loading, data } = useQuery<findTextsForTextSectionEditor>(
    FIND_TEXTS_FOR_TEXT_SECTION_EDITOR_QUERY,
    {
      onCompleted: () => console.log(data),
      onError: (err) => console.error(err),
    },
  )

  const texts = data?.findTexts.texts.filter((text) => text.ownerId === me._id)
  if (loading) return null

  return <EditorTextSelectionDisplay textList={texts!} />
}
