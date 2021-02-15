import { gql, useMutation, useQuery } from '@apollo/client'
import React, { FC, useEffect, useState } from 'react'
import {
  createTemporaryTasks,
  createTemporaryTasksVariables,
  findTemporaryTasks,
  findTemporaryTasksVariables,
} from '../../../../../schemaTypes'
import { CreateTask } from './CreateTask'
import { useTemporaryTasksContextProvider } from './state-n-styles/TemporaryTasksContext'
import {
  TaskCreatorHeader,
  TaskToGradeSelectorContainer,
  TemporaryTaskDisplay,
} from './state-n-styles/temporaryTaskStyles'
import { TaskList } from './TaskList'

export type TaskCreatorProps = {
  courseId: string
  dateIssued: string
}

export const FIND_TEMPORARY_TASKS_QUERY = gql`
  query findTemporaryTasks($input: FindTemporaryTasksInput!) {
    findTemporaryTasks(input: $input) {
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
        answered
      }
    }
  }
`
export const TaskCreator: FC<TaskCreatorProps> = ({ courseId, dateIssued }) => {
  const [state, event] = useTemporaryTasksContextProvider()

  const { loading, data } = useQuery<
    findTemporaryTasks,
    findTemporaryTasksVariables
  >(FIND_TEMPORARY_TASKS_QUERY, {
    variables: {
      input: {
        courseId,
        dateIssued: dateIssued,
      },
    },
    onCompleted: () => {
      event({
        type: 'SET_TASK_NUMBER',
        payload:
          taskNumberList![taskNumberList!.length] !== 0
            ? taskNumberList.length
            : 0,
      })
      event({
        type: 'SET_TASK_TO_GRADE_NUMBER',
        payload:
          taskNumberList![taskNumberList!.length] !== 0
            ? taskNumberList.length - 1
            : 0,
      })
    },
    onError: (error) => console.error(error),
  })

  const taskNumberList = data?.findTemporaryTasks
    .temporaryTasks!.map((task) => task.taskNumber)
    .reduce(
      (acc: number[], i: number) => (acc.includes(i) ? [...acc] : [...acc, i]),
      []
    )!

  const taskList = data?.findTemporaryTasks!.temporaryTasks!.filter(
    (task) => task.taskNumber === state.context.taskToGradeNumber
  )!

  const disablePlusSelectorSwitch =
    taskNumberList &&
    state.context.taskToGradeNumber < taskNumberList.length - 1
      ? { color: 'var(--blue)', cursor: 'pointer' }
      : { color: 'var(--grey)', cursor: 'pointer' }

  const disableMinusSelectorSwitch =
    taskNumberList && state.context.taskToGradeNumber > 0
      ? { color: 'var(--blue)', cursor: 'pointer' }
      : { color: 'var(--grey)', cursor: 'pointer' }

  return (
    <>
      {data?.findTemporaryTasks.temporaryTasks.length! > 0 ? (
        <div>
          <TaskCreatorHeader>
            <div>{new Date().toLocaleDateString()}</div>
            <TaskToGradeSelectorContainer>
              <div
                style={disableMinusSelectorSwitch}
                onClick={() => {
                  state.context.taskToGradeNumber > 0 &&
                    event({
                      type: 'SET_TASK_TO_GRADE_NUMBER',
                      payload: state.context.taskToGradeNumber - 1,
                    })
                }}
              >
                &lt;
              </div>
              <div>
                {loading
                  ? 'Loading'
                  : state.context.taskToGradeNumber === 0
                  ? 'Warm Up'
                  : 'Task ' + state.context.taskToGradeNumber}
              </div>
              <div
                style={disablePlusSelectorSwitch}
                onClick={() => {
                  state.context.taskToGradeNumber < taskNumberList.length - 1 &&
                    event({
                      type: 'SET_TASK_TO_GRADE_NUMBER',
                      payload: state.context.taskToGradeNumber + 1,
                    })
                }}
              >
                &gt;
              </div>
            </TaskToGradeSelectorContainer>
            <CreateTask courseId={courseId} warmUp={false} />
          </TaskCreatorHeader>

          <TaskList taskList={taskList} />
        </div>
      ) : (
        <TemporaryTaskDisplay>
          <CreateTask courseId={courseId} warmUp={true} />
        </TemporaryTaskDisplay>
      )}
    </>
  )
}
