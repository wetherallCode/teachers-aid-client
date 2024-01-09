import React, { createContext, ReactNode, FC, useContext } from 'react'
import { useMachine } from '@xstate/react'
import { State } from 'xstate'
import {
  teachersAidMachine,
  teachersAidMachineContext,
  teachersAidMachineEvent,
} from './teachersAidMachine'

const TeachersAidContext = createContext<any>(undefined)

type TeachersAidContextProps = {
  children: ReactNode
}

export const TeachersAidContextProvider: FC<TeachersAidContextProps> = ({
  children,
}) => {
  const [state, event] = useMachine(teachersAidMachine)
  return (
    <TeachersAidContext.Provider value={[state, event]}>
      {children}
    </TeachersAidContext.Provider>
  )
}

export function useTeachersAidContextProvider() {
  const context = useContext(TeachersAidContext)
  if (context === undefined) {
    throw new Error(
      'useTeachersAidContextProvider must be used within a TeachersAidContextProvider',
    )
  }
  return context as [
    State<teachersAidMachineContext, teachersAidMachineEvent, any, any>,
    (event: teachersAidMachineEvent) => void,
  ]
}
