import React, { FC } from 'react'
import { useCreateAssignmentContextPovider } from '../state-and-styles/CreateAssignmentContext'
import { gql, useQuery } from '@apollo/client'
import {
  findLessonById,
  findLessonByIdVariables,
  me_me_Teacher,
} from '../../../../../../schemaTypes'
import { CreateEssay } from './CreateEssay'
import { useMarkingPeriodContextProvider } from '../../../../../../contexts/markingPeriod/MarkingPeriodContext'
import {
  LessonInformationSelectContainer,
  SelectButtonContainer,
  SelectorContainer,
  SelectorTitle,
} from '../state-and-styles/createAssignmentsStyles'

export type EssayLessonInfoProps = {
  me: me_me_Teacher
}

export const FIND_LESSON_BY_ID_QUERY = gql`
  query findLessonById($input: FindLessonByIdInput!) {
    findLessonById(input: $input) {
      lesson {
        _id
        questionList {
          question
          questionType
        }
        pageNumbers {
          startingPage
          endingPage
        }
        assignedSections {
          startingSection
          endingSection
        }
        assignedCourses {
          hasCourseInfo {
            startsAt
            endsAt
            schoolDayType
          }
          _id
        }
      }
    }
  }
`

export const EssayLessonInfo: FC<EssayLessonInfoProps> = ({ me }) => {
  const [state, event] = useCreateAssignmentContextPovider()
  const [markingPeriodState] = useMarkingPeriodContextProvider()

  const { loading } = useQuery<findLessonById, findLessonByIdVariables>(
    FIND_LESSON_BY_ID_QUERY,
    {
      variables: {
        input: { _id: state.context.essay.lesson },
      },
      onCompleted: (data) => {
        event({
          type: 'SET_QUESTION_LIST',
          payload: data?.findLessonById.lesson.questionList,
        })
        event({
          type: 'SET_READINGS_READING_PAGES',
          payload:
            data?.findLessonById.lesson.pageNumbers.startingPage ===
            data?.findLessonById.lesson.pageNumbers.endingPage
              ? `${data?.findLessonById.lesson.pageNumbers.startingPage}`
              : `${data?.findLessonById.lesson.pageNumbers.startingPage} - ${data?.findLessonById.lesson.pageNumbers.endingPage}`,
        })
        event({
          type: 'SET_READINGS_READING_SECTIONS',
          payload:
            data.findLessonById.lesson.assignedSections.startingSection ===
            data.findLessonById.lesson.assignedSections.endingSection
              ? `${data?.findLessonById.lesson.assignedSections.startingSection}`
              : `${data?.findLessonById.lesson.assignedSections.startingSection} - ${data?.findLessonById.lesson.assignedSections.endingSection}`,
        })
        event({ type: 'SET_ASSIGNER_ID', payload: me._id! })
        event({
          type: 'SET_MARKING_PERIOD',
          payload: markingPeriodState.context.currentMarkingPeriod,
        })
      },
      onError: (error) => console.error(error),
    }
  )
  if (loading) return <div>Loading </div>

  const courseIdList = [state.context.courseId]

  return (
    <>
      {state.matches('essay.essayInfo') && (
        <CreateEssay me={me} courseIdList={courseIdList} />
      )}
    </>
  )
}
