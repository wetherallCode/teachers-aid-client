import React, { FC } from 'react'
import { gql, useMutation } from '@apollo/client'

import { useTeachersAidContextProvider } from '../../state/TeachersAidContext'
import {
  updateLessonProtocol,
  updateLessonProtocolVariables,
  startProtocol,
  startProtocolVariables,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createStudentProtocol,
  createStudentProtocolVariables,
  MarkingPeriodEnum,
} from '../../../../../../schemaTypes'
import { date } from '../../../../../../utils'

export type SelectProtocolProps = {
  lessonId: string
}
export const UPDATE_LESSON_PROTOCOL_MUTATION = gql`
  mutation updateLessonProtocol($input: UpdateLessonProtocolInput!) {
    updateLessonProtocol(input: $input) {
      lesson {
        _id
        duringActivities {
          isActive
        }
      }
    }
  }
`

export const START_PROTOCOL_MUTATION = gql`
  mutation startProtocol($input: StartProtocolInput!) {
    startProtocol(input: $input) {
      lesson {
        _id
        duringActivities {
          isActive
        }
      }
    }
  }
`

export const CREATE__PROTOCOL_MUTATION = gql`
  mutation createStudentProtocol($input: CreateProtocolInput!) {
    createProtocol(input: $input) {
      protocols {
        _id
        student {
          _id
          firstName
        }
      }
    }
  }
`

export const SelectProtocol: FC<SelectProtocolProps> = ({ lessonId }) => {
  const [state, event] = useTeachersAidContextProvider()

  const [createStudentProtocol] = useMutation<
    createStudentProtocol,
    createStudentProtocolVariables
  >(CREATE__PROTOCOL_MUTATION, {
    variables: {
      input: {
        academicOutcomeType:
          state.context.selectedProtocol.academicOutcomeTypes,
        studentIds: state.context.presentStudentsIds,
        markingPeriod: MarkingPeriodEnum.FIRST,
        protocolActivityType: state.context.selectedProtocol.activityType,
        task: state.context.selectedProtocol.task,
      },
    },
    onCompleted: (data) => console.log(data),
    refetchQueries: ['findStudentInfoByStudentId', 'findLessonByCourseAndDate'],
  })

  const [startProtocol] = useMutation<startProtocol, startProtocolVariables>(
    START_PROTOCOL_MUTATION,
    {
      variables: {
        input: {
          lessonId,
          task: state.context.selectedProtocol.task,
          isActive: true,
        },
      },
      onCompleted: () => createStudentProtocol(),
      refetchQueries: [
        'findStudentInfoByStudentId',
        'findLessonByCourseAndDate',
      ],
    }
  )
  const [reactivateProtocol] = useMutation<
    updateLessonProtocol,
    updateLessonProtocolVariables
  >(UPDATE_LESSON_PROTOCOL_MUTATION, {
    variables: {
      input: {
        lessonId,
        task: state.context.selectedProtocol.task,
        isActive: true,
        assignedDate: date,
        studentIds: state.context.presentStudentsIds,
      },
    },
    onCompleted: (data) => {
      console.log(data)
    },
    refetchQueries: ['findLessonByCourseAndDate', 'findStudentInfoByStudentId'],
  })

  return (
    <>
      {!state.context.selectedProtocol.completed && (
        <button
          onClick={() => {
            startProtocol()
          }}
        >
          Start Protocol
        </button>
      )}
      {state.context.selectedProtocol.completed && (
        <button onClick={() => reactivateProtocol()}>Reactivate</button>
      )}
    </>
  )
}
