import React, { FC } from 'react'
import { FIND_UNITS_QUERY } from '../../../lessons/lesson-planner/UnitAssigner'
import { findUnits } from '../../../../../../schemaTypes'
import { useQuery } from '@apollo/client'
import { useCreateAssignmentContextPovider } from '../CreateAssignmentContext'

export type UnitSelectProps = {}

export const UnitSelect: FC<UnitSelectProps> = () => {
  const [state, event] = useCreateAssignmentContextPovider()
  console.log(state.context.essay.unit)

  const { loading, data } = useQuery<findUnits>(FIND_UNITS_QUERY, {
    onError: (error) => console.error(error),
  })
  if (loading) return <div>Loading </div>

  return (
    <>
      <div>Select Lesson</div>
      <>
        <div>From Unit: </div>
        <select
          onChange={(e: any) =>
            event({ type: 'SET_UNIT', payload: e.target.value })
          }
        >
          <option value={undefined}>Select a Unit</option>
          {data?.findUnits.units.map((unit) => (
            <option key={unit._id!} value={unit._id!}>
              {unit.unitName}
            </option>
          ))}
        </select>
        <button onClick={() => event({ type: 'NEXT' })}>Next</button>
      </>
    </>
  )
}
