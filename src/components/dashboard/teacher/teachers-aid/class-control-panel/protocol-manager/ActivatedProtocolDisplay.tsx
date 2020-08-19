import React, { FC } from 'react'
import { useTeachersAidContextProvider } from '../../state/TeachersAidContext'
import { useMutation, gql } from '@apollo/client'
import {
  updateLessonProtocol,
  updateLessonProtocolVariables,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  finishStudentProtocol,
  finishStudentProtocolVariables,
} from '../../../../../../schemaTypes'
import { UPDATE_LESSON_PROTOCOL_MUTATION } from './SelectProtocol'
import { date } from '../../../../../../utils'
import { DeleteProtocols } from './DeleteProtocols'

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
  console.log(state.context.selectedProtocol.completed)
  return (
    <>
      <div>{state.context.selectedProtocol.academicOutcomeTypes}</div>
      <div>{state.context.selectedProtocol.activityType}</div>
      <div>{state.context.selectedProtocol.task}</div>
      {state.context.selectedProtocol.completed ? (
        <button
          onClick={() => {
            back()
          }}
        >
          Back
        </button>
      ) : (
        <button
          onClick={() => {
            finishStudentProtocol()
            // event({
            //   type: 'UPDATE_LESSON_PROTOCOL',
            //   payload: { ...state.context.selectedProtocol, completed: true },
            // })
          }}
        >
          Finish
        </button>
      )}
      <DeleteProtocols lessonId={lessonId} />
    </>
  )
}
