import React, { FC, useState, useEffect } from 'react'
import { TextSectionProtocolsInput } from '../../../../../schemaTypes'
import { ProtocolSelect } from './ProtocolSelect'
import { useLessonPlannerContextProvider } from './lessonPlannerContext'

export type DuringActivitySelectProps = {
  protocolList: TextSectionProtocolsInput[]
}

export const DuringActivitySelect: FC<DuringActivitySelectProps> = ({
  protocolList,
}) => {
  const [, event] = useLessonPlannerContextProvider()

  const [protocolSelectList, setProtocolSelectList] = useState<
    TextSectionProtocolsInput[]
  >([])

  useEffect(() => {
    event({ type: 'SET_DURING_ACTIVITY', payload: protocolSelectList })
  }, [protocolSelectList, event])
  return (
    <>
      <div>During Activity</div>
      <ProtocolSelect
        protocolList={protocolList}
        protocolSelectList={protocolSelectList}
        setProtocolSelectList={setProtocolSelectList}
        selectAmount={Infinity}
      />
    </>
  )
}
