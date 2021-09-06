import { useQuery } from '@apollo/client'
import React, { useState } from 'react'
import {
  findTextSectionsById,
  findTextSectionsByIdVariables,
  TextSectionProtocolsInput,
} from '../../../../../schemaTypes'
import { phraseCapitalizer, underscoreEliminator } from '../../../../../utils'
import { AfterActivity } from './AfterActivity'
import { BeforeActivitySelect } from './BeforeActivitySelect'
import { DuringActivityBuilder } from './DuringActivityBuilder'
import { EssentialQuestionBuilder } from './EssentialQuestionBuilder'
import { LessonName } from './LessonName'
import {
  ActivitySelectorValues,
  FIND_TEXT_SECTIONS_BY_ID_QUERY,
} from './LessonPlanInfo'
import { LessonTypeSelector } from './LessonTypeSelector'
import { Pages } from './Pages'
import { useLessonPlannerContextProvider } from './state-and-styles/lessonPlannerContext'
import {
  ActivitySelectContainer,
  ActivitySelectorContainer,
  AfterActivityContainer,
  DuringActivityBody,
  LessonBuilderContainer,
} from './state-and-styles/lessonPlannerStyles'

export type LessonBuilderProps = {}

export type LessonBuilderStagesTypes =
  | 'LESSON_TYPE'
  | 'ESSENTIAL_QUESTION'
  | 'BEFORE_ACTIVITY'
  | 'DURING_ACTIVITY'
  | 'AFTER_ACTIVITY'

export const LessonBuilder = ({}: LessonBuilderProps) => {
  const [state, event] = useLessonPlannerContextProvider()
  const [activity, setActivity] =
    useState<LessonBuilderStagesTypes>('LESSON_TYPE')

  const { data } = useQuery<
    findTextSectionsById,
    findTextSectionsByIdVariables
  >(FIND_TEXT_SECTIONS_BY_ID_QUERY, {
    variables: {
      input: { _ids: state.context.textSectionList },
    },
    onCompleted: (data) => {
      data?.findTextSectionsById.textSections.forEach((section) => {
        section.hasVocab?.forEach((word) => {
          const vocabItem = { word: word.word, definition: word.definition }
          event({ type: 'SET_VOCAB_LIST', payload: vocabItem })
        })
        section.hasQuestions?.forEach((question) => {
          const questionItem = {
            question: question.question,
            questionType: question.questionType,
          }
          event({ type: 'SET_QUESTIONS_LIST', payload: questionItem })
        })
      })
    },
    onError: (error) => console.error(error),
  })
  const protocolList: TextSectionProtocolsInput[] = []

  data?.findTextSectionsById.textSections.forEach((section) =>
    section.hasProtocols?.forEach((protocol) => {
      const protocolItem = {
        academicOutcomeTypes: protocol.academicOutcomeTypes,
        activityType: protocol.activityType,
        task: protocol.task,
        isActive: false,
        completed: false,
      }
      protocolList.push(protocolItem)
    })
  )

  return (
    <>
      <LessonBuilderContainer>
        <Pages data={data!} />
        <LessonName />
        <ActivitySelectorContainer>
          <div
            onClick={() =>
              activity === 'LESSON_TYPE'
                ? setActivity('AFTER_ACTIVITY')
                : activity === 'AFTER_ACTIVITY'
                ? setActivity('DURING_ACTIVITY')
                : activity === 'DURING_ACTIVITY'
                ? setActivity('BEFORE_ACTIVITY')
                : activity === 'BEFORE_ACTIVITY'
                ? setActivity('ESSENTIAL_QUESTION')
                : setActivity('LESSON_TYPE')
            }
          >
            &lt;
          </div>
          <div>{phraseCapitalizer(underscoreEliminator(activity))}</div>
          <div
            onClick={() =>
              activity === 'ESSENTIAL_QUESTION'
                ? setActivity('BEFORE_ACTIVITY')
                : activity === 'BEFORE_ACTIVITY'
                ? setActivity('DURING_ACTIVITY')
                : activity === 'DURING_ACTIVITY'
                ? setActivity('AFTER_ACTIVITY')
                : activity === 'AFTER_ACTIVITY'
                ? setActivity('LESSON_TYPE')
                : setActivity('ESSENTIAL_QUESTION')
            }
          >
            &gt;
          </div>
        </ActivitySelectorContainer>
        {activity === 'LESSON_TYPE' && <LessonTypeSelector />}
        {activity === 'ESSENTIAL_QUESTION' && <EssentialQuestionBuilder />}
        {activity === 'BEFORE_ACTIVITY' && (
          <ActivitySelectContainer>
            <BeforeActivitySelect />
          </ActivitySelectContainer>
        )}
        {activity === 'DURING_ACTIVITY' && (
          <DuringActivityBuilder protocolList={protocolList} />
        )}
        {activity === 'AFTER_ACTIVITY' && (
          <ActivitySelectContainer>
            <AfterActivity protocolList={protocolList} />
          </ActivitySelectContainer>
        )}
      </LessonBuilderContainer>
    </>
  )
}
