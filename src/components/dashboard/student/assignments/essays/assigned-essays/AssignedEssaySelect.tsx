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
} from '../../assignmentsStyles'
import { useMarkingPeriodContextProvider } from '../../../../../../contexts/markingPeriod/MarkingPeriodContext'

export type AssignedEssaySelectProps = {}

export const ESSAYS_TO_COMPLETE_QUERY = gql`
  query findEssaysToComplete($input: FindEssaysToCompleteByStudentIdInput!) {
    findEssaysToCompleteByStudentId(input: $input) {
      essays {
        _id
        paperBased
        readings {
          readingSections
        }
        topic {
          writingLevel
        }
        markingPeriod
      }
    }
  }
`

export const AssignedEssaySelect: FC<AssignedEssaySelectProps> = () => {
  const me: me_me_Student = useUserContextProvider()
  const [markingPeriodState] = useMarkingPeriodContextProvider()
  const { currentMarkingPeriod } = markingPeriodState.context
  const { loading, data } = useQuery<
    findEssaysToComplete,
    findEssaysToCompleteVariables
  >(ESSAYS_TO_COMPLETE_QUERY, {
    variables: {
      input: { studentId: me._id! },
    },
    pollInterval: 10000,
    onCompleted: (data) => console.log(data),
    onError: (error) => console.error(error),
  })

  const essaysForMarkingPeriod = data?.findEssaysToCompleteByStudentId.essays.filter(
    (essay) => essay.markingPeriod === currentMarkingPeriod
  )

  return (
    <>
      <AssignmentTypeTitle>
        <div>Essays to complete</div>
      </AssignmentTypeTitle>
      {loading ? null : (
        <>
          {data?.findEssaysToCompleteByStudentId.essays.length! === 0 ? (
            <AssignmentTypeContentContainer>
              <CompletionMessage>
                <ul>
                  <li>All Essays for Marking Period Complete</li>
                </ul>
              </CompletionMessage>
            </AssignmentTypeContentContainer>
          ) : (
            <AssignmentTypeContentContainer>
              <ul>
                {essaysForMarkingPeriod &&
                  essaysForMarkingPeriod
                    .filter((essay) => !essay.paperBased)
                    .map((essay) => (
                      <li style={{ fontSize: '2rem' }}>
                        <AssignmentLink
                          to={`essay/toComplete/${essay._id!}`}
                          key={essay._id!}
                        >
                          {essay.readings.readingSections}
                        </AssignmentLink>
                      </li>
                    ))}
              </ul>
            </AssignmentTypeContentContainer>
          )}
        </>
      )}
    </>
  )
}
