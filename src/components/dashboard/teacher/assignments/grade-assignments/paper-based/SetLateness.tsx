import React, { FC } from 'react'
import { findAssignmentById_findAssignmentById_assignment } from '../../../../../../schemaTypes'
import { usePaperBasedContextProvider } from './PaperBasedContext'

export type SetLatenessProps = {
  essay: findAssignmentById_findAssignmentById_assignment
}

export const SetLateness: FC<SetLatenessProps> = () => {
  const [state, event] = usePaperBasedContextProvider()
  return (
    <>
      <button
        onClick={() =>
          event({ type: 'SET_LATE', payload: !state.context.isLate })
        }
      >
        {state.context.isLate ? 'Assignment is Late' : 'Assignment is not late'}
      </button>
    </>
  )
}
