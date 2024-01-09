import { useQuery } from '@apollo/client'
import React, { FC } from 'react'
import {
  findTemporaryTasks,
  findTemporaryTasksVariables,
} from '../../../../../schemaTypes'
import { useTemporaryTasksContextProvider } from './state-n-styles/TemporaryTasksContext'
import { FIND_TEMPORARY_TASKS_QUERY, TaskCreator } from './TaskCreator'

export type LoadTasksProps = {
  courseId: string
  dateIssued: string
}

export const LoadTasks: FC<LoadTasksProps> = ({ courseId, dateIssued }) => {
  const [, event] = useTemporaryTasksContextProvider()

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
    onCompleted: (data) => {
      const taskNumberList = data?.findTemporaryTasks
        .temporaryTasks!.map((task) => task.taskNumber)
        .reduce(
          (acc: number[], i: number) =>
            acc.includes(i) ? [...acc] : [...acc, i],
          [],
        )!

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

      const taskNumberListArr = data.findTemporaryTasks.temporaryTasks
        .map((task) => task.taskNumber)
        .reduce(
          (acc: number[], i: number) =>
            acc.includes(i) ? [...acc] : [...acc, i],
          [],
        )

      for (const taskNumber of taskNumberListArr) {
        taskNumber !== 0 &&
          event({ type: 'ADD_NEW_ABSENT_LIST', payload: taskNumber })
      }

      for (const task of data.findTemporaryTasks.temporaryTasks) {
        if (!task.studentPresent) {
          event({
            type: 'ADD_TO_ABSENT_LIST',
            payload: {
              taskNumber: task.taskNumber,
              studentIdToAdd: task.student._id!,
            },
          })
        }
      }
    },

    onError: (error) => console.error(error),
  })

  return (
    <>
      {data && (
        <TaskCreator
          courseId={courseId}
          dateIssued={dateIssued}
          data={data}
          loading={loading}
        />
      )}
    </>
  )
}
