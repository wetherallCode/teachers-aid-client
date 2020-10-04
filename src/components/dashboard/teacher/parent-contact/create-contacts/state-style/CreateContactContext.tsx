import React, { createContext, ReactNode, FC, useContext } from 'react'
import { useMachine } from '@xstate/react'
import { State } from 'xstate'
import {
  createContactMachine,
  createContactMachineContext,
  createContactMachineEvent,
} from './createContactMachine'

const CreateContactContext = createContext<any>(undefined)

type CreateContactContextProps = {
  children: ReactNode
}

export const CreateContactContextProvider: FC<CreateContactContextProps> = ({
  children,
}) => {
  const [state, event] = useMachine(createContactMachine)
  return (
    <CreateContactContext.Provider value={[state, event]}>
      {children}
    </CreateContactContext.Provider>
  )
}

export function useCreateContactContextProvider() {
  const context = useContext(CreateContactContext)
  if (context === undefined) {
    throw new Error(
      'useCreateContactContextProvider must be used within a CreateContactContextProvider'
    )
  }
  return context as [
    State<createContactMachineContext, createContactMachineEvent, any, any>,
    (event: createContactMachineEvent) => void
  ]
}
