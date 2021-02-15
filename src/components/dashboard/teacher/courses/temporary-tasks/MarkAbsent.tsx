import React, { FC } from 'react'
import { MarkAbsentContainer } from './state-n-styles/temporaryTaskStyles'

export type MarkAbsentProps = {
  setStudentPresent: () => void
  studentPresent: boolean
}

export const MarkAbsent: FC<MarkAbsentProps> = ({
  setStudentPresent,
  studentPresent,
}) => {
  return (
    <MarkAbsentContainer>
      <input
        type='checkbox'
        checked={!studentPresent}
        onChange={() => setStudentPresent()}
      />
    </MarkAbsentContainer>
  )
}
