import React, { FC, useEffect, useState } from 'react'
import { useEnumContextProvider } from '../../../../contexts/EnumContext'
import { useMarkingPeriodContextProvider } from '../../../../contexts/markingPeriod/MarkingPeriodContext'
import { MarkingPeriodEnum } from '../../../../schemaTypes'
import {
  MarkingPeriodSelectedSwitchArrow,
  MarkingPeriodSelectorContainer,
  MarkingPeriodSelectorSwitchContainer,
  MarkingPeriodSelectorTitle,
} from './state-n-styles/assignmentsStyles'
import { useStudentAssignmentContextProvider } from './state-n-styles/StudentAssignmentContext'

export type MarkingPeriodSelectorProps = {}

export const MarkingPeriodSelector = ({}: MarkingPeriodSelectorProps) => {
  const [state, event] = useStudentAssignmentContextProvider()
  const { markingPeriodEnum } = useEnumContextProvider()
  const [markingPeriodState] = useMarkingPeriodContextProvider()
  const { currentMarkingPeriod } = markingPeriodState.context

  const markingPeriodNumber = markingPeriodEnum.findIndex(
    (element: MarkingPeriodEnum) => element === currentMarkingPeriod,
  )

  const [index, setIndex] = useState(markingPeriodNumber)

  useEffect(() => {
    event({ type: 'SET_MARKING_PERIOD', payload: markingPeriodEnum[index] })
  }, [index])

  return (
    <MarkingPeriodSelectorContainer>
      <MarkingPeriodSelectorTitle>
        Select Marking Period
      </MarkingPeriodSelectorTitle>
      <MarkingPeriodSelectorSwitchContainer>
        <MarkingPeriodSelectedSwitchArrow
          onClick={() => {
            if (index > 0) {
              setIndex((c: number) => c - 1)
            }
          }}
        >
          &lt;
        </MarkingPeriodSelectedSwitchArrow>
        <div> {state.context.selectedMarkingPeriod} </div>
        <MarkingPeriodSelectedSwitchArrow
          onClick={() => {
            if (index < markingPeriodEnum.length - 1) {
              setIndex((c: number) => c + 1)
            }
          }}
        >
          &gt;
        </MarkingPeriodSelectedSwitchArrow>
      </MarkingPeriodSelectorSwitchContainer>
    </MarkingPeriodSelectorContainer>
  )
}
