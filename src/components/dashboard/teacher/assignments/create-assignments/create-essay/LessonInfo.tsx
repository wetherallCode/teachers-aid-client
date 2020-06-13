import React, { FC } from 'react'
import { useCreateAssignmentContextPovider } from '../CreateAssignmentContext'
import { gql, useQuery } from '@apollo/client'
import {
  findLessonById,
  findLessonByIdVariables,
  me_me_Teacher,
} from '../../../../../../schemaTypes'
import { CreateEssay } from './CreateEssay'

export type LessonInfoProps = {
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
        linkedCourseIds
      }
    }
  }
`

export const LessonInfo: FC<LessonInfoProps> = ({ me }) => {
  const [state, event] = useCreateAssignmentContextPovider()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { loading, error, data } = useQuery<
    findLessonById,
    findLessonByIdVariables
  >(FIND_LESSON_BY_ID_QUERY, {
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
        type: 'SET_LINKED_COURSES_IDS',
        payload: data.findLessonById.lesson.linkedCourseIds,
      })
    },
    onError: (error) => console.error(error),
  })
  if (loading) return <div>Loading </div>
  // console.log(
  //   data?.findLessonById.lesson.pageNumbers.startingPage ===
  //     data?.findLessonById.lesson.pageNumbers.endingPage
  // )
  return (
    <>
      <div>
        <button onClick={() => event({ type: 'PREVIOUS' })}>
          Pick Different Lesson
        </button>
      </div>
    </>
  )
}
