import React from 'react'
import { findLessonByCourseAndDate_findLessonByCourseAndDate_lesson } from '../../../../../../schemaTypes'
import { useTeachersAidContextProvider } from '../../state/TeachersAidContext'
import {
  ProtocolManagerContainer,
  ProtocolHeaderContainer,
  ProtocolHeader,
  ProtocolSelectorBackContainer,
  ProtocolSelectorBack,
  ProtocolSelectorTaskContainer,
  ProtocolSelectorTask,
  ProtocolSelectorNextContainer,
  ProtocolSelectorNext,
} from '../../styles/classControlPanelStyles'
import { SelectProtocol } from '../protocol-manager/SelectProtocol'

export type ProtocolSelectProps = {
  lesson: findLessonByCourseAndDate_findLessonByCourseAndDate_lesson
  presentStudentList: string[]
}

export const ProtocolSelect = ({
  lesson,
  presentStudentList,
}: ProtocolSelectProps) => {
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
