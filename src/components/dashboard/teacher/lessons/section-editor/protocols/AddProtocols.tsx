import React, { FC, Dispatch, SetStateAction, useEffect } from 'react'
import {
  sectionEditorMachineEvent,
  sectionEditorMachineContext,
} from '../state-n-styles/sectionEditorMachine'
import { State } from 'xstate'
import { MutationFunctionOptions } from '@apollo/client'
import {
  updateTextSection,
  updateTextSectionVariables,
  TextSectionProtocolsInput,
  AcademicOutcomeTypes,
  ProtocolActivityTypes,
} from '../../../../../../schemaTypes'
import { useEnumContextProvider } from '../../../../../../contexts/EnumContext'

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
  const {
    academicOutcomeTypes,
    protocolActivityTypes,
  } = useEnumContextProvider()

  useEffect(() => {
    updateTextSection()
  }, [state.context.hasProtocols, updateTextSection])

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
          {academicOutcomeTypes.map((outcomeType: AcademicOutcomeTypes) => (
            <option key={outcomeType} value={outcomeType}>
              {outcomeType}
            </option>
          ))}
        </select>
        <div>Activity Type:</div>
        <select
          onChange={(e: any) =>
            setProtocolItem({
              ...protocolItem,
              activityType: e.target.value,
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
          Add Protocol
        </button>
      </form>
    </>
  )
}
