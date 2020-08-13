import React, { FC } from 'react'
import {
  PeriodSelectDisplayContainer,
  ProtocolManagerContainer,
  DynamicLessonContainer,
  CenteredDiv,
} from '../../styles/classControlPanelStyles'
import { useTeachersAidContextProvider } from '../../state/TeachersAidContext'
import { PeriodSelectorDisplay } from './PeriodSelectorDisplay'
import { ProtocolManager } from '../protocol-manager/ProtocolManager'
import { DynamicLessonManager } from '../DynamicLesson/DynamicLessonManager'
import { useUserContextProvider } from '../../../../../../contexts/UserContext'
import {
  me_me_Teacher,
  findLessonByCourseAndDate,
  findLessonByCourseAndDateVariables,
} from '../../../../../../schemaTypes'

import { date } from '../../../../../../utils'
import { useQuery } from '@apollo/client'
import { FIND_LESSON_QUERY } from '../../../../../lesson/LessonMainMenu'

export type ControlPanelDisplayProps = {}

export const ControlPanelDisplay: FC<ControlPanelDisplayProps> = () => {
  const [state, event] = useTeachersAidContextProvider()

  const { loading, data } = useQuery<
    findLessonByCourseAndDate,
    findLessonByCourseAndDateVariables
  >(FIND_LESSON_QUERY, {
    variables: {
      input: {
        courseId: state.context.courseInfo.course._id!,
        lessonDate: date,
      },
    },
    onCompleted: (data) => {
      data.findLessonByCourseAndDate.lesson &&
        event({
          type: 'LOAD_PROTOCOLS',
          payload: data.findLessonByCourseAndDate.lesson.duringActivities,
        })
    },
    onError: (error) => console.error(error),
  })
  if (loading) return <div>Loading </div>

  return (
    <>
      {state.matches('controlPanelActions.livePeriod') &&
        state.context.courseInfo._id &&
        !state.context.courseSelectVisible && (
          <>
            {data?.findLessonByCourseAndDate.lesson ? (
              <DynamicLessonContainer>
                <DynamicLessonManager
                  lesson={data?.findLessonByCourseAndDate.lesson!}
                />
              </DynamicLessonContainer>
            ) : (
              <CenteredDiv>
                <div>No Lesson Scheduled for Today</div>
              </CenteredDiv>
            )}
          </>
        )}
      {state.matches('controlPanelActions.protocolManager')! &&
        state.context.courseInfo._id &&
        !state.context.courseSelectVisible && (
          <>
            {data?.findLessonByCourseAndDate.lesson ? (
              <ProtocolManagerContainer>
                <ProtocolManager
                  protocols={
                    data?.findLessonByCourseAndDate.lesson.duringActivities!
                  }
                  lesson={data?.findLessonByCourseAndDate.lesson!}
                />
              </ProtocolManagerContainer>
            ) : (
              <CenteredDiv>
                <div>No Lesson Scheduled for Today</div>
              </CenteredDiv>
            )}
          </>
        )}
      {state.context.courseSelectVisible && (
        <PeriodSelectDisplayContainer>
          <PeriodSelectorDisplay />
        </PeriodSelectDisplayContainer>
      )}
    </>
  )
}
