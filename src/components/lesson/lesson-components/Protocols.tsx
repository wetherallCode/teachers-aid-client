import React, { FC } from 'react'
import { findLessonByCourseAndDate_findLessonByCourseAndDate_lesson } from '../../../schemaTypes'

export type ProtocolsProps = {
  lesson: findLessonByCourseAndDate_findLessonByCourseAndDate_lesson
}

export const Protocols: FC<ProtocolsProps> = ({ lesson }) => {
  const [protocol] = lesson.duringActivities.filter(
    (protocol) => protocol.isActive
  )

  return (
    <>
      <div>{protocol.task}</div>
    </>
  )
}
