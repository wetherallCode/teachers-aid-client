import React, { FC } from 'react'
import { useTeachersAidContextProvider } from '../../state/TeachersAidContext'
import { useMutation } from '@apollo/client'
import {
  updateLessonProtocol,
  updateLessonProtocolVariables,
} from '../../../../../../schemaTypes'
import { UPDATE_LESSON_PROTOCOL_MUTATION } from './SelectProtocol'

export type ActivatedProtocolDisplayProps = { lessonId: string }

export const ActivatedProtocolDisplay: FC<ActivatedProtocolDisplayProps> = ({
  lessonId,
}) => {
  const [state, event] = useTeachersAidContextProvider()
  const [finishProtocol] = useMutation<
    updateLessonProtocol,
    updateLessonProtocolVariables
  >(UPDATE_LESSON_PROTOCOL_MUTATION, {
    variables: {
      input: {
        lessonId,
        task: state.context.selectedProtocol.task,
        isActive: false,
      },
    },
    onCompleted: (data) => console.log(data),
    refetchQueries: [],
  })
  return (
    <>
      <div>{state.context.selectedProtocol.academicOutcomeTypes}</div>
      <div>{state.context.selectedProtocol.activityType}</div>
      <div>{state.context.selectedProtocol.task}</div>
      <button
        onClick={() => {
          finishProtocol()
        }}
      >
        Finish
      </button>
    </>
  )
}
