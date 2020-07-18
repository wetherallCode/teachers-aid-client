import React, { FC, useEffect } from 'react'
import { useCompletedEssayContextProvider } from '../../CompletedEssayContext'
import { UpdateDevelopingOrganizerType } from './DevelopingOrganizer'

export type DevelopingAnswerProps = {
  updateDevelopingOrganizer: UpdateDevelopingOrganizerType
}

export const DevelopingAnswer: FC<DevelopingAnswerProps> = ({
  updateDevelopingOrganizer,
}) => {
  const [state, event] = useCompletedEssayContextProvider()

  useEffect(() => {
    updateDevelopingOrganizer()
    // console.log('update')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.context.developingOrganizer.answer])

  return (
    <>
      <div>Answer the Question to the best of your ability.</div>
      <input
        value={state.context.developingOrganizer.answer}
        onChange={(e: any) =>
          event({ type: 'SET_ANSWER', payload: e.target.value })
        }
      />
    </>
  )
}
