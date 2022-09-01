import { gql, useQuery } from '@apollo/client'
import React from 'react'
import {
  findWritingMetrics,
  findWritingMetricsVariables,
} from '../../../../../schemaTypes'
import { capitalizer } from '../../../../../utils'

export type WritingMetricsProps = { studentId: string }

export const WRITING_METRICS_QUERY = gql`
  query findWritingMetrics($input: FindWritingMetricsInput!) {
    findWritingMetrics(input: $input) {
      writingMetrics {
        student {
          firstName
        }
        overallWritingMetric {
          overallWritingLevel
          levelPoints
        }
      }
    }
  }
`

export const WritingMetrics = ({ studentId }: WritingMetricsProps) => {
  const { loading, data } = useQuery<
    findWritingMetrics,
    findWritingMetricsVariables
  >(WRITING_METRICS_QUERY, {
    variables: {
      input: { studentId },
    },
    // onCompleted: (data) => console.log(data),
    onError: (error) => console.error(error),
  })
  if (loading) return <div>Loading </div>
  return (
    <>
      <div>
        Writing Level:{' '}
        {capitalizer(
          data?.findWritingMetrics.writingMetrics.overallWritingMetric
            .overallWritingLevel!
        )}
      </div>
      <div>
        Level Points:{' '}
        {
          data?.findWritingMetrics.writingMetrics.overallWritingMetric
            .levelPoints
        }
      </div>
    </>
  )
}
