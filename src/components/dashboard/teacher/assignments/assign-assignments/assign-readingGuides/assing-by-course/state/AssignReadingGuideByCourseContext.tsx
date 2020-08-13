import React, { createContext, ReactNode, FC, useContext } from 'react'
import { useMachine } from '@xstate/react'
import { State } from 'xstate'
import {
  assignReadingGuideByCourseMachine,
  assignReadingGuideByCourseMachineContext,
  assignReadingGuideByCourseMachineEvent,
} from './assignReadingGuideByCourseMachine'

const AssignReadingGuideByCourseContext = createContext<any>(undefined)

type AssignReadingGuideByCourseContextProps = {
  children: ReactNode
}

export const AssignReadingGuideByCourseContextProvider: FC<AssignReadingGuideByCourseContextProps> = ({
  children,
}) => {
  const [state, event] = useMachine(assignReadingGuideByCourseMachine)
  return (
    <AssignReadingGuideByCourseContext.Provider value={[state, event]}>
      {children}
    </AssignReadingGuideByCourseContext.Provider>
  )
}

export function useAssignReadingGuideByCourseContextProvider() {
  const context = useContext(AssignReadingGuideByCourseContext)
  if (context === undefined) {
    throw new Error(
      'useAssignReadingGuideByCourseContextProvider must be used within a AssignReadingGuideByCourseContextProvider'
    )
  }
  return context as [
    State<
      assignReadingGuideByCourseMachineContext,
      assignReadingGuideByCourseMachineEvent,
      any,
      any
    >,
    (event: assignReadingGuideByCourseMachineEvent) => void
  ]
}
