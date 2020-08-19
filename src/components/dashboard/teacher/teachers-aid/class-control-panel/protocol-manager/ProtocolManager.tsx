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

  const currentActiveProtocolIndex = protocols.findIndex(
    (protocol) => protocol.isActive
  )

  useEffect(() => {
    event({
      type: 'SELECT_PROTOCOL',
      payload:
        currentActiveProtocolIndex === -1 ? 0 : currentActiveProtocolIndex,
    })
  }, [currentActiveProtocolIndex])

  useEffect(() => {
    event({
      type: 'UPDATE_LESSON_PROTOCOL',
      payload: protocols[state.context.protocolSelect],
    })
  }, [protocols, state.context.protocolSelect])

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
