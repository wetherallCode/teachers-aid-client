import React, { createContext, ReactNode, FC, useContext } from 'react'
import { useMachine } from '@xstate/react'
import { State } from 'xstate'
import {
  createCourseMachine,
  createCourseMachineContext,
  createCourseMachineEvent,
} from './createCourseMachine'

const CreateCourseContext = createContext<any>(undefined)

type CreateCourseContextProps = {
  children: ReactNode
}

export const CreateCourseContextProvider = ({
  children,
}: CreateCourseContextProps) => {
  const [state, event] = useMachine(createCourseMachine)
  return (
    <CreateCourseContext.Provider value={[state, event]}>
      {children}
    </CreateCourseContext.Provider>
  )
}

export function useCreateCourseContextProvider() {
  const context = useContext(CreateCourseContext)
  if (context === undefined) {
    throw new Error(
      'useCreateCourseContextProvider must be used within a CreateCourseContextProvider'
    )
  }
  return context as [
    State<createCourseMachineContext, createCourseMachineEvent, any, any>,
    (event: createCourseMachineEvent) => void
  ]
}
