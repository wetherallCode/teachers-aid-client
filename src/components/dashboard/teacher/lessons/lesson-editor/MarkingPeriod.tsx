import React, { FC } from 'react'
import { MarkingPeriodEnum } from '../../../../../schemaTypes'
import { useLessonEditorContextProvider } from './LessonEditorContext'

export type MarkingPeriodProps = {
  markingPeriodList: MarkingPeriodEnum[]
}

export const MarkingPeriod: FC<MarkingPeriodProps> = ({
  markingPeriodList,
}) => {
  const [state, event] = useLessonEditorContextProvider()
  // const mpList = markingPeriodList as MarkingPeriodEnum[]

  return (
    <>
      <div>Change Marking Period</div>
      <select
        value={state.context.assignedMarkingPeriod}
        onChange={(e: any) =>
          event({
            type: 'SET_MARKING_PERIOD',
            payload: e.target.value as MarkingPeriodEnum,
          })
        }
      >
        {markingPeriodList.map((mp) => (
          <option key={mp} value={mp!}>
            {mp}
          </option>
        ))}
      </select>
    </>
  )
}
