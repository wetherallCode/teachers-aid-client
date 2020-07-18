import React, { createContext, ReactNode, FC, useContext } from 'react'
import { useMachine } from '@xstate/react'
import { State } from 'xstate'
import {
  assignEssayByCourseMachine,
  assignEssayByCourseMachineContext,
  assignEssayByCourseMachineEvent,
} from './assignEssayByCourseMachine'

const AssignEssayByCourseContext = createContext<any>(undefined)

type AssignEssayByCourseContextProps = {
  children: ReactNode
}

export const AssignEssayByCourseContextProvider: FC<AssignEssayByCourseContextProps> = ({
  children,
}) => {
  const [state, event] = useMachine(assignEssayByCourseMachine)
  return (
    <AssignEssayByCourseContext.Provider value={[state, event]}>
      {children}
    </AssignEssayByCourseContext.Provider>
  )
}

export function useAssignEssayByCourseContextProvider() {
  const context = useContext(AssignEssayByCourseContext)
  if (context === undefined) {
    throw new Error(
      'useAssignEssayByCourseContextProvider must be used within a AssignEssayByCourseContextProvider'
    )
  }
  return context as [
    State<
      assignEssayByCourseMachineContext,
      assignEssayByCourseMachineEvent,
      any,
      any
    >,
    (event: assignEssayByCourseMachineEvent) => void
  ]
}
