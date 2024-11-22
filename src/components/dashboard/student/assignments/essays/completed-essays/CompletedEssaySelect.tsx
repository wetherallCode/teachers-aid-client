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
  PendingAssignmentLinkLi,
  CompletedAssignmentTypeContentContainer,
  CompletedAssignmentAssignmentAndScoreContainer,
  AssignmentScore,
  PendingAssignmentScore,
} from '../../state-n-styles/assignmentsStyles'
import { useStudentAssignmentContextProvider } from '../../state-n-styles/StudentAssignmentContext'

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
        finalDraft {
          submitted
          returned
        }
        score {
          earnedPoints
          maxPoints
        }
      }
    }
  }
`

export const CompletedEssaySelect = ({}: CompletedEssaySelectProps) => {
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

  const essaysForMarkingPeriod =
    data?.findCompletedEssaysByStudentId.essays.filter(
      (essay) => essay.markingPeriod === state.context.selectedMarkingPeriod,
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
        <CompletedAssignmentTypeContentContainer>
          {essaysForMarkingPeriod?.map((essay) => (
            <ul key={essay._id!}>
              {essay.finalDraft?.returned ? (
                <AssignmentLinkLi>
                  <AssignmentLink to={`essay/completed/${essay._id!}`}>
                    <CompletedAssignmentAssignmentAndScoreContainer>
                      <div>{essay.readings.readingSections}</div>
                      <AssignmentScore>
                        {/* {essay.score.earnedPoints} / {essay.score.maxPoints}{' '} */}
                        {(
                          (essay.score.earnedPoints / essay.score.maxPoints) *
                          100
                        ).toFixed(1)}
                        %
                      </AssignmentScore>
                    </CompletedAssignmentAssignmentAndScoreContainer>
                  </AssignmentLink>
                </AssignmentLinkLi>
              ) : (
                <PendingAssignmentLinkLi>
                  <CompletedAssignmentAssignmentAndScoreContainer>
                    <div> {essay.readings.readingSections}</div>
                    <PendingAssignmentScore>Pending</PendingAssignmentScore>
                  </CompletedAssignmentAssignmentAndScoreContainer>
                </PendingAssignmentLinkLi>
              )}
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
        </CompletedAssignmentTypeContentContainer>
      )}
    </>
  )
}
