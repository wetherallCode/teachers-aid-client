import React, { FC, useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import {
  updateDynamicLesson,
  updateDynamicLessonVariables,
  findLessonByCourseAndDate_findLessonByCourseAndDate_lesson,
  DynamicLessonEnums,
} from '../../../../../../schemaTypes'
import {
  DynamicLessonHeader,
  DynamicLessonButton,
} from '../../styles/classControlPanelStyles'

export type DynamicLessonManagerProps = {
  lesson: findLessonByCourseAndDate_findLessonByCourseAndDate_lesson
}

export type DynamicLessonButtonProps = {
  currentLessonSetting?: boolean
}

export const UPDATE_DYNAMIC_LESSON_MUTATION = gql`
  mutation updateDynamicLesson($input: UpdateDynamicLessonInput!) {
    UpdateDynamicLesson(input: $input) {
      lesson {
        _id
      }
    }
  }
`

export const DynamicLessonManager: FC<DynamicLessonManagerProps> = ({
  lesson,
}) => {
  const [updateDynamicLeson] = useMutation<
    updateDynamicLesson,
    updateDynamicLessonVariables
  >(UPDATE_DYNAMIC_LESSON_MUTATION, {
    onCompleted: (data) => console.log(data),
    refetchQueries: ['findLessonByCourseAndDate'],
  })

  const handleClick = (dynamicLessonSetting: DynamicLessonEnums) => {
    updateDynamicLeson({
      variables: {
        input: {
          lessonId: lesson._id!,
          dynamicLessonUpdate: dynamicLessonSetting,
        },
      },
    })
  }

  return (
    <>
      <DynamicLessonHeader>Dynamic Lesson</DynamicLessonHeader>
      {lesson.dynamicLesson === 'OFF' ? (
        <div>
          <DynamicLessonButton
            // currentLessonSetting={}
            onClick={() => handleClick(DynamicLessonEnums.ON)}
          >
            Start Lesson
          </DynamicLessonButton>
        </div>
      ) : (
        <>
          <DynamicLessonButton
            currentLessonSetting={lesson.dynamicLesson === 'WARM_UP'}
            onClick={() => handleClick(DynamicLessonEnums.WARM_UP)}
          >
            Warm Up
          </DynamicLessonButton>
          <DynamicLessonButton
            currentLessonSetting={lesson.dynamicLesson === 'LESSON_DETAILS'}
            onClick={() => handleClick(DynamicLessonEnums.LESSON_DETAILS)}
          >
            Lesson Details
          </DynamicLessonButton>
          <DynamicLessonButton
            currentLessonSetting={lesson.dynamicLesson === 'VOCAB'}
            onClick={() => handleClick(DynamicLessonEnums.VOCAB)}
          >
            Vocab
          </DynamicLessonButton>
        </>
      )}
    </>
  )
}
