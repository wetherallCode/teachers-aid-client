import React from 'react'
import { useQuery } from '@apollo/client'
import { useUserContextProvider } from '../../../../../../contexts/UserContext'
import { findTexts } from '../../../../../../schemaTypes'
import {
  TextPickerHeader,
  TextPickerBody,
  TextPickerTextSelection,
} from '../../lesson-planner/state-and-styles/lessonPlannerStyles'
import { FIND_TEXTS_QUERY } from '../../section-builder/TextListLoader'
import { useBuildEssayQuestionContextProvider } from './state-n-styles/BuildEssayQuestionContext'

export type TextSelectProps = {}

export const TextSelect = ({}: TextSelectProps) => {
  const me = useUserContextProvider()
  const [, event] = useBuildEssayQuestionContextProvider()

  const { loading, data } = useQuery<findTexts>(FIND_TEXTS_QUERY, {
    onError: (error) => console.error(error),
  })

  const texts = data?.findTexts.texts.filter((text) => text.ownerId === me._id)!

  return (
    <>
      <TextPickerHeader>
        <div>Select the Text</div>
      </TextPickerHeader>
      {loading ? (
        <TextPickerBody></TextPickerBody>
      ) : (
        <TextPickerBody>
          {texts.length > 0 && (
            <div>
              {texts.map((text) => (
                <TextPickerTextSelection
                  key={text._id!}
                  onClick={() => {
                    event({ type: 'SET_TEXT_ID', payload: text._id! })
                    event({ type: 'SET_TEXT_NAME', payload: text.textTitle })
                    event({ type: 'NEXT' })
                  }}
                >
                  {text.textTitle}
                </TextPickerTextSelection>
              ))}
            </div>
          )}
        </TextPickerBody>
      )}
      {/* <SectionPickerButtonContainer>
        <SectionPickerNextButton onClick={() => event({ type: 'PREVIOUS' })}>
          Back
        </SectionPickerNextButton>
      </SectionPickerButtonContainer> */}
    </>
  )
}
