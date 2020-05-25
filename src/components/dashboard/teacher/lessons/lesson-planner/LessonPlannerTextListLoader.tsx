import React, { FC } from 'react'
import { FIND_TEXTS_QUERY } from '../section-builder/TextListLoader'
import { useQuery } from '@apollo/client'
import { findTexts } from '../../../../../schemaTypes'
import { TextPicker } from './TextPicker'
import { useUserContextProvider } from '../../../../../contexts/UserContext'

type LessonPlannerTextListLoaderProps = {}

export const LessonPlannerTextListLoader: FC<LessonPlannerTextListLoaderProps> = () => {
  const me = useUserContextProvider()

  const { loading, error, data } = useQuery<findTexts>(FIND_TEXTS_QUERY)
  if (loading) return <div>Loading </div>
  if (error) console.error(error)

  const texts = data?.findTexts.texts.filter((text) => text.ownerId === me._id)

  return <TextPicker textList={texts!} />
}
