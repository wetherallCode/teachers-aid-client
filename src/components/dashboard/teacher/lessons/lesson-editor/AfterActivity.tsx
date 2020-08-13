import React, { FC } from 'react'
import { useLessonEditorContextProvider } from './LessonEditorContext'
import { TextSectionProtocolsInput } from '../../../../../schemaTypes'

export type AfterActivityProps = {
  protocols: TextSectionProtocolsInput[]
}

export const AfterActivity: FC<AfterActivityProps> = ({ protocols }) => {
  const [state, event] = useLessonEditorContextProvider()

  return (
    <>
      <div>Original Before Activity</div>
      <div>{state.context.afterActivity.task}</div>
      <div>Set Before Activity</div>
      <div>
        {protocols.map((protocol) => (
          <div
            key={protocol.task}
            onClick={(e: any) => {
              event({
                type: 'SET_AFTER_ACTIVITY',
                payload: {
                  academicOutcomeTypes: protocol.academicOutcomeTypes,
                  activityType: protocol.activityType,
                  task: protocol.task,
                  isActive: false,
                },
              })
            }}
          >
            {protocol.task}
          </div>
        ))}
      </div>
    </>
  )
}
