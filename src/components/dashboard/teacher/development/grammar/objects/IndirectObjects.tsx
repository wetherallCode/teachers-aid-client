import React from 'react'
import { useSelectedText } from '../../../../../../hooks/useSelectedText'

export type IndirectObjectsProps = {}

export const IndirectObjects = ({}: IndirectObjectsProps) => {
  const [select, text, reset] = useSelectedText()
  return (
    <>
      <div></div>
    </>
  )
}
