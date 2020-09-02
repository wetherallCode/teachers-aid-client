import React, { FC, useState, useEffect } from 'react'
import {
  TextSectionProtocolsInput,
  ProtocolActivityTypes,
  AcademicOutomeTypes,
} from '../../../../../schemaTypes'
import { ProtocolSelect } from './ProtocolSelect'
import { useLessonPlannerContextProvider } from './state-and-styles/lessonPlannerContext'
import { useEnumContextProvider } from '../../../../../contexts/EnumContext'

export type BeforeActivitySelectProps = {
  protocolList: TextSectionProtocolsInput[]
}

export const BeforeActivitySelect: FC<BeforeActivitySelectProps> = ({
  protocolList,
}) => {
  const [, event] = useLessonPlannerContextProvider()

  const {
    academicOutcomeTypes,
    protocolActivityTypes,
  } = useEnumContextProvider()

  const [warmUp, setWarmUp] = useState<TextSectionProtocolsInput>({
    academicOutcomeTypes: AcademicOutomeTypes.LOGIC_BUILDING,
    activityType: ProtocolActivityTypes.INDIVIDUAL,
    task: '',
    completed: false,
    isActive: false,
  })

  // const [protocolSelectList, setProtocolSelectList] = useState<
  //   TextSectionProtocolsInput[]
  // >([])

  useEffect(() => {
    event({ type: 'SET_BEFORE_ACTIVITY', payload: warmUp })
  }, [event, warmUp])

  return (
    <>
      <div>Before Activity</div>
      {/* <ProtocolSelect
        protocolList={protocolList}
        protocolSelectList={protocolSelectList}
        setProtocolSelectList={setProtocolSelectList}
        selectAmount={1}
      /> */}
      <div>Academic Outcome</div>
      <input
        onChange={(e: any) =>
          setWarmUp({ ...warmUp, academicOutcomeTypes: e.target.value })
        }
      />
      <div>Activity Type</div>
      <input
        onChange={(e: any) =>
          setWarmUp({ ...warmUp, activityType: e.target.value })
        }
      />
      <div>Task</div>
      <input
        onChange={(e: any) => setWarmUp({ ...warmUp, task: e.target.value })}
      />
    </>
  )
}
