import React, { FC, createContext, ReactNode, useContext } from 'react'
import { useMachine } from '@xstate/react'
import {
  createAssignmentMachine,
  createAssignmentMachineEvent,
  createAssignmentMachineContext,
} from './createAssignmentMachine'
import { State } from 'xstate'

export type CreateAssignmentContextProps = {
  children: ReactNode
}

const CreateAssignmentContext = createContext<any>(undefined)

export const CreateAssignmentContextProvider: FC<
  CreateAssignmentContextProps
> = ({ children }) => {
  const [state, event] = useMachine(createAssignmentMachine)
  return (
    <CreateAssignmentContext.Provider value={[state, event]}>
      {children}
    </CreateAssignmentContext.Provider>
  )
}

export function useCreateAssignmentContextPovider() {
  const context = useContext(CreateAssignmentContext)
  if (context === undefined) {
    throw new Error(
      'useCreateAssignmentContextPovider must be used within a CreateAssignmentContextProvider',
    )
  }
  return context as [
    State<
      createAssignmentMachineContext,
      createAssignmentMachineEvent,
      any,
      any
    >,
    (event: createAssignmentMachineEvent) => void,
  ]
}
