import React, { FC, useState } from 'react'
import {
  findLessonByCourseAndDate_findLessonByCourseAndDate_lesson,
  AcademicOutcomeTypes,
  respondToProtocol,
  respondToProtocolVariables,
  findActiveProtocolByStudent_findActiveProtocolByStudent_protocol,
  findActiveProtocolByStudent,
  findActiveProtocolByStudentVariables,
  me_me,
} from '../../../schemaTypes'
import {
  LessonComponentTitleContainer,
  LessonComponentDetailsContainer,
  LessonComponentDetailsStyle,
  ProtocolResponseArea,
  ProtocolResponseButton,
  ProtocolResponseButtonContainer,
  ProtocolResponseContainer,
  ProtocolResponseHeader,
  ProtocolResponseTaskContainer,
} from '../state-n-styles/lessonStyles'
import { useMutation, useQuery } from '@apollo/client'
import {
  FIND_ACTIVE_STUDENT_PROTOCOL_QUERY,
  RESPOND_TO_PROTOCOL_MUTATION,
} from './StudentProtocolResponse'
import { WarmUpResponse } from './WarmUpResponse'

export type WarmUpProps = {
  lesson: findLessonByCourseAndDate_findLessonByCourseAndDate_lesson
  me: me_me
  setPolling: React.Dispatch<React.SetStateAction<number>>
}

export const WarmUp = ({ lesson, me, setPolling }: WarmUpProps) => {
  return (
    <>
      <LessonComponentTitleContainer>Warm Up</LessonComponentTitleContainer>
      <LessonComponentDetailsContainer>
        {lesson.lessonType === 'INTRODUCTORY' && (
          <LessonComponentDetailsStyle>
            {lesson.beforeActivity.task}
          </LessonComponentDetailsStyle>
        )}
        {me.__typename === 'Student' && (
          <>
            {lesson.beforeActivity.isActive && (
              <WarmUpResponse lesson={lesson} me={me} setPolling={setPolling} />
            )}
          </>
        )}
      </LessonComponentDetailsContainer>
    </>
  )
}
