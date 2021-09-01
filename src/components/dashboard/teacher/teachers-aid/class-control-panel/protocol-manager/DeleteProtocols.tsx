import React, { FC } from 'react'
import { gql, useMutation, useQuery } from '@apollo/client'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  deleteProtocols,
  deleteProtocolsVariables,
  findActiveProtocolsByCourseForProtocolRemoval,
  findActiveProtocolsByCourseForProtocolRemovalVariables,
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

export const FIND_ACTIVE_PROTOCOLS_QUERY = gql`
  query findActiveProtocolsByCourseForProtocolRemoval(
    $input: FindActiveProtocolsByCourseInput!
  ) {
    findActiveProtocolsByCourse(input: $input) {
      protocols {
        _id
        task
        assignedDate
        student {
          _id
        }
      }
    }
  }
`
export const DeleteProtocols: FC<DeleteProtocolsProps> = ({ lessonId }) => {
  const [state, event] = useTeachersAidContextProvider()

  const { loading, data } = useQuery<
    findActiveProtocolsByCourseForProtocolRemoval,
    findActiveProtocolsByCourseForProtocolRemovalVariables
  >(FIND_ACTIVE_PROTOCOLS_QUERY, {
    variables: {
      input: { courseId: state.context.courseInfo?.course._id! },
    },

    onCompleted: (data) => console.log(data),
    onError: (error) => console.error(error),
  })

  const studentIds = data?.findActiveProtocolsByCourse.protocols
    .filter((protocol) => protocol.task === state.context.selectedProtocol.task)
    .map((p) => p.student._id)! as string[]

  const [deleteProtocols] = useMutation<
    deleteProtocols,
    deleteProtocolsVariables
  >(DELETE_PROTOCOLS_MUTATION, {
    variables: {
      input: {
        studentIds: studentIds!,
        assignedDate: date,
        task: state.context.selectedProtocol.task,
        lessonId,
      },
    },
    onCompleted: (data) => console.log(data),
    refetchQueries: ['findLessonByCourseAndDate', 'findStudentInfoByStudentId'],
  })
  // if (loading) return <div>Loading </div>
  return (
    <>
      <ProtocolControllerButton
        onClick={() => {
          deleteProtocols()
          event({ type: 'CHANGE_MAIN_SCREEN_SEATING_CHART' })
          event({ type: 'PREVIOUS' })
        }}
      >
        Delete
      </ProtocolControllerButton>
    </>
  )
}
