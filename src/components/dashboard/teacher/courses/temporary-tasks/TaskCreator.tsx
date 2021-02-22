import { gql, useQuery } from '@apollo/client'
import React, { FC, useEffect } from 'react'
import {
  findTemporaryTasks,
  findTemporaryTasksVariables,
  findTemporaryTasks_findTemporaryTasks_temporaryTasks,
} from '../../../../../schemaTypes'
import { CreateTask } from './CreateTask'
import { useTemporaryTasksContextProvider } from './state-n-styles/TemporaryTasksContext'
import {
  TaskCreatorHeader,
  TaskToGradeSelectorContainer,
  TaskToGradeTitle,
  TemporaryTaskDisplay,
} from './state-n-styles/temporaryTaskStyles'
import { TaskList } from './TaskList'

export type TaskCreatorProps = {
  courseId: string
  dateIssued: string
  data: findTemporaryTasks | undefined
  loading: boolean
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
export const TaskCreator: FC<TaskCreatorProps> = ({
  courseId,
  dateIssued,
  loading,
  data,
}) => {
  const [state, event] = useTemporaryTasksContextProvider()

  // const { loading, data } = useQuery<
  //   findTemporaryTasks,
  //   findTemporaryTasksVariables
  // >(FIND_TEMPORARY_TASKS_QUERY, {
  //   variables: {
  //     input: {
  //       courseId,
  //       dateIssued: dateIssued,
  //     },
  //   },
  //   onCompleted: (data) => {
  //     event({
  //       type: 'SET_TASK_NUMBER',
  //       payload:
  //         taskNumberList![taskNumberList!.length] !== 0
  //           ? taskNumberList.length
  //           : 0,
  //     })

  //     event({
  //       type: 'SET_TASK_TO_GRADE_NUMBER',
  //       payload:
  //         taskNumberList![taskNumberList!.length] !== 0
  //           ? taskNumberList.length - 1
  //           : 0,
  //     })

  //     const taskNumberListArr = data.findTemporaryTasks.temporaryTasks
  //       .map((task) => task.taskNumber)
  //       .reduce(
  //         (acc: number[], i: number) =>
  //           acc.includes(i) ? [...acc] : [...acc, i],
  //         []
  //       )

  //     for (const taskNumber of taskNumberListArr) {
  //       taskNumber !== 0 &&
  //         event({ type: 'ADD_NEW_ABSENT_LIST', payload: taskNumber })
  //     }

  //     for (const task of data.findTemporaryTasks.temporaryTasks) {
  //       if (!task.studentPresent) {
  //         event({
  //           type: 'ADD_TO_ABSENT_LIST',
  //           payload: {
  //             taskNumber: task.taskNumber,
  //             studentIdToAdd: task.student._id!,
  //           },
  //         })
  //       }
  //     }
  //   },

  //   onError: (error) => console.error(error),
  // })

  const absentStudentList = data?.findTemporaryTasks.temporaryTasks.filter(
    (task) =>
      task.taskNumber === state.context.taskNumber - 1 && !task.studentPresent
  )!

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

  console.log(state.context.absentList)

  useEffect(() => {
    const [absentList] = state.context.absentList.filter(
      (i) => i.taskNumber === state.context.taskNumber - 2
    )

    for (const task of taskList)
      if (absentList && absentList.tasks.includes(task.student._id!)) {
        // setStudentPresent(false)
        !task.studentPresent &&
          event({
            type: 'ADD_TO_ABSENT_LIST',
            payload: {
              taskNumber: state.context.taskNumber - 1,
              studentIdToAdd: task.student._id!,
            },
          })
      }
  }, [state.context.taskNumber])
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
              <TaskToGradeTitle>
                {loading
                  ? 'Loading'
                  : state.context.taskToGradeNumber === 0
                  ? 'Warm Up'
                  : 'Task ' + state.context.taskToGradeNumber}
              </TaskToGradeTitle>
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

          <TaskList taskList={taskList} absentStudentList={absentStudentList} />
        </div>
      ) : (
        <TemporaryTaskDisplay>
          <CreateTask courseId={courseId} warmUp={true} />
        </TemporaryTaskDisplay>
      )}
    </>
  )
}
