import React, { FC, useState } from 'react'
import {
  findLessonByCourseAndDate_findLessonByCourseAndDate_lesson,
  me_me,
} from '../../../schemaTypes'
import { useUserContextProvider } from '../../../contexts/UserContext'
import { StudentProtocolResponse } from './StudentProtocolResponse'
import {
  ProtocolsContainer,
  ProtocolTypeContainer,
  ProtocolTask,
  ProtocolTaskContainer,
} from '../state/lessonStyles'
import { phraseCapitalizer, underscoreEliminator } from '../../../utils'

export type ProtocolsProps = {
  lesson: findLessonByCourseAndDate_findLessonByCourseAndDate_lesson
}

export const Protocols: FC<ProtocolsProps> = ({ lesson }) => {
  const me: me_me = useUserContextProvider()
  const [protocol] = lesson.duringActivities.filter(
    (protocol) => protocol.isActive
  )

  const protocols = underscoreEliminator(protocol.academicOutcomeTypes)
  return (
    <>
      <ProtocolTypeContainer>
        <div>{phraseCapitalizer(protocols)}</div>
      </ProtocolTypeContainer>

      <ProtocolTaskContainer>
        <ProtocolTask>{protocol.task}</ProtocolTask>
      </ProtocolTaskContainer>

      {me.__typename === 'Student' && <StudentProtocolResponse me={me} />}
    </>
  )
}
