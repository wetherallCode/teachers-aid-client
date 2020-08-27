import React, { FC } from 'react'
import { gql, useQuery } from '@apollo/client'
import { useUserContextProvider } from '../../../../../contexts/UserContext'
import {
  me_me_Student,
  findReadingGuidesToComplete,
  findReadingGuidesToCompleteVariables,
} from '../../../../../schemaTypes'
import { Link } from 'react-router-dom'
import {
  AssignmentTypeTitle,
  AssignmentTypeContentContainer,
  AssignmentLink,
} from '../assignmentsStyles'

export type AssignedReadingGuideSelectProps = {}

export const READING_GUIDES_TO_COMPLETE_QUERY = gql`
  query findReadingGuidesToComplete(
    $input: FindReadingGuidesToCompleteByStudentIdInput!
  ) {
    findReadingGuidesToCompleteByStudentId(input: $input) {
      readingGuides {
        _id
        paperBased
        graded
        readings {
          readingSections
        }
      }
    }
  }
`
export const AssignedReadingGuideSelect: FC<AssignedReadingGuideSelectProps> = () => {
  const me: me_me_Student = useUserContextProvider()
  const { loading, data } = useQuery<
    findReadingGuidesToComplete,
    findReadingGuidesToCompleteVariables
  >(READING_GUIDES_TO_COMPLETE_QUERY, {
    variables: {
      input: { studentId: me._id! },
    },
    onCompleted: (data) => console.log(data),
    onError: (error) => console.error(error),
  })

  return (
    <>
      <AssignmentTypeTitle>
        <div>Reading Guides to Complete</div>
      </AssignmentTypeTitle>
      {loading ? null : (
        <AssignmentTypeContentContainer>
          {data?.findReadingGuidesToCompleteByStudentId.readingGuides
            .filter(
              (readingGuide) => !readingGuide.paperBased && !readingGuide.graded
            )
            .map((readingGuide) => (
              <AssignmentLink
                to={`reading-guide/toComplete/${readingGuide._id!}`}
                key={readingGuide._id!}
              >
                {readingGuide.readings.readingSections}
              </AssignmentLink>
            ))}
        </AssignmentTypeContentContainer>
      )}
    </>
  )
}
