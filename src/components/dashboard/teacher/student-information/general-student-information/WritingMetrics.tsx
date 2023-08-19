import { gql, useQuery } from '@apollo/client'

import {
  findStudentByIdForWritingMetrics,
  findStudentByIdForWritingMetricsVariables,
} from '../../../../../schemaTypes'
import { capitalizer } from '../../../../../utils'

export type WritingMetricsProps = { studentId: string }

export const WRITING_METRICS_QUERY = gql`
  query findStudentByIdForWritingMetrics($input: FindStudentByIdInput!) {
    findStudentById(input: $input) {
      student {
        hasProgressTracker {
          writingProgressTracker {
            levelPoints
            overallWritingLevel
          }
          readingGuideProgressTracker {
            levelPoints
            readingGuideLevel
          }
        }
      }
    }
  }
`

export const WritingMetrics = ({ studentId }: WritingMetricsProps) => {
  const { loading, data } = useQuery<
    findStudentByIdForWritingMetrics,
    findStudentByIdForWritingMetricsVariables
  >(WRITING_METRICS_QUERY, {
    variables: {
      input: { studentId },
    },
    // onCompleted: (data) => console.log(data),
    onError: (error) => console.error(error),
  })
  if (loading) return <div>Loading </div>

  const { readingGuideProgressTracker, writingProgressTracker } =
    data?.findStudentById.student.hasProgressTracker!

  return (
    <>
      <div>
        Writing Level: {capitalizer(writingProgressTracker.overallWritingLevel)}
      </div>
      <div>Level Points: {writingProgressTracker.levelPoints}</div>
      <br />
      <div>
        ReadingGuide Level:{' '}
        {capitalizer(readingGuideProgressTracker.readingGuideLevel)}
      </div>
      <div>Level Points: {readingGuideProgressTracker.levelPoints}</div>
    </>
  )
}
