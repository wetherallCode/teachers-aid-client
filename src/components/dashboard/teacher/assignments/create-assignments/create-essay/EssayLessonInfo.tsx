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
import { EssayTopicLoader } from './EssayTopicLoader'

export type EssayLessonInfoProps = {
  me: me_me_Teacher
  courseId: string
}

export const FIND_LESSON_BY_ID_QUERY = gql`
  query findLessonById($input: FindLessonByIdInput!) {
    findLessonById(input: $input) {
      lesson {
        _id
        assignedMarkingPeriod
        assignedDate
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
        assignedSectionIdList
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

export const EssayLessonInfo = ({ me, courseId }: EssayLessonInfoProps) => {
  const [state, event] = useCreateAssignmentContextPovider()
  const [markingPeriodState] = useMarkingPeriodContextProvider()

  const { loading, data } = useQuery<findLessonById, findLessonByIdVariables>(
    FIND_LESSON_BY_ID_QUERY,
    {
      variables: {
        input: { _id: state.context.essay.lesson },
      },
      onCompleted: (data) => {
        // event({
        //   type: 'SET_QUESTION_LIST',
        //   payload: data?.findLessonById.lesson.questionList,
        // })
        console.log(data.findLessonById.lesson.questionList)
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
          payload: data.findLessonById.lesson.assignedMarkingPeriod,
        })
      },
      onError: (error) => console.error(error),
    }
  )
  if (loading) return <div>Loading </div>

  const courseIdList = [courseId]
  const lesson = data?.findLessonById.lesson!
  return (
    <>
      {state.matches('essay.essayInfo') && (
        <>
          <EssayTopicLoader
            ids={data?.findLessonById.lesson.assignedSectionIdList!}
          />
          <CreateEssay
            me={me}
            courseIdList={courseIdList}
            courseId={courseId}
            lesson={lesson}
          />
        </>
      )}
    </>
  )
}
