import React, { FC } from 'react'
import { gql, useQuery } from '@apollo/client'
import {
  findCompletedEssaysByStudentIdVariables,
  findCompletedEssaysByStudentId,
  me_me_Student,
} from '../../../../../../schemaTypes'
import { useUserContextProvider } from '../../../../../../contexts/UserContext'
import {
  AssignmentTypeTitle,
  AssignmentTypeContentContainer,
  AssignmentLink,
  AssignmentLinkLi,
  CompletionMessage,
} from '../../assignmentsStyles'
import { useStudentAssignmentContextProvider } from '../../StudentAssignmentContext'

export type CompletedEssaySelectProps = {}
export const FIND_COMPLETED_ESSAYS_QUERY = gql`
  query findCompletedEssaysByStudentId(
    $input: FindCompletedEssaysByStudentIdInput!
  ) {
    findCompletedEssaysByStudentId(input: $input) {
      essays {
        _id
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

export const CompletedEssaySelect: FC<CompletedEssaySelectProps> = () => {
  const me: me_me_Student = useUserContextProvider()
  const [state] = useStudentAssignmentContextProvider()

  const { loading, data } = useQuery<
    findCompletedEssaysByStudentId,
    findCompletedEssaysByStudentIdVariables
  >(FIND_COMPLETED_ESSAYS_QUERY, {
    variables: {
      input: { studentId: me._id! },
    },
    pollInterval: 10000,
    onCompleted: (data) => console.log(data.findCompletedEssaysByStudentId),
    onError: (error) => console.error(error),
  })

  const essaysForMarkingPeriod = data?.findCompletedEssaysByStudentId.essays.filter(
    (essay) => essay.markingPeriod === state.context.selectedMarkingPeriod
  )

  if (loading)
    return (
      <AssignmentTypeTitle>
        <div>Completed Essays</div>
      </AssignmentTypeTitle>
    )
  return (
    <>
      <AssignmentTypeTitle>
        <div>Completed Essays</div>
      </AssignmentTypeTitle>
      {loading ? null : (
        <AssignmentTypeContentContainer>
          {essaysForMarkingPeriod?.map((essay) => (
            <ul key={essay._id!}>
              <AssignmentLinkLi>
                <AssignmentLink to={`essay/completed/${essay._id!}`}>
                  {essay.readings.readingSections}
                </AssignmentLink>
              </AssignmentLinkLi>
            </ul>
          ))}
          {essaysForMarkingPeriod && essaysForMarkingPeriod.length === 0 && (
            <AssignmentTypeContentContainer>
              <CompletionMessage>
                <ul>
                  <li>No Essays Completed</li>
                </ul>
              </CompletionMessage>
            </AssignmentTypeContentContainer>
          )}
        </AssignmentTypeContentContainer>
      )}
    </>
  )
}
