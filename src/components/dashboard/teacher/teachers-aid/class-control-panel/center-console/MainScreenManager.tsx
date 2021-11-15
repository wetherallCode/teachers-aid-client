import { useMutation } from '@apollo/client'
import React, { FC } from 'react'
import {
  DynamicLessonEnums,
  findLessonByCourseAndDate_findLessonByCourseAndDate_lesson,
  updateDynamicLesson,
  updateDynamicLessonVariables,
} from '../../../../../../schemaTypes'
import { useTeachersAidContextProvider } from '../../state/TeachersAidContext'
import { MainScreenControlButton } from '../../styles/classControlPanelStyles'
import { UPDATE_DYNAMIC_LESSON_MUTATION } from '../DynamicLesson/DynamicLessonManager'

export type MainScreenManagerProps = {
  lesson: findLessonByCourseAndDate_findLessonByCourseAndDate_lesson
}

export const MainScreenManager = ({ lesson }: MainScreenManagerProps) => {
  const [state, event] = useTeachersAidContextProvider()
  const [updateDynamicLeson] = useMutation<
    updateDynamicLesson,
    updateDynamicLessonVariables
  >(UPDATE_DYNAMIC_LESSON_MUTATION, {
    onCompleted: (data) => console.log(data.UpdateDynamicLesson),
    refetchQueries: ['findLessonByCourseAndDate'],
  })
  // console.log(state.context.attendanceToggle)
  return (
    <>
      <MainScreenControlButton
        onClick={() => event({ type: 'CHANGE_MAIN_SCREEN_SEATING_CHART' })}
      >
        Seating Chart
      </MainScreenControlButton>
      <MainScreenControlButton
        // onClick={() => event({ type: 'CHANGE_MAIN_SCREEN_VIRTUAL_ATTENDANCE' })}
        onClick={() => event({ type: 'SET_ATTENDANCE_TOGGLE' })}
      >
        {state.context.attendanceToggle ? 'Behavior' : 'Attendance'}
      </MainScreenControlButton>
      <MainScreenControlButton
        onClick={() =>
          // event({ type: 'CHANGE_MAIN_SCREEN_VIRTUAL_QUESTION_VIEWER' })
          updateDynamicLeson({
            variables: {
              input: {
                lessonId: lesson._id!,
                dynamicLessonUpdate: DynamicLessonEnums.ASSIGNED_SEATING,
              },
            },
          })
        }
      >
        Assigned Seats
      </MainScreenControlButton>
      {/* <MainScreenControlButton
        onClick={() =>
          event({ type: 'CHANGE_MAIN_SCREEN_VIRTUAL_QUESTION_VIEWER' })
        }
      >
        Questions
      </MainScreenControlButton> */}
      <MainScreenControlButton
        onClick={() => event({ type: 'CHANGE_MAIN_SCREEN_HOMEWORK_ASSIGNER' })}
      >
        Assignments
      </MainScreenControlButton>
    </>
  )
}
