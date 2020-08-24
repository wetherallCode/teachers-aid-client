import React, { FC } from 'react'
import { gql, useMutation } from '@apollo/client'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  deleteProtocols,
  deleteProtocolsVariables,
} from '../../../../../../schemaTypes'
import { useTeachersAidContextProvider } from '../../state/TeachersAidContext'
import { date } from '../../../../../../utils'
import { ProtocolControllerButton } from '../../styles/classControlPanelStyles'

export type DeleteProtocolsProps = {
  lessonId: string
}

export const DELETE_PROTOCOLS_MUTATION = gql`
  mutation deleteProtocols($input: RemoveProtocolInput!) {
    removeProtocol(input: $input) {
      deleteCount
    }
  }
`
export const DeleteProtocols: FC<DeleteProtocolsProps> = ({ lessonId }) => {
  const [state, event] = useTeachersAidContextProvider()
  const [deleteProtocols] = useMutation<
    deleteProtocols,
    deleteProtocolsVariables
  >(DELETE_PROTOCOLS_MUTATION, {
    variables: {
      input: {
        studentIds: state.context.presentStudentsIds,
        assignedDate: date,
        task: state.context.selectedProtocol.task,
        lessonId,
      },
    },
    onCompleted: (data) => console.log(data),
    refetchQueries: ['findLessonByCourseAndDate', 'findStudentInfoByStudentId'],
  })
  return (
    <>
      <ProtocolControllerButton
        onClick={() => {
          deleteProtocols()
          event({ type: 'CHANGE_MAIN_SCREEN_SEATING_CHART' })
        }}
      >
        Delete
      </ProtocolControllerButton>
    </>
  )
}
