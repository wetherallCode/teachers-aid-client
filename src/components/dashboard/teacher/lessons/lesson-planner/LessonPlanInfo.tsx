import React, { FC } from 'react'
import { gql, useQuery } from '@apollo/client'
import { useLessonPlannerContextProvider } from './lessonPlannerContext'
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

export const LessonPlanInfo: FC<LessonPlanInfoProps> = () => {
  const [state, event] = useLessonPlannerContextProvider()

  // console.log(state.context)
  const { loading, error, data } = useQuery<
    findTextSectionsById,
    findTextSectionsByIdVariables
  >(FIND_TEXT_SECTIONS_BY_ID_QUERY, {
    variables: {
      input: { _ids: state.context.textSectionList },
    },
    onCompleted: (data) => {
      data?.findTextSectionsById.textSections.forEach((section) => {
        section.hasVocab.forEach((word) => {
          const vocabItem = { word: word.word, definition: word.definition }
          event({ type: 'SET_VOCAB_LIST', payload: vocabItem })
        })
        section.hasQuestions.forEach((question) => {
          const questionItem = {
            question: question.question,
            questionType: question.questionType,
          }
          event({ type: 'SET_QUESTIONS_LIST', payload: questionItem })
        })
      })
    },
  })
  if (loading) return <div>Loading </div>
  if (error) console.error(error)

  const protocolList: TextSectionProtocolsInput[] = []
  data?.findTextSectionsById.textSections.forEach((section) =>
    section.hasProtocols.forEach((protocol) => {
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

  const questionsList: TextSectionQuestionsInput[] = []
  data?.findTextSectionsById.textSections.forEach((section) => {
    section.hasQuestions.forEach((question) => {
      const questionItem = {
        questionType: question.questionType,
        question: question.question,
      }
      questionsList.push(questionItem)
    })
  })

  return (
    <>
      <div>Information</div>
      <div>Vocab</div>
      <div>
        {state.context.vocabList.map((word, i) => (
          <div key={i}>
            {word.word}: {word.definition}
          </div>
        ))}
      </div>
      <Pages data={data!} />
      <BeforeActivitySelect protocolList={protocolList} />
      <DuringActivitySelect protocolList={protocolList} />
      <AfterActivity protocolList={protocolList} />
      <EssentialQuestion questionsList={questionsList} />
      <LessonName />
    </>
  )
}
