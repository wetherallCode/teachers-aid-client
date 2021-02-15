import {
  gql,
  MutationFunctionOptions,
  useMutation,
  useQuery,
} from '@apollo/client'
import React, { FC } from 'react'
import { useParams } from 'react-router'
import {
  createTemporaryTasks,
  createTemporaryTasksVariables,
  findTemporaryTasks,
  findTemporaryTasksVariables,
} from '../../../../../schemaTypes'
import { useTemporaryTasksContextProvider } from './state-n-styles/TemporaryTasksContext'
import { CreateTaskButton } from './state-n-styles/temporaryTaskStyles'

export type CreateTaskProps = {
  courseId: string
  warmUp: boolean
}

export const CREATE_TEMPORARY_TASKS_MUTATION = gql`
  mutation createTemporaryTasks($input: CreateTemporaryTasksInput!) {
    createTemporaryTasks(input: $input) {
      temporaryTasks {
        _id
        dateIssued
        student {
          _id
          firstName
          lastName
        }
        studentPresent
        taskNumber
      }
    }
  }
`

export const CreateTask: FC<CreateTaskProps> = ({ courseId, warmUp }) => {
  const [state, event] = useTemporaryTasksContextProvider()
  console.log('taskNumber: ' + state.context.taskNumber)
  console.log('taskToGradeNumber: ' + state.context.taskNumber)
  const [createTask] = useMutation<
    createTemporaryTasks,
    createTemporaryTasksVariables
  >(CREATE_TEMPORARY_TASKS_MUTATION, {
    variables: {
      input: {
        taskNumber: state.context.taskNumber,
        courseId,
        dateIssued: new Date().toLocaleDateString(),
      },
    },
    onCompleted: (data) => {
      event({
        type: 'SET_TASK_NUMBER',
        payload: state.context.taskNumber + 1,
      })
      event({
        type: 'SET_TASK_TO_GRADE_NUMBER',
        payload: state.context.taskNumber,
      })
    },
    refetchQueries: ['findTemporaryTasks'],
  })

  return (
    <>
      {warmUp ? (
        <div
          onClick={() => {
            createTask()
          }}
        >
          Create Warm Up
        </div>
      ) : (
        <CreateTaskButton
          onClick={() => {
            createTask()
          }}
        >
          Create Task {state.context.taskNumber}
        </CreateTaskButton>
      )}
    </>
  )
}
