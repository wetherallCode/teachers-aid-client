import React, { createContext, ReactNode, FC, useContext } from 'react'
import { useMachine } from '@xstate/react'
import { State } from 'xstate'
import {
  addStudentsMachine,
  addStudentsMachineContext,
  addStudentsMachineEvent,
} from './addStudentsMachine'

const AddStudentsContext = createContext<any>(undefined)

type AddStudentsContextProps = {
  children: ReactNode
}

export const AddStudentsContextProvider: FC<AddStudentsContextProps> = ({
  children,
}) => {
  const [state, event] = useMachine(addStudentsMachine)
  return (
    <AddStudentsContext.Provider value={[state, event]}>
      {children}
    </AddStudentsContext.Provider>
  )
}

export function useAddStudentsContextProvider() {
  const context = useContext(AddStudentsContext)
  if (context === undefined) {
    throw new Error(
      'useAddStudentsContextProvider must be used within a AddStudentsContextProvider'
    )
  }
  return context as [
    State<addStudentsMachineContext, addStudentsMachineEvent, any, any>,
    (event: addStudentsMachineEvent) => void
  ]
}
