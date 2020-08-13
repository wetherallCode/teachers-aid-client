import React, { FC } from 'react'
import { useCreateAssignmentContextPovider } from '../CreateAssignmentContext'
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
}

export const ReadingGuideLessonInfo: FC<ReadingGuideLessonInfoProps> = ({
  me,
}) => {
  const [state, event] = useCreateAssignmentContextPovider()
  const [markingPeriodState] = useMarkingPeriodContextProvider()

  const { loading, data } = useQuery<findLessonById, findLessonByIdVariables>(
    FIND_LESSON_BY_ID_QUERY,
    {
      variables: {
        input: { _id: state.context.readingGuide.lesson },
      },
      onCompleted: (data) => {
        event({
          type: 'SET_QUESTION_LIST',
          payload: data?.findLessonById.lesson.questionList,
        })
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
          payload: markingPeriodState.context.currentMarkingPeriod,
        })
      },
      onError: (error) => console.error(error),
    }
  )
  if (loading) return <div>Loading </div>

  const courseIdList = data?.findLessonById.lesson.assignedCourses!

  return (
    <>
      <div>
        <button onClick={() => event({ type: 'PREVIOUS' })}>
          Pick Different Lesson
        </button>
        {state.matches('readingGuide.readingGuideInfo') && (
          <CreateReadingGuide
            me={me}
            courseIdList={courseIdList.map((course) => course._id!)}
          />
        )}
      </div>
    </>
  )
}
