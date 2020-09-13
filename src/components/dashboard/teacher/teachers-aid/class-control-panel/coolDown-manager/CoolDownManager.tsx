import React, { FC } from 'react'
import {
  findLessonByCourseAndDate_findLessonByCourseAndDate_lesson,
  controlCoolDown,
  controlCoolDownVariables,
} from '../../../../../../schemaTypes'
import { DynamicLessonButton } from '../../styles/classControlPanelStyles'
import { gql, useMutation } from '@apollo/client'

export type CoolDownManagerProps = {
  lesson: findLessonByCourseAndDate_findLessonByCourseAndDate_lesson
}

export const CONTROL_COOL_DOWN_MUTATION = gql`
  mutation controlCoolDown($input: ControlCoolDownInput!) {
    controlCoolDown(input: $input) {
      lesson {
        _id
      }
    }
  }
`

export const CoolDownManager: FC<CoolDownManagerProps> = ({ lesson }) => {
  const [controlCoolDown] = useMutation<
    controlCoolDown,
    controlCoolDownVariables
  >(CONTROL_COOL_DOWN_MUTATION, {
    onCompleted: (data) => console.log(data),
    refetchQueries: ['findLessonByCourseAndDate'],
  })
  return (
    <>
      <DynamicLessonButton
        currentLessonSetting={lesson.beforeActivity.isActive}
        onClick={() =>
          controlCoolDown({
            variables: { input: { lessonId: lesson._id!, isActive: true } },
          })
        }
      >
        Start
      </DynamicLessonButton>
      <DynamicLessonButton
        currentLessonSetting={!lesson.beforeActivity.isActive}
        onClick={() =>
          controlCoolDown({
            variables: { input: { lessonId: lesson._id!, isActive: false } },
          })
        }
      >
        Complete
      </DynamicLessonButton>
    </>
  )
}
