import React, { FC, useEffect } from 'react'
import {
  findLessonByCourseAndDate_findLessonByCourseAndDate_lesson,
  me_me_Teacher_teachesCourses,
} from '../../schemaTypes'
import { Greetings } from '../home/Greetings'
import { DynamicLesson } from './lessson-types/DynamicLesson'
import { useDailyAgendaContextProvider } from './state/DailyAgendaContext'

export type DailyAgendaProps = {
  lesson: findLessonByCourseAndDate_findLessonByCourseAndDate_lesson
  courseToLoad?: me_me_Teacher_teachesCourses
  startPolling: (pollInterval: number) => void
  stopPolling: () => void
}

export const DailyAgenda: FC<DailyAgendaProps> = ({
  lesson,
  courseToLoad,
  startPolling,
  stopPolling,
}) => {
  const [state, event] = useDailyAgendaContextProvider()

  // const [startLivePeriod] = useMutation<
  //   startLivePeriod,
  //   startLivePeriodVariables
  // >(START_LIVE_PERIOD_MUTATION, {
  //   onCompleted: () => startPolling(100),
  //   refetchQueries: ['findLessonByCourseAndDate'],
  // })

  useEffect(() => {
    console.log(lesson.dynamicLesson)
  }, [lesson])

  return (
    <>
      {!state.context.polling ? (
        <>
          <div>Agenda</div>
          <div>
            <Greetings phrase={courseToLoad?.name!} />
          </div>
          <button
            onClick={() => {
              startPolling(100)
              event({ type: 'POLLING' })
            }}
          >
            Start Lesson
          </button>
        </>
      ) : (
        <>
          {lesson.dynamicLesson !== 'OFF' ? (
            <>
              <DynamicLesson lesson={lesson} />
              <button
                onClick={() => {
                  stopPolling()
                  event({ type: 'POLLING' })
                }}
              >
                Stop Lesson
              </button>
            </>
          ) : (
            <div>Static Lesson</div>
          )}
        </>
      )}
    </>
  )
}
