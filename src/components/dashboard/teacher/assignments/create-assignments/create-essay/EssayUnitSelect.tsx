import React, { FC } from 'react'
import { FIND_UNITS_QUERY } from '../../../lessons/lesson-planner/UnitAssigner'
import { findUnits } from '../../../../../../schemaTypes'
import { useQuery } from '@apollo/client'
import { useCreateAssignmentContextPovider } from '../state-and-styles/CreateAssignmentContext'
import {
  ItemSelectorContainer,
  LessonInformationSelectContainer,
  SelectableItem,
  SelectButton,
  SelectButtonContainer,
  SelectorContainer,
  SelectorTitle,
} from '../state-and-styles/createAssignmentsStyles'

export type EssayUnitSelectProps = {}

export const EssayUnitSelect: FC<EssayUnitSelectProps> = () => {
  const [state, event] = useCreateAssignmentContextPovider()

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
                event({ type: 'ESSAY_LESSON' })
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
