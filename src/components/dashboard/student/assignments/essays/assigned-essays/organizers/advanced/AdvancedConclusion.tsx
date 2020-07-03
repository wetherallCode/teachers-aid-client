import React, { FC, useEffect } from 'react'
import { UpdateAdvancedOrganizerType } from './AdvancedOrganizer'
import { useStudentEssayContextProvider } from '../../StudentEssayContext'

export type AdvancedConclusionProps = {
  updateAdvancedOrganizer: UpdateAdvancedOrganizerType
}

export const AdvancedConclusion: FC<AdvancedConclusionProps> = ({
  updateAdvancedOrganizer,
}) => {
  const [state, event] = useStudentEssayContextProvider()

  useEffect(() => {
    updateAdvancedOrganizer()
  }, [state.context.advancedOrganizer.conclusion, updateAdvancedOrganizer])

  return (
    <>
      <div>Conclusion</div>
      <input
        type='text'
        value={state.context.advancedOrganizer.conclusion}
        onChange={(e: any) =>
          event({ type: 'SET_CONCLUSION', payload: e.target.value })
        }
      />
      <button onClick={() => event({ type: 'NEXT' })}>Next</button>
    </>
  )
}
