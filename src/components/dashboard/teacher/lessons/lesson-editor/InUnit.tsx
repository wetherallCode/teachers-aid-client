import React, { FC } from 'react'
import { useLessonEditorContextProvider } from './LessonEditorContext'
import { useQuery } from '@apollo/client'
import {
  findUnits,
  findLessonByIdForLessonEditor_findLessonById_lesson_inUnit,
} from '../../../../../schemaTypes'
import { FIND_UNITS_QUERY } from '../lesson-planner/UnitAssigner'
import { updateLessonType } from './LessonEditor'

export type InUnitProps = {
  unit: findLessonByIdForLessonEditor_findLessonById_lesson_inUnit
  updateLesson: updateLessonType
}

export const InUnit: FC<InUnitProps> = ({ unit }) => {
  const [, event] = useLessonEditorContextProvider()

  const { loading, error, data } = useQuery<findUnits>(FIND_UNITS_QUERY)
  if (loading) return <div>Loading </div>
  if (error) console.error(error)

  return (
    <>
      <div>In Unit: {unit.unitName}</div>
      <div>Change Unit:</div>
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
    </>
  )
}

// return (
//   <>
//     <div>Select Lesson</div>
//     {state.matches('lesson.unit') && (
//       <>
//         <div>From Unit: </div>
//         <select onChange={(e: any) => setUnit(e.target.value)}>
//           <option value={undefined}>Select a Unit</option>
//           {data?.findUnits.units.map((unit) => (
//             <option key={unit._id!} value={unit._id!}>
//               {unit.unitName}
//             </option>
//           ))}
//         </select>
//         <button onClick={() => event({ type: 'NEXT' })}>Next</button>
//       </>
//     )}
//     {state.matches('lesson.lessonSelect') && <LessonSelect unit={unit} />}
//   </>
// )
// }
