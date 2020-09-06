import React, { FC, useState, useEffect } from 'react'
import { TextSectionProtocolsInput } from '../../../../../schemaTypes'
import { ProtocolSelect } from './ProtocolSelect'
import { useLessonPlannerContextProvider } from './state-and-styles/lessonPlannerContext'
import { DuringActivityContainer } from './state-and-styles/lessonPlannerStyles'

export type DuringActivitySelectProps = {
  protocolList: TextSectionProtocolsInput[]
}

export const DuringActivitySelect: FC<DuringActivitySelectProps> = ({
  protocolList,
}) => {
  const [state, event] = useLessonPlannerContextProvider()
  const [protocolSelectList, setProtocolSelectList] = useState<
    TextSectionProtocolsInput[]
  >([...state.context.duringActivity])

  useEffect(() => {
    event({ type: 'SET_DURING_ACTIVITY', payload: protocolSelectList })
  }, [protocolSelectList, event])

  return (
    <DuringActivityContainer>
      <ProtocolSelect
        protocolList={protocolList}
        protocolSelectList={protocolSelectList}
        setProtocolSelectList={setProtocolSelectList}
        selectAmount={Infinity}
      />
    </DuringActivityContainer>
  )
}
