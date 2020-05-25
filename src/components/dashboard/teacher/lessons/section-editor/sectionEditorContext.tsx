import React, { FC, createContext, ReactNode, useContext } from 'react'
import { useMachine } from '@xstate/react'
import {
  sectionEditorMachine,
  sectionEditorMachineEvent,
  sectionEditorMachineContext,
} from './sectionEditorMachine'
import { State } from 'xstate'

const SectionEditorContext = createContext<any>(undefined)

type SectionEditorContextProps = {
  children: ReactNode
}

export const SectionEditorContextProvider: FC<SectionEditorContextProps> = ({
  children,
}) => {
  const [state, event] = useMachine(sectionEditorMachine)
  return (
    <SectionEditorContext.Provider value={[state, event]}>
      {children}
    </SectionEditorContext.Provider>
  )
}

export function useSectionEditorContextProvider() {
  const context = useContext(SectionEditorContext)
  if (context === undefined) {
    throw new Error(
      'useSectionBuilderContextProvider must be used within a SectionEditorContextProvider component'
    )
  }
  return context as [
    State<sectionEditorMachineContext, sectionEditorMachineEvent, any, any>,
    (event: sectionEditorMachineEvent) => void
  ]
}
