import React, { FC, useState, useEffect } from 'react'
import {
  TextSectionProtocolsInput,
  AcademicOutcomeTypes,
  ProtocolActivityTypes,
} from '../../../../../schemaTypes'
import { ProtocolSelect } from './ProtocolSelect'
import { useLessonPlannerContextProvider } from './state-and-styles/lessonPlannerContext'
import { useEnumContextProvider } from '../../../../../contexts/EnumContext'
import {
  AfterActivityContainer,
  ActivityCategorySelect,
  ActivityCategoryInput,
} from './state-and-styles/lessonPlannerStyles'

export type AfterActivityProps = {
  protocolList: TextSectionProtocolsInput[]
}

export const AfterActivity: FC<AfterActivityProps> = ({ protocolList }) => {
  const [, event] = useLessonPlannerContextProvider()
  const {
    academicOutcomeTypes,
    protocolActivityTypes,
  } = useEnumContextProvider()

  const [coolDown, setCoolDown] = useState<TextSectionProtocolsInput>({
    academicOutcomeTypes: AcademicOutcomeTypes.LOGIC_BUILDING,
    activityType: ProtocolActivityTypes.INDIVIDUAL,
    task: '',
    completed: false,
    isActive: false,
  })
  // const [protocolSelectList, setProtocolSelectList] = useState<
  //   TextSectionProtocolsInput[]
  // >([])
  useEffect(() => {
    event({ type: 'SET_AFTER_ACTIVITY', payload: coolDown })
  }, [coolDown, event])
  return (
    <AfterActivityContainer>
      {/* <ProtocolSelect
        protocolList={protocolList}
        protocolSelectList={protocolSelectList}
        setProtocolSelectList={setProtocolSelectList}
        selectAmount={1}
      /> */}
      <div>Academic Outcome</div>
      <ActivityCategorySelect
        onChange={(e: any) => {
          if (e.target.value !== 'none') {
            setCoolDown({ ...coolDown, academicOutcomeTypes: e.target.value })
          }
        }}
      >
        <option value='none'>Select Outcome Type</option>
        {academicOutcomeTypes.map((type: AcademicOutcomeTypes) => (
          <option key={type!}>{type}</option>
        ))}
      </ActivityCategorySelect>

      <div>Activity Type</div>
      <ActivityCategorySelect
        onChange={(e: any) => {
          if (e.target.value !== 'none') {
            setCoolDown({ ...coolDown, activityType: e.target.value })
          }
        }}
      >
        <option value='none'>Select Outcome Type</option>
        {protocolActivityTypes.map((type: ProtocolActivityTypes) => (
          <option key={type!}>{type}</option>
        ))}
      </ActivityCategorySelect>

      <div>Task</div>
      <ActivityCategoryInput
        onChange={(e: any) =>
          setCoolDown({ ...coolDown, task: e.target.value })
        }
      />
    </AfterActivityContainer>
  )
}
