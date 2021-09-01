import React, { Dispatch, FC, SetStateAction, useEffect } from 'react'
import { useCreateAssignmentContextPovider } from '../state-and-styles/CreateAssignmentContext'
import { useQuery } from '@apollo/client'
import {
  findLessonById,
  findLessonByIdVariables,
  me_me_Teacher,
} from '../../../../../../schemaTypes'
import { FIND_LESSON_BY_ID_QUERY } from '../create-essay/EssayLessonInfo'
import { CreateReadingGuide } from './CreateReadingGuide'
import { useMarkingPeriodContextProvider } from '../../../../../../contexts/markingPeriod/MarkingPeriodContext'

export type ReadingGuideLessonInfoProps = {
  me: me_me_Teacher
  courseId: string
  setCourseId: Dispatch<SetStateAction<string>>
}

export const ReadingGuideLessonInfo = ({
  me,
  courseId,
  setCourseId,
}: ReadingGuideLessonInfoProps) => {
  const [state, event] = useCreateAssignmentContextPovider()
  const [markingPeriodState] = useMarkingPeriodContextProvider()

  const { loading, data } = useQuery<findLessonById, findLessonByIdVariables>(
    FIND_LESSON_BY_ID_QUERY,
    {
      variables: {
        input: { _id: state.context.readingGuide.lesson },
      },
      onCompleted: (data) => {
        // event({
        //   type: 'SET_QUESTION_LIST',
        //   payload: data?.findLessonById.lesson.questionList,
        // })
        event({
          type: 'SET_READING_GUIDE_READINGS_READING_PAGES',
          payload:
            data?.findLessonById.lesson.pageNumbers.startingPage ===
            data?.findLessonById.lesson.pageNumbers.endingPage
              ? `${data?.findLessonById.lesson.pageNumbers.startingPage}`
              : `${data?.findLessonById.lesson.pageNumbers.startingPage} - ${data?.findLessonById.lesson.pageNumbers.endingPage}`,
        })
        event({
          type: 'SET_READING_GUIDE_READINGS_READING_SECTIONS',
          payload:
            data.findLessonById.lesson.assignedSections.startingSection ===
            data.findLessonById.lesson.assignedSections.endingSection
              ? `${data?.findLessonById.lesson.assignedSections.startingSection}`
              : `${data?.findLessonById.lesson.assignedSections.startingSection} - ${data?.findLessonById.lesson.assignedSections.endingSection}`,
        })
        event({ type: 'SET_ASSIGNER_ID', payload: me._id! })
        event({
          type: 'SET_READING_GUIDE_MARKING_PERIOD',
          payload: data.findLessonById.lesson.assignedMarkingPeriod,
        })
        event({
          type: 'SET_READING_GUIDE_DUE_DATE',
          payload: data.findLessonById.lesson.assignedDate,
        })
      },
      onError: (error) => console.error(error),
    }
  )
  const courseIdList = data?.findLessonById.lesson.assignedCourses!
  const lesson = data?.findLessonById.lesson!

  if (loading) return <div>Loading </div>

  return (
    <>
      {state.matches('readingGuide.readingGuideInfo') && (
        <CreateReadingGuide
          me={me}
          courseIdList={courseIdList.map((course) => course._id!)}
          courseId={courseId}
          lesson={lesson}
          setCourseId={setCourseId}
        />
      )}
    </>
  )
}
