import React from 'react'
import {
  findLessonByCourseAndDate_findLessonByCourseAndDate_lesson,
  findLessonByCourseAndDate_findLessonByCourseAndDate_lesson_duringActivities,
} from '../../../../../../schemaTypes'
import { useTeachersAidContextProvider } from '../../state/TeachersAidContext'
import { ProtocolSelect } from './ProtocolSelect'

export type ProtocolsProps = {
  lesson: findLessonByCourseAndDate_findLessonByCourseAndDate_lesson
  protocols: findLessonByCourseAndDate_findLessonByCourseAndDate_lesson_duringActivities[]
  presentStudentList: string[]
}

export const Protocols = ({
  lesson,
  protocols,
  presentStudentList,
}: ProtocolsProps) => {
  const [state, event] = useTeachersAidContextProvider()
  console.log(protocols.some((protocol) => protocol.isActive))
  return (
    <>
      {lesson && protocols && (
        <>
          {!protocols.some((protocol) => protocol.isActive) ? (
            <ProtocolSelect
              lesson={lesson}
              presentStudentList={presentStudentList}
            />
          ) : (
            <div></div>
          )}
        </>
      )}
    </>
  )
}
