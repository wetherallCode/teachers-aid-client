import React, { FC } from 'react'
import { useTeachersAidContextProvider } from '../../state/TeachersAidContext'
import { useMutation, gql } from '@apollo/client'
import {
  updateLessonProtocol,
  updateLessonProtocolVariables,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  finishStudentProtocol,
  finishStudentProtocolVariables,
  AcademicOutcomeTypes,
} from '../../../../../../schemaTypes'
import { UPDATE_LESSON_PROTOCOL_MUTATION } from './SelectProtocol'
import {
  date,
  academicOutcomeTypes,
  protocolActivityTypes,
} from '../../../../../../utils'
import { DeleteProtocols } from './DeleteProtocols'
import {
  ProtocolManagerContainer,
  ProtocolInfo,
  ProtocolInfoContainer,
  ProtocolControllerContainer,
  ProtocolControllerButton,
} from '../../styles/classControlPanelStyles'

export type ActivatedProtocolDisplayProps = { lessonId: string }

export const FINISH_STUDENT_PROTOCOL_MUTATION = gql`
  mutation finishStudentProtocol($input: FinishProtocolInput!) {
    finishProtocol(input: $input) {
      protocols {
        _id
      }
    }
  }
`

export const ActivatedProtocolDisplay: FC<ActivatedProtocolDisplayProps> = ({
  lessonId,
}) => {
  const [state, event] = useTeachersAidContextProvider()
  const [finishStudentProtocol] = useMutation<
    finishStudentProtocol,
    finishStudentProtocolVariables
  >(FINISH_STUDENT_PROTOCOL_MUTATION, {
    variables: {
      input: {
        assignedDate: date,
        studentIds: state.context.presentStudentsIds,
        task: state.context.selectedProtocol.task,
        lessonId,
      },
    },
    onCompleted: (data) => console.log(data),
    refetchQueries: ['findLessonByCourseAndDate', 'findStudentInfoByStudentId'],
  })

  const [back] = useMutation<
    updateLessonProtocol,
    updateLessonProtocolVariables
  >(UPDATE_LESSON_PROTOCOL_MUTATION, {
    variables: {
      input: {
        lessonId,
        task: state.context.selectedProtocol.task,
        isActive: false,
        assignedDate: date,
        studentIds: state.context.presentStudentsIds,
      },
    },
    onCompleted: (data) => {
      console.log(data)
    },
    refetchQueries: ['findLessonByCourseAndDate', 'findStudentInfoByStudentId'],
  })

  const outcomeType = academicOutcomeTypes(
    state.context.selectedProtocol.academicOutcomeTypes
  )
  const activityTypes = protocolActivityTypes(
    state.context.selectedProtocol.activityType
  )

  const handleMainScreenSwitch = () =>
    !state.context.mainScreenVirtualProtocolResponses
      ? event({ type: 'CHANGE_MAIN_SCREEN_VIRTUAL_PROTOCOL_RESPONSES' })
      : event({ type: 'CHANGE_MAIN_SCREEN_SEATING_CHART' })

  return (
    <ProtocolManagerContainer>
      <ProtocolInfoContainer>
        <ProtocolInfo>Outcome Type: {outcomeType}</ProtocolInfo>
        <ProtocolInfo>Activity: {activityTypes}</ProtocolInfo>
        <ProtocolInfo>Task: {state.context.selectedProtocol.task}</ProtocolInfo>
      </ProtocolInfoContainer>
      <ProtocolControllerContainer>
        <ProtocolControllerButton onClick={handleMainScreenSwitch}>
          {!state.context.mainScreenVirtualProtocolResponses
            ? 'Responses'
            : 'Other'}
        </ProtocolControllerButton>
        {state.context.selectedProtocol.completed ? (
          <ProtocolControllerButton
            onClick={() => {
              back()
              event({ type: 'CHANGE_MAIN_SCREEN_SEATING_CHART' })
            }}
          >
            Back
          </ProtocolControllerButton>
        ) : (
          <ProtocolControllerButton
            onClick={() => {
              finishStudentProtocol()
              event({ type: 'PREVIOUS' })
            }}
          >
            Finish
          </ProtocolControllerButton>
        )}
        <DeleteProtocols lessonId={lessonId} />
      </ProtocolControllerContainer>
    </ProtocolManagerContainer>
  )
}
