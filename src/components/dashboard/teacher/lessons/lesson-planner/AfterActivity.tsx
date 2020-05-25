import React, { FC, useState, useEffect } from 'react'
import { TextSectionProtocolsInput } from '../../../../../schemaTypes'
import { ProtocolSelect } from './ProtocolSelect'
import { useLessonPlannerContextProvider } from './lessonPlannerContext'

export type AfterActivityProps = {
  protocolList: TextSectionProtocolsInput[]
}

export const AfterActivity: FC<AfterActivityProps> = ({ protocolList }) => {
  const [, event] = useLessonPlannerContextProvider()
  const [protocolSelectList, setProtocolSelectList] = useState<
    TextSectionProtocolsInput[]
  >([])
  useEffect(() => {
    event({ type: 'SET_AFTER_ACTIVITY', payload: protocolSelectList[0] })
  }, [protocolSelectList, event])
  return (
    <>
      <div>After Activity</div>
      <ProtocolSelect
        protocolList={protocolList}
        protocolSelectList={protocolSelectList}
        setProtocolSelectList={setProtocolSelectList}
        selectAmount={1}
      />
    </>
  )
}
