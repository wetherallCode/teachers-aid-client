import React from 'react'
import { useEnumContextProvider } from '../../../../../../contexts/EnumContext'
import {
  AcademicOutcomeTypes,
  ProtocolActivityTypes,
} from '../../../../../../schemaTypes'
import { useSectionEditorContextProvider } from '../state-n-styles/sectionEditorContext'

export type EditProtocolProps = {}

export const EditProtocol = ({}: EditProtocolProps) => {
  const [state, event] = useSectionEditorContextProvider()

  const { academicOutcomeTypes, protocolActivityTypes } =
    useEnumContextProvider()

  const protocolToReplace = [
    ...state.context.hasProtocols.slice(0, state.context.protocolToEditIndex!),
    state.context.protocolToEdit!,
    ...state.context.hasProtocols.slice(state.context.protocolToEditIndex! + 1),
  ]

  return (
    <>
      <form>
        <div>Academic Outcome Type: </div>
        <select
          value={state.context.protocolToEdit?.academicOutcomeTypes}
          onChange={(e: any) =>
            event({
              type: 'EDIT_PROTOCOL',
              payload: {
                ...state.context.protocolToEdit!,
                academicOutcomeTypes: e.target.value,
              },
            })
          }
        >
          {academicOutcomeTypes.map((outcomeType: AcademicOutcomeTypes) => (
            <option key={outcomeType} value={outcomeType}>
              {outcomeType}
            </option>
          ))}
        </select>
        <div>Activity Type:</div>
        <select
          value={state.context.protocolToEdit?.activityType}
          onChange={(e: any) =>
            event({
              type: 'EDIT_PROTOCOL',
              payload: {
                ...state.context.protocolToEdit!,
                activityType: e.target.value,
              },
            })
          }
        >
          {protocolActivityTypes.map((activity: ProtocolActivityTypes) => (
            <option key={activity} value={activity}>
              {activity}
            </option>
          ))}
        </select>
        <div>Task: </div>
        <input
          type='text'
          value={state.context.protocolToEdit?.task}
          onChange={(e: any) =>
            event({
              type: 'EDIT_PROTOCOL',
              payload: {
                ...state.context.protocolToEdit!,
                task: e.target.value,
              },
            })
          }
        />
        <button
          type='reset'
          onClick={() => {
            event({
              type: 'SET_PROTOCOLS_LIST',
              payload: protocolToReplace,
            })
            event({ type: 'SET_PROTOCOL_TO_EDIT', payload: null, index: null })
            event({ type: 'IDLE' })
          }}
        >
          Edit Protocol
        </button>
      </form>
    </>
  )
}
