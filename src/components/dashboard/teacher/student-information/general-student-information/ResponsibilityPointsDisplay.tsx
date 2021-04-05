import { gql, useQuery } from '@apollo/client'
import React, { Dispatch, SetStateAction, useState } from 'react'
import {
  findResponsibilityPointsByStudentId,
  findResponsibilityPointsByStudentIdVariables,
  findResponsibilityPointsByStudentId_findResponsibilityPointsByStudentId_responsibilityPoints,
  MarkingPeriodEnum,
} from '../../../../../schemaTypes'
import { MarkingPeriodSelectorSwitch } from '../../../../reusable-components/MarkingPeriodSelectorSwitch'

export type ResponsibilityPointsDisplayProps = {
  currentMarkingPeriodResponsiblityPoints: findResponsibilityPointsByStudentId_findResponsibilityPointsByStudentId_responsibilityPoints
}

export const RESPONSIBILITY_POINTS_QUERY = gql`
  query findResponsibilityPointsByStudentId(
    $input: FindResponsibilityPointsByStudentIdInput!
  ) {
    findResponsibilityPointsByStudentId(input: $input) {
      responsibilityPoints {
        responsibilityPoints
        markingPeriod
      }
    }
  }
`

export const ResponsibilityPointsDisplay = ({
  currentMarkingPeriodResponsiblityPoints,
}: ResponsibilityPointsDisplayProps) => {
  return (
    <div>
      <div>Responsibility Points</div>
      <div>{currentMarkingPeriodResponsiblityPoints.responsibilityPoints}</div>
    </div>
  )
}
