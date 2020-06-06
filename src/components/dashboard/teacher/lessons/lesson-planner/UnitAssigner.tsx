import React, { FC } from 'react'
import { gql, useQuery } from '@apollo/client'
import { findUnits } from '../../../../../schemaTypes'
import { useLessonPlannerContextProvider } from './lessonPlannerContext'

export type UnitAssignerProps = {}

export const FIND_UNITS_QUERY = gql`
  query findUnits {
    findUnits {
      units {
        _id
        unitName
      }
    }
  }
`

export const UnitAssigner: FC<UnitAssignerProps> = () => {
  const [, event] = useLessonPlannerContextProvider()
  const { loading, error, data } = useQuery<findUnits>(FIND_UNITS_QUERY)
  if (loading) return <div>Loading </div>
  if (error) console.error(error)

  return (
    <>
      <div>Assign to Unit: </div>
      <select
        name='unitAssigner'
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
    </>
  )
}
