import React, { FC } from 'react'
import { DynamicLessonButton } from '../../styles/classControlPanelStyles'
import { gql, useMutation } from '@apollo/client'
import {
  findLessonByCourseAndDate_findLessonByCourseAndDate_lesson,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  controlWarmUp,
  controlWarmUpVariables,
} from '../../../../../../schemaTypes'

export type WarmUpManagerProps = {
  lesson: findLessonByCourseAndDate_findLessonByCourseAndDate_lesson
}

export const CONTROL_WARM_UP_MUTATION = gql`
  mutation controlWarmUp($input: ControlWarmUpInput!) {
    controlWarmUp(input: $input) {
      lesson {
        beforeActivity {
          isActive
        }
      }
    }
  }
`
export const WarmUpManager: FC<WarmUpManagerProps> = ({ lesson }) => {
  const [controlWarmUp] = useMutation<controlWarmUp, controlWarmUpVariables>(
    CONTROL_WARM_UP_MUTATION,
    {
      onCompleted: (data) => console.log(data),
      refetchQueries: ['findLessonByCourseAndDate'],
    }
  )
  return (
    <>
      <DynamicLessonButton
        currentLessonSetting={lesson.beforeActivity.isActive}
        onClick={() =>
          controlWarmUp({
            variables: { input: { lessonId: lesson._id!, isActive: true } },
          })
        }
      >
        Start
      </DynamicLessonButton>
      <DynamicLessonButton
        currentLessonSetting={!lesson.beforeActivity.isActive}
        onClick={() =>
          controlWarmUp({
            variables: { input: { lessonId: lesson._id!, isActive: false } },
          })
        }
      >
        Complete
      </DynamicLessonButton>
    </>
  )
}
