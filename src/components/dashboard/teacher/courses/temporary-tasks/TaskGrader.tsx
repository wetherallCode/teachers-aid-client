import { gql, MutationFunctionOptions, useMutation } from '@apollo/client'
import React, { FC, useEffect, useState } from 'react'
import { useToggle } from '../../../../../hooks'
import {
  findTemporaryTasks_findTemporaryTasks_temporaryTasks,
  gradeTemporaryTask,
  gradeTemporaryTaskVariables,
} from '../../../../../schemaTypes'
import { MarkAbsent } from './MarkAbsent'
import { MarkComplete } from './MarkComplete'
import {
  TaskListData,
  TaskNameContainer,
} from './state-n-styles/temporaryTaskStyles'

export type TaskGraderProps = {
  task: findTemporaryTasks_findTemporaryTasks_temporaryTasks
  i: number
}

export const GRADE_TEMPORARY_TASK_MUTATION = gql`
  mutation gradeTemporaryTask($input: GradeTemporaryTaskInput!) {
    gradeTemporaryTask(input: $input) {
      temporaryTask {
        _id
        student {
          firstName
        }
        answered
        studentPresent
      }
    }
  }
`

export const TaskGrader: FC<TaskGraderProps> = ({ task, i }) => {
  const [studentPresent, setStudentPresent] = useToggle(task.studentPresent)
  const [answered, setAnswered] = useToggle(task.answered)

  const [gradeTask] = useMutation<
    gradeTemporaryTask,
    gradeTemporaryTaskVariables
  >(GRADE_TEMPORARY_TASK_MUTATION, {
    variables: { input: { _id: task._id!, answered, studentPresent } },
    onCompleted: (data) => {},
    refetchQueries: [],
  })

  useEffect(() => {
    gradeTask()
  }, [studentPresent, answered])

  return (
    <TaskListData i={i}>
      <MarkAbsent
        setStudentPresent={setStudentPresent}
        studentPresent={studentPresent}
      />
      <TaskNameContainer studentPresent={studentPresent}>
        {task.student.lastName}, {task.student.firstName}{' '}
        {studentPresent ? '' : '(Absent)'}
      </TaskNameContainer>
      <MarkComplete
        setAnswered={setAnswered}
        answered={task.answered}
        studentPresent={studentPresent}
      />
    </TaskListData>
  )
}
