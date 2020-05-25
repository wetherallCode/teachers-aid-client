import React, { FC, useState, useEffect } from 'react'
import { TextSectionProtocolsInput } from '../../../../../schemaTypes'
import { ProtocolSelect } from './ProtocolSelect'
import { useLessonPlannerContextProvider } from './lessonPlannerContext'

export type BeforeActivitySelectProps = {
  protocolList: TextSectionProtocolsInput[]
}

export const BeforeActivitySelect: FC<BeforeActivitySelectProps> = ({
  protocolList,
}) => {
  const [, event] = useLessonPlannerContextProvider()
  const [protocolSelectList, setProtocolSelectList] = useState<
    TextSectionProtocolsInput[]
  >([])
  useEffect(() => {
    event({ type: 'SET_BEFORE_ACTIVITY', payload: protocolSelectList[0] })
  }, [protocolSelectList, event])

  return (
    <>
      <div>Before Activity</div>
      <ProtocolSelect
        protocolList={protocolList}
        protocolSelectList={protocolSelectList}
        setProtocolSelectList={setProtocolSelectList}
        selectAmount={1}
      />
    </>
  )
}
