import { gql, useMutation } from '@apollo/client'
import React, { FC } from 'react'
import {
  findTemporaryTasks_findTemporaryTasks_temporaryTasks,
  gradeTemporaryTask,
  gradeTemporaryTaskVariables,
} from '../../../../../schemaTypes'
import { responsibilityPointConverter } from '../../../../../utils'
import {
  MarkCompleteButton,
  MarkCompleteContainer,
} from './state-n-styles/temporaryTaskStyles'

export type MarkCompleteProps = {
  answered: boolean
  task: findTemporaryTasks_findTemporaryTasks_temporaryTasks
  studentPresent: boolean
  grade: number
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
      }
    }
  }
`

export const MarkComplete: FC<MarkCompleteProps> = ({
  answered,
  studentPresent,
  task,
  grade,
}) => {
  const [gradeTask, { called, data }] = useMutation<
    gradeTemporaryTask,
    gradeTemporaryTaskVariables
  >(GRADE_TEMPORARY_TASK_MUTATION, {
    refetchQueries: ['findTemporaryTasks'],
  })

  return (
    <MarkCompleteContainer>
      <MarkCompleteButton
        answered={data?.gradeTemporaryTask.temporaryTask.answered || answered}
        disabled={!studentPresent}
        studentPresent={studentPresent}
        onClick={() => {
          console.log(
            task.student.firstName,
            grade,
            responsibilityPointConverter(grade, 2),
            new Date().toLocaleTimeString()
          )

          studentPresent &&
            gradeTask({
              variables: {
                input: {
                  _id: task._id!,
                  answered: !answered,
                  lastGrade: task.lastGrade,
                  responsibilityPoints: responsibilityPointConverter(grade, 2),
                },
              },
            })
        }}
      >
        {called && !data
          ? '...'
          : answered || data?.gradeTemporaryTask.temporaryTask.answered
          ? 'Complete'
          : 'Incomplete'}
      </MarkCompleteButton>
    </MarkCompleteContainer>
  )
}
