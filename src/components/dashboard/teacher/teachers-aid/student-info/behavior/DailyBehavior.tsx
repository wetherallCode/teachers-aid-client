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
import {
  ControlButtons,
  StudentBehaviorButton,
  StudentBehaviorButtonContainer,
  StudentControlButtonContainer,
} from '../../styles/studentInfoStyles'

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
    refetchQueries: ['findStudentInfoByStudentId'],
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
      <StudentBehaviorButtonContainer>
        {behaviorEnum.map((behavior: BehaviorEnum, i: number) => (
          <StudentBehaviorButton
            key={i}
            goodBehavior={behaviorPoints(behavior) >= 0}
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
          </StudentBehaviorButton>
        ))}
      </StudentBehaviorButtonContainer>
    </>
  )
}
