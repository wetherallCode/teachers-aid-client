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
        onClick={() => {
          if (state.context.protocolSelect > 0)
            event({
              type: 'SELECT_PROTOCOL',
              payload: state.context.protocolSelect - 1,
            })
        }}
      >
        &lt;
      </div>
      <div>{state.context.selectedProtocol.task}</div>
      <div
        onClick={() => {
          if (state.context.protocolSelect < state.context.protocols.length - 1)
            event({
              type: 'SELECT_PROTOCOL',
              payload: state.context.protocolSelect + 1,
            })
        }}
      >
        &gt;
      </div>
      <SelectProtocol lessonId={lesson._id!} />
    </>
  )
}
