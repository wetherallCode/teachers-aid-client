import React, { FC } from 'react'

import { useTeachersAidContextProvider } from '../../state/TeachersAidContext'
import {
  PeriodSelectDisplay,
  PeriodDisplay,
} from '../../styles/classControlPanelStyles'

export type PeriodSelectProps = {}

export const PeriodSelect = ({}: PeriodSelectProps) => {
  const [state, event] = useTeachersAidContextProvider()

  return (
    <>
      <PeriodSelectDisplay>
        <div
          onClick={() => {
            event({ type: 'PREVIOUS' })
          }}
        >
          {!state.context.courseSelectVisible &&
            state.context.courseInfo!._id && <>&lt;</>}
        </div>
        <PeriodDisplay onClick={() => event({ type: 'COURSE_SELECT' })}>
          {state.context.courseSelectVisible
            ? 'Select A Class'
            : !state.context.courseInfo!.course.name
              ? 'Select A Class'
              : state.context.courseInfo!.course.name}
        </PeriodDisplay>
        <div onClick={() => event({ type: 'NEXT' })}>
          {!state.context.courseSelectVisible &&
            state.context.courseInfo!._id && <>&gt;</>}
        </div>
      </PeriodSelectDisplay>
    </>
  )
}
