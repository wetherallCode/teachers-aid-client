import React, { FC, useState } from 'react'
import {
  findLessonByCourseAndDate_findLessonByCourseAndDate_lesson,
  me_me,
} from '../../../schemaTypes'
import { useUserContextProvider } from '../../../contexts/UserContext'
import { StudentProtocolResponse } from './StudentProtocolResponse'

export type ProtocolsProps = {
  lesson: findLessonByCourseAndDate_findLessonByCourseAndDate_lesson
}

export const Protocols: FC<ProtocolsProps> = ({ lesson }) => {
  const me: me_me = useUserContextProvider()
  const [response, setResponse] = useState('')
  const [protocol] = lesson.duringActivities.filter(
    (protocol) => protocol.isActive
  )
  console.log(protocol)
  return (
    <>
      <div>{protocol.task}</div>
      <>{me.__typename === 'Student' && <StudentProtocolResponse me={me} />}</>
    </>
  )
}
