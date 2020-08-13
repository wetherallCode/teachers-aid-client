import React, { FC, useEffect } from 'react'
import {
  findLessonByCourseAndDate_findLessonByCourseAndDate_lesson_duringActivities,
  findLessonByCourseAndDate_findLessonByCourseAndDate_lesson,
} from '../../../../../../schemaTypes'
import { useTeachersAidContextProvider } from '../../state/TeachersAidContext'
import { ActivatedProtocolDisplay } from './ActivatedProtocolDisplay'
import { ProtocolSelector } from './ProtocolSelector'

export type ProtocolManagerProps = {
  lesson: findLessonByCourseAndDate_findLessonByCourseAndDate_lesson
  protocols: findLessonByCourseAndDate_findLessonByCourseAndDate_lesson_duringActivities[]
}

export const ProtocolManager: FC<ProtocolManagerProps> = ({
  lesson,
  protocols,
}) => {
  const [state, event] = useTeachersAidContextProvider()
  useEffect(() => {
    event({ type: 'SELECT_PROTOCOL', payload: 0 })
  }, [])

  return (
    <>
      {lesson && protocols ? (
        <>
          <div>Protocol Manager</div>
          {!protocols.some((protocol) => protocol.isActive) ? (
            <ProtocolSelector lesson={lesson} />
          ) : (
            <ActivatedProtocolDisplay lessonId={lesson._id!} />
          )}
        </>
      ) : (
        <div>No Lesson Scheduled for Today</div>
      )}
    </>
  )
}
