import React, { FC } from 'react'
import { useLessonEditorContextProvider } from './LessonEditorContext'
import { dateConverter } from '../../../../../utils'
import { updateLessonType } from './LessonEditor'

export type AssignedDateProps = {
  date: any
  updateLesson: updateLessonType
}

export const AssignedDate: FC<AssignedDateProps> = ({ date }) => {
  const [, event] = useLessonEditorContextProvider()

  return (
    <>
      <div>Change Assigned Date</div>
      <div>Assigned Date: {date}</div>
      <input
        type="date"
        onChange={(e: any) =>
          event({
            type: 'SET_ASSIGNED_DATE',
            payload: dateConverter(e.target.value),
          })
        }
      />
    </>
  )
}
