import React, { FC, useState } from 'react'
import { TextSectionProtocolsInput } from '../../../../../schemaTypes'
import { useLessonEditorContextProvider } from './LessonEditorContext'

export type DuringActivitiesProps = {
  protocols: TextSectionProtocolsInput[]
}

export const DuringActivities: FC<DuringActivitiesProps> = ({ protocols }) => {
  const [state, event] = useLessonEditorContextProvider()
  const [protocolList, setprotocolList] = useState<TextSectionProtocolsInput[]>(
    [],
  )

  return (
    <>
      <div>Current During Activities</div>
      <div>
        {state.context.duringActivity.map((activity) => (
          <span key={activity.task}>{activity.task} </span>
        ))}
      </div>
      <div>Set During Activities</div>
      <div>
        {protocols.map((protocol) => (
          <div
            key={protocol.task}
            onClick={(e: any) =>
              setprotocolList([
                ...protocolList,
                {
                  academicOutcomeTypes: protocol.academicOutcomeTypes,
                  activityType: protocol.activityType,
                  task: protocol.task,
                  isActive: false,
                  completed: false,
                },
              ])
            }
          >
            {protocol.task}
          </div>
        ))}
      </div>
      <button
        onClick={() =>
          event({ type: 'SET_DURING_ACTIVITY', payload: protocolList })
        }
      >
        Set During Activities
      </button>
    </>
  )
}
