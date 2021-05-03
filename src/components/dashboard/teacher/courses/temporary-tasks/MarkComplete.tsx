import { MutationFunctionOptions } from '@apollo/client'
import React, { FC, useState } from 'react'
import { useGradeCalculator } from '../../../../../hooks/useGradeCalculator'
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
  setAnswered: () => void
  answered: boolean
  task: findTemporaryTasks_findTemporaryTasks_temporaryTasks
  studentPresent: boolean
  gradeTask: (
    options?:
      | MutationFunctionOptions<gradeTemporaryTask, gradeTemporaryTaskVariables>
      | undefined
  ) => void
}

export const MarkComplete: FC<MarkCompleteProps> = ({
  setAnswered,
  answered,
  studentPresent,
  gradeTask,
  task,
}) => {
  // const { grade } = useGradeCalculator(task.student._id!, task.markingPeriod)
  return (
    <MarkCompleteContainer>
      <MarkCompleteButton
        answered={answered}
        studentPresent={studentPresent}
        onClick={() => {
          // studentPresent && setAnswered()
          studentPresent &&
            gradeTask({
              variables: {
                input: {
                  _id: task._id!,
                  answered: !answered,
                  studentPresent,
                  lastGrade: task.lastGrade,
                  // responsibilityPoints: responsibilityPointConverter(100, 2),
                  responsibilityPoints: 2,
                },
                // },
              },
            })
        }}
      >
        {answered ? 'Completed' : 'Incomplete'}
      </MarkCompleteButton>
    </MarkCompleteContainer>
  )
}
