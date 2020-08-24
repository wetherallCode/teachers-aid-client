import React, { createContext, ReactNode, FC, useContext } from 'react'
import { useMachine } from '@xstate/react'
import { State } from 'xstate'
import {
  schoolDayMachine,
  schoolDayMachineContext,
  schoolDayMachineEvent,
} from './schoolDayMachine'

const SchoolDayContext = createContext<any>(undefined)

type SchoolDayContextProps = {
  children: ReactNode
}

export const SchoolDayContextProvider: FC<SchoolDayContextProps> = ({
  children,
}) => {
  const [state, event] = useMachine(schoolDayMachine)
  return (
    <SchoolDayContext.Provider value={[state, event]}>
      {children}
    </SchoolDayContext.Provider>
  )
}

export function useSchoolDayContextProvider() {
  const context = useContext(SchoolDayContext)
  if (context === undefined) {
    throw new Error(
      'useSchoolDayContextProvider must be used within a SchoolDayContextProvider'
    )
  }
  return context as [
    State<schoolDayMachineContext, schoolDayMachineEvent, any, any>,
    (event: schoolDayMachineEvent) => void
  ]
}
