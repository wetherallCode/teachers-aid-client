import React, { FC } from 'react'
import { useCreateAssignmentContextPovider } from '../CreateAssignmentContext'
import { useQuery } from '@apollo/client'
import { findUnits } from '../../../../../../schemaTypes'
import { FIND_UNITS_QUERY } from '../../../lessons/lesson-planner/UnitAssigner'

export type ReadingGuideUnitSelectProps = {}

export const ReadingGuideUnitSelect: FC<ReadingGuideUnitSelectProps> = () => {
  const [, event] = useCreateAssignmentContextPovider()

  const { loading, data } = useQuery<findUnits>(FIND_UNITS_QUERY, {
    // onCompleted: (data) => console.log(data.findUnits.units),
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
        <button onClick={() => event({ type: 'READING_GUIDE_LESSON' })}>
          Next
        </button>
      </>
    </>
  )
}
