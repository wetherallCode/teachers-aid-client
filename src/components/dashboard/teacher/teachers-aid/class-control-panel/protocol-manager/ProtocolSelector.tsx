import React, { FC } from 'react'
import { useTeachersAidContextProvider } from '../../state/TeachersAidContext'
import { SelectProtocol } from './SelectProtocol'
import { findLessonByCourseAndDate_findLessonByCourseAndDate_lesson } from '../../../../../../schemaTypes'
import {
  ProtocolHeader,
  ProtocolHeaderContainer,
  ProtocolSelectorBack,
  ProtocolSelectorBackContainer,
  ProtocolSelectorNextContainer,
  ProtocolSelectorNext,
  ProtocolSelectorTaskContainer,
  ProtocolSelectorTask,
  ProtocolManagerContainer,
} from '../../styles/classControlPanelStyles'

export type ProtocolSelectorProps = {
  lesson: findLessonByCourseAndDate_findLessonByCourseAndDate_lesson
  presentStudentList: string[]
}
export const ProtocolSelector: FC<ProtocolSelectorProps> = ({
  lesson,
  presentStudentList,
}) => {
  const [state, event] = useTeachersAidContextProvider()

  return (
    <ProtocolManagerContainer>
      <ProtocolHeaderContainer>
        <ProtocolHeader>Protocol Selector</ProtocolHeader>
      </ProtocolHeaderContainer>
      <ProtocolSelectorBackContainer>
        <ProtocolSelectorBack
          onClick={() => {
            if (state.context.protocolSelect > 0)
              event({
                type: 'SELECT_PROTOCOL',
                payload: state.context.protocolSelect - 1,
              })
          }}
        >
          &lt;
        </ProtocolSelectorBack>
      </ProtocolSelectorBackContainer>
      <ProtocolSelectorTaskContainer>
        <ProtocolSelectorTask>
          {state.context.selectedProtocol.task}
        </ProtocolSelectorTask>
      </ProtocolSelectorTaskContainer>
      <ProtocolSelectorNextContainer>
        <ProtocolSelectorNext
          onClick={() => {
            if (
              state.context.protocolSelect <
              state.context.protocols.length - 1
            )
              event({
                type: 'SELECT_PROTOCOL',
                payload: state.context.protocolSelect + 1,
              })
          }}
        >
          &gt;
        </ProtocolSelectorNext>
      </ProtocolSelectorNextContainer>
      <SelectProtocol
        lessonId={lesson._id!}
        lesson={lesson}
        presentStudentList={presentStudentList}
      />
    </ProtocolManagerContainer>
  )
}
