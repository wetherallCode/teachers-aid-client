import React, { Dispatch, FC, SetStateAction } from 'react'
import { findTemporaryTasks_findTemporaryTasks_temporaryTasks } from '../../../../../schemaTypes'
import { useTemporaryTasksContextProvider } from './state-n-styles/TemporaryTasksContext'
import { MarkAbsentContainer } from './state-n-styles/temporaryTaskStyles'

export type MarkAbsentProps = {
  setStudentPresent: Dispatch<SetStateAction<boolean>>
  studentPresent: boolean
  task: findTemporaryTasks_findTemporaryTasks_temporaryTasks
}

export const MarkAbsent: FC<MarkAbsentProps> = ({
  setStudentPresent,
  studentPresent,
  task,
}) => {
  const [, event] = useTemporaryTasksContextProvider()

  return (
    <MarkAbsentContainer>
      <input
        type='checkbox'
        checked={!studentPresent}
        onChange={() => {
          setStudentPresent((studentPresent) => !studentPresent)
          studentPresent &&
            event({
              type: 'ADD_TO_ABSENT_LIST',
              payload: {
                taskNumber: task.taskNumber,
                studentIdToAdd: task.student._id!,
              },
            })
          !studentPresent &&
            event({
              type: 'DELETE_FROM_ABSENT_LIST',
              payload: {
                taskNumber: task.taskNumber,
                studentIdToDelete: task.student._id!,
              },
            })
        }}
      />
    </MarkAbsentContainer>
  )
}
