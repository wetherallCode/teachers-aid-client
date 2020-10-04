import React, { ReactNode, FC, useContext } from 'react'
import { createContext } from 'react'
import { useMachine } from '@xstate/react'
import {
  teacherNavMachine,
  teacherNavMachineEvent,
  teacherNavMachineContext,
} from './teacherNavMachine'
import { State } from 'xstate'

const TeacherNavContext = createContext<any>(undefined)

type NavContextProps = {
  children: ReactNode
}

export const TeacherNavContextProvider: FC<NavContextProps> = ({
  children,
}) => {
  const [state, event] = useMachine(teacherNavMachine)
  return (
    <TeacherNavContext.Provider value={[state, event]}>
      {children}
    </TeacherNavContext.Provider>
  )
}

export function useTeacherNavContextProvider() {
  const context = useContext(TeacherNavContext)
  if (context === undefined) {
    throw new Error(
      'useSectionBuilderContextProvider must be used within a SectionBuilderContextProvider Component'
    )
  }
  return context as [
    State<teacherNavMachineContext, teacherNavMachineEvent, any, any>,
    (event: teacherNavMachineEvent) => void
  ]
}
