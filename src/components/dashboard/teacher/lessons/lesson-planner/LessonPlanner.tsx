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
} from './state-and-styles/lessonPlannerStyles'
import { LessonPlannerOutput } from './LessonPlannerOutput'
import { useEnumContextProvider } from '../../../../../contexts/EnumContext'
import { useMarkingPeriodContextProvider } from '../../../../../contexts/markingPeriod/MarkingPeriodContext'
import { MarkingPeriodEnum } from '../../../../../schemaTypes'

export type LessonPlannerProps = {}

export const LessonPlanner: FC<LessonPlannerProps> = () => {
  const [state, event] = useLessonPlannerContextProvider()
  const { markingPeriodEnum } = useEnumContextProvider()
  const [mp] = useMarkingPeriodContextProvider()
  const { currentMarkingPeriod } = mp.context

  const {
    beforeActivity,
    duringActivity,
    afterActivity,
    essentialQuestion,
    lessonName,
  } = state.context

  const readyToSubmit =
    beforeActivity.task !== '' &&
    duringActivity.length > 0 &&
    afterActivity.task !== '' &&
    essentialQuestion !== '' &&
    lessonName !== ''

  useEffect(() => {
    event({ type: 'SET_MARKING_PERIOD', payload: currentMarkingPeriod })
  }, [currentMarkingPeriod])

  return (
    <LessonPlannerContainer>
      <LessonPlannerDesignContainer>
        <LessonPlannerHeader>
          <div>Lesson Planner</div>
        </LessonPlannerHeader>
        {state.matches('date') && (
          <>
            <LessonPlanDateAssign>
              <div>Assigned Date: </div>
              <LessonPlanDateInput
                type='date'
                name='assignedDate'
                onChange={(e: any) => {
                  event({
                    type: 'SET_DATE',
                    payload: e.target.value,
                  })
                }}
              />
              <div>Assigned Marking Period:</div>
              <LessonPlanMarkingPeriodSelect
                value={state.context.markingPeriod}
                onChange={(e: any) =>
                  event({ type: 'SET_MARKING_PERIOD', payload: e.target.value })
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
              <LessonPlannerButton onClick={() => event({ type: 'NEXT' })}>
                Next
              </LessonPlannerButton>
            </SectionPickerButtonContainer>
          </>
        )}
        {state.matches('sections') && <SectionAssigner />}
        {state.matches('lessonInfo') && (
          <>
            <LessonPlanInfo />
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
        {state.matches('courses') && <CourseAssigner />}
      </LessonPlannerDesignContainer>
      <LessonPlanOutput>
        <LessonPlannerOutput />
      </LessonPlanOutput>
    </LessonPlannerContainer>
  )
}
