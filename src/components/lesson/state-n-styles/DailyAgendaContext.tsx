import React, { createContext, ReactNode, FC, useContext } from 'react'
import { useMachine } from '@xstate/react'
import { State } from 'xstate'
import {
  dailyAgendaMachine,
  dailyAgendaMachineContext,
  dailyAgendaMachineEvent,
} from './dailyAgendaMachine'

const DailyAgendaContext = createContext<any>(undefined)

type DailyAgendaContextProps = {
  children: ReactNode
}

export const DailyAgendaContextProvider: FC<DailyAgendaContextProps> = ({
  children,
}) => {
  const [state, event] = useMachine(dailyAgendaMachine)
  return (
    <DailyAgendaContext.Provider value={[state, event]}>
      {children}
    </DailyAgendaContext.Provider>
  )
}

export function useDailyAgendaContextProvider() {
  const context = useContext(DailyAgendaContext)
  if (context === undefined) {
    throw new Error(
      'useDailyAgendaContextProvider must be used within a DailyAgendaContextProvider'
    )
  }
  return context as [
    State<dailyAgendaMachineContext, dailyAgendaMachineEvent, any, any>,
    (event: dailyAgendaMachineEvent) => void
  ]
}
