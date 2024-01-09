import React, { FC } from 'react'
import { useLessonEditorContextProvider } from './LessonEditorContext'
import { UnitSelect } from './UnitSelect'
import { LessonEditorInfo } from './LessonEditorInfo'
import { gql, useMutation, MutationFunctionOptions } from '@apollo/client'
import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateLesson,
  updateLessonVariables,
  // me_me_Teacher,
} from '../../../../../schemaTypes'
import { BackContainer } from '../../assignments/create-assignments/state-and-styles/createAssignmentsStyles'
import { Navigate, useNavigate } from 'react-router'
// import { useUserContextProvider } from '../../../../../contexts/UserContext'
export type LessonEditorProps = {
  course: string
}

export const UPDATE_LESSON_MUTATION = gql`
  mutation updateLesson($input: UpdateLessonInput!) {
    updateLesson(input: $input) {
      lessons {
        _id
      }
    }
  }
`

export type updateLessonType = (
  options?:
    | MutationFunctionOptions<updateLesson, updateLessonVariables>
    | undefined,
) => void

export const LessonEditor = ({ course }: LessonEditorProps) => {
  const navigate = useNavigate()
  // const me: me_me_Teacher = useUserContextProvider()
  const [state] = useLessonEditorContextProvider()

  // console.log(state.value)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [updateLesson, { data, error }] = useMutation<
    updateLesson,
    updateLessonVariables
  >(UPDATE_LESSON_MUTATION, {
    variables: {
      input: {
        assignedDate: state.context.assignedDate,
        assignedMarkingPeriod: state.context.assignedMarkingPeriod,
        assignedSectionIdList: state.context.assignedSectionIdList,
        assignedSections: {
          startingSection: state.context.startingSection,
          endingSection: state.context.endingSection,
        },
        pageNumbers: {
          startingPage: state.context.startingPage,
          endingPage: state.context.endingPage,
        },
        linkedCourseIds: state.context.courses,
        inUnit: state.context.inUnit,
        vocabList: state.context.vocabList,
        beforeActivity: state.context.beforeActivity,
        duringActivities: state.context.duringActivity,
        afterActivity: state.context.afterActivity,
        questionList: state.context.questionList,
        essentialQuestion: state.context.essentialQuestion,
        lessonName: state.context.lessonName,
      },
    },
    onCompleted: (data) => console.log(data),
    onError: (error) => console.log(error),
    refetchQueries: ['findLessonByIdForLessonEditor', 'findLessonsByUnit'],
  })
  return (
    <>
      <BackContainer>
        <div onClick={() => navigate('/dashboard/lessons')}>Back</div>
      </BackContainer>
      <div>Lesson Editor</div>
      <UnitSelect course={course} />
      {state.matches('editor') && (
        <LessonEditorInfo updateLesson={updateLesson} />
      )}
    </>
  )
}
