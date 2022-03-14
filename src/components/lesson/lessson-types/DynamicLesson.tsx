import React from 'react'
import {
  findLessonByCourseAndDate_findLessonByCourseAndDate_lesson,
  me_me_Teacher_teachesCourses,
  me_me,
  DynamicLessonEnums,
  findLessonStatus_findLessonStatus_lesson,
} from '../../../schemaTypes'
import { WarmUp } from '../lesson-components/WarmUp'
import { LessonDetails } from '../lesson-components/LessonDetails'
import { Vocab } from '../lesson-components/Vocab'
import { Protocols } from '../lesson-components/Protocols'
import { Standard8x12Container } from '../../../appStyles'
import { useDailyAgendaContextProvider } from '../state-n-styles/DailyAgendaContext'
import {
  ClassInfoContainer,
  LessonMainScreen,
  StopLessonButton,
  ClassInfoStyle,
  LessonComponentTypeContainer,
  LessonComponentTypeStyle,
  StopLessonContainer,
  LessonPageContainer,
  ProtocolsContainer,
} from '../state-n-styles/lessonStyles'
import { date } from '../../../utils'
import { ExitActivity } from '../lesson-components/ExitActivity'
import { StudentQuestionPrompt } from '../student-lesson/StudentQuestionPrompt'
import { useUserContextProvider } from '../../../contexts/UserContext'
import { AssignedSeating } from '../lesson-components/AssignedSeating'

export type DynamicLessonProps = {
  lesson: findLessonStatus_findLessonStatus_lesson
  courseToLoad?: me_me_Teacher_teachesCourses
  fakeCourse?: me_me_Teacher_teachesCourses
}

export const DynamicLesson = ({ lesson, courseToLoad }: DynamicLessonProps) => {
  const me: me_me = useUserContextProvider()
  const [, event] = useDailyAgendaContextProvider()
  const { dynamicLesson } = lesson

  return (
    <LessonPageContainer>
      <ClassInfoContainer>
        <ClassInfoStyle>
          <div>{courseToLoad?.name}</div>
          <div>{date}</div>
        </ClassInfoStyle>
      </ClassInfoContainer>
      <StopLessonContainer></StopLessonContainer>

      {lesson.duringActivities.some((protocol) => protocol.isActive) ? (
        <ProtocolsContainer>
          <Protocols lesson={lesson} />
        </ProtocolsContainer>
      ) : (
        <LessonMainScreen>
          {dynamicLesson === 'WARM_UP' && <WarmUp lesson={lesson} />}
          {dynamicLesson === 'LESSON_DETAILS' && (
            <LessonDetails lesson={lesson} />
          )}
          {dynamicLesson === 'VOCAB' && <Vocab lesson={lesson} />}
          {dynamicLesson === 'EXIT_ACTIVITY' && (
            <ExitActivity lesson={lesson} />
          )}
          {dynamicLesson === 'ASSIGNED_SEATING' && (
            <AssignedSeating lesson={lesson} />
          )}
        </LessonMainScreen>
      )}

      <LessonComponentTypeContainer>
        <LessonComponentTypeStyle>
          {me.__typename === 'Student' ? (
            <StudentQuestionPrompt
              courseToLoad={courseToLoad!}
              // fakeCourse={fakeCourse!}
            />
          ) : (
            // 'Class is Live'
            ''
          )}
        </LessonComponentTypeStyle>
      </LessonComponentTypeContainer>
    </LessonPageContainer>
  )
}
