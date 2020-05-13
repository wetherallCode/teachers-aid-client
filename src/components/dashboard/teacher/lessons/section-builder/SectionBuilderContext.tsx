import React, { createContext, FC, ReactNode, useContext } from 'react'
import { useMachine } from '@xstate/react'
import {
  sectionBuilderFSM,
  sectionBuilderFSMEvent,
  sectionBuilderFSMContext,
} from './sectionBuilderFSM'
import { State } from 'xstate'

const SectionBuilderContext = createContext<any>(undefined)

type SectionBuilderContextProps = {
  children: ReactNode
}

export const SectionBuilderContextProvider: FC<SectionBuilderContextProps> = ({
  children,
}) => {
  const [state, event] = useMachine(sectionBuilderFSM)
  return (
    <SectionBuilderContext.Provider
      value={
        [state, event] as [
          State<sectionBuilderFSMContext, sectionBuilderFSMEvent, any, any>,
          (event: sectionBuilderFSMEvent) => void
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
    State<sectionBuilderFSMContext, sectionBuilderFSMEvent, any, any>,
    (event: sectionBuilderFSMEvent) => void
  ]
}
