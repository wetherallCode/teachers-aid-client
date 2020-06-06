import React, { FC, useEffect } from 'react'
import { TextSelect } from './TextSelect'
import { ChapterSelect } from './ChapterSelect'
import {
  TextSectionVocabInput,
  TextSectionQuestionsInput,
  TextSectionProtocolsInput,
} from '../../../../../schemaTypes'
import { SectionSelect } from './SectionSelect'
import { useLessonEditorContextProvider } from './LessonEditorContext'

export type SectionListProps = {
  vocab: TextSectionVocabInput[]
  questions: TextSectionQuestionsInput[]
  protocols: TextSectionProtocolsInput[]
  firstSection: string
  lastSection: string
  newStartingPage: number
  newEndingPage: number
}

export const SectionList: FC<SectionListProps> = ({
  vocab,
  questions,
  protocols,
  firstSection,
  lastSection,
  newStartingPage,
  newEndingPage,
}) => {
  const [state, event] = useLessonEditorContextProvider()
  useEffect(() => {
    event({ type: 'SET_VOCAB_LIST', payload: vocab })
    event({ type: 'SET_QUESTION_LIST', payload: questions })
    event({ type: 'SET_PROTOCOL_LIST', payload: protocols })
    event({ type: 'SET_STARTING_SECTION', payload: firstSection })
    event({ type: 'SET_ENDING_SECTION', payload: lastSection })
    event({ type: 'SET_STARTING_PAGE', payload: newStartingPage })
    event({ type: 'SET_ENDING_PAGE', payload: newEndingPage })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.context.textSectionList])

  return (
    <>
      <div>
        <div>Select Text</div>
        <TextSelect />
        {state.context.text && (
          <>
            <div>Find Chapter</div>
            <ChapterSelect />
          </>
        )}
        {state.context.chapter && (
          <>
            <div>Select Sections</div>
            <SectionSelect />
          </>
        )}
      </div>
    </>
  )
}
