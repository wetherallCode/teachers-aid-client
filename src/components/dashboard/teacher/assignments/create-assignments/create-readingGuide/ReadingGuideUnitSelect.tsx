import React, { FC } from 'react'
import { useCreateAssignmentContextPovider } from '../state-and-styles/CreateAssignmentContext'
import { useQuery } from '@apollo/client'
import { findUnits } from '../../../../../../schemaTypes'
import { FIND_UNITS_QUERY } from '../../../lessons/lesson-planner/UnitAssigner'
import {
  ItemSelectorContainer,
  LessonInformationSelectContainer,
  SelectableItem,
  SelectButtonContainer,
  SelectorContainer,
  SelectorTitle,
} from '../state-and-styles/createAssignmentsStyles'

export type ReadingGuideUnitSelectProps = {}

export const ReadingGuideUnitSelect: FC<ReadingGuideUnitSelectProps> = () => {
  const [, event] = useCreateAssignmentContextPovider()

  const { loading, data } = useQuery<findUnits>(FIND_UNITS_QUERY, {
    // onCompleted: (data) => console.log(data.findUnits.units),
    onError: (error) => console.error(error),
  })
  if (loading) return <div>Loading </div>

  return (
    <LessonInformationSelectContainer>
      <SelectorContainer>
        <SelectorTitle>Select Unit </SelectorTitle>
        <ItemSelectorContainer>
          {data?.findUnits.units.map((unit) => (
            <SelectableItem
              key={unit._id}
              onClick={() => {
                event({ type: 'SET_UNIT', payload: unit._id! })
                event({ type: 'READING_GUIDE_LESSON' })
              }}
            >
              {unit.unitName}
            </SelectableItem>
          ))}
        </ItemSelectorContainer>
      </SelectorContainer>
      <SelectButtonContainer></SelectButtonContainer>
    </LessonInformationSelectContainer>
  )
}
