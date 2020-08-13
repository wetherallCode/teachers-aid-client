import React, { FC, useContext, ReactNode, createContext } from 'react'
import { gql, useQuery } from '@apollo/client'
import { findCurrentMarkingPeriod } from '../../schemaTypes'
import {
  markingPeriodMachine,
  markingPeriodMachineContext,
  markingPeriodMachineEvent,
} from './markingPeriodMachine'
import { useMachine } from '@xstate/react'
import { State } from 'xstate'

export const MARKING_PERIOD_QUERY = gql`
  query findCurrentMarkingPeriod {
    findCurrentMarkingPeriod {
      markingPeriod {
        currentMarkingPeriod
      }
    }
  }
`
export const SET_CURRENT_MARKING_PERIOD_MUTATION = gql`
  mutation SetCurrentMarkingPeriod($input: SetCurrentMarkingPeriodInput!) {
    setCurrentMarkingPeriod(input: $input) {
      markingPeriod {
        currentMarkingPeriod
      }
    }
  }
`

const MarkingPeriodContext = createContext<any>(undefined)

type MarkingPeriodContext = {
  children: ReactNode
}

export const MarkingPeriodContextProvider: FC<MarkingPeriodContext> = ({
  children,
}) => {
  const [state, event] = useMachine(markingPeriodMachine)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { loading, error, data } = useQuery<findCurrentMarkingPeriod>(
    MARKING_PERIOD_QUERY,
    {
      onCompleted: (data) =>
        event({
          type: 'SET_MARKING_PERIOD',
          payload:
            data?.findCurrentMarkingPeriod.markingPeriod.currentMarkingPeriod,
        }),
    }
  )
  if (loading) return <div>Loading </div>
  if (error) console.error(error)

  return (
    <MarkingPeriodContext.Provider value={[state, event]}>
      {children}
    </MarkingPeriodContext.Provider>
  )
}

export function useMarkingPeriodContextProvider() {
  const context = useContext(MarkingPeriodContext)
  if (context === undefined) {
    throw new Error(
      'useMarkingPeriodContextProvider must be used within a MarkingPeriodContextProvider'
    )
  }
  return context as [
    State<markingPeriodMachineContext, markingPeriodMachineEvent, any, any>,
    (event: markingPeriodMachineEvent) => void
  ]
}
