import React, { FC, useEffect } from 'react'
import { useLessonPlannerContextProvider } from './state-and-styles/lessonPlannerContext'
import { SectionAssigner } from './SectionAssigner'
import { LessonPlanInfo } from './LessonPlanInfo'
import { CourseAssigner } from './CourseAssigner'
import {
  LessonPlannerContainer,
  LessonPlannerHeader,
  LessonPlanOutput,
  LessonPlannerDesignContainer,
  LessonPlanDateAssign,
  LessonPlanDateInput,
  LessonPlannerButton,
  SectionPickerButtonContainer,
  LessonPlanMarkingPeriodSelect,
  GoBackToAssignmentsContainer,
  BackToCalendarButton,
} from './state-and-styles/lessonPlannerStyles'
import { LessonPlannerOutput } from './LessonPlannerOutput'
import { useEnumContextProvider } from '../../../../../contexts/EnumContext'
import { useMarkingPeriodContextProvider } from '../../../../../contexts/markingPeriod/MarkingPeriodContext'
import { LessonTypeEnum, MarkingPeriodEnum } from '../../../../../schemaTypes'
import { useNavigate, useParams } from 'react-router'
import { LessonBuilder } from './LessonBuilder'

export type LessonPlannerProps = {}

export const LessonPlanner = () => {
  const [state, event] = useLessonPlannerContextProvider()
  const { markingPeriodEnum } = useEnumContextProvider()
  const [mp] = useMarkingPeriodContextProvider()
  const { currentMarkingPeriod } = mp.context
  const params = useParams()
  const { date } = params

  const lessonDate = new Date(Number(date)).toLocaleDateString()

  const navigate = useNavigate()

  const {
    beforeActivity,
    duringActivity,
    afterActivity,
    essentialQuestion,
    lessonName,
  } = state.context

  const duringActivityReady =
    state.context.lessonType === LessonTypeEnum.INTRODUCTORY
      ? duringActivity.length === 0
      : duringActivity.length > 0

  const readyToSubmit =
    beforeActivity?.task !== '' &&
    duringActivityReady &&
    afterActivity.task !== '' &&
    essentialQuestion !== '' &&
    lessonName !== ''

  useEffect(() => {
    event({ type: 'SET_MARKING_PERIOD', payload: currentMarkingPeriod })
  }, [currentMarkingPeriod])

  useEffect(() => {
    event({ type: 'SET_DATE', payload: lessonDate })
    event({ type: 'NEXT' })
  }, [])

  return (
    <LessonPlannerContainer>
      <LessonPlannerDesignContainer>
        <LessonPlannerHeader>
          <div>Lesson Planner</div>
        </LessonPlannerHeader>
        {state.matches('date') && (
          <>
            <SectionPickerButtonContainer>
              <LessonPlannerButton onClick={() => event({ type: 'NEXT' })}>
                Next
              </LessonPlannerButton>
            </SectionPickerButtonContainer>
          </>
        )}
        {state.matches('sections') && <SectionAssigner />}
        {state.matches('lessonInfo') && (
          <>
            {/* <LessonPlanInfo /> */}
            <LessonBuilder />
            <SectionPickerButtonContainer>
              <LessonPlannerButton
                onClick={() => {
                  event({ type: 'PREVIOUS' })
                }}
              >
                Back
              </LessonPlannerButton>
              {readyToSubmit && (
                <LessonPlannerButton
                  onClick={() => {
                    event({ type: 'NEXT' })
                  }}
                >
                  Next
                </LessonPlannerButton>
              )}
            </SectionPickerButtonContainer>
          </>
        )}
        {state.matches('markingPeriod') && (
          <>
            <LessonPlanDateAssign>
              <div>Assigned Marking Period:</div>
              <LessonPlanMarkingPeriodSelect
                value={state.context.markingPeriod}
                onChange={(e: any) =>
                  event({
                    type: 'SET_MARKING_PERIOD',
                    payload: e.target.value,
                  })
                }
              >
                {markingPeriodEnum.map((mp: MarkingPeriodEnum) => (
                  <option key={mp} value={mp}>
                    {mp}
                  </option>
                ))}
              </LessonPlanMarkingPeriodSelect>
            </LessonPlanDateAssign>
            <SectionPickerButtonContainer>
              <LessonPlannerButton
                onClick={() => {
                  event({ type: 'PREVIOUS' })
                }}
              >
                Back
              </LessonPlannerButton>

              <LessonPlannerButton
                onClick={() => {
                  event({ type: 'NEXT' })
                }}
              >
                Next
              </LessonPlannerButton>
            </SectionPickerButtonContainer>
          </>
        )}
        {state.matches('courses') && <CourseAssigner />}
      </LessonPlannerDesignContainer>
      <LessonPlanOutput>
        <LessonPlannerOutput />
        <GoBackToAssignmentsContainer>
          <BackToCalendarButton onClick={() => navigate('/dashboard/lessons')}>
            Go Back to Calendar
          </BackToCalendarButton>
        </GoBackToAssignmentsContainer>
      </LessonPlanOutput>
    </LessonPlannerContainer>
  )
}
