import React, { createContext, ReactNode, FC, useContext } from 'react'
import { useMachine } from '@xstate/react'
import { State } from 'xstate'
import {
  lessonFinderMachine,
  lessonFinderMachineContext,
  lessonFinderMachineEvent,
} from './lessonFinderMachine'

const LessonFinderContext = createContext<any>(undefined)

type LessonFinderContextProps = {
  children: ReactNode
}

export const LessonFinderContextProvider: FC<LessonFinderContextProps> = ({
  children,
}) => {
  const [state, event] = useMachine(lessonFinderMachine)
  return (
    <LessonFinderContext.Provider value={[state, event]}>
      {children}
    </LessonFinderContext.Provider>
  )
}

export function useLessonFinderContextProvider() {
  const context = useContext(LessonFinderContext)
  if (context === undefined) {
    throw new Error(
      'useLessonFinderContextProvider must be used within a LessonFInderContextProvider',
    )
  }
  return context as [
    State<lessonFinderMachineContext, lessonFinderMachineEvent, any, any>,
    (event: lessonFinderMachineEvent) => void,
  ]
}
