import React, { createContext, ReactNode, FC, useContext } from 'react'
import { useMachine } from '@xstate/react'
import {
  lessonPlannerMachine,
  lessonPlannerMachineEvent,
  lessonPlannerMachineContext,
} from './lessonPlannerMachine'
import { State } from 'xstate'

const LessonPlannerContext = createContext<any>(undefined)

type LessonPlannerContextProps = {
  children: ReactNode
}

export const LessonPlannerContextProvider: FC<LessonPlannerContextProps> = ({
  children,
}) => {
  const [state, event] = useMachine(lessonPlannerMachine)
  return (
    <LessonPlannerContext.Provider value={[state, event]}>
      {children}
    </LessonPlannerContext.Provider>
  )
}

export function useLessonPlannerContextProvider() {
  const context = useContext(LessonPlannerContext)
  if (context === undefined) {
    throw new Error(
      'useLessonPlannerContextProvider must be used within a LessonPlannerContextProvider'
    )
  }
  return context as [
    State<lessonPlannerMachineContext, lessonPlannerMachineEvent, any, any>,
    (event: lessonPlannerMachineEvent) => void
  ]
}
