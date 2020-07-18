import React, { FC, useEffect } from 'react'
import { UpdateDevelopingOrganizerType } from './DevelopingOrganizer'
import { useCompletedEssayContextProvider } from '../../CompletedEssayContext'

export type DevelopingConclusionProps = {
  updateDevelopingOrganizer: UpdateDevelopingOrganizerType
}

export const DevelopingConclusion: FC<DevelopingConclusionProps> = ({
  updateDevelopingOrganizer,
}) => {
  const [state, event] = useCompletedEssayContextProvider()
  const sentenceStructure = {
    subject:
      state.context.developingOrganizer.developingSentenceStructure.subject,
    verb: state.context.developingOrganizer.developingSentenceStructure.verb,
  }

  useEffect(() => {
    updateDevelopingOrganizer()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.context.developingOrganizer.conclusion])
  return (
    <>
      <div>
        Think of a consequence of what the subject ({sentenceStructure.subject})
        did ({sentenceStructure.verb})
      </div>
      <input
        value={state.context.developingOrganizer.conclusion}
        onChange={(e: any) =>
          event({ type: 'SET_CONCLUSION', payload: e.target.value })
        }
      />
    </>
  )
}
