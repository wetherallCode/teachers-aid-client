import React, { FC } from 'react'
import { gql, useMutation } from '@apollo/client'

import { useTeachersAidContextProvider } from '../../state/TeachersAidContext'
import {
  updateLessonProtocol,
  updateLessonProtocolVariables,
} from '../../../../../../schemaTypes'

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

export const SelectProtocol: FC<SelectProtocolProps> = ({ lessonId }) => {
  const [state, event] = useTeachersAidContextProvider()

  const [startProtocol] = useMutation<
    updateLessonProtocol,
    updateLessonProtocolVariables
  >(UPDATE_LESSON_PROTOCOL_MUTATION, {
    variables: {
      input: {
        lessonId,
        task: state.context.selectedProtocol.task,
        isActive: true,
      },
    },
    onCompleted: (data) => console.log(data),
    refetchQueries: [],
  })
  return (
    <>
      <button
        onClick={() => {
          startProtocol()
        }}
      >
        Select
      </button>
    </>
  )
}
