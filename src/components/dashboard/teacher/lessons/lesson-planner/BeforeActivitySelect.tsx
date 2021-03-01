import React, { FC, useState, useEffect } from 'react'
import {
  TextSectionProtocolsInput,
  ProtocolActivityTypes,
  AcademicOutcomeTypes,
} from '../../../../../schemaTypes'
import { ProtocolSelect } from './ProtocolSelect'
import { useLessonPlannerContextProvider } from './state-and-styles/lessonPlannerContext'
import { useEnumContextProvider } from '../../../../../contexts/EnumContext'
import {
  BeforeActivityContainer,
  ActivityCategorySelect,
  ActivityCategoryInput,
} from './state-and-styles/lessonPlannerStyles'

export type BeforeActivitySelectProps = {
  protocolList: TextSectionProtocolsInput[]
}

export const BeforeActivitySelect: FC<BeforeActivitySelectProps> = ({
  protocolList,
}) => {
  const [state, event] = useLessonPlannerContextProvider()

  const {
    academicOutcomeTypes,
    protocolActivityTypes,
  } = useEnumContextProvider()

  const [warmUp, setWarmUp] = useState<TextSectionProtocolsInput>({
    academicOutcomeTypes: state.context.beforeActivity?.academicOutcomeTypes!,
    activityType: state.context.beforeActivity?.activityType!,
    task: state.context.beforeActivity?.task!,
    completed: false,
    isActive: false,
  })

  useEffect(() => {
    event({ type: 'SET_BEFORE_ACTIVITY', payload: warmUp })
  }, [event, warmUp])

  return (
    <BeforeActivityContainer>
      <div>Academic Outcome</div>
      <ActivityCategorySelect
        value={warmUp.academicOutcomeTypes}
        onChange={(e: any) => {
          if (e.target.value !== 'none') {
            setWarmUp({ ...warmUp, academicOutcomeTypes: e.target.value })
          }
        }}
      >
        <option value={'none'}>Select Outcome Type</option>
        {academicOutcomeTypes.map((type: AcademicOutcomeTypes) => (
          <option key={type!}>{type}</option>
        ))}
      </ActivityCategorySelect>

      <div>Activity Type</div>
      <ActivityCategorySelect
        value={warmUp.activityType}
        onChange={(e: any) => {
          if (e.target.value !== 'none') {
            setWarmUp({ ...warmUp, activityType: e.target.value })
          }
        }}
      >
        <option value='none'>Select Activity Type</option>
        {protocolActivityTypes.map((type: ProtocolActivityTypes) => (
          <option key={type!}>{type}</option>
        ))}
      </ActivityCategorySelect>

      <div>Task</div>
      <ActivityCategoryInput
        value={warmUp.task}
        onChange={(e: any) => setWarmUp({ ...warmUp, task: e.target.value })}
      />
    </BeforeActivityContainer>
  )
}
