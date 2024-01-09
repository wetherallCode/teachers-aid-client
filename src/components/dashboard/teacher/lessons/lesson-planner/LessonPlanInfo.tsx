import React, { FC, useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import { useLessonPlannerContextProvider } from './state-and-styles/lessonPlannerContext'
import {
  findTextSectionsById,
  findTextSectionsByIdVariables,
  TextSectionProtocolsInput,
  TextSectionQuestionsInput,
} from '../../../../../schemaTypes'
import { BeforeActivitySelect } from './BeforeActivitySelect'
import { DuringActivitySelect } from './DuringActivitySelect'
import { AfterActivity } from './AfterActivity'

import { EssentialQuestion } from './EssentialQuestion'
import { Pages } from './Pages'
import { LessonName } from './LessonName'
import {
  LessonInfoContainer,
  LessonInfoTitleContainer,
  LessonPlannerSectionHeader,
  LessonPlannerActivityBody,
  VocabList,
  ActivityContainer,
  ActivitySelectorContainer,
  LessonPlannerButton,
} from './state-and-styles/lessonPlannerStyles'

export type LessonPlanInfoProps = {}

export const FIND_TEXT_SECTIONS_BY_ID_QUERY = gql`
  query findTextSectionsById($input: FindTextSectionsByIdInput!) {
    findTextSectionsById(input: $input) {
      textSections {
        _id
        header
        hasVocab {
          word
          definition
        }
        hasProtocols {
          academicOutcomeTypes
          activityType
          task
        }
        hasQuestions {
          questionType
          question
        }
        pageNumbers {
          startingPage
          endingPage
        }
      }
    }
  }
`
export type ActivitySelectorValues = 'BEFORE' | 'DURING' | 'AFTER'

export const LessonPlanInfo: FC<LessonPlanInfoProps> = () => {
  const [state, event] = useLessonPlannerContextProvider()
  const [activity, setActivity] = useState<ActivitySelectorValues>('BEFORE')

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

  data?.findTextSectionsById.textSections.forEach(
    (section) =>
      section.hasProtocols?.forEach((protocol) => {
        const protocolItem = {
          academicOutcomeTypes: protocol.academicOutcomeTypes,
          activityType: protocol.activityType,
          task: protocol.task,
          isActive: false,
          completed: false,
        }
        protocolList.push(protocolItem)
      }),
  )

  const questionsList: TextSectionQuestionsInput[] = []

  data?.findTextSectionsById.textSections.forEach((section) => {
    section.hasQuestions?.forEach((question) => {
      const questionItem = {
        questionType: question.questionType,
        question: question.question,
      }
      questionsList.push(questionItem)
    })
  })
  console.log(state.context.lessonType)
  return (
    <>
      {/* <LessonPlannerSectionHeader>
        <div>Lesson Information</div>
      </LessonPlannerSectionHeader> */}
      <LessonPlannerActivityBody>
        <Pages data={data!} />
        <LessonName />
        <ActivityContainer>
          <ActivitySelectorContainer>
            <div
              onClick={() =>
                activity === 'BEFORE'
                  ? setActivity('AFTER')
                  : activity === 'DURING'
                    ? setActivity('BEFORE')
                    : setActivity('DURING')
              }
            >
              &lt;
            </div>
            <div>
              {activity === 'BEFORE'
                ? 'Before Activity'
                : activity === 'DURING'
                  ? 'During Activities'
                  : 'After Activity'}
            </div>
            <div
              onClick={() =>
                activity === 'BEFORE'
                  ? setActivity('DURING')
                  : activity === 'DURING'
                    ? setActivity('AFTER')
                    : setActivity('BEFORE')
              }
            >
              &gt;
            </div>
          </ActivitySelectorContainer>
          {activity === 'BEFORE' && (
            <BeforeActivitySelect protocolList={protocolList} />
          )}
          {activity === 'DURING' && (
            <DuringActivitySelect protocolList={protocolList} />
          )}
          {activity === 'AFTER' && (
            <AfterActivity protocolList={protocolList} />
          )}
        </ActivityContainer>
        <EssentialQuestion questionsList={questionsList} />
      </LessonPlannerActivityBody>
    </>
  )
}
