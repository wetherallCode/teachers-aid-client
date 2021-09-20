import React, { FC, useEffect } from 'react'
import {
  findLessonByCourseAndDate_findLessonByCourseAndDate_lesson_duringActivities,
  findLessonByCourseAndDate_findLessonByCourseAndDate_lesson,
} from '../../../../../../schemaTypes'
import { useTeachersAidContextProvider } from '../../state/TeachersAidContext'
import { ProtocolSelectorNoProtocolsDisplay } from '../../styles/classControlPanelStyles'
import { ActivatedProtocolDisplay } from './ActivatedProtocolDisplay'
import { ProtocolSelector } from './ProtocolSelector'

export type ProtocolManagerProps = {
  lesson: findLessonByCourseAndDate_findLessonByCourseAndDate_lesson
  protocols: findLessonByCourseAndDate_findLessonByCourseAndDate_lesson_duringActivities[]
  presentStudentList: string[]
}

export const ProtocolManager: FC<ProtocolManagerProps> = ({
  lesson,
  protocols,
  presentStudentList,
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
  }, [currentActiveProtocolIndex, event])

  useEffect(() => {
    event({
      type: 'UPDATE_LESSON_PROTOCOL',
      payload: protocols[state.context.protocolSelect],
    })
  }, [event, protocols, state.context.protocolSelect])

  return (
    <>
      {lesson && protocols.length > 0 ? (
        <>
          {!protocols.some((protocol) => protocol.isActive) ? (
            <ProtocolSelector
              lesson={lesson}
              presentStudentList={presentStudentList}
            />
          ) : (
            <ActivatedProtocolDisplay
              lessonId={lesson._id!}
              presentStudentList={presentStudentList}
            />
          )}
        </>
      ) : (
        <ProtocolSelectorNoProtocolsDisplay>
          <div>No Protocols Today</div>
        </ProtocolSelectorNoProtocolsDisplay>
      )}
    </>
  )
}
