import React, { FC } from 'react'
import { StartReadingGuide } from './StartReadingGuide'
import { findReadingGuideById_findReadingGuideById_readingGuide } from '../../../../../../schemaTypes'
import { useNavigate } from 'react-router'
import { dueTimeDisplay } from '../../../../../../utils'

export type ReadingGuideStartProps = {
  readingGuideToComplete: string
  readingGuideInfo: findReadingGuideById_findReadingGuideById_readingGuide
}

export const ReadingGuideStart: FC<ReadingGuideStartProps> = ({
  readingGuideToComplete,
  readingGuideInfo,
}) => {
  const navigate = useNavigate()

  return (
    <>
      <div>
        Read Pages {readingGuideInfo.readings.readingPages}:{' '}
        {readingGuideInfo.readings.readingSections}
      </div>
      <div>
        Due {readingGuideInfo.dueDate} at{' '}
        {dueTimeDisplay(readingGuideInfo.dueTime)}
      </div>
      <button onClick={() => navigate('/dashboard/assignments')}>Back</button>
      <StartReadingGuide readingGuideId={readingGuideToComplete} />
    </>
  )
}
