import React, { FC } from 'react'
import { FIND_TEXTS_QUERY } from '../section-builder/TextListLoader'
import { useQuery } from '@apollo/client'
import { findTexts } from '../../../../../schemaTypes'
// import { TextPicker } from './TextPicker'
import { useUserContextProvider } from '../../../../../contexts/UserContext'
import { useLessonPlannerContextProvider } from './state-and-styles/lessonPlannerContext'
import {
  TextPickerHeader,
  TextPickerBody,
  TextPickerTextSelection,
  SectionPickerButtonContainer,
  SectionPickerNextButton,
} from './state-and-styles/lessonPlannerStyles'

type LessonPlannerTextListLoaderProps = {}

export const LessonPlannerTextListLoader: FC<
  LessonPlannerTextListLoaderProps
> = () => {
  const me = useUserContextProvider()
  const [, event] = useLessonPlannerContextProvider()

  const { loading, error, data } = useQuery<findTexts>(FIND_TEXTS_QUERY, {
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
            // <select
            //   onChange={(e: any) => {
            //     if (e.target.value !== 'Select your text') {
            //       event({ type: 'SET_TEXT_TITLE', payload: e.target.value })
            //       event({ type: 'NEXT' })
            //     }
            //   }}
            // >
            //   <option value={undefined}>Select your text</option>
            //   {texts.map((text) => (
            //     <option key={text._id!} value={text.textTitle!}>
            //       {text.textTitle}
            //     </option>
            //   ))}
            // </select>
            <div>
              {texts.map((text) => (
                <TextPickerTextSelection
                  key={text._id!}
                  onClick={() => {
                    event({ type: 'SET_TEXT_TITLE', payload: text.textTitle })
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
      <SectionPickerButtonContainer>
        <SectionPickerNextButton onClick={() => event({ type: 'PREVIOUS' })}>
          Back
        </SectionPickerNextButton>
      </SectionPickerButtonContainer>
    </>
  )
}
