import React, { useState } from 'react'

import { gql, useQuery } from '@apollo/client'
import {
  TextSectionProtocolsInput,
  AcademicOutomeTypes,
  ProtocolActivityTypes,
  protocolEnumTypes,
} from '../../../../../schemaTypes'
import { useSectionBuilderContextProvider } from './state/SectionBuilderContext'

export const PROTOCOL_ENUM_TYPES_QUERY = gql`
  query protocolEnumTypes {
    AcademicOutomeTypes: __type(name: "AcademicOutomeTypes") {
      enumValues {
        name
      }
    }
    ProtocolActivityTypes: __type(name: "ProtocolActivityTypes") {
      enumValues {
        name
      }
    }
  }
`

export const ProtocolsInfo = () => {
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
  const { loading, error, data } = useQuery<protocolEnumTypes>(
    PROTOCOL_ENUM_TYPES_QUERY
  )
  if (loading) return <div>Loading </div>
  if (error) console.error(error)
  const academicOutcomes = data?.AcademicOutomeTypes?.enumValues?.map(
    (type) => type.name
  )
  const protocolActivities = data?.ProtocolActivityTypes?.enumValues?.map(
    (type) => type.name
  )
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
        {academicOutcomes?.map((outcome) => (
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
        {protocolActivities?.map((outcome) => (
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
