import { gql, useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { useUserContextProvider } from '../../../../../../contexts/UserContext'
import {
  findEssaysToComplete_findEssaysToCompleteByStudentId_essays,
  findReadingGuideByUserIdAndReadingSection,
  findReadingGuideByUserIdAndReadingSectionVariables,
  me_me_Student,
} from '../../../../../../schemaTypes'
import { AssignmentLink } from '../../state-n-styles/assignmentsStyles'

export type ReadingGuideCheckProps = {
  essay: findEssaysToComplete_findEssaysToCompleteByStudentId_essays
}

export const CHECK_READING_GUIDE_STATUS_QUERY = gql`
  query findReadingGuideByUserIdAndReadingSection(
    $input: FindReadingGuideByUserIdAndReadingSectionInput!
  ) {
    findReadingGuideByUserIdAndReadingSection(input: $input) {
      readingGuide {
        _id
        exempt
        graded
      }
    }
  }
`

export const ReadingGuideCheck = ({ essay }: ReadingGuideCheckProps) => {
  const me: me_me_Student = useUserContextProvider()
  const [isHovering, setIsHovering] = useState(false)

  const { loading, data } = useQuery<
    findReadingGuideByUserIdAndReadingSection,
    findReadingGuideByUserIdAndReadingSectionVariables
  >(CHECK_READING_GUIDE_STATUS_QUERY, {
    variables: {
      input: {
        studentId: me._id!,
        readingSections: essay.readings.readingSections,
      },
    },
    // onCompleted: (data) =>
    //   console.log(
    //     isHovering &&
    //       data.findReadingGuideByUserIdAndReadingSection.readingGuide?.graded
    //   ),
    onError: (error) => console.error(error),
  })

  const readingGuideNeeded =
    data?.findReadingGuideByUserIdAndReadingSection.readingGuide &&
    !data?.findReadingGuideByUserIdAndReadingSection.readingGuide?.exempt &&
    !data?.findReadingGuideByUserIdAndReadingSection.readingGuide?.graded

  if (loading) return <div>Loading </div>
  return (
    <>
      {
        <AssignmentLink
          onMouseEnter={() => !isHovering && setIsHovering(true)}
          onMouseOut={() => isHovering && setIsHovering(false)}
          to={
            !readingGuideNeeded
              ? `essay/toComplete/${essay._id!}`
              : `reading-guide/toComplete/${data?.findReadingGuideByUserIdAndReadingSection.readingGuide?._id}`
          }
          // key={essay._id!}
        >
          {/* {essay.readings.readingSections}{' '} */}
          {isHovering && readingGuideNeeded
            ? 'You need to complete the reading guide first! Click to start.'
            : essay.readings.readingSections}
        </AssignmentLink>
      }
    </>
  )
}
