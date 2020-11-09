import React, { FC, useEffect, useState } from 'react'
import { useEnumContextProvider } from '../../../../contexts/EnumContext'
import { useMarkingPeriodContextProvider } from '../../../../contexts/markingPeriod/MarkingPeriodContext'
import { MarkingPeriodEnum } from '../../../../schemaTypes'
import {
  MarkingPeriodSelectedSwitchArrow,
  MarkingPeriodSelectorContainer,
  MarkingPeriodSelectorSwitch,
  MarkingPeriodSelectorTitle,
} from './assignmentsStyles'
import { useStudentAssignmentContextProvider } from './StudentAssignmentContext'

export type MarkingPeriodSelectorProps = {}

export const MarkingPeriodSelector: FC<MarkingPeriodSelectorProps> = () => {
  const [state, event] = useStudentAssignmentContextProvider()
  const { markingPeriodEnum } = useEnumContextProvider()
  const [markingPeriodState] = useMarkingPeriodContextProvider()
  const { currentMarkingPeriod } = markingPeriodState.context

  const markingPeriodNumber = markingPeriodEnum.findIndex(
    (element: MarkingPeriodEnum) => element === currentMarkingPeriod
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
      <MarkingPeriodSelectorSwitch>
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
      </MarkingPeriodSelectorSwitch>
    </MarkingPeriodSelectorContainer>
  )
}
