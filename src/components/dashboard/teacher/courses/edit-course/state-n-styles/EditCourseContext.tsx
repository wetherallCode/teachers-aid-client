import React, { createContext, ReactNode, FC, useContext } from 'react'
import { useMachine } from '@xstate/react'
import { State } from 'xstate'
import {
  editCourseMachine,
  editCourseMachineContext,
  editCourseMachineEvent,
} from './editCourseMachine'

const EditCourseContext = createContext<any>(undefined)

type EditCourseContextProps = {
  children: ReactNode
}

export const EditCourseContextProvider: FC<EditCourseContextProps> = ({
  children,
}) => {
  const [state, event] = useMachine(editCourseMachine)
  return (
    <EditCourseContext.Provider value={[state, event]}>
      {children}
    </EditCourseContext.Provider>
  )
}

export function useEditCourseContextProvider() {
  const context = useContext(EditCourseContext)
  if (context === undefined) {
    throw new Error(
      'useEditCourseContextProvider must be used within a EditCourseContextProvider'
    )
  }
  return context as [
    State<editCourseMachineContext, editCourseMachineEvent, any, any>,
    (event: editCourseMachineEvent) => void
  ]
}
