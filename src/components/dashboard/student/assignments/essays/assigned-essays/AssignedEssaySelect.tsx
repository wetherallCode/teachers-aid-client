import React, { FC } from 'react'
import { gql, useQuery } from '@apollo/client'
import {
  findEssaysToComplete,
  findEssaysToCompleteVariables,
  me_me_Student,
} from '../../../../../../schemaTypes'
import { useUserContextProvider } from '../../../../../../contexts/UserContext'
import { Link } from 'react-router-dom'
import {
  AssignmentTypeTitle,
  AssignmentTypeContentContainer,
  AssignmentLink,
  CompletionMessage,
  AssignmentLinkLi,
} from '../../state-n-styles/assignmentsStyles'

import { useStudentAssignmentContextProvider } from '../../state-n-styles/StudentAssignmentContext'
import { ReadingGuideCheck } from './ReadingGuideCheck'

export type AssignedEssaySelectProps = {}

export const ESSAYS_TO_COMPLETE_QUERY = gql`
  query findEssaysToComplete($input: FindEssaysToCompleteByStudentIdInput!) {
    findEssaysToCompleteByStudentId(input: $input) {
      essays {
        _id
        paperBased
        assigned
        missing
        readings {
          readingSections
        }
        topic {
          writingLevel
        }
        markingPeriod
        exempt
      }
    }
  }
`

export const AssignedEssaySelect: FC<AssignedEssaySelectProps> = () => {
  const me: me_me_Student = useUserContextProvider()
  const [state] = useStudentAssignmentContextProvider()

  const { loading, data } = useQuery<
    findEssaysToComplete,
    findEssaysToCompleteVariables
  >(ESSAYS_TO_COMPLETE_QUERY, {
    variables: {
      input: { studentId: me._id! },
    },
    pollInterval: 1000,
    onCompleted: (data) => console.log(data),
    onError: (error) => console.error(error),
  })

  const essaysForMarkingPeriod = data?.findEssaysToCompleteByStudentId.essays
    .filter(
      (essay) => essay.markingPeriod === state.context.selectedMarkingPeriod
    )
    .filter((essay) => !essay.exempt)!
  const allEssaysComplete =
    essaysForMarkingPeriod &&
    essaysForMarkingPeriod.length > 0 &&
    essaysForMarkingPeriod.every((essay) => !essay.missing && !essay.assigned)

  const noEssaysHaveBeenAssigned =
    (essaysForMarkingPeriod &&
      essaysForMarkingPeriod.every(
        (essay) => essay.missing && !essay.assigned
      )) ||
    (essaysForMarkingPeriod && essaysForMarkingPeriod.length === 0)

  return (
    <>
      <AssignmentTypeTitle>
        <div>Essays to Complete</div>
      </AssignmentTypeTitle>
      {loading ? null : (
        <>
          {allEssaysComplete ? (
            <AssignmentTypeContentContainer>
              <CompletionMessage>
                <ul>
                  <li>All Essays for Marking Period Complete</li>
                </ul>
              </CompletionMessage>
            </AssignmentTypeContentContainer>
          ) : noEssaysHaveBeenAssigned ? (
            <AssignmentTypeContentContainer>
              <CompletionMessage>
                <ul>
                  <li>No Essays Assigned</li>
                </ul>
              </CompletionMessage>
            </AssignmentTypeContentContainer>
          ) : (
            <>
              {essaysForMarkingPeriod && (
                <AssignmentTypeContentContainer>
                  {essaysForMarkingPeriod &&
                    essaysForMarkingPeriod
                      .filter((essay) => !essay.paperBased && essay.assigned)
                      .map((essay) => (
                        <ul key={essay._id}>
                          <AssignmentLinkLi>
                            <ReadingGuideCheck essay={essay} />
                          </AssignmentLinkLi>
                        </ul>
                      ))}
                </AssignmentTypeContentContainer>
              )}
              {/* {essaysForMarkingPeriod && essaysForMarkingPeriod.length === 0 && (
                <AssignmentTypeContentContainer>
                  <CompletionMessage>
                    <ul>
                      <li>No Essays Assigned</li>
                    </ul>
                  </CompletionMessage>
                </AssignmentTypeContentContainer>
              )} */}
            </>
          )}
        </>
      )}
    </>
  )
}
