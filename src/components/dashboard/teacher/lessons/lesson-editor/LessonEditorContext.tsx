import React, { createContext, ReactNode, FC, useContext } from 'react'
import { useMachine } from '@xstate/react'
import { State } from 'xstate'
import {
  lessonEditorMachine,
  lessonEditorMachineContext,
  lessonEditorMachineEvent,
} from './lessonEditorMachine'

const LessonEditorContext = createContext<any>(undefined)

type LessonEditorContextProps = {
  children: ReactNode
}

export const LessonEditorContextProvider: FC<LessonEditorContextProps> = ({
  children,
}) => {
  const [state, event] = useMachine(lessonEditorMachine)
  return (
    <LessonEditorContext.Provider value={[state, event]}>
      {children}
    </LessonEditorContext.Provider>
  )
}

export function useLessonEditorContextProvider() {
  const context = useContext(LessonEditorContext)
  if (context === undefined) {
    throw new Error(
      'useLessonEditorContextProvider must be used within a LessonEditorContextProvider'
    )
  }
  return context as [
    State<lessonEditorMachineContext, lessonEditorMachineEvent, any, any>,
    (event: lessonEditorMachineEvent) => void
  ]
}
