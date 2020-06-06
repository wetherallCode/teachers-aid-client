import React, { FC } from 'react'
import { useQuery } from '@apollo/client'
import { FIND_TEXTS_QUERY } from '../section-builder/TextListLoader'
import { findTexts } from '../../../../../schemaTypes'
import { useLessonEditorContextProvider } from './LessonEditorContext'

export type TextSelectProps = {}

export const TextSelect: FC<TextSelectProps> = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, event] = useLessonEditorContextProvider()
  const { loading, error, data } = useQuery<findTexts>(FIND_TEXTS_QUERY, {
    onError: (error) => console.error(error),
  })

  if (loading) return <div>Loading </div>
  if (error) console.error(error)
  return (
    <>
      <select
        onChange={(e: any) => {
          if (e.target.value !== 'Choose Text') {
            event({ type: 'SET_TEXT', payload: e.target.value })
          }
        }}
      >
        <option value={undefined}>Choose Text</option>
        {data?.findTexts.texts.map((text) => (
          <option key={text._id!} value={text.textTitle!}>
            {text.textTitle}
          </option>
        ))}
      </select>
    </>
  )
}
