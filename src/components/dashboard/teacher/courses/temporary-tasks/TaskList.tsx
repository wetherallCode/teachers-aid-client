import React, { FC } from 'react'
import { findTemporaryTasks_findTemporaryTasks_temporaryTasks } from '../../../../../schemaTypes'
import {
  EndOfContainer,
  TaskListContainer,
  TaskListHeaders,
  TaskListTaskGraderContainer,
} from './state-n-styles/temporaryTaskStyles'
import { TaskGrader } from './TaskGrader'

export type TaskListProps = {
  taskList: findTemporaryTasks_findTemporaryTasks_temporaryTasks[]
  absentStudentList?: findTemporaryTasks_findTemporaryTasks_temporaryTasks[]
}

export const TaskList: FC<TaskListProps> = ({
  taskList,
  absentStudentList,
}) => {
  const sortByLastNameInObject = (
    a: findTemporaryTasks_findTemporaryTasks_temporaryTasks,
    b: findTemporaryTasks_findTemporaryTasks_temporaryTasks,
  ) => {
    let aName = a.student.lastName.toUpperCase()
    let bName = b.student.lastName.toUpperCase()
    if (aName < bName) {
      return -1
    }
    if (aName > bName) {
      return 1
    }

    return 0
  }

  return (
    <TaskListContainer>
      <TaskListHeaders>
        <div>Attendance</div>
        <div>Student</div>
        <EndOfContainer>
          Total Complete: {taskList.filter((task) => task.answered).length}
        </EndOfContainer>
      </TaskListHeaders>
      <TaskListTaskGraderContainer>
        {taskList.sort(sortByLastNameInObject).map((task, i: number) => (
          <TaskGrader
            key={task._id}
            task={task}
            i={i}
            absentStudentList={absentStudentList}
          />
        ))}
      </TaskListTaskGraderContainer>
    </TaskListContainer>
  )
}
