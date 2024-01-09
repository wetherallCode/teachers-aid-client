import React, { createContext, ReactNode, FC, useContext } from 'react'
import { useMachine } from '@xstate/react'
import { State } from 'xstate'
import {
  createQuizMachine,
  createQuizMachineContext,
  createQuizMachineEvent,
} from './createQuizMachine'

const CreateQuizContext = createContext<any>(undefined)

type CreateQuizContextProps = {
  children: ReactNode
}

export const CreateQuizContextProvider: FC<CreateQuizContextProps> = ({
  children,
}) => {
  const [state, event] = useMachine(createQuizMachine)
  return (
    <CreateQuizContext.Provider value={[state, event]}>
      {children}
    </CreateQuizContext.Provider>
  )
}

export function useCreateQuizContextProvider() {
  const context = useContext(CreateQuizContext)
  if (context === undefined) {
    throw new Error(
      'useCreateQuizContextProvider must be used within a CreateQuizContextProvider',
    )
  }
  return context as [
    State<createQuizMachineContext, createQuizMachineEvent, any, any>,
    (event: createQuizMachineEvent) => void,
  ]
}
