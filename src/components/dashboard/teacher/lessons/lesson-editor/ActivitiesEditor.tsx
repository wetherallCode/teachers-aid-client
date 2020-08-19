import React, { FC } from 'react'
import { useQuery } from '@apollo/client'
import {
  findTextSectionsById,
  findTextSectionsByIdVariables,
  TextSectionProtocolsInput,
  TextSectionQuestionsInput,
} from '../../../../../schemaTypes'
import { FIND_TEXT_SECTIONS_BY_ID_QUERY } from '../lesson-planner/LessonPlanInfo'
import { useLessonEditorContextProvider } from './LessonEditorContext'
import { BeforeActivity } from './BeforeActivity'
import { DuringActivities } from './DuringActivities'
import { AfterActivity } from './AfterActivity'
import { EssentialQuestion } from './EssentialQuestion'

export type ActivitiesEditorProps = {}

export const ActivitiesEditor: FC<ActivitiesEditorProps> = () => {
  const [state] = useLessonEditorContextProvider()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { loading, error, data } = useQuery<
    findTextSectionsById,
    findTextSectionsByIdVariables
  >(FIND_TEXT_SECTIONS_BY_ID_QUERY, {
    variables: {
      input: { _ids: state.context.assignedSectionIdList },
    },
    // onCompleted: (data) => {
    //   console.log(data)
    // },

    onError: (error) => console.error(error),
  })
  const protocols: TextSectionProtocolsInput[] = []
  const questions: TextSectionQuestionsInput[] = []

  data?.findTextSectionsById.textSections.forEach((section) => {
    section.hasProtocols.forEach((protocol) => {
      protocols.push({
        academicOutcomeTypes: protocol.academicOutcomeTypes,
        activityType: protocol.activityType,
        task: protocol.task,
        isActive: false,
        completed: false,
      })
    })

    section.hasQuestions.forEach((question) => {
      questions.push({
        question: question.question,
        questionType: question.questionType,
      })
    })
  })

  return (
    <>
      {loading ? (
        <div>Loading</div>
      ) : (
        <>
          <BeforeActivity protocols={protocols} />
          <DuringActivities protocols={protocols} />
          <AfterActivity protocols={protocols} />
          <EssentialQuestion questions={questions} />
        </>
      )}
    </>
  )
}
