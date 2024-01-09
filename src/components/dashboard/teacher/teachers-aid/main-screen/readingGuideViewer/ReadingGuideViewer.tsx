import { useLazyQuery } from '@apollo/client'
import React, { useState } from 'react'
import {
  findReadingGuidesByCourseIdAndAssignedDate,
  findReadingGuidesByCourseIdAndAssignedDateVariables,
} from '../../../../../../schemaTypes'
import { dateConverter } from '../../../../../../utils'
import { useTeachersAidContextProvider } from '../../state/TeachersAidContext'
import { FIND_READING_GUIDES_BY_COURSE_ID_AND_ASSIGNED_DATE_QUERY } from '../homework-assigner/assign-reading-guide/LoadReadingGuides'
import { ReadingGuideSelect } from './ReadingGuideSelect'

export type ReadingGuideViewerProps = {}

export const ReadingGuideViewer = ({}: ReadingGuideViewerProps) => {
  const [state] = useTeachersAidContextProvider()
  const [date, setDate] = useState<string | null>(null)

  const [getReadingGuides, { loading, data }] = useLazyQuery<
    findReadingGuidesByCourseIdAndAssignedDate,
    findReadingGuidesByCourseIdAndAssignedDateVariables
  >(FIND_READING_GUIDES_BY_COURSE_ID_AND_ASSIGNED_DATE_QUERY, {
    onCompleted: (data) => console.log(data),
    onError: (error) => console.error(error),
  })

  return (
    <div>
      <div>Reading Guide Viewer</div>
      <input
        type="date"
        onChange={(e) =>
          getReadingGuides({
            variables: {
              input: {
                courseId: state.context.courseInfo!.course._id!,
                assignedDate: dateConverter(e.target.value),
              },
            },
          })
        }
      />
      {data?.findReadingGuidesByCourseIdAndAssignedDate.readingGuides.length! >
        0 && (
        <ReadingGuideSelect
          readingGuides={
            data?.findReadingGuidesByCourseIdAndAssignedDate.readingGuides!
          }
        />
      )}
    </div>
  )
}
