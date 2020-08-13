import React, { createContext, FC, ReactNode, useContext } from 'react'
import { useMachine } from '@xstate/react'
import {
  sectionBuilderMachine,
  sectionBuilderMachineContext,
  sectionBuilderMachineEvent,
} from './sectionBuilderMachine'
import { State } from 'xstate'

const SectionBuilderContext = createContext<any>(undefined)

type SectionBuilderContextProps = {
  children: ReactNode
}

export const SectionBuilderContextProvider: FC<SectionBuilderContextProps> = ({
  children,
}) => {
  const [state, event] = useMachine(sectionBuilderMachine)
  return (
    <SectionBuilderContext.Provider
      value={
        [state, event] as [
          State<
            sectionBuilderMachineContext,
            sectionBuilderMachineEvent,
            any,
            any
          >,
          (event: sectionBuilderMachineEvent) => void
        ]
      }
    >
      {children}
    </SectionBuilderContext.Provider>
  )
}

export function useSectionBuilderContextProvider() {
  const context = useContext(SectionBuilderContext)

  if (context === undefined) {
    throw new Error(
      'useSectionBuilderContextProvider must be used within a SectionBuilderContextProvider Component'
    )
  }
  return context as [
    State<sectionBuilderMachineContext, sectionBuilderMachineEvent, any, any>,
    (event: sectionBuilderMachineEvent) => void
  ]
}
