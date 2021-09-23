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
import {
  phraseCapitalizer,
  underscoreEliminator,
} from '../../../../../../utils'

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
    onCompleted: (data) => console.log(data),
    refetchQueries: [],
  })

  const behaviorPoints = (behavior: BehaviorEnum) => {
    if (behavior === BehaviorEnum.ANSWERED_QUESTION) {
      return 2
    } else if (behavior === BehaviorEnum.DID_NOT_ANSWER_QUESTION) {
      return 0
    } else return -5
  }

  return (
    <>
      <div>
        {behaviorEnum.map((behavior: BehaviorEnum, i: number) => (
          <div
            key={i}
            onClick={() =>
              createStudentBehavior({
                variables: {
                  input: {
                    studentBehaviorType: behavior,
                    studentId,
                    markingPeriod: currentMarkingPeriod,
                    responsibilityPoints: behaviorPoints(behavior),
                  },
                },
              })
            }
          >
            {phraseCapitalizer(underscoreEliminator(behavior))}
          </div>
        ))}
      </div>
    </>
  )
}
