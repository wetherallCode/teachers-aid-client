import React, { FC, useState, useEffect } from 'react'
import { FIND_UNITS_QUERY } from '../../lessons/lesson-planner/UnitAssigner'
import { findUnits } from '../../../../../schemaTypes'
import { useQuery } from '@apollo/client'
import { useLessonEditorContextProvider } from './LessonEditorContext'
import { LessonSelect } from './LessonSelect'

export type UnitSelectProps = {
  course: string
}

export const UnitSelect: FC<UnitSelectProps> = ({ course }) => {
  const [unit, setUnit] = useState('')
  const [state, event] = useLessonEditorContextProvider()

  useEffect(() => {
    event({ type: 'SET_COURSE_ID', payload: course })
  }, [course, event])

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { loading, error, data } = useQuery<findUnits>(FIND_UNITS_QUERY, {
    onError: (error) => console.error(error),
  })
  if (loading) return <div>Loading </div>

  return (
    <>
      <div>Select Lesson</div>
      {state.matches('lesson.unit') && (
        <>
          <div>From Unit: </div>
          <select onChange={(e: any) => setUnit(e.target.value)}>
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
      {state.matches('lesson.lessonSelect') && <LessonSelect unit={unit} />}
    </>
  )
}
