import React, { useState } from 'react'
import {
  TextSectionProtocolsInput,
  AcademicOutomeTypes,
  ProtocolActivityTypes,
} from '../../../../../schemaTypes'
import { useSectionBuilderContextProvider } from './state/SectionBuilderContext'
import { useEnumContextProvider } from '../../../../../contexts/EnumContext'

export const ProtocolsInfo = () => {
  const {
    academicOutcomeTypes,
    protocolActivityTypes,
  } = useEnumContextProvider()
  const [protocolValues, setProtocolValues] = useState<
    TextSectionProtocolsInput
  >({
    academicOutcomeTypes: AcademicOutomeTypes.LOGIC_BUILDING,
    activityType: ProtocolActivityTypes.THINK_PAIR_SHARE,
    task: '',
    isActive: false,
    completed: false,
  })
  const [, event] = useSectionBuilderContextProvider()

  return (
    <form onSubmit={(e: any) => e.preventDefault}>
      <div>Protocols</div>
      <div>Academic Outcome: </div>
      <select
        onChange={(e: any) =>
          setProtocolValues({
            ...protocolValues,
            academicOutcomeTypes: e.target.value,
          })
        }
      >
        <option value={undefined}>Choose One</option>
        {academicOutcomeTypes?.map((outcome: AcademicOutomeTypes) => (
          <option key={outcome} value={outcome}>
            {outcome}
          </option>
        ))}
      </select>
      <div>Activity Type:</div>
      <select
        onChange={(e: any) =>
          setProtocolValues({
            ...protocolValues,
            activityType: e.target.value,
          })
        }
      >
        <option value={undefined}>Choose One</option>
        {protocolActivityTypes?.map((outcome: ProtocolActivityTypes) => (
          <option key={outcome} value={outcome}>
            {outcome}
          </option>
        ))}
      </select>
      <div>Task: </div>
      <input
        type='text'
        onChange={(e: any) =>
          setProtocolValues({ ...protocolValues, task: e.target.value })
        }
      />
      <button
        type='reset'
        onClick={() =>
          event({ type: 'SET_PROTOCOLS_LIST', payload: protocolValues })
        }
      >
        Add Protocol
      </button>
    </form>
  )
}
