import React, { FC, SetStateAction, useEffect, useState } from 'react'
import { Dispatch } from 'react'
import { useEnumContextProvider } from '../../contexts/EnumContext'
import { useMarkingPeriodContextProvider } from '../../contexts/markingPeriod/MarkingPeriodContext'
import { MarkingPeriodEnum } from '../../schemaTypes'
import {
  MarkingPeriodSelectorContainer,
  MarkingPeriodSelectorTitle,
  MarkingPeriodSelectedSwitchArrow,
  MarkingPeriodSelectorSwitchContainer,
} from '../dashboard/student/assignments/assignmentsStyles'

export type MarkingPeriodSelectorProps = {
  selectedMarkingPeriod: MarkingPeriodEnum
  setSelectedMarkingPeriod: Dispatch<SetStateAction<MarkingPeriodEnum>>
}

export const MarkingPeriodSelectorSwitch = ({
  selectedMarkingPeriod,
  setSelectedMarkingPeriod,
}: MarkingPeriodSelectorProps) => {
  const { markingPeriodEnum } = useEnumContextProvider()
  const [markingPeriodState] = useMarkingPeriodContextProvider()
  const { currentMarkingPeriod } = markingPeriodState.context

  const markingPeriodNumber = markingPeriodEnum.findIndex(
    (element: MarkingPeriodEnum) => element === currentMarkingPeriod
  )

  const [markingPeriodIndex, setMarkingPeriodIndex] = useState(
    markingPeriodNumber
  )

  useEffect(() => {
    setSelectedMarkingPeriod(markingPeriodEnum[markingPeriodIndex])
  }, [markingPeriodIndex])

  return (
    <MarkingPeriodSelectorContainer>
      <MarkingPeriodSelectorTitle>
        Select Marking Period
      </MarkingPeriodSelectorTitle>
      <MarkingPeriodSelectorSwitchContainer>
        <MarkingPeriodSelectedSwitchArrow
          onClick={() => {
            if (markingPeriodIndex > 0) {
              setMarkingPeriodIndex((c: number) => c - 1)
            }
          }}
        >
          &lt;
        </MarkingPeriodSelectedSwitchArrow>
        <div> {selectedMarkingPeriod} </div>
        <MarkingPeriodSelectedSwitchArrow
          onClick={() => {
            if (markingPeriodIndex < markingPeriodEnum.length - 1) {
              setMarkingPeriodIndex((c: number) => c + 1)
            }
          }}
        >
          &gt;
        </MarkingPeriodSelectedSwitchArrow>
      </MarkingPeriodSelectorSwitchContainer>
    </MarkingPeriodSelectorContainer>
  )
}
