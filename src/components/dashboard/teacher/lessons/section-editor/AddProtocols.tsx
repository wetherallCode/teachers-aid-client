import React, { FC, Dispatch, SetStateAction, useEffect } from 'react'
import {
  sectionEditorMachineEvent,
  sectionEditorMachineContext,
} from './sectionEditorMachine'
import { State } from 'xstate'
import { MutationFunctionOptions, useQuery } from '@apollo/client'
import {
  updateTextSection,
  updateTextSectionVariables,
  TextSectionProtocolsInput,
  protocolEnumTypes,
} from '../../../../../schemaTypes'
import { PROTOCOL_ENUM_TYPES_QUERY } from '../section-builder/ProtocolsInfo'

export type AddProtocolsProps = {
  protocolItem: TextSectionProtocolsInput
  setProtocolItem: Dispatch<SetStateAction<TextSectionProtocolsInput>>
  event: (event: sectionEditorMachineEvent) => void
  state: State<sectionEditorMachineContext, sectionEditorMachineEvent, any, any>
  toggleProtocolItemInputs: Dispatch<SetStateAction<boolean>>
  currentIndexForItem: number
  updateTextSection: (
    options?:
      | MutationFunctionOptions<updateTextSection, updateTextSectionVariables>
      | undefined
  ) => void
}

export const AddProtocols: FC<AddProtocolsProps> = ({
  protocolItem,
  setProtocolItem,
  event,
  state,
  currentIndexForItem,
  updateTextSection,
  toggleProtocolItemInputs,
}) => {
  useEffect(() => {
    updateTextSection()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.context.hasProtocols])

  const { loading, error, data } = useQuery<protocolEnumTypes>(
    PROTOCOL_ENUM_TYPES_QUERY
  )
  if (loading) return <div>Loading </div>
  if (error) console.error(error)

  const newList = [
    ...state.context.hasProtocols.slice(0, currentIndexForItem + 1),
    protocolItem,
    ...state.context.hasProtocols.slice(currentIndexForItem + 1),
  ]
  return (
    <>
      <form>
        <div>Academic Outcome Type: </div>
        <select
          onChange={(e: any) =>
            setProtocolItem({
              ...protocolItem,
              academicOutcomeTypes: e.target.value,
            })
          }
        >
          {data?.AcademicOutomeTypes?.enumValues?.map((outcomeType) => (
            <option key={outcomeType.name!} value={outcomeType.name!}>
              {outcomeType.name}
            </option>
          ))}
        </select>
        <div>Activity Type:</div>
        <select
          onChange={(e: any) =>
            setProtocolItem({
              ...protocolItem,
              academicOutcomeTypes: e.target.value,
            })
          }
        >
          {data?.ProtocolActivityTypes?.enumValues?.map((activity) => (
            <option key={activity.name!} value={activity.name!}>
              {activity.name}
            </option>
          ))}
        </select>
        <div>Task: </div>
        <input
          type='text'
          onChange={(e: any) =>
            setProtocolItem({
              ...protocolItem,
              task: e.target.value,
            })
          }
        />
        <button
          type='reset'
          onClick={() => {
            event({
              type: 'SET_PROTOCOLS_LIST',
              payload: newList,
            })
            toggleProtocolItemInputs(false)
          }}
        >
          Add Word
        </button>
      </form>
    </>
  )
}
