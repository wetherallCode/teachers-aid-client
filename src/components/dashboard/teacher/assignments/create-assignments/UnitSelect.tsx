import React, { FC, useState } from 'react'
import { FIND_UNITS_QUERY } from '../../lessons/lesson-planner/UnitAssigner'
import { findUnits, me_me_Teacher } from '../../../../../schemaTypes'
import { useQuery } from '@apollo/client'
import { useCreateAssignmentContextPovider } from './CreateAssignmentContext'
import { LessonSelect } from './LessonSelect'
import { useUserContextProvider } from '../../../../../contexts/UserContext'

export type UnitSelectProps = {}

export const UnitSelect: FC<UnitSelectProps> = () => {
  const me: me_me_Teacher = useUserContextProvider()
  const [state, event] = useCreateAssignmentContextPovider()

  const { loading, error, data } = useQuery<findUnits>(FIND_UNITS_QUERY)
  if (loading) return <div>Loading </div>
  if (error) console.error(error)

  return (
    <>
      <div>Select Course</div>
      <select
        onChange={(e: any) =>
          event({ type: 'SET_COURSE_ID', payload: e.target.value })
        }
      >
        {me.teachesCourses.map((course) => (
          <option key={course._id!} value={course._id!}>
            {course.period}
          </option>
        ))}
      </select>
      <div>Select Lesson</div>
      {state.matches('findLesson.unit') && (
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
      )}
      {state.matches('findLesson.lesson') && <LessonSelect />}
    </>
  )
}
