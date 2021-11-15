import React from 'react'
import { findReadingGuidesByCourseIdAndAssignedDate_findReadingGuidesByCourseIdAndAssignedDate_readingGuides } from '../../../../../../schemaTypes'
import { useTeachersAidContextProvider } from '../../state/TeachersAidContext'
import {
  ReadingGuideControlArrowContainer,
  ReadingGuideReviewContainer,
} from '../../styles/mainScreenStyles'
import { IndividualReadingGuideReviewDisplay } from './IndividualReadingGuideReviewDisplay'

export type ReadingGuideSelectProps = {
  readingGuides: findReadingGuidesByCourseIdAndAssignedDate_findReadingGuidesByCourseIdAndAssignedDate_readingGuides[]
}

export const ReadingGuideSelect = ({
  readingGuides,
}: ReadingGuideSelectProps) => {
  const [state, event] = useTeachersAidContextProvider()

  const completedReadingGuides = readingGuides.filter(
    (guide) => guide.graded && !guide.exempt
  )
  return (
    <ReadingGuideReviewContainer>
      <ReadingGuideControlArrowContainer
        onClick={() =>
          event({
            type: 'SET_CURRENT_READING_GUIDE_INDEX',
            payload:
              state.context.currentReadingGuideIndex > 0
                ? state.context.currentReadingGuideIndex - 1
                : 0,
          })
        }
      >
        &lt;
      </ReadingGuideControlArrowContainer>
      <div>
        <IndividualReadingGuideReviewDisplay
          readingGuide={
            completedReadingGuides[state.context.currentReadingGuideIndex]
          }
        />
      </div>
      <ReadingGuideControlArrowContainer
        onClick={() =>
          event({
            type: 'SET_CURRENT_READING_GUIDE_INDEX',
            payload:
              state.context.currentReadingGuideIndex <
              completedReadingGuides.length - 1
                ? state.context.currentReadingGuideIndex + 1
                : 0,
          })
        }
      >
        &gt;
      </ReadingGuideControlArrowContainer>
    </ReadingGuideReviewContainer>
  )
}
