import React, { FC } from 'react'
import { useLessonEditorContextProvider } from './LessonEditorContext'
import { FIND_TEXT_SECTIONS_BY_ID_QUERY } from '../lesson-planner/LessonPlanInfo'
import { useQuery } from '@apollo/client'
import {
  findTextSectionsById,
  findTextSectionsByIdVariables,
  TextSectionVocabInput,
  TextSectionQuestionsInput,
  TextSectionProtocolsInput,
} from '../../../../../schemaTypes'
import { SectionList } from './SectionList'
import { updateLessonType } from './LessonEditor'

export type SectionsProps = {
  updateLesson: updateLessonType
}

export const SetSections: FC<SectionsProps> = ({ updateLesson }) => {
  const [state, event] = useLessonEditorContextProvider()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { loading, error, data } = useQuery<
    findTextSectionsById,
    findTextSectionsByIdVariables
  >(FIND_TEXT_SECTIONS_BY_ID_QUERY, {
    variables: {
      input: { _ids: state.context.assignedSectionIdList },
    },
    onCompleted: (data) => console.log(data),
    onError: (error) => console.error(error),
  })
  if (loading) return <div>Loading </div>

  const vocab: TextSectionVocabInput[] = []
  const questions: TextSectionQuestionsInput[] = []
  const protocols: TextSectionProtocolsInput[] = []

  data?.findTextSectionsById.textSections.forEach((section) => {
    section.hasVocab.forEach((word) => {
      vocab.push({ word: word.word, definition: word.definition })
    })
    section.hasQuestions.forEach((question) => {
      questions.push({
        question: question.question,
        questionType: question.questionType,
      })
    })
    section.hasProtocols.forEach((protocol) => {
      protocols.push({
        academicOutcomeTypes: protocol.academicOutcomeTypes,
        activityType: protocol.activityType,
        task: protocol.task,
      })
    })
  })
  const firstSection = data?.findTextSectionsById.textSections[0]
  const lastSection =
    data?.findTextSectionsById.textSections[
      data.findTextSectionsById.textSections.length - 1
    ]

  const newStartingPage = firstSection?.pageNumbers.startingPage
  const newEndingPage = lastSection?.pageNumbers.endingPage

  return (
    <>
      <div>Sections</div>
      <div>
        {data?.findTextSectionsById.textSections.map((section) => (
          <div key={section._id!}>{section.header}</div>
        ))}
      </div>
      <SectionList
        vocab={vocab}
        questions={questions}
        protocols={protocols}
        firstSection={firstSection?.header!}
        lastSection={lastSection?.header!}
        newStartingPage={newStartingPage!}
        newEndingPage={newEndingPage!}
      />
      <button onClick={() => event({ type: 'PREVIOUS' })}>Previous</button>
    </>
  )
}
