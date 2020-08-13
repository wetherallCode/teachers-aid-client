import React, { FC } from 'react'
import { useTeachersAidContextProvider } from '../../state/TeachersAidContext'
import { SelectProtocol } from './SelectProtocol'
import { findLessonByCourseAndDate_findLessonByCourseAndDate_lesson } from '../../../../../../schemaTypes'

export type ProtocolSelectorProps = {
  lesson: findLessonByCourseAndDate_findLessonByCourseAndDate_lesson
}

export const ProtocolSelector: FC<ProtocolSelectorProps> = ({ lesson }) => {
  const [state, event] = useTeachersAidContextProvider()
  return (
    <>
      <div
        onClick={() =>
          event({
            type: 'SELECT_PROTOCOL',
            payload: state.context.protocolSelect > 0 ? -1 : 0,
          })
        }
      >
        &lt;
      </div>
      <div>{state.context.selectedProtocol.task}</div>
      <div
        onClick={() =>
          event({
            type: 'SELECT_PROTOCOL',
            payload:
              state.context.protocolSelect < state.context.protocols.length - 1
                ? +1
                : 0,
          })
        }
      >
        &gt;
      </div>
      <SelectProtocol lessonId={lesson._id!} />
    </>
  )
}
