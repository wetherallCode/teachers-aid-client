import React from 'react'
import { useSelectedText } from '../../../../../../hooks/useSelectedText'

export type DirectObjectProps = {}

export const DirectObject = ({}: DirectObjectProps) => {
  const [select, text, reset] = useSelectedText()
  return (
    <>
      <div></div>
    </>
  )
}
