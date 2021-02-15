import { MutationFunctionOptions } from '@apollo/client'
import React, { FC, useState } from 'react'
import {
  findTemporaryTasks_findTemporaryTasks_temporaryTasks,
  gradeTemporaryTask,
  gradeTemporaryTaskVariables,
} from '../../../../../schemaTypes'
import {
  MarkCompleteButton,
  MarkCompleteContainer,
} from './state-n-styles/temporaryTaskStyles'

export type MarkCompleteProps = {
  setAnswered: () => void
  answered: boolean
  studentPresent: boolean
}

export const MarkComplete: FC<MarkCompleteProps> = ({
  setAnswered,
  answered,
  studentPresent,
}) => {
  return (
    <MarkCompleteContainer>
      <MarkCompleteButton
        answered={answered}
        studentPresent={studentPresent}
        onClick={() => {
          studentPresent && setAnswered()
        }}
      >
        {answered ? 'Completed' : 'Incomplete'}
      </MarkCompleteButton>
    </MarkCompleteContainer>
  )
}
