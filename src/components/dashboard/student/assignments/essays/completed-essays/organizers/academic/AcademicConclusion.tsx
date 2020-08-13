import React, { FC, useEffect } from 'react'
import { UpdateAcademicOrganizerType } from './AcademicOrganizer'
import { useCompletedEssayContextProvider } from '../../state/CompletedEssayContext'

export type AcademicConclusionProps = {
  updateAcademicOrganizer: UpdateAcademicOrganizerType
}

export const AcademicConclusion: FC<AcademicConclusionProps> = ({
  updateAcademicOrganizer,
}) => {
  const [state, event] = useCompletedEssayContextProvider()

  useEffect(() => {
    updateAcademicOrganizer()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.context.academicOrganizer.conclusion])

  return (
    <>
      <div>Conclusion</div>
      <input
        type='text'
        value={state.context.academicOrganizer.conclusion}
        onChange={(e: any) => {
          event({ type: 'SET_CONCLUSION', payload: e.target.value })
        }}
      />
    </>
  )
}
