import { useMutation } from '@apollo/client'
import {
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
  const [, event] = useTeachersAidContextProvider()

  const [updateDynamicLeson] = useMutation<
    updateDynamicLesson,
    updateDynamicLessonVariables
  >(UPDATE_DYNAMIC_LESSON_MUTATION, {
    onCompleted: (data) => console.log(data.UpdateDynamicLesson),
    refetchQueries: ['findLessonByCourseAndDate'],
  })

  return (
    <>
      <MainScreenControlButton
        onClick={() => event({ type: 'CHANGE_MAIN_SCREEN_SEATING_CHART' })}
      >
        Desk View
      </MainScreenControlButton>
      <MainScreenControlButton
        // onClick={() => event({ type: 'CHANGE_MAIN_SCREEN_VIRTUAL_ATTENDANCE' })}
        onClick={() => event({ type: 'CHANGE_MAIN_SCREEN_STUDENT_STATUS' })}
      >
        Student Status
      </MainScreenControlButton>
      <MainScreenControlButton
        onClick={() =>
          event({ type: 'CHANGE_MAIN_SCREEN_WARMUP_EXIT_TICKET_VIEWER' })
        }
      >
        Protocol Responses
      </MainScreenControlButton>
      <MainScreenControlButton
        onClick={() => event({ type: 'CHANGE_MAIN_SCREEN_HOMEWORK_ASSIGNER' })}
      >
        Assignments
      </MainScreenControlButton>
    </>
  )
}
