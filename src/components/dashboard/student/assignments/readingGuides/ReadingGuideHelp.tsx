import React, { FC } from 'react'
import { useReadingGuideToCompleteContextProvider } from './state/ReadingGuideToCompleteContext'

export type ReadingGuideHelpProps = {}

export const ReadingGuideHelp: FC<ReadingGuideHelpProps> = () => {
  const [state] = useReadingGuideToCompleteContextProvider()
  return (
    <>
      <div>Help with the Reading Guide</div>
      <div>{state.context.help}</div>
    </>
  )
}
