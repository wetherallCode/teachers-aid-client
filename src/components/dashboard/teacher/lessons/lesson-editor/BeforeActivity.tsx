import React, { FC } from 'react'
import { useLessonEditorContextProvider } from './LessonEditorContext'
import { TextSectionProtocolsInput } from '../../../../../schemaTypes'

export type BeforeActivityProps = {
  protocols: TextSectionProtocolsInput[]
}

export const BeforeActivity: FC<BeforeActivityProps> = ({ protocols }) => {
  const [state, event] = useLessonEditorContextProvider()

  return (
    <>
      <div>Original Before Activity</div>
      <div>{state.context.beforeActivity.task}</div>
      <div>Set Before Activity</div>
      <div>
        {protocols.map((protocol) => (
          <div
            key={protocol.task}
            onClick={(e: any) => {
              event({
                type: 'SET_BEFORE_ACTIVITY',
                payload: {
                  academicOutcomeTypes: protocol.academicOutcomeTypes,
                  activityType: protocol.activityType,
                  task: protocol.task,
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
