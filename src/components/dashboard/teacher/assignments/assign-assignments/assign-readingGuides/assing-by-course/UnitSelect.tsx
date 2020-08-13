import React, { FC, Dispatch, SetStateAction } from 'react'
import { FIND_UNITS_QUERY } from '../../../../lessons/lesson-planner/UnitAssigner'
import { findUnits } from '../../../../../../../schemaTypes'
import { useQuery } from '@apollo/client'

export type UnitSelectProps = {
  setUnitId: Dispatch<SetStateAction<string>>
}

export const UnitSelect: FC<UnitSelectProps> = ({ setUnitId }) => {
  const { loading, data } = useQuery<findUnits>(FIND_UNITS_QUERY, {
    variables: {
      input: {},
    },
    onCompleted: (data) => console.log(data.findUnits.units),
    onError: (error) => console.error(error),
  })
  if (loading) return <div>Loading </div>
  return (
    <>
      <select
        onChange={(e: any) => {
          if (e.target.value !== 'none') {
            setUnitId(e.target.value)
          }
        }}
      >
        <option value={'none'}>Pick a Unit</option>
        {data?.findUnits.units.map((unit) => (
          <option key={unit._id!} value={unit._id!}>
            {unit.unitName}
          </option>
        ))}
      </select>
    </>
  )
}
