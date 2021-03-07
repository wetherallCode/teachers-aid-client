import { gql, useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { useEnumContextProvider } from '../../../../contexts/EnumContext'
import {
  MarkingPeriodContextProvider,
  useMarkingPeriodContextProvider,
} from '../../../../contexts/markingPeriod/MarkingPeriodContext'
import {
  findAssignmentByStudentId,
  findAssignmentByStudentIdVariables,
} from '../../../../schemaTypes'

export type AssignmentInformationProps = { studentId: string }

export const FIND_ASSINGMENT_INFORMATION_QUERY = gql`
  query findAssignmentByStudentId($input: FindAssignmentByStudentIdInput!) {
    findAssignmentByStudentId(input: $input) {
      assignments {
        _id
        readings {
          readingSections
        }
        score {
          earnedPoints
          maxPoints
        }
        markingPeriod
        ... on Essay {
          finalDraft {
            returned
          }
        }
      }
      articleReviews {
        _id
        score {
          earnedPoints
          maxPoints
        }
        exempt
        markingPeriod
      }
    }
  }
`

export const AssignmentInformation = ({
  studentId,
}: AssignmentInformationProps) => {
  const [markingPeriodState] = useMarkingPeriodContextProvider()
  const { markingPeriodEnum } = useEnumContextProvider()

  const [markingPeriodToReview, setMarkingPeriodToReview] = useState(
    markingPeriodState.context.currentMarkingPeriod
  )

  const { loading, data } = useQuery<
    findAssignmentByStudentId,
    findAssignmentByStudentIdVariables
  >(FIND_ASSINGMENT_INFORMATION_QUERY, {
    variables: {
      input: { studentId },
    },
    onCompleted: (data) => console.log(data),
    onError: (error) => console.error(error),
  })

  const essays = data?.findAssignmentByStudentId.assignments.filter(
    (assignment) =>
      assignment.__typename === 'Essay' &&
      assignment.markingPeriod === markingPeriodToReview
  )
  const readingGuides = data?.findAssignmentByStudentId.assignments.filter(
    (assignment) =>
      assignment.__typename === 'ReadingGuide' &&
      assignment.markingPeriod === markingPeriodToReview
  )
  const articleReviews = data?.findAssignmentByStudentId.articleReviews.filter(
    (review) => review.markingPeriod === markingPeriodToReview
  )

  if (loading) return <div>Loading </div>
  return (
    <>
      <div></div>
    </>
  )
}
