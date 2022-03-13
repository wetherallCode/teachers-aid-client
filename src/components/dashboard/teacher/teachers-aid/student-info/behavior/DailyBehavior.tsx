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
import { useTeachersAidContextProvider } from '../../state/TeachersAidContext'
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
  const [state] = useTeachersAidContextProvider()
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
    if (behavior === BehaviorEnum.ANSWERED_QUESTION) return 2
    else if (behavior === BehaviorEnum.DID_NOT_ANSWER_QUESTION) return 0
    else if (behavior === BehaviorEnum.ON_TASK) return 2
    else if (behavior === BehaviorEnum.OFF_TASK) return -2
    else if (behavior === BehaviorEnum.DISRUPTIVE) return -3
    else if (behavior === BehaviorEnum.EXCESSIVE_TALKING) return -2
    else if (behavior === BehaviorEnum.UNPREPARED) return -2
    else if (behavior === BehaviorEnum.DISRESPECTFUL) return -10
    else if (behavior === BehaviorEnum.INNAPROPRIATE_LANGUAGE) return -10
    else return 0
  }
  const questionAndAnswerBehaviors = behaviorEnum.slice(0, 2)
  const negativeBehaviors = behaviorEnum.slice(4, 9)
  const taskBehaviors = behaviorEnum.slice(2, 4)

  return (
    <>
      {state.context.studentInfoSelector === 'QUESTION_AND_ANSWER' && (
        <StudentBehaviorButtonContainer>
          {questionAndAnswerBehaviors.map(
            (behavior: BehaviorEnum, i: number) => (
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
            )
          )}
        </StudentBehaviorButtonContainer>
      )}
      {state.context.studentInfoSelector === 'NEGATIVE_BEHAVIOR' && (
        <StudentBehaviorButtonContainer>
          {negativeBehaviors.map((behavior: BehaviorEnum, i: number) => (
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
      )}
      {state.context.studentInfoSelector === 'TASK_CHECK' && (
        <StudentBehaviorButtonContainer>
          {taskBehaviors.map((behavior: BehaviorEnum, i: number) => (
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
      )}
    </>
  )
}
