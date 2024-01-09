import React, { FC, useState, useEffect } from 'react'
import {
  TextSectionProtocolsInput,
  AcademicOutcomeTypes,
  ProtocolActivityTypes,
} from '../../../../../schemaTypes'

import { useLessonPlannerContextProvider } from './state-and-styles/lessonPlannerContext'
import { useEnumContextProvider } from '../../../../../contexts/EnumContext'
import {
  AfterActivityContainer,
  ActivityCategorySelect,
  ActivityCategoryInput,
} from './state-and-styles/lessonPlannerStyles'
import { underscoreEliminator, phraseCapitalizer } from '../../../../../utils'

export type AfterActivityProps = {
  protocolList: TextSectionProtocolsInput[]
}

export const AfterActivity: FC<AfterActivityProps> = ({ protocolList }) => {
  const [state, event] = useLessonPlannerContextProvider()
  const { academicOutcomeTypes, protocolActivityTypes } =
    useEnumContextProvider()

  const [coolDown, setCoolDown] = useState<TextSectionProtocolsInput>({
    academicOutcomeTypes: state.context.afterActivity.academicOutcomeTypes,
    activityType: state.context.afterActivity.activityType,
    task: state.context.afterActivity.task!,
    completed: false,
    isActive: false,
  })

  useEffect(() => {
    event({ type: 'SET_AFTER_ACTIVITY', payload: coolDown })
  }, [coolDown, event])

  return (
    <AfterActivityContainer>
      <div>Academic Outcome</div>
      <ActivityCategorySelect
        value={coolDown.academicOutcomeTypes}
        onChange={(e: any) => {
          if (e.target.value !== 'none') {
            setCoolDown({ ...coolDown, academicOutcomeTypes: e.target.value })
          }
        }}
      >
        <option value="none">Select Outcome Type</option>
        {academicOutcomeTypes.map((type: AcademicOutcomeTypes) => {
          const normalizedType = underscoreEliminator(type)
          return (
            <option key={type!} value={type}>
              {phraseCapitalizer(normalizedType)}
            </option>
          )
        })}
      </ActivityCategorySelect>

      <div>Activity Type</div>
      <ActivityCategorySelect
        value={coolDown.activityType}
        onChange={(e: any) => {
          if (e.target.value !== 'none') {
            setCoolDown({ ...coolDown, activityType: e.target.value })
          }
        }}
      >
        <option value="none">Select Activity Type</option>
        {protocolActivityTypes.map((type: ProtocolActivityTypes) => {
          const normalizedType = underscoreEliminator(type)
          return (
            <option key={type!} value={type}>
              {phraseCapitalizer(normalizedType)}
            </option>
          )
        })}
      </ActivityCategorySelect>

      <div>Task</div>
      <ActivityCategoryInput
        value={coolDown.task}
        onChange={(e: any) =>
          setCoolDown({ ...coolDown, task: e.target.value })
        }
      />
    </AfterActivityContainer>
  )
}
