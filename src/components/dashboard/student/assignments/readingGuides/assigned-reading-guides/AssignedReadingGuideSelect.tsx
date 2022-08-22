import React, { FC } from 'react'
import { gql, useQuery } from '@apollo/client'
import { useUserContextProvider } from '../../../../../../contexts/UserContext'
import {
  me_me_Student,
  findReadingGuidesToComplete,
  findReadingGuidesToCompleteVariables,
} from '../../../../../../schemaTypes'
import {
  AssignmentTypeTitle,
  AssignmentTypeContentContainer,
  AssignmentLink,
  CompletionMessage,
  AssignmentLinkLi,
} from '../../state-n-styles/assignmentsStyles'
import { useStudentAssignmentContextProvider } from '../../state-n-styles/StudentAssignmentContext'

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
        markingPeriod
        assigned
      }
    }
  }
`
export const AssignedReadingGuideSelect: FC<
  AssignedReadingGuideSelectProps
> = () => {
  const me: me_me_Student = useUserContextProvider()
  const [state] = useStudentAssignmentContextProvider()

  const { loading, data } = useQuery<
    findReadingGuidesToComplete,
    findReadingGuidesToCompleteVariables
  >(READING_GUIDES_TO_COMPLETE_QUERY, {
    variables: {
      input: { studentId: me._id! },
    },
    pollInterval: 1000,
    // onCompleted: (data) =>
    //   console.log(data.findReadingGuidesToCompleteByStudentId),
    onError: (error) => console.error(error),
  })
  const readingGuidesForMarkingPeriod =
    data?.findReadingGuidesToCompleteByStudentId.readingGuides.filter(
      (guide) => guide.markingPeriod === state.context.selectedMarkingPeriod
    )!

  const allReadingGuidesComplete =
    readingGuidesForMarkingPeriod &&
    readingGuidesForMarkingPeriod.length > 0 &&
    readingGuidesForMarkingPeriod.every((rg) => rg.graded && !rg.assigned)

  const noReadingGuidesAssigned =
    (readingGuidesForMarkingPeriod &&
      readingGuidesForMarkingPeriod.every(
        (rg) => !rg.graded && !rg.assigned
      )) ||
    (readingGuidesForMarkingPeriod &&
      readingGuidesForMarkingPeriod.length === 0)

  return (
    <>
      <AssignmentTypeTitle>
        <div>Reading Guides to Complete</div>
      </AssignmentTypeTitle>
      {loading ? null : (
        <>
          {allReadingGuidesComplete ? (
            <AssignmentTypeContentContainer>
              <CompletionMessage>
                <ul>
                  <li>All Reading Guides for Marking Period Complete</li>
                </ul>
              </CompletionMessage>
            </AssignmentTypeContentContainer>
          ) : noReadingGuidesAssigned ? (
            <AssignmentTypeContentContainer>
              <CompletionMessage>
                <ul>
                  <li>No Reading Guides Assigned</li>
                </ul>
              </CompletionMessage>
            </AssignmentTypeContentContainer>
          ) : (
            <AssignmentTypeContentContainer>
              {readingGuidesForMarkingPeriod &&
                readingGuidesForMarkingPeriod
                  .filter(
                    (readingGuide) =>
                      !readingGuide.paperBased &&
                      !readingGuide.graded &&
                      readingGuide.assigned
                  )
                  .map((readingGuide) => (
                    <ul key={readingGuide._id!}>
                      <AssignmentLinkLi>
                        <AssignmentLink
                          to={`reading-guide/toComplete/${readingGuide._id!}`}
                          key={readingGuide._id!}
                        >
                          {readingGuide.readings.readingSections}
                        </AssignmentLink>
                      </AssignmentLinkLi>
                    </ul>
                  ))}
            </AssignmentTypeContentContainer>
          )}
        </>
      )}
    </>
  )
}
