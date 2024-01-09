import React, { FC } from 'react'
import {
  findLessonByCourseAndDate_findLessonByCourseAndDate_lesson,
  controlCoolDown,
  controlCoolDownVariables,
  updateDynamicLesson,
  updateDynamicLessonVariables,
  DynamicLessonEnums,
  ActivityTimeEnum,
} from '../../../../../../schemaTypes'
import { DynamicLessonButton } from '../../styles/classControlPanelStyles'
import {
  ApolloCache,
  DefaultContext,
  MutationFunctionOptions,
  gql,
  useMutation,
} from '@apollo/client'
import { useMarkingPeriodContextProvider } from '../../../../../../contexts/markingPeriod/MarkingPeriodContext'

export type CoolDownManagerProps = {
  lesson: findLessonByCourseAndDate_findLessonByCourseAndDate_lesson
  presentStudentList: string[]
  updateDynamicLesson: (
    options?:
      | MutationFunctionOptions<
          updateDynamicLesson,
          updateDynamicLessonVariables,
          DefaultContext,
          ApolloCache<any>
        >
      | undefined,
  ) => void
}

export const CONTROL_COOL_DOWN_MUTATION = gql`
  mutation controlCoolDown($input: ControlCoolDownInput!) {
    controlCoolDown(input: $input) {
      protocols {
        _id
      }
    }
  }
`

export const CoolDownManager = ({
  lesson,
  presentStudentList,
  updateDynamicLesson,
}: CoolDownManagerProps) => {
  const [markingPeriodState] = useMarkingPeriodContextProvider()
  const [controlCoolDown] = useMutation<
    controlCoolDown,
    controlCoolDownVariables
  >(CONTROL_COOL_DOWN_MUTATION, {
    onCompleted: (data) => console.log(data),
    refetchQueries: [
      'findLessonByCourseAndDate',
      'findStudentByIdForTeachersAid',
    ],
  })

  const { isActive, academicOutcomeTypes, activityType, task } =
    lesson.afterActivity!

  return (
    <>
      <DynamicLessonButton
        currentLessonSetting={isActive}
        onClick={() => {
          if (!isActive) {
            controlCoolDown({
              variables: {
                input: {
                  lessonId: lesson._id!,
                  isActive: true,
                  academicOutcomeType: academicOutcomeTypes,
                  markingPeriod:
                    markingPeriodState.context.currentMarkingPeriod,
                  protocolActivityType: activityType,
                  studentIds: presentStudentList,
                  task: task,
                  activityTime: ActivityTimeEnum.AFTER,
                },
              },
            })
          }
        }}
      >
        Start
      </DynamicLessonButton>
      <DynamicLessonButton
        currentLessonSetting={!isActive}
        onClick={() => {
          controlCoolDown({
            variables: {
              input: {
                lessonId: lesson._id!,
                isActive: false,
                academicOutcomeType: academicOutcomeTypes,
                markingPeriod: markingPeriodState.context.currentMarkingPeriod,
                protocolActivityType: activityType,
                studentIds: presentStudentList,
                task: task,
                activityTime: ActivityTimeEnum.AFTER,
              },
            },
          })
          updateDynamicLesson({
            variables: {
              input: {
                lessonId: lesson._id!,
                dynamicLessonUpdate: DynamicLessonEnums.LESSON_DETAILS,
              },
            },
          })
        }}
      >
        Complete
      </DynamicLessonButton>
    </>
  )
}
