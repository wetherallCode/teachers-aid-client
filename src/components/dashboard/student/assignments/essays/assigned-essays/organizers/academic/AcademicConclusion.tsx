import React, { FC, useEffect } from 'react'
import { useStudentEssayContextProvider } from '../../state-and-styles/StudentEssayContext'
import { UpdateAcademicOrganizerType } from './AcademicOrganizer'

export type AcademicConclusionProps = {
  updateAcademicOrganizer: UpdateAcademicOrganizerType
}

export const AcademicConclusion: FC<AcademicConclusionProps> = ({
  updateAcademicOrganizer,
}) => {
  const [state, event] = useStudentEssayContextProvider()

  useEffect(() => {
    updateAcademicOrganizer()
  }, [state.context.academicOrganizer.conclusion, updateAcademicOrganizer])

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
      <button onClick={() => event({ type: 'NEXT' })}>Next</button>
    </>
  )
}
