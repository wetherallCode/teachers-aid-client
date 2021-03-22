import { gql, useQuery } from '@apollo/client'
import React, { Dispatch, SetStateAction, useState } from 'react'
import {
  findResponsibilityPointsByStudentId,
  findResponsibilityPointsByStudentIdVariables,
  MarkingPeriodEnum,
} from '../../../../../schemaTypes'
import { MarkingPeriodSelectorSwitch } from '../../../../reusable-components/MarkingPeriodSelectorSwitch'

export type ResponsibilityPointsDisplayProps = {
  studentId: string
  selectedMarkingPeriod: MarkingPeriodEnum
  setSelectedMarkingPeriod: Dispatch<SetStateAction<MarkingPeriodEnum>>
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
  studentId,
  selectedMarkingPeriod,
  setSelectedMarkingPeriod,
}: ResponsibilityPointsDisplayProps) => {
  const { loading, data } = useQuery<
    findResponsibilityPointsByStudentId,
    findResponsibilityPointsByStudentIdVariables
  >(RESPONSIBILITY_POINTS_QUERY, {
    variables: {
      input: { studentId },
    },
    onCompleted: (data) => console.log(data),
    onError: (error) => console.error(error),
  })
  if (loading) return <div>Loading </div>
  const [
    currentMarkingPeriodResponsiblityPoints,
  ] = data?.findResponsibilityPointsByStudentId.responsibilityPoints.filter(
    (points) => points.markingPeriod === selectedMarkingPeriod
  )!

  return (
    <div>
      <div>Responsibility Points</div>
      <div>{currentMarkingPeriodResponsiblityPoints.responsibilityPoints}</div>
    </div>
  )
}
