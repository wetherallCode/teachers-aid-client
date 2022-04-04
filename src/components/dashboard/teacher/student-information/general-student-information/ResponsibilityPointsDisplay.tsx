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
  available: boolean
  currentMarkingPeriodResponsiblityPoints: (number | undefined) | number
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
  available,
}: ResponsibilityPointsDisplayProps) => {
  return (
    <div>
      <div>Responsibility Points</div>
      <div>
        {available
          ? currentMarkingPeriodResponsiblityPoints
          : 'No points assigned '}
      </div>
    </div>
  )
}
