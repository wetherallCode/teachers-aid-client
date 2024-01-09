import React, { FC, createContext, ReactNode, useContext } from 'react'
import { useMachine } from '@xstate/react'
import { State } from 'xstate'
import {
  rubricEditorMachineContext,
  rubricEditorMachineEvent,
  rubricEditorMachine,
} from './rubricEditorMachine'

export type RubricEditorContextProps = {
  children: ReactNode
}

const RubricEditorContext = createContext<any>(undefined)

export const RubricEditorContextProvider: FC<RubricEditorContextProps> = ({
  children,
}) => {
  const [state, event] = useMachine(rubricEditorMachine)
  return (
    <RubricEditorContext.Provider value={[state, event]}>
      {children}
    </RubricEditorContext.Provider>
  )
}

export function useRubricEditorContextProvider() {
  const context = useContext(RubricEditorContext)
  if (context === undefined) {
    throw new Error(
      'useRubricEditorContextProvider must be used within a RubricEditorContextProvider',
    )
  }
  return context as [
    State<rubricEditorMachineContext, rubricEditorMachineEvent, any, any>,
    (event: rubricEditorMachineEvent) => void,
  ]
}
