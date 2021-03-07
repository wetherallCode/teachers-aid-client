import { gql, useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { useEnumContextProvider } from '../../../../contexts/EnumContext'
import { useMarkingPeriodContextProvider } from '../../../../contexts/markingPeriod/MarkingPeriodContext'
import {
  findTemporaryTasksByStudentId,
  findTemporaryTasksByStudentIdVariables,
} from '../../../../schemaTypes'
import { useStudentInformationContextProvider } from './state-n-styles/StudentInformationContext'
import { ProtocolInformationContainer } from './state-n-styles/studentInformationStyles'

export type TemporaryTasksInformationProps = {}

export const FIND_TEMPORARY_TASKS_BY_STUDENT_ID_QUERY = gql`
  query findTemporaryTasksByStudentId(
    $input: FindTemporaryTasksByStudentIdInput!
  ) {
    findTemporaryTasksByStudentId(input: $input) {
      temporaryTasks {
        _id
        dateIssued
        answered
        studentPresent
        markingPeriod
      }
    }
  }
`

export const TemporaryTasksInformation = ({}: TemporaryTasksInformationProps) => {
  const [state] = useStudentInformationContextProvider()
  const [markingPeriodState] = useMarkingPeriodContextProvider()
  const { markingPeriodEnum } = useEnumContextProvider()

  const [markingPeriodToReview, setMarkingPeriodToReview] = useState(
    markingPeriodState.context.currentMarkingPeriod
  )
  const { loading, data } = useQuery<
    findTemporaryTasksByStudentId,
    findTemporaryTasksByStudentIdVariables
  >(FIND_TEMPORARY_TASKS_BY_STUDENT_ID_QUERY, {
    variables: {
      input: { studentId: state.context.student?._id! },
    },
    onCompleted: (data) => console.log(data),
    onError: (error) => console.error(error),
  })

  const totalTasks = data?.findTemporaryTasksByStudentId.temporaryTasks.filter(
    (tasks) =>
      tasks.studentPresent && tasks.markingPeriod === markingPeriodToReview
  )

  const completedTasks = data?.findTemporaryTasksByStudentId.temporaryTasks.filter(
    (tasks) =>
      tasks.answered &&
      tasks.studentPresent &&
      tasks.markingPeriod === markingPeriodToReview
  )

  const completionRate =
    data && Math.round((100 * completedTasks!.length) / totalTasks!.length)

  if (loading) return <div>Loading </div>

  return (
    <ProtocolInformationContainer>
      <div>
        Tasks Completed: {completedTasks!.length}/{totalTasks!.length}
      </div>
      <div>Completion Rate: {completionRate}%</div>
    </ProtocolInformationContainer>
  )
}
