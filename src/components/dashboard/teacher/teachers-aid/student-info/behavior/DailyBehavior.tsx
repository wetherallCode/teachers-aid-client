import { gql, useMutation } from '@apollo/client'
import React from 'react'
import { useEnumContextProvider } from '../../../../../../contexts/EnumContext'
import { useMarkingPeriodContextProvider } from '../../../../../../contexts/markingPeriod/MarkingPeriodContext'
import {
  createStudentBehaviorVariables,
  createStudentBehavior,
  BehaviorEnum,
  MarkingPeriodEnum,
} from '../../../../../../schemaTypes'

export type DailyBehaviorProps = { studentId: string }

export const CREATE_BEHAVIOR_MUTATION = gql`
  mutation createStudentBehavior($input: CreateStudentBehaviorInput!) {
    createStudentBehavior(input: $input) {
      studentBehavior {
        _id
      }
    }
  }
`

export const DailyBehavior = ({ studentId }: DailyBehaviorProps) => {
  const { behaviorEnum, markingPeriodEnum } = useEnumContextProvider()
  const [markingPeriodState] = useMarkingPeriodContextProvider()
  const { currentMarkingPeriod } = markingPeriodState.context

  // const markingPeriodNumber = markingPeriodEnum.findIndex(
  //   (element: MarkingPeriodEnum) => element === currentMarkingPeriod
  // )

  const [createStudentBehavior] = useMutation<
    createStudentBehavior,
    createStudentBehaviorVariables
  >(CREATE_BEHAVIOR_MUTATION, {
    variables: {
      input: {
        studentBehaviorType: BehaviorEnum.ANSWERED_QUESTION,
        studentId,
        markingPeriod: currentMarkingPeriod,
        responsibilityPoints: 2,
      },
    },
    onCompleted: (data) => console.log(data),
    refetchQueries: [],
  })
  return (
    <>
      <div></div>
    </>
  )
}
