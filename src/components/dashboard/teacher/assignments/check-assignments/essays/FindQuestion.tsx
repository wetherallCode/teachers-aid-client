import { useQuery } from '@apollo/client'
import React from 'react'
import { findTexts } from '../../../../../../schemaTypes'
import { FIND_TEXTS_QUERY } from '../../../lessons/section-builder/TextListLoader'

export type FindQuestionProps = {}

export const FindQuestion = ({}: FindQuestionProps) => {
  const { loading: textDataLoading, data: textData } = useQuery<findTexts>(
    FIND_TEXTS_QUERY,
    {
      onError: (error) => console.error(error),
    },
  )

  return (
    <>
      <div>
        <div> Which Text:</div>
        <select>
          {textData?.findTexts.texts.map((text) => (
            <option value={text.textTitle} key={text.__typename}>
              {text.textTitle}
            </option>
          ))}
        </select>
      </div>
    </>
  )
}
